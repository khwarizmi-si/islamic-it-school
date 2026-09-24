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
			status = { kind: 'error', text: 'Format Order ID tidak valid' };
			return;
		}
		status = { kind: 'pending', text: 'Memperbarui status transaksi...' };
		await new Promise((r) => setTimeout(r, WEBHOOK_GRACE_MS)); // let the Midtrans webhook land first
		try {
			const current = await fetchJson<{ status?: string }>(`${API_BASE}/logs/${logId}`).catch(() => null);
			if (current?.status !== 'success') {
				await fetchJson(`${API_BASE}/logs/${logId}`, {
					method: 'PATCH',
					body: JSON.stringify({ status: 'success', order_id: id })
				});
			}
			status = { kind: 'success', text: 'Status transaksi berhasil diperbarui' };
			try {
				localStorage.removeItem(LAST_ORDER_KEY);
			} catch {
				// nothing to clean up
			}
		} catch (e) {
			status = { kind: 'error', text: ` ${(e as Error).message}` };
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
			else status = { kind: 'error', text: 'Order ID tidak ditemukan' };
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
	<title>Pembayaran Berhasil | Khwarizmi</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen bg-bg text-fg">
	<main class="shell flex min-h-screen items-center justify-center py-10">
		<div class="w-full max-w-lg rounded-xl border border-line bg-surface p-8 lg:p-10">
			<span class="flex size-14 items-center justify-center rounded-full bg-emerald-600/12 text-emerald-700">
				<span class="icon-[lucide--check] size-7"></span>
			</span>
			<h1 class="mt-6 font-display text-2xl font-semibold">Pembayaran berhasil</h1>
			<p class="mt-2 text-muted">
				{isWebinar ? 'Terima kasih telah mendaftar.' : 'Terima kasih atas pembelian Anda.'} Transaksi sudah kami terima.
			</p>

			<dl class="mt-6 space-y-2.5 rounded-lg bg-surface-2 p-5 text-sm">
				<div class="flex justify-between gap-4">
					<dt class="text-muted">Order ID</dt>
					<dd class="text-right font-medium break-all">{orderId ?? 'Tidak tersedia'}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-muted">Status</dt>
					<dd class="font-medium text-emerald-700">Berhasil</dd>
				</div>
			</dl>

			{#if status}
				<p
					class={[
						'mt-4 flex items-start gap-2.5 rounded-lg border p-3.5 text-sm',
						status.kind === 'pending' && 'border-amber-600/30 bg-amber-500/10 text-amber-800',
						status.kind === 'success' && 'border-emerald-600/30 bg-emerald-600/10 text-emerald-800',
						status.kind === 'error' && 'border-red-600/30 bg-red-600/10 text-red-800'
					]}
					role="status"
				>
					<span
						class={[
							'mt-0.5 size-4 shrink-0',
							status.kind === 'pending' && 'icon-[lucide--loader-circle] animate-spin',
							status.kind === 'success' && 'icon-[lucide--check-circle-2]',
							status.kind === 'error' && 'icon-[lucide--triangle-alert]'
						]}
					></span>
					{status.text}
				</p>
			{/if}

			<div class="mt-6">
				<h2 class="label">Langkah selanjutnya</h2>
				<ul class="mt-3 space-y-2.5">
					{#each steps as step (step)}
						<li class="flex items-start gap-2.5 text-muted">
							<span class="icon-[lucide--arrow-right] mt-1 size-4 shrink-0 text-signal"></span>{step}
						</li>
					{/each}
				</ul>
			</div>

			<div class="mt-8 flex flex-col gap-3 sm:flex-row print:hidden">
				<a href="/" class="btn btn-signal flex-1">Kembali ke beranda</a>
				<button class="btn btn-outline flex-1" onclick={() => print()}>
					<span class="icon-[lucide--printer] size-4"></span>Cetak bukti
				</button>
			</div>

			{#if countdown !== null}
				<p class="mt-4 flex items-center justify-center gap-2 text-sm text-muted print:hidden">
					Kembali ke beranda dalam {countdown} detik
					<button class="underline underline-offset-2 hover:no-underline" onclick={() => (countdown = null)}>Batalkan</button>
				</p>
			{/if}

			<p class="rule mt-8 pt-5 text-sm text-muted">
				Butuh bantuan?
				<a href={waLink('Halo, saya butuh bantuan terkait pembayaran.')} target="_blank" rel="noopener" class="text-fg underline underline-offset-2">
					Hubungi kami di WhatsApp
				</a>
			</p>
		</div>
	</main>
</div>
