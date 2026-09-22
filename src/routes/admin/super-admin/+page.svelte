<script lang="ts">
	import AdminShell from '$lib/admin/AdminShell.svelte';
	import BarChart from '$lib/admin/BarChart.svelte';
	import StatCard from '$lib/admin/StatCard.svelte';
	import { countByStatus, referralsPerMonth } from '$lib/admin/stats';
	import {
		api,
		errorText,
		formatDate,
		rupiah,
		statusClass,
		toast,
		type Admin,
		type Paged,
		type PurchaseLog
	} from '$lib/admin/session.svelte';

	const CHART_MONTHS = 6;
	const RECENT = 5;
	const sections = [
		{ id: 'dashboard', label: 'Dashboard', icon: 'icon-[fa6-solid--gauge-high]' },
		{ id: 'admins', label: 'Kelola Admin', icon: 'icon-[fa6-solid--users-gear]' },
		{ id: 'referrals', label: 'Kelola Referral', icon: 'icon-[fa6-solid--link]' },
		{ id: 'purchases', label: 'Log Pembelian', icon: 'icon-[fa6-solid--cart-shopping]' }
	];
	let active = $state('dashboard');

	let admins = $state<Admin[]>([]);
	let logs = $state<PurchaseLog[]>([]);
	let totalPurchases = $state(0);

	const withCode = $derived(admins.filter((a) => a.referral_code));
	const withoutCode = $derived(admins.filter((a) => !a.referral_code));
	const referralShare = $derived(logs.length ? Math.round((logs.filter((l) => l.referral_code).length / logs.length) * 100) : 0);
	const monthly = $derived(referralsPerMonth(logs, CHART_MONTHS).map((m) => ({ ...m, color: 'bg-blue-500' })));
	const byStatus = $derived(countByStatus(logs));

	async function loadAdmins() {
		admins = (await api<Paged<Admin>>('/admin/list')).data ?? [];
	}
	async function loadLogs() {
		const res = await api<Paged<PurchaseLog>>('/admin/purchase-logs');
		logs = res.data ?? [];
		totalPurchases = res.total ?? logs.length;
	}

	const loadAll = () => Promise.all([loadAdmins(), loadLogs()]).catch((e) => toast(errorText(e, 'Gagal memuat data'), 'error'));

	/** Confirm, run, toast, reload. */
	async function act(question: string | null, run: () => Promise<unknown>, done: string, reload: () => Promise<void>) {
		if (question && !confirm(question)) return;
		try {
			await run();
			toast(done, 'success');
			await reload();
		} catch (e) {
			toast(errorText(e, 'Terjadi kesalahan'), 'error');
		}
	}

	const deleteAdmin = (a: Admin) =>
		act('Apakah Anda yakin ingin menghapus admin ini?', () => api(`/admin/${a.id}`, { method: 'DELETE' }), 'Admin berhasil dihapus', loadAdmins);

	function toggleReferral(a: Admin) {
		const code = a.referral_code!;
		const next = !(code.is_active ?? true);
		const verb = next ? 'mengaktifkan' : 'menonaktifkan';
		return act(
			`Apakah Anda yakin ingin ${verb} referral ini?`,
			() => api(`/admin/referrals/${code.id}/status`, { method: 'PATCH', body: JSON.stringify({ is_active: next }) }),
			`Status referral berhasil ${next ? 'diaktifkan' : 'dinonaktifkan'}`,
			loadAdmins
		);
	}

	const deleteReferral = (a: Admin) =>
		act(
			'Apakah Anda yakin ingin menghapus referral ini?',
			() => api(`/admin/referrals/${a.referral_code!.id}`, { method: 'DELETE' }),
			'Referral berhasil dihapus',
			loadAdmins
		);

	const setPaymentStatus = (orderId: string, status: string) =>
		act(
			null,
			() => api(`/referral/purchase-logs/${encodeURIComponent(orderId)}`, { method: 'PATCH', body: JSON.stringify({ payment_status: status }) }),
			'Status pembayaran berhasil diperbarui',
			loadLogs
		);

	async function copy(code: string) {
		try {
			await navigator.clipboard.writeText(code);
			toast(`Kode referral berhasil disalin: ${code}`, 'success');
		} catch {
			toast('Gagal menyalin', 'error');
		}
	}

	// Modals
	let adminDialog = $state<HTMLDialogElement>();
	let referralDialog = $state<HTMLDialogElement>();
	let saving = $state(false);

	async function submitModal(e: SubmitEvent, dialog: HTMLDialogElement | undefined, run: (f: FormData) => Promise<unknown>, done: string) {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		saving = true;
		try {
			await run(new FormData(form));
			toast(done, 'success');
			form.reset();
			dialog?.close();
			await loadAdmins();
		} catch (err) {
			toast(errorText(err, 'Gagal menyimpan'), 'error');
		} finally {
			saving = false;
		}
	}

	const createAdmin = (e: SubmitEvent) =>
		submitModal(
			e,
			adminDialog,
			(f) => {
				if (f.get('password') !== f.get('password_confirmation')) throw new Error('Konfirmasi password tidak sesuai');
				return api('/admin/create', {
					method: 'POST',
					body: JSON.stringify({
						name: f.get('name'),
						email: f.get('email'),
						password: f.get('password'),
						password_confirmation: f.get('password_confirmation')
					})
				});
			},
			'Admin berhasil dibuat'
		);

	const createReferral = (e: SubmitEvent) =>
		submitModal(
			e,
			referralDialog,
			(f) =>
				api('/admin/referrals', {
					method: 'POST',
					body: JSON.stringify({ user_id: f.get('user_id'), code: String(f.get('code') ?? '').trim() || undefined })
				}),
			'Kode referral berhasil dibuat'
		);
