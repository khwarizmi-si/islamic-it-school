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
			? { valid: true, message: '✅ Kode referral valid! Diskon 10% telah diterapkan.' }
			: { valid: false, message: '❌ Kode referral tidak valid. Silakan periksa kembali.' };
	};

	onMount(() => {
		if (!price) return;
		loadSnap().catch((e: Error) => (notice = { kind: 'error', text: `❌ ${e.message}` }));
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
				success: { kind: 'success', text: '✅ Pendaftaran berhasil! Link webinar akan dikirim ke email Anda.' },
				pending: { kind: 'warning', text: '⏳ Pembayaran pending. Silakan selesaikan pembayaran Anda.' },
				error: { kind: 'error', text: '❌ Terjadi kesalahan saat memproses pembayaran.' },
				close: { kind: 'warning', text: 'ℹ️ Pembayaran dibatalkan atau ditutup.' }
			}[outcome] as { kind: NoticeKind; text: string };
			if (outcome === 'success') {
				const params = new URLSearchParams({ type: 'webinar', ...(trx.order_id ? { order_id: trx.order_id } : {}) });
				setTimeout(() => goto(`/payment-success?${params}`), REDIRECT_MS);
			}
		} catch (err) {
			notice = { kind: 'error', text: `❌ ${(err as Error).message}` };
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Form Pendaftaran Webinar | Islamic IT School</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-gray-100 p-6">
	{#if !price}
		<div class="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
			<h1 class="mb-4 text-xl font-bold text-red-600">Error</h1>
			<p class="text-gray-600">Parameter webinar tidak valid. Silakan kembali ke halaman sebelumnya.</p>
			<button class="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700" onclick={() => history.back()}>Kembali</button>
		</div>
	{:else}
		<div class="w-full max-w-xl rounded-lg bg-white p-8 shadow-lg">
			<h1 class="mb-6 text-2xl font-bold text-gray-800">Form Pendaftaran Webinar</h1>

			<section class="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
				<h2 class="mb-2 text-lg font-semibold text-blue-800">Detail Webinar</h2>
				<p><strong>Kategori:</strong> {webinarType}</p>
				<p><strong>Tema:</strong> {webinarTitle}</p>
				<p><strong>Tanggal:</strong> {webinarDate}</p>
				<p><strong>Waktu:</strong> {webinarTime}</p>
				<p><strong>Harga:</strong> Rp {rp(price)}</p>
				<p><strong>Kode Referral:</strong> {refChecked || '-'}</p>
				{#if refValid}
					<p class="mt-2 rounded bg-green-100 p-2 text-green-700">✅ Diskon 10% dari kode referral telah diterapkan!</p>
				{:else if refState === 'invalid'}
					<p class="mt-2 rounded bg-red-100 p-2 text-red-700">❌ Kode referral tidak valid atau tidak ditemukan</p>
				{/if}
				<p class={['mt-2 text-lg font-bold', refValid ? 'text-green-600' : 'text-blue-800']}>Total Bayar: Rp {rp(total)}</p>
			</section>

			<form class="space-y-5" onsubmit={submit}>
				<div>
					<ReferralInput
						bind:this={referral}
						bind:code={refCode}
						bind:checkedCode={refChecked}
						bind:state={refState}
						bind:message={refMessage}
						check={checkReferral}
						placeholder="Masukkan kode referral untuk diskon 10%"
					/>
					<p class="mt-2 text-xs text-green-600">💡 Tip: Dapatkan diskon 10% dengan kode referral yang valid!</p>
					{#if refMessage}
						<Notice kind={refState === 'valid' ? 'success' : refState === 'invalid' ? 'error' : 'warning'} text={refMessage} />
					{/if}
				</div>

				<label class="block">
					<span class="mb-2 block text-sm font-semibold text-gray-700">Nama Lengkap *</span>
					<input name="nama_peserta" required maxlength="100" placeholder="Masukkan nama lengkap" autocomplete="name" class="input-field" />
				</label>
				<label class="block">
					<span class="mb-2 block text-sm font-semibold text-gray-700">Email *</span>
					<input name="email_peserta" type="email" required maxlength="100" placeholder="contoh@email.com" autocomplete="email" class="input-field" />
				</label>
				<label class="block">
					<span class="mb-2 block text-sm font-semibold text-gray-700">Nomor HP/WhatsApp *</span>
					<input
						name="nomor_peserta"
						type="tel"
						required
						pattern={'[0-9+\\-\\s]{10,15}'}
						title="10-15 karakter: angka, +, -, dan spasi"
						placeholder="Contoh: 08123456789"
						autocomplete="tel"
						class="input-field"
					/>
				</label>
				<label class="block">
					<span class="mb-2 block text-sm font-semibold text-gray-700">Domisili (Kota/Kabupaten) *</span>
					<input name="domisili" required maxlength="100" placeholder="Contoh: Jakarta Selatan, Bandung, Surabaya" autocomplete="address-level2" class="input-field" />
				</label>
				<label class="block">
					<span class="mb-2 block text-sm font-semibold text-gray-700">Instansi/Perusahaan (Opsional)</span>
					<input name="instansi" maxlength="150" placeholder="Nama instansi/perusahaan" autocomplete="organization" class="input-field" />
				</label>
				<label class="block">
					<span class="mb-2 block text-sm font-semibold text-gray-700">Pertanyaan (Opsional)</span>
					<textarea name="pertanyaan" rows="3" maxlength="1000" placeholder="Apakah ada pertanyaan khusus untuk pembicara?" class="input-field resize-none"></textarea>
				</label>

				<div class="rounded-lg border border-green-200 bg-green-50 p-4">
					<h3 class="mb-2 text-sm font-semibold text-green-800">💳 Metode Pembayaran</h3>
					<p class="text-sm text-green-700">Setelah klik "Daftar Sekarang", Anda akan dapat memilih metode pembayaran:</p>
					<ul class="mt-2 space-y-1 text-xs text-green-600">
						<li>• Kartu Kredit/Debit</li>
						<li>• Bank Transfer (BNI, BRI, Mandiri)</li>
						<li>• E-Wallet (GoPay, OVO, Dana)</li>
						<li>• QRIS & Virtual Account</li>
					</ul>
				</div>

				<button
					type="submit"
					disabled={submitting}
					class="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
				>
					{submitting ? 'Memproses...' : 'Daftar Sekarang'}
				</button>
			</form>

			{#if notice}
				<Notice kind={notice.kind} text={notice.text} />
			{/if}

			<div class="mt-6 space-y-1 text-center text-xs text-gray-500">
				<p>Dengan melakukan pendaftaran, Anda menyetujui syarat dan ketentuan yang berlaku.</p>
				<p>Pembayaran diproses dengan aman melalui Midtrans</p>
				<p>Link webinar akan dikirim via email setelah pembayaran berhasil</p>
			</div>
		</div>
	{/if}
</main>
