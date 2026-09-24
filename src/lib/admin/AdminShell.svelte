<script lang="ts">
	import type { Snippet } from 'svelte';
	import { goto } from '$app/navigation';
	import { api, homeFor, session, signOut, toasts, type Role, type User } from './session.svelte';

	let {
		role,
		title,
		sections,
		active = $bindable(),
		onready,
		children
	}: {
		role: Role;
		title: string;
		sections: { id: string; label: string; icon: string }[];
		active: string;
		/** Runs once the signed-in user is confirmed to have `role`. */
		onready: () => void;
		children: Snippet;
	} = $props();

	let sidebarOpen = $state(false);
	let ready = $state(false);

	// Guard: no token  login; wrong role  that role's dashboard.
	$effect(() => {
		if (!session.token) {
			goto('/admin');
			return;
		}
		api<User>('/user')
			.then((user) => {
				session.user = user;
				if (user.role !== role) goto(homeFor(user.role));
				else {
					ready = true;
					onready();
				}
			})
			.catch(() => {}); // a 401 already signs out inside api()
	});
</script>

<svelte:head><meta name="robots" content="noindex" /></svelte:head>

<div class="flex h-screen bg-gray-100">
	<aside
		class={[
			'fixed inset-y-0 left-0 z-40 w-64 bg-blue-900 text-white transition-transform duration-300 md:relative md:translate-x-0',
			!sidebarOpen && '-translate-x-full'
		]}
	>
		<h1 class="border-b border-blue-800 p-5 text-xl font-bold">{title}</h1>
		<nav class="mt-5">
			{#each sections as s (s.id)}
				<button
					class={['flex w-full items-center gap-3 p-4 text-left transition hover:bg-blue-800', active === s.id && 'bg-blue-800']}
					aria-current={active === s.id ? 'page' : undefined}
					onclick={() => {
						active = s.id;
						sidebarOpen = false;
					}}
				>
					<span class="{s.icon} size-5"></span>{s.label}
				</button>
			{/each}
			<button class="flex w-full items-center gap-3 p-4 text-left transition hover:bg-blue-800" onclick={signOut}>
				<span class="icon-[fa6-solid--right-from-bracket] size-5"></span>Keluar
			</button>
		</nav>
	</aside>

	{#if sidebarOpen}
		<button class="fixed inset-0 z-30 bg-black/40 md:hidden" aria-label="Tutup menu" onclick={() => (sidebarOpen = false)}></button>
	{/if}

	<div class="flex flex-1 flex-col overflow-hidden">
		<header class="flex items-center justify-between bg-white p-4 shadow">
			<button class="text-gray-500 md:hidden" aria-label="Buka menu" onclick={() => (sidebarOpen = true)}>
				<span class="icon-[fa6-solid--bars] size-6"></span>
			</button>
			<p class="ml-auto flex items-center gap-2 text-gray-700">
				<img
					src="https://ui-avatars.com/api/?name={encodeURIComponent(session.user?.name ?? title)}&background=random" alt="" class="size-10 rounded-full"
				/>
				{session.user?.name ?? ''}
			</p>
		</header>
		<main class="flex-1 overflow-y-auto p-6">
			{#if ready}
				{@render children()}
			{:else}
				<p class="flex items-center gap-2 text-gray-500"><span class="icon-[bx--loader-alt] animate-spin"></span> Memuat...</p>
			{/if}
		</main>
	</div>
</div>

<div class="fixed top-4 right-4 z-50 space-y-2" aria-live="polite">
	{#each toasts as t (t.id)}
		<p
			class={[
				'rounded px-4 py-3 text-white shadow-lg',
				t.kind === 'success' && 'bg-green-500',
				t.kind === 'error' && 'bg-red-500',
				t.kind === 'info' && 'bg-blue-500'
			]}
		>
			{t.text}
		</p>
	{/each}
</div>
