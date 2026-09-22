<script lang="ts">
	import AdminShell from '$lib/admin/AdminShell.svelte';
	import BarChart from '$lib/admin/BarChart.svelte';
	import StatCard from '$lib/admin/StatCard.svelte';
	import { countByStatus } from '$lib/admin/stats';
	import { api, errorText, formatDate, rupiah, statusClass, toast, type Paged, type PurchaseLog } from '$lib/admin/session.svelte';

	const RECENT = 3;
	const sections = [
		{ id: 'dashboard', label: 'Dashboard', icon: 'icon-[fa6-solid--gauge-high]' },
		{ id: 'my-referral', label: 'Kode Referral Saya', icon: 'icon-[fa6-solid--link]' },
		{ id: 'purchases', label: 'Log Pembelian', icon: 'icon-[fa6-solid--cart-shopping]' }
	];
	let active = $state('dashboard');

	let code = $state('-');
	let usage = $state(0);
	let logs = $state<PurchaseLog[]>([]);
	let total = $state(0);

	const byStatus = $derived(countByStatus(logs));

	async function loadAll() {
		try {
			const [mine, purchases] = await Promise.all([
				api<{ referral_code: string; usage_count: number }>('/referral'),
				api<Paged<PurchaseLog>>('/referral/logs')
			]);
			code = mine.referral_code ?? '-';
			usage = mine.usage_count ?? 0;
			logs = purchases.data ?? [];
			total = purchases.total ?? logs.length;
		} catch (e) {
			toast(errorText(e, 'Gagal memuat data'), 'error');
		}
	}

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(code);
			toast('Kode referral berhasil disalin', 'success');
		} catch {
			toast('Gagal menyalin', 'error');
		}
	}
</script>

{#snippet th(label: string)}
	<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">{label}</th>
{/snippet}
{#snippet badge(status: string)}
	<span class="inline-flex rounded-full px-2 text-xs leading-5 font-semibold {statusClass(status)}">{status}</span>
{/snippet}
{#snippet empty(cols: number, text: string)}
	<tr><td colspan={cols} class="px-6 py-4 text-center text-sm text-gray-500">{text}</td></tr>
{/snippet}

<svelte:head><title>Admin Panel</title></svelte:head>

<AdminShell role="admin" title="Admin Panel" {sections} bind:active onready={loadAll}>
	{#if active === 'dashboard'}
		<h2 class="mb-6 text-2xl font-bold">Dashboard Admin</h2>
		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			<StatCard label="Kode Referral Saya" value={code} icon="icon-[fa6-solid--link]" tone="bg-green-100 text-green-600" />
			<StatCard label="Total Pembelian" value={total} icon="icon-[fa6-solid--cart-shopping]" tone="bg-purple-100 text-purple-600" />
			<StatCard label="Penggunaan Kode" value={usage} icon="icon-[fa6-solid--chart-line]" tone="bg-blue-100 text-blue-600" />
		</div>
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<section class="rounded-lg bg-white p-6 shadow">
				<h3 class="mb-4 text-lg font-bold">Pembelian Terbaru</h3>
				<ul class="space-y-4">
					{#each logs.slice(0, RECENT) as p}
						<li class="flex items-center justify-between gap-3 border-b pb-3">
							<div class="flex items-center gap-3">
								<span class="rounded-full bg-green-100 p-2 text-green-600"><span class="icon-[fa6-solid--cart-shopping] block"></span></span>
								<div>
									<p class="font-semibold">{p.book_title}</p>
									<p class="text-sm text-gray-500">{p.buyer_name} • {rupiah(p.final_price)}</p>
								</div>
							</div>
							{@render badge(p.payment_status)}
						</li>
					{:else}
						<li class="text-center text-gray-500">Tidak ada data pembelian</li>
					{/each}
				</ul>
			</section>
			<section class="rounded-lg bg-white p-6 shadow">
				<h3 class="mb-4 text-lg font-bold">Statistik Penggunaan</h3>
				<BarChart
					rows={[
						{ label: 'Berhasil', value: byStatus.success, color: 'bg-emerald-500' },
						{ label: 'Pending', value: byStatus.pending, color: 'bg-amber-400' },
						{ label: 'Gagal', value: byStatus.failed, color: 'bg-rose-500' }
					]}
				/>
			</section>
		</div>
	{:else if active === 'my-referral'}
		<h2 class="mb-6 text-2xl font-bold">Kode Referral Saya</h2>
		<div class="mb-8 rounded-lg bg-white p-6 shadow">
			<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<p class="text-xl font-bold">{code}</p>
					<p class="text-gray-600">Kode referral Anda</p>
				</div>
				<button class="flex items-center gap-2 self-start rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700" onclick={copyCode}>
					<span class="icon-[fa6-regular--copy]"></span>Salin Kode
				</button>
			</div>
			<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
				<div class="rounded-lg bg-blue-50 p-4">
					<p class="font-semibold text-blue-800">Jumlah Penggunaan</p>
					<p class="text-2xl font-bold text-blue-900">{usage}</p>
				</div>
				<div class="rounded-lg bg-green-50 p-4">
					<p class="font-semibold text-green-800">Pembelian Berhasil</p>
					<p class="text-2xl font-bold text-green-900">{byStatus.success}</p>
				</div>
			</div>
		</div>

		<h3 class="mb-4 text-xl font-bold">Penggunaan Kode Saya</h3>
		<div class="overflow-x-auto rounded-lg bg-white shadow">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50"><tr>{@render th('Tanggal')}{@render th('Pembeli')}{@render th('Judul Buku')}{@render th('Harga')}{@render th('Status')}</tr></thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each logs as l}
						<tr class="whitespace-nowrap text-sm text-gray-900">
							<td class="px-6 py-4">{formatDate(l.created_at)}</td>
							<td class="px-6 py-4">{l.buyer_name}</td>
							<td class="px-6 py-4">{l.book_title}</td>
							<td class="px-6 py-4">{rupiah(l.final_price)}</td>
							<td class="px-6 py-4">{@render badge(l.payment_status)}</td>
						</tr>
					{:else}
						{@render empty(5, 'Tidak ada data penggunaan referral')}
					{/each}
				</tbody>
			</table>
		</div>
	{:else if active === 'purchases'}
		<h2 class="mb-6 text-2xl font-bold">Log Pembelian Saya</h2>
		<div class="overflow-x-auto rounded-lg bg-white shadow">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>{@render th('ID Pesanan')}{@render th('Judul Buku')}{@render th('Nama Pembeli')}{@render th('Harga Akhir')}{@render th('Status Pembayaran')}{@render th('Tanggal')}</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each logs as l}
						<tr class="whitespace-nowrap text-sm text-gray-900">
							<td class="px-6 py-4">{l.order_id}</td>
							<td class="px-6 py-4">{l.book_title}</td>
							<td class="px-6 py-4">{l.buyer_name}</td>
							<td class="px-6 py-4">{rupiah(l.final_price)}</td>
							<td class="px-6 py-4">{@render badge(l.payment_status)}</td>
							<td class="px-6 py-4">{formatDate(l.created_at, true)}</td>
						</tr>
					{:else}
						{@render empty(6, 'Tidak ada data pembelian')}
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</AdminShell>