</script>

{#snippet th(label: string)}
	<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">{label}</th>
{/snippet}
{#snippet person(name: string, email: string)}
	<div class="flex items-center gap-4">
		<img class="size-10 rounded-full" src="https://ui-avatars.com/api/?name={encodeURIComponent(name)}&background=random" alt="" loading="lazy" />
		<div>
			<p class="text-sm font-medium text-gray-900">{name}</p>
			<p class="text-sm text-gray-500">{email}</p>
		</div>
	</div>
{/snippet}
{#snippet badge(text: string | number, cls: string)}
	<span class="inline-flex rounded-full px-2 text-xs leading-5 font-semibold {cls}">{text}</span>
{/snippet}
{#snippet empty(cols: number, text: string)}
	<tr><td colspan={cols} class="px-6 py-4 text-center text-sm text-gray-500">{text}</td></tr>
{/snippet}

<svelte:head><title>Super Admin Panel</title></svelte:head>

<AdminShell role="super_admin" title="Super Admin Panel" {sections} bind:active onready={loadAll}>
	{#if active === 'dashboard'}
		<h2 class="mb-6 text-2xl font-bold">Dashboard Super Admin</h2>
		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			<StatCard label="Total Admin" value={admins.length} icon="icon-[fa6-solid--users]" tone="bg-blue-100 text-blue-600" />
			<StatCard label="Total Kode Referral" value={withCode.length} icon="icon-[fa6-solid--link]" tone="bg-green-100 text-green-600" />
			<StatCard label="Total Pembelian" value={totalPurchases} icon="icon-[fa6-solid--cart-shopping]" tone="bg-purple-100 text-purple-600" />
			<StatCard label="Pakai Referral" value="{referralShare}%" icon="icon-[fa6-solid--chart-line]" tone="bg-yellow-100 text-yellow-600" />
		</div>
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<section class="rounded-lg bg-white p-6 shadow">
				<h3 class="mb-4 text-lg font-bold">Pembelian Terbaru</h3>
				<ul class="space-y-4">
					{#each logs.slice(0, RECENT) as l}
						<li class="flex items-center justify-between gap-3 border-b pb-3">
							<div class="min-w-0">
								<p class="truncate font-semibold">{l.book_title}</p>
								<p class="text-sm text-gray-500">{l.buyer_name} • {rupiah(l.final_price)} • {formatDate(l.created_at)}</p>
							</div>
							{@render badge(l.payment_status, statusClass(l.payment_status))}
						</li>
					{:else}
						<li class="text-center text-gray-500">Tidak ada data pembelian</li>
					{/each}
				</ul>
			</section>
			<section class="space-y-6 rounded-lg bg-white p-6 shadow">
				<div>
					<h3 class="mb-4 text-lg font-bold">Pembelian dengan Referral / Bulan</h3>
					<BarChart rows={monthly} />
				</div>
				<div>
					<h3 class="mb-4 text-lg font-bold">Status Pembayaran</h3>
					<BarChart
						rows={[
							{ label: 'Berhasil', value: byStatus.success, color: 'bg-emerald-500' },
							{ label: 'Pending', value: byStatus.pending, color: 'bg-amber-400' },
							{ label: 'Gagal', value: byStatus.failed, color: 'bg-rose-500' }
						]}
					/>
				</div>
			</section>
		</div>
	{:else if active === 'admins'}
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-2xl font-bold">Kelola Admin</h2>
			<button class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700" onclick={() => adminDialog?.showModal()}>
				<span class="icon-[fa6-solid--plus]"></span>Tambah Admin
			</button>
		</div>
		<div class="overflow-x-auto rounded-lg bg-white shadow">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50"><tr>{@render th('Nama')}{@render th('Email')}{@render th('Kode Referral')}{@render th('Penggunaan')}{@render th('Aksi')}</tr></thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each admins as a (a.id)}
						<tr class="whitespace-nowrap">
							<td class="px-6 py-4">{@render person(a.name, a.email)}</td>
							<td class="px-6 py-4 text-sm text-gray-900">{a.email}</td>
							<td class="px-6 py-4 text-sm text-gray-900">{a.referral_code?.code ?? '-'}</td>
							<td class="px-6 py-4">{@render badge(a.referral_code?.usage_count ?? 0, 'bg-green-100 text-green-800')}</td>
							<td class="px-6 py-4 text-sm"><button class="text-red-600 hover:text-red-900" onclick={() => deleteAdmin(a)}>Hapus</button></td>
						</tr>
					{:else}
						{@render empty(5, 'Tidak ada data admin')}
					{/each}
				</tbody>
			</table>
		</div>
	{:else if active === 'referrals'}
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-2xl font-bold">Kelola Kode Referral</h2>
			<button class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700" onclick={() => referralDialog?.showModal()}>
				<span class="icon-[fa6-solid--plus]"></span>Buat Kode Baru
			</button>
		</div>
		<div class="mb-8 overflow-x-auto rounded-lg bg-white shadow">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50"><tr>{@render th('Pemilik')}{@render th('Kode Referral')}{@render th('Jumlah Penggunaan')}{@render th('Status')}{@render th('Aksi')}</tr></thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each admins as a (a.id)}
						{@const code = a.referral_code}
						{@const isActive = code?.is_active ?? true}
						<tr class="whitespace-nowrap">
							<td class="px-6 py-4">{@render person(a.name, a.email)}</td>
							<td class="px-6 py-4">
								<p class="text-sm font-medium text-gray-900">{code?.code ?? '-'}</p>
								{#if code}
									<button class="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800" onclick={() => copy(code.code)}>
										<span class="icon-[fa6-regular--copy]"></span>Salin
									</button>
								{/if}
							</td>
							<td class="px-6 py-4">{@render badge(code?.usage_count ?? 0, 'bg-blue-100 text-blue-800')}</td>
							<td class="px-6 py-4">
								{#if code}{@render badge(isActive ? 'Aktif' : 'Nonaktif', isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700')}{:else}-{/if}
							</td>
							<td class="px-6 py-4 text-sm font-medium">
								{#if code}
									<button class="mr-2 text-indigo-600 hover:text-indigo-900" onclick={() => toggleReferral(a)}>{isActive ? 'Nonaktifkan' : 'Aktifkan'}</button>
									<button class="text-red-600 hover:text-red-900" onclick={() => deleteReferral(a)}>Hapus</button>
								{:else}-{/if}
							</td>
						</tr>
					{:else}
						{@render empty(5, 'Tidak ada data referral')}
					{/each}
				</tbody>
			</table>
		</div>

		<h3 class="mb-4 text-xl font-bold">Log Referral</h3>
		<div class="overflow-x-auto rounded-lg bg-white shadow">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50"><tr>{@render th('Kode')}{@render th('Pengguna')}{@render th('Tanggal')}{@render th('Status')}</tr></thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each logs.filter((l) => l.referral_code) as l}
						<tr class="whitespace-nowrap text-sm text-gray-900">
							<td class="px-6 py-4">{l.referral_code?.code}</td>
							<td class="px-6 py-4">
								<p>{l.buyer_name || 'Tidak diketahui'}</p>
								<p class="text-gray-500">{l.user_email ?? ''}</p>
							</td>
							<td class="px-6 py-4">{formatDate(l.created_at)}</td>
							<td class="px-6 py-4">{@render badge(l.payment_status || 'unknown', statusClass(l.payment_status))}</td>
						</tr>
					{:else}
						{@render empty(4, 'Tidak ada data log referral')}
					{/each}
				</tbody>
			</table>
		</div>
	{:else if active === 'purchases'}
		<h2 class="mb-6 text-2xl font-bold">Log Pembelian</h2>
		<div class="overflow-x-auto rounded-lg bg-white shadow">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						{@render th('ID Pesanan')}{@render th('Judul Buku')}{@render th('Nama Pembeli')}{@render th('Email')}{@render th('Telepon')}
						{@render th('Harga Akhir')}{@render th('Status Pembayaran')}{@render th('Kode Referral')}{@render th('Aksi')}
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each logs as l}
						<tr class="whitespace-nowrap text-sm text-gray-900">
							<td class="px-6 py-4">{l.order_id}</td>
							<td class="px-6 py-4">{l.book_title}</td>
							<td class="px-6 py-4">{l.buyer_name}</td>
							<td class="px-6 py-4">{l.email || '-'}</td>
							<td class="px-6 py-4">{l.phone || '-'}</td>
							<td class="px-6 py-4">{rupiah(l.final_price)}</td>
							<td class="px-6 py-4">{@render badge(l.payment_status, statusClass(l.payment_status))}</td>
							<td class="px-6 py-4">{l.referral_code?.code ?? '-'}</td>
							<td class="space-x-2 px-6 py-4 font-medium">
								<button class="text-indigo-600 hover:text-indigo-900" onclick={() => setPaymentStatus(l.order_id, 'success')}>Success</button>
								<button class="text-yellow-600 hover:text-yellow-900" onclick={() => setPaymentStatus(l.order_id, 'pending')}>Pending</button>
								<button class="text-red-600 hover:text-red-900" onclick={() => setPaymentStatus(l.order_id, 'failed')}>Failed</button>
							</td>
						</tr>
					{:else}
						{@render empty(9, 'Tidak ada data pembelian')}
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</AdminShell>

<dialog bind:this={adminDialog} class="m-auto w-full max-w-md rounded-lg p-6 backdrop:bg-black/50" aria-labelledby="new-admin">
	<h3 id="new-admin" class="mb-4 text-xl font-bold">Buat Admin Baru</h3>
	<form onsubmit={createAdmin} class="space-y-4">
		{#each [['name', 'Nama', 'text', 'name'], ['email', 'Email', 'email', 'off'], ['password', 'Password', 'password', 'new-password'], ['password_confirmation', 'Konfirmasi Password', 'password', 'new-password']] as const as [name, label, type, autocomplete] (name)}
			<label class="block">
				<span class="mb-2 block text-gray-700">{label}</span>
				<input {name} {type} {autocomplete} required class="w-full rounded border border-gray-300 p-2" />
			</label>
		{/each}
		<div class="flex justify-end gap-2 pt-2">
			<button type="button" class="rounded bg-gray-300 px-4 py-2 text-gray-700" onclick={() => adminDialog?.close()}>Batal</button>
			<button type="submit" disabled={saving} class="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60">{saving ? 'Membuat...' : 'Buat'}</button>
		</div>
	</form>
</dialog>

<dialog bind:this={referralDialog} class="m-auto w-full max-w-md rounded-lg p-6 backdrop:bg-black/50" aria-labelledby="new-referral">
	<h3 id="new-referral" class="mb-4 text-xl font-bold">Buat Kode Referral Baru</h3>
	<form onsubmit={createReferral} class="space-y-4">
		<label class="block">
			<span class="mb-2 block text-gray-700">Pilih Admin</span>
			<select name="user_id" required class="w-full rounded border border-gray-300 p-2">
				<option value="">-- Pilih Admin --</option>
				{#each withoutCode as a (a.id)}
					<option value={a.id}>{a.name} ({a.email})</option>
				{:else}
					<option value="" disabled>Semua admin sudah memiliki kode referral</option>
				{/each}
			</select>
			<span class="mt-1 block text-sm text-gray-500">Hanya menampilkan admin yang belum memiliki kode referral</span>
		</label>
		<label class="block">
			<span class="mb-2 block text-gray-700">Kode Referral (Opsional)</span>
			<input name="code" maxlength="20" placeholder="Kosongkan untuk generate otomatis" class="w-full rounded border border-gray-300 p-2" />
			<span class="mt-1 block text-sm text-gray-500">Maksimal 20 karakter</span>
		</label>
		<div class="flex justify-end gap-2 pt-2">
			<button type="button" class="rounded bg-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-400" onclick={() => referralDialog?.close()}>Batal</button>
			<button type="submit" disabled={saving} class="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-60">{saving ? 'Membuat...' : 'Buat'}</button>
		</div>
	</form>
</dialog>
