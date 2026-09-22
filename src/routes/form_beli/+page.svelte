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
			? { valid: true, message: `✅ ${r.message ?? 'Kode referral valid'}${r.owner ? ` - Owner: ${r.owner}` : ''}` }
			: { valid: false, message: `❌ ${r.message ?? 'Kode referral tidak valid.'}` };
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
			notice = { kind: 'warning', text: 'Anda mengubah kode referral. Klik "Cek" dulu untuk memvalidasi.' };
			return;
		}

		const f = new FormData(form);
		const field = (k: string) => String(f.get(k) ?? '').trim();
		if (!field('buyer_name') || !field('address')) {
			notice = { kind: 'error', text: '❌ Harap isi semua field yang wajib dengan benar!' };
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
				success: { kind: 'success', text: '✅ Pembayaran berhasil! Terima kasih atas pembelian Anda.' },
				pending: { kind: 'warning', text: '⏳ Pembayaran pending. Silakan selesaikan pembayaran Anda.' },
				error: { kind: 'error', text: '❌ Terjadi kesalahan dalam proses pembayaran.' },
				close: { kind: 'warning', text: 'ℹ️ Jendela pembayaran ditutup. Anda dapat melanjutkan pembayaran kapan saja.' }
			}[outcome] as { kind: NoticeKind; text: string };
			if (outcome === 'success') {
				const q = result.order_id ? `?order_id=${encodeURIComponent(result.order_id)}` : '';
				setTimeout(() => goto(`/payment-success${q}`), REDIRECT_MS);
			}
		} catch (err) {
			notice = { kind: 'error', text: `❌ ${(err as Error).message}` };
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Form Pembelian Buku | Islamic IT School</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-gray-100 p-6">
	{#if !bookTitle || !price}
		<div class="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
			<h1 class="mb-4 text-xl font-bold text-red-600">Error</h1>
			<p class="text-gray-600">Parameter buku tidak valid. Silakan kembali ke halaman sebelumnya.</p>
			<button class="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700" onclick={() => history.back()}>
				Kembali
			</button>
		</div>
	{:else}
		<div class="w-full max-w-xl rounded-lg bg-white p-8 shadow-lg">
			<h1 class="mb-6 text-2xl font-bold text-gray-800">Form Pembelian Buku</h1>

			<section class="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
				<h2 class="mb-2 text-lg font-semibold text-blue-800">Detail Buku</h2>
				<p><strong>Judul:</strong> {bookTitle}</p>
				<p><strong>Harga Buku:</strong> Rp {rp(price)}</p>
				<p><strong>Ongkos Kirim + Packing:</strong> Rp {rp(ONGKIR)}</p>
				<p><strong>Kode Referral:</strong> {refChecked || '-'}</p>
				{#if refValid}
					<p class="mt-2 rounded bg-green-100 p-2 text-green-700">✅ Diskon 5% dari kode referral telah diterapkan!</p>
				{:else if refState === 'invalid'}
					<p class="mt-2 rounded bg-red-100 p-2 text-red-700">❌ Kode referral tidak valid atau tidak ditemukan</p>
				{/if}
				<p class={['mt-2 text-lg font-bold', refValid ? 'text-green-600' : 'text-blue-800']}>
					Total Bayar: Rp {rp(total)} <span class="text-sm font-normal">(harga belum termasuk ongkos kirim)</span>
				</p>
			</section>

			<form class="space-y-5" onsubmit={submit}>
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
					<span class="mb-2 block text-sm font-semibold text-gray-700">Nama Pembeli *</span>
					<input
						name="buyer_name"
						required
						maxlength="100"
						pattern="[A-Za-z\s.']+"
						title="Nama hanya boleh mengandung huruf, spasi, titik, dan apostrof"
						placeholder="Masukkan nama lengkap"
						autocomplete="name"
						class="input-field"
					/>
				</label>

				<label class="block">
					<span class="mb-2 block text-sm font-semibold text-gray-700">Alamat Lengkap *</span>
					<textarea
						name="address"
						required
						rows="3"
						maxlength="500"
						placeholder="Masukkan alamat lengkap (Jalan, RT/RW, Kelurahan, Kecamatan, Kota)"
						autocomplete="street-address"
						class="input-field resize-none"
					></textarea>
				</label>

				<label class="block">
					<span class="mb-2 block text-sm font-semibold text-gray-700">Kode Pos *</span>
					<input
						name="kode_pos"
						required
						inputmode="numeric"
						maxlength="5"
						pattern={'[0-9]{5}'}
						title="Kode pos harus 5 digit angka"
						placeholder="Contoh: 12345"
						autocomplete="postal-code"
						oninput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ''))}
						class="input-field"
					/>
				</label>

				<label class="block">
					<span class="mb-2 block text-sm font-semibold text-gray-700">Nomor HP/WhatsApp *</span>
					<input
						name="phone"
						type="tel"
						required
						inputmode="numeric"
						maxlength="15"
						pattern={'[0-9]{10,15}'}
						title="Nomor HP harus 10-15 digit angka"
						placeholder="08123456789"
						autocomplete="tel"
						oninput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ''))}
						class="input-field"
					/>
				</label>

				<label class="block">
					<span class="mb-2 block text-sm font-semibold text-gray-700">Email (Opsional)</span>
					<input name="email" type="email" maxlength="100" placeholder="contoh@email.com" autocomplete="email" class="input-field" />
				</label>

				<button
					type="submit"
					disabled={submitting}
					class="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if submitting}
						<span class="icon-[bx--loader-alt] size-5 animate-spin"></span> Memproses pembayaran...
					{:else}
						💳 Bayar Sekarang
					{/if}
				</button>

				{#if notice}
					<Notice kind={notice.kind} text={notice.text} />
				{/if}
			</form>

			<p class="mt-6 rounded-lg bg-gray-50 p-3 text-center text-xs text-gray-600">
				🔒 Transaksi aman menggunakan Midtrans • Data pribadi Anda terlindungi
			</p>
		</div>
	{/if}
</main>
