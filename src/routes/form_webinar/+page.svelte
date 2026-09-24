<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Notice, { type NoticeKind } from '$lib/components/Notice.svelte';
	import ReferralInput, { type ReferralCheck, type ReferralState } from '$lib/components/ReferralInput.svelte';
	import { fetchJson } from '$lib/http';
	import { loadSnap, payWithSnap } from '$lib/midtrans';
	import { discounted, parsePrice } from '$lib/pricing';
	import { WEBINAR_API } from '$lib/site';

	const DISCOUNT = 0.1;
	const REDIRECT_MS = 3000;
	const NO_REF = 'NO_REF';

	const q = page.url.searchParams;
	const webinarType = q.get('webinar_type') || 'Pelatihan Islamic IT Course';
	const webinarTitle = q.get('webinar_title') || webinarType;
	const webinarDate = q.get('date') || 'Tanggal belum ditentukan';
	const webinarTime = q.get('time') || 'Waktu belum ditentukan';
	const price = parsePrice(q.get('price'));
	const initialRef = q.get('ref')?.trim() ?? '';

	let refCode = $state(initialRef === NO_REF ? '' : initialRef);
	let refChecked = $state('');
	let refState = $state<ReferralState>('idle');
	let refMessage = $state('');
	let referral = $state<ReferralInput>();

	let submitting = $state(false);
	let notice = $state<{ kind: NoticeKind; text: string } | null>(null);

	const refValid = $derived(refState === 'valid' && refChecked === refCode.trim());
	const total = $derived(price ? discounted(price, refValid ? DISCOUNT : 0) : 0);
	const rp = (n: number) => n.toLocaleString('id-ID');

	// ponytail: this backend only lists every code, so matching happens here; a /check/:code endpoint would stop exposing the list.
	const checkReferral: ReferralCheck = async (code) => {
		const codes = await fetchJson<{ kode_referal: string }[]>(`${WEBINAR_API}/referal`);
		return codes.some((c) => c.kode_referal === code)
			? { valid: true, message: 'Kode referral valid! Diskon 10% telah diterapkan.' }
			: { valid: false, message: 'Kode referral tidak valid. Silakan periksa kembali.' };
	};

	onMount(() => {
		if (!price) return;
		loadSnap().catch((e: Error) => (notice = { kind: 'error', text: ` ${e.message}` }));
		if (refCode) referral?.run();
	});

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		if (!form.reportValidity() || !price) return;
		if (refCode.trim() && refChecked !== refCode.trim()) {
			notice = { kind: 'warning', text: 'Anda telah mengubah kode referral. Silakan klik "Cek" terlebih dahulu untuk memvalidasi.' };
			return;
		}

		const f = new FormData(form);
		const field = (k: string) => String(f.get(k) ?? '').trim();
		const [nama, email, nomor, domisili] = ['nama_peserta', 'email_peserta', 'nomor_peserta', 'domisili'].map(field);
		if (!nama || !email || !nomor || !domisili) {
			notice = { kind: 'error', text: 'Harap isi semua field yang wajib!' };
			return;
		}
		const referralCode = refValid ? refCode.trim() : '';

		submitting = true;
		notice = null;
		try {
			const log = await fetchJson<{ success?: boolean; id?: number; insertId?: number }>(`${WEBINAR_API}/log-webinar`, {
				method: 'POST',
				body: JSON.stringify({
					webinar_type: webinarType,
					webinar_title: webinarTitle,
					webinar_date: webinarDate,
					webinar_time: webinarTime,
					referral_code: refCode.trim(),
					is_referral_valid: refValid,
					user_agent: navigator.userAgent,
					nama_peserta: nama,
					email_peserta: email,
					nomor_peserta: nomor,
					domisili,
					instansi: field('instansi'),
					pertanyaan: field('pertanyaan'),
					harga: total,
					harga_asli: price,
					diskon_amount: price - total,
					timestamp: new Date().toISOString()
				})
			});
			if (log.success === false) throw new Error('Gagal menyimpan data pendaftaran.');

			if (referralCode) {
				// Usage counting must not block the registration.
				fetchJson(`${WEBINAR_API}/referal/use/${encodeURIComponent(referralCode)}`, { method: 'PUT' }).catch(() => {});
			}

			const trx = await fetchJson<{ success?: boolean; token?: string; order_id?: string; message?: string }>(
				`${WEBINAR_API}/midtrans/create-transaction`,
				{
					method: 'POST',
					body: JSON.stringify({
						nama,
						email,
						nomor,
						domisili,
						amount: total,
						item_name: webinarTitle,
						referral_code: refCode.trim(),
						customer_email: email,
						log_id: log.id ?? log.insertId
					})
				}
			);
			if (!trx.success || !trx.token) throw new Error(`Gagal membuat transaksi pembayaran: ${trx.message ?? 'Unknown error'}`);

			submitting = false;
			const outcome = await payWithSnap(trx.token);
			notice = {
				success: { kind: 'success', text: 'Pendaftaran berhasil! Link webinar akan dikirim ke email Anda.' },
				pending: { kind: 'warning', text: 'Pembayaran pending. Silakan selesaikan pembayaran Anda.' },
				error: { kind: 'error', text: 'Terjadi kesalahan saat memproses pembayaran.' },
				close: { kind: 'warning', text: 'Pembayaran dibatalkan atau ditutup.' }
			}[outcome] as { kind: NoticeKind; text: string };
			if (outcome === 'success') {
				const params = new URLSearchParams({ type: 'webinar', ...(trx.order_id ? { order_id: trx.order_id } : {}) });
				setTimeout(() => goto(`/payment-success?${params}`), REDIRECT_MS);
			}
		} catch (err) {
			notice = { kind: 'error', text: ` ${(err as Error).message}` };
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Pendaftaran Webinar | Khwarizmi</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen bg-bg text-fg">
	<main class="shell flex min-h-screen items-center justify-center py-10">
		{#if !price}
			<div class="max-w-md rounded-xl border border-line bg-surface p-8 text-center">
				<span class="icon-[lucide--circle-x] mx-auto mb-4 block size-8 text-signal"></span>
				<h1 class="font-display text-xl font-semibold">Parameter webinar tidak valid</h1>
				<p class="mt-2 text-muted">Silakan kembali dan pilih kelas yang ingin diikuti.</p>
				<div class="mt-6 flex justify-center gap-3">
					<button class="btn btn-outline" onclick={() => history.back()}>Kembali</button>
					<a href="/pelatihan" class="btn btn-signal">Lihat pelatihan</a>
				</div>
			</div>
		{:else}
			<div class="w-full max-w-xl">
				<a href="/pelatihan" class="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
					<span class="icon-[lucide--arrow-left] size-4"></span>Kembali ke pelatihan
				</a>

				<div class="rounded-xl border border-line bg-surface p-7 lg:p-9">
					<h1 class="font-display text-2xl font-semibold">Form pendaftaran</h1>

					<section class="mt-6 rounded-lg bg-surface-2 p-5">
						<h2 class="label">Detail kelas</h2>
						<dl class="mt-4 space-y-2.5 text-sm">
							<div class="flex justify-between gap-4"><dt class="text-muted">Kategori</dt><dd class="text-right font-medium">{webinarType}</dd></div>
							<div class="flex justify-between gap-4"><dt class="text-muted">Tema</dt><dd class="text-right font-medium">{webinarTitle}</dd></div>
							<div class="flex justify-between gap-4"><dt class="text-muted">Tanggal</dt><dd>{webinarDate}</dd></div>
							<div class="flex justify-between gap-4"><dt class="text-muted">Waktu</dt><dd>{webinarTime}</dd></div>
							<div class="flex justify-between gap-4"><dt class="text-muted">Harga</dt><dd>Rp {rp(price)}</dd></div>
							<div class="flex justify-between gap-4"><dt class="text-muted">Kode referral</dt><dd>{refChecked || '—'}</dd></div>
						</dl>

						{#if refValid}
							<p class="mt-4 flex items-center gap-2 text-sm text-emerald-700">
								<span class="icon-[lucide--badge-percent] size-4"></span>Diskon 10% dari kode referral diterapkan.
							</p>
						{:else if refState === 'invalid'}
							<p class="mt-4 flex items-center gap-2 text-sm text-red-700">
								<span class="icon-[lucide--circle-x] size-4"></span>Kode referral tidak valid atau tidak ditemukan.
							</p>
						{/if}

						<div class="rule mt-4 flex items-baseline justify-between gap-4 pt-4">
							<span class="text-sm text-muted">Total bayar</span>
							<span class="font-display text-2xl font-semibold {refValid ? 'text-emerald-700' : ''}">Rp {rp(total)}</span>
						</div>
					</section>

					<form class="mt-7 space-y-5" onsubmit={submit}>
						<div>
							<ReferralInput
								bind:this={referral}
								bind:code={refCode}
								bind:checkedCode={refChecked}
								bind:state={refState}
								bind:message={refMessage}
								check={checkReferral}
								placeholder="Kode referral untuk diskon 10%"
							/>
							{#if refMessage}
								<Notice kind={refState === 'valid' ? 'success' : refState === 'invalid' ? 'error' : 'warning'} text={refMessage} />
							{/if}
						</div>

						<div class="grid gap-5 sm:grid-cols-2">
							<label class="block">
								<span class="mb-2 block text-sm font-semibold">Nama lengkap *</span>
								<input name="nama_peserta" required maxlength="100" placeholder="Nama lengkap" autocomplete="name" class="input-field" />
							</label>
							<label class="block">
								<span class="mb-2 block text-sm font-semibold">Email *</span>
								<input name="email_peserta" type="email" required maxlength="100" placeholder="nama@email.com" autocomplete="email" class="input-field" />
							</label>
							<label class="block">
								<span class="mb-2 block text-sm font-semibold">Nomor HP/WhatsApp *</span>
								<input
									name="nomor_peserta"
									type="tel"
									required
									pattern={'[0-9+\\-\\s]{10,15}'}
									title="10-15 karakter: angka, +, -, dan spasi"
									placeholder="08123456789"
									autocomplete="tel"
									class="input-field"
								/>
							</label>
							<label class="block">
								<span class="mb-2 block text-sm font-semibold">Domisili *</span>
								<input name="domisili" required maxlength="100" placeholder="Kota/kabupaten" autocomplete="address-level2" class="input-field" />
							</label>
						</div>

						<label class="block">
							<span class="mb-2 block text-sm font-semibold">Instansi (opsional)</span>
							<input name="instansi" maxlength="150" placeholder="Nama sekolah atau lembaga" autocomplete="organization" class="input-field" />
						</label>

						<label class="block">
							<span class="mb-2 block text-sm font-semibold">Pertanyaan untuk pembicara (opsional)</span>
							<textarea name="pertanyaan" rows="3" maxlength="1000" placeholder="Tulis pertanyaan Anda" class="input-field resize-none"></textarea>
						</label>

						<div class="rounded-lg bg-surface-2 p-5">
							<h3 class="flex items-center gap-2 text-sm font-semibold">
								<span class="icon-[lucide--credit-card] size-4 text-signal"></span>Metode pembayaran
							</h3>
							<p class="mt-2 text-sm text-muted">Setelah menekan daftar, Anda dapat memilih:</p>
							<ul class="mt-3 grid gap-1.5 text-sm text-muted sm:grid-cols-2">
								{#each ['Kartu kredit/debit', 'Transfer bank (BNI, BRI, Mandiri)', 'E-wallet (GoPay, OVO, Dana)', 'QRIS & virtual account'] as method (method)}
									<li class="flex items-center gap-2">
										<span class="icon-[lucide--check] size-3.5 shrink-0 text-signal"></span>{method}
									</li>
								{/each}
							</ul>
						</div>

						<button type="submit" disabled={submitting} class="btn btn-signal w-full disabled:opacity-60">
							{#if submitting}
								<span class="icon-[lucide--loader-circle] size-4 animate-spin"></span>Memproses...
							{:else}
								Daftar sekarang<span class="icon-[lucide--arrow-right] size-4"></span>
							{/if}
						</button>
					</form>

					{#if notice}
						<Notice kind={notice.kind} text={notice.text} />
					{/if}
				</div>

				<div class="mt-5 space-y-1 text-center text-xs text-muted">
					<p>Dengan mendaftar, Anda menyetujui syarat dan ketentuan yang berlaku.</p>
					<p>Link webinar dikirim via email setelah pembayaran berhasil.</p>
				</div>
			</div>
		{/if}
	</main>
</div>
