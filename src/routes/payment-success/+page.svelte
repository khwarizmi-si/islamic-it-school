<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { fetchJson } from '$lib/http';
	import { API_BASE, waLink } from '$lib/site';

	const WEBHOOK_GRACE_MS = 2000;
	const REDIRECT_AFTER_S = 15;
	const LAST_ORDER_KEY = 'last_order_id';

	const isWebinar = page.url.searchParams.get('type') === 'webinar';
	let orderId = $state(page.url.searchParams.get('order_id'));
	let status = $state<{ kind: 'pending' | 'success' | 'error'; text: string } | null>(null);
	let countdown = $state<number | null>(null);

	const steps = isWebinar
		? ['Link webinar akan dikirim ke email Anda', 'Simpan bukti pembayaran ini', 'Hubungi kami jika link belum diterima']
		: ['Kami akan mengirim konfirmasi ke email Anda', 'Buku akan disiapkan untuk pengiriman', 'Estimasi pengiriman 2-3 hari kerja'];

	/**
	 * ponytail: mirrors the legacy flow — the browser marks the order paid. The API accepts that
	 * unauthenticated, so anyone can flip any order; the real fix is server-side (webhook-only updates).
	 */
	async function confirmBookOrder(id: string) {
		const logId = id.match(/ORDER-\d+-(\d+)$/)?.[1];
		if (!logId) {
			status = { kind: 'error', text: '⚠️ Format Order ID tidak valid' };
			return;
		}
		status = { kind: 'pending', text: '🔄 Memperbarui status transaksi...' };
		await new Promise((r) => setTimeout(r, WEBHOOK_GRACE_MS)); // let the Midtrans webhook land first
		try {
			const current = await fetchJson<{ status?: string }>(`${API_BASE}/logs/${logId}`).catch(() => null);
			if (current?.status !== 'success') {
				await fetchJson(`${API_BASE}/logs/${logId}`, {
					method: 'PATCH',
					body: JSON.stringify({ status: 'success', order_id: id })
				});
			}
			status = { kind: 'success', text: '✅ Status transaksi berhasil diperbarui' };
			try {
				localStorage.removeItem(LAST_ORDER_KEY);
			} catch {
				// nothing to clean up
			}
		} catch (e) {
			status = { kind: 'error', text: `⚠️ ${(e as Error).message}` };
		}
	}

	onMount(() => {
		if (!orderId) {
			try {
				orderId = localStorage.getItem(LAST_ORDER_KEY);
			} catch {
				// storage blocked
			}
		}
		if (!isWebinar) {
			if (orderId) confirmBookOrder(orderId).then(() => (countdown = REDIRECT_AFTER_S));
			else status = { kind: 'error', text: '⚠️ Order ID tidak ditemukan' };
		}
	});

	$effect(() => {
		if (countdown === null) return;
		if (countdown <= 0) {
			goto('/');
			return;
		}
		const id = setTimeout(() => countdown !== null && countdown--, 1000);
		return () => clearTimeout(id);
	});
</script>

<svelte:head>
	<title>Pembayaran Berhasil | Islamic IT School</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-linear-to-br from-green-50 to-blue-50 p-6">
	<div class="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
		<div class="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green-100">
			<span class="icon-[bx--check] size-9 text-green-600"></span>
		</div>
		<h1 class="mb-4 text-2xl font-bold text-gray-800">Pembayaran Berhasil!</h1>
		<p class="mb-6 text-gray-600">
			{isWebinar ? 'Terima kasih telah mendaftar.' : 'Terima kasih atas pembelian Anda.'} Transaksi telah berhasil diproses.
		</p>

		<dl class="mb-6 space-y-2 rounded-lg bg-gray-50 p-4 text-left text-sm text-gray-600">
			<div><dt class="inline font-bold">Order ID:</dt> <dd class="inline text-gray-800">{orderId ?? 'Tidak tersedia'}</dd></div>
			<div><dt class="inline font-bold">Status:</dt> <dd class="inline font-semibold text-green-600">Berhasil</dd></div>
		</dl>

		{#if status}
			<p
				class={[
					'mb-6 rounded-lg border p-3 text-sm',
					status.kind === 'pending' && 'border-yellow-200 bg-yellow-50 text-yellow-700',
					status.kind === 'success' && 'border-green-200 bg-green-50 text-green-700',
					status.kind === 'error' && 'border-red-200 bg-red-50 text-red-700'
				]}
				role="status"
			>
				{status.text}
			</p>
		{/if}

		<div class="mb-6 rounded-lg bg-blue-50 p-4 text-left">
			<h2 class="mb-2 font-semibold text-blue-800">Langkah Selanjutnya:</h2>
			<ul class="space-y-1 text-sm text-blue-700">
				{#each steps as step (step)}
					<li>• {step}</li>
				{/each}
			</ul>
		</div>

		<div class="space-y-3 print:hidden">
			<a href="/" class="block w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">Kembali ke Beranda</a>
			<button class="w-full rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-300" onclick={() => print()}>
				Cetak Bukti Pembayaran
			</button>
		</div>

		{#if countdown !== null}
			<p class="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700 print:hidden">
				Akan redirect ke beranda dalam {countdown} detik
				<button class="ml-2 text-blue-800 underline hover:no-underline" onclick={() => (countdown = null)}>Batalkan</button>
			</p>
		{/if}

		<p class="mt-6 border-t border-gray-200 pt-4 text-xs text-gray-500">
			Butuh bantuan? <a href={waLink('Halo, saya butuh bantuan terkait pembayaran')} class="text-blue-600 hover:underline">Hubungi Support</a>
		</p>
	</div>
</main>
