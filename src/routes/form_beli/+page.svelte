<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Notice, { type NoticeKind } from '$lib/components/Notice.svelte';
	import ReferralInput, { type ReferralCheck, type ReferralState } from '$lib/components/ReferralInput.svelte';
	import { fetchJson } from '$lib/http';
	import { loadSnap, payWithSnap } from '$lib/midtrans';
	import { discounted, parsePrice } from '$lib/pricing';
	import { API_BASE } from '$lib/site';

	const ONGKIR = 15000;
	const DISCOUNT = 0.05;
	const REDIRECT_MS = 3000;
	const REFERRAL_TIMEOUT_MS = 10_000;
	const NO_REF = 'NO_REF';

	const bookTitle = page.url.searchParams.get('book_title')?.trim() ?? '';
	const price = parsePrice(page.url.searchParams.get('price'));
	const initialRef = page.url.searchParams.get('ref')?.trim() ?? '';

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

	const checkReferral: ReferralCheck = async (code) => {
		const r = await fetchJson<{ valid: boolean; message?: string; owner?: string }>(
			`${API_BASE}/referral/check/${encodeURIComponent(code)}`,
			{},
			REFERRAL_TIMEOUT_MS
		);
		return r.valid
			? { valid: true, message: `${r.message ?? 'Kode referral valid'}${r.owner ? ` - Owner: ${r.owner}` : ''}` }
			: { valid: false, message: `${r.message ?? 'Kode referral tidak valid.'}` };
	};

	onMount(() => {
		if (!price) return;
		loadSnap().catch((e: Error) => (notice = { kind: 'error', text: `${e.message}` }));
		if (refCode) referral?.run();
	});

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		if (!form.reportValidity() || !price) return;
		if (refCode.trim() && refChecked !== refCode.trim()) {
			notice = { kind: 'warning', text: 'Anda mengubah kode referral. Klik "Cek" dulu untuk memvalidasi.' };
			return;
		}

		const f = new FormData(form);
		const field = (k: string) => String(f.get(k) ?? '').trim();
		if (!field('buyer_name') || !field('address')) {
			notice = { kind: 'error', text: 'Harap isi semua field yang wajib dengan benar!' };
			return;
		}
		submitting = true;
		notice = null;
		try {
			const result = await fetchJson<{ order_id?: string; snap_token?: string }>(`${API_BASE}/payment/create`, {
				method: 'POST',
				body: JSON.stringify({
					book_title: bookTitle,
					buyer_name: field('buyer_name'),
					address: `${field('address')}, ${field('kode_pos')}`,
					email: field('email') || 'noemail@example.com',
					phone: field('phone'),
					original_price: price,
					referral_code: refValid ? refCode.trim() : null,
					discounted_price: total,
					ongkir: ONGKIR
				})
			});
			if (!result.snap_token) throw new Error('Token pembayaran tidak diterima dari server.');
			if (result.order_id) {
				try {
					localStorage.setItem('last_order_id', result.order_id);
				} catch {
					// the success page also accepts ?order_id=
				}
			}

			const outcome = await payWithSnap(result.snap_token);
			notice = {
				success: { kind: 'success', text: 'Pembayaran berhasil! Terima kasih atas pembelian Anda.' },
				pending: { kind: 'warning', text: 'Pembayaran pending. Silakan selesaikan pembayaran Anda.' },
				error: { kind: 'error', text: 'Terjadi kesalahan dalam proses pembayaran.' },
				close: { kind: 'warning', text: 'Jendela pembayaran ditutup. Anda dapat melanjutkan pembayaran kapan saja.' }
			}[outcome] as { kind: NoticeKind; text: string };
			if (outcome === 'success') {
				const q = result.order_id ? `?order_id=${encodeURIComponent(result.order_id)}` : '';
				setTimeout(() => goto(`/payment-success${q}`), REDIRECT_MS);
			}
		} catch (err) {
			notice = { kind: 'error', text: `${(err as Error).message}` };
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Form Pembelian Buku | Khwarizmi</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen bg-bg text-fg">
	<main class="shell flex min-h-screen items-center justify-center py-10">
		{#if !bookTitle || !price}
			<div class="max-w-md rounded-xl border border-line bg-surface p-8 text-center">
				<span class="icon-[lucide--circle-x] mx-auto mb-4 block size-8 text-signal"></span>
				<h1 class="font-display text-xl font-semibold">Parameter buku tidak valid</h1>
				<p class="mt-2 text-muted">Silakan kembali ke halaman buku dan pilih judul yang ingin dipesan.</p>
				<div class="mt-6 flex justify-center gap-3">
					<button class="btn btn-outline" onclick={() => history.back()}>Kembali</button>
					<a href="/buku" class="btn btn-signal">Lihat koleksi</a>
				</div>
			</div>
		{:else}
			<div class="w-full max-w-xl">
				<a href="/buku" class="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
					<span class="icon-[lucide--arrow-left] size-4"></span>Kembali ke koleksi
				</a>

				<div class="rounded-xl border border-line bg-surface p-7 lg:p-9">
					<h1 class="font-display text-2xl font-semibold">Form pembelian buku</h1>

					<section class="mt-6 rounded-lg bg-surface-2 p-5">
						<h2 class="label">Detail pesanan</h2>
						<dl class="mt-4 space-y-2.5 text-sm">
							<div class="flex justify-between gap-4">
								<dt class="text-muted">Judul</dt>
								<dd class="text-right font-medium">{bookTitle}</dd>
							</div>
							<div class="flex justify-between gap-4">
								<dt class="text-muted">Harga buku</dt>
								<dd>Rp {rp(price)}</dd>
							</div>
							<div class="flex justify-between gap-4">
								<dt class="text-muted">Ongkos kirim + packing</dt>
								<dd>Rp {rp(ONGKIR)}</dd>
							</div>
							<div class="flex justify-between gap-4">
								<dt class="text-muted">Kode referral</dt>
								<dd>{refChecked || '—'}</dd>
							</div>
						</dl>

						{#if refValid}
							<p class="mt-4 flex items-center gap-2 text-sm text-emerald-700">
								<span class="icon-[lucide--badge-percent] size-4"></span>Diskon 5% dari kode referral diterapkan.
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
						<p class="mt-1 text-right text-xs text-muted">Belum termasuk ongkos kirim.</p>
					</section>

					<form class="mt-7 space-y-5" onsubmit={submit}>
						<ReferralInput
							bind:this={referral}
							bind:code={refCode}
							bind:checkedCode={refChecked}
							bind:state={refState}
							bind:message={refMessage}
							check={checkReferral}
						/>
						{#if refMessage}
							<Notice kind={refState === 'valid' ? 'success' : refState === 'invalid' ? 'error' : 'warning'} text={refMessage} />
						{/if}

						<label class="block">
							<span class="mb-2 block text-sm font-semibold">Nama pembeli *</span>
							<input
								name="buyer_name"required
								maxlength="100" pattern="[A-Za-z\s.']+" title="Nama hanya boleh mengandung huruf, spasi, titik, dan apostrof" placeholder="Masukkan nama lengkap" autocomplete="name" class="input-field"
							/>
						</label>

						<label class="block">
							<span class="mb-2 block text-sm font-semibold">Alamat lengkap *</span>
							<textarea
								name="address"required
								rows="3" maxlength="500" placeholder="Jalan, RT/RW, kelurahan, kecamatan, kota" autocomplete="street-address" class="input-field resize-none"
							></textarea>
						</label>

						<div class="grid gap-5 sm:grid-cols-2">
							<label class="block">
								<span class="mb-2 block text-sm font-semibold">Kode pos *</span>
								<input
									name="kode_pos"required
									inputmode="numeric" maxlength="5" pattern={'[0-9]{5}'}
									title="Kode pos harus 5 digit angka" placeholder="12345" autocomplete="postal-code" oninput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ''))}
									class="input-field"
								/>
							</label>

							<label class="block">
								<span class="mb-2 block text-sm font-semibold">Nomor HP/WhatsApp *</span>
								<input
									name="phone" type="tel"required
									inputmode="numeric" maxlength="15" pattern={'[0-9]{10,15}'}
									title="Nomor HP harus 10-15 digit angka" placeholder="08123456789" autocomplete="tel" oninput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ''))}
									class="input-field"
								/>
							</label>
						</div>

						<label class="block">
							<span class="mb-2 block text-sm font-semibold">Email (opsional)</span>
							<input name="email" type="email" maxlength="100" placeholder="nama@email.com" autocomplete="email" class="input-field" />
						</label>

						<button type="submit" disabled={submitting} class="btn btn-signal w-full disabled:opacity-60">
							{#if submitting}
								<span class="icon-[lucide--loader-circle] size-4 animate-spin"></span>Memproses pembayaran...
							{:else}
								<span class="icon-[lucide--credit-card] size-4"></span>Bayar sekarang
							{/if}
						</button>

						{#if notice}
							<Notice kind={notice.kind} text={notice.text} />
						{/if}
					</form>
				</div>

				<p class="mt-5 flex items-center justify-center gap-2 text-xs text-muted">
					<span class="icon-[lucide--lock] size-3.5"></span>Transaksi aman melalui Midtrans
				</p>
			</div>
		{/if}
	</main>
</div>
