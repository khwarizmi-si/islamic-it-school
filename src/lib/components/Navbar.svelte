<script lang="ts">
	import { page } from '$app/state';
	import { BRAND_MARK, NAV, SITE_NAME, waLink } from '$lib/site';

	let open = $state(false);
	let scrolled = $state(false);
	const isActive = (href: string) => page.url.pathname === href;

	$effect(() => {
		page.url.pathname; // close the mobile menu on every navigation
		open = false;
	});
</script>

<svelte:window
	onscroll={() => (scrolled = window.scrollY > 24)}
	onclick={(e) => {
		if (open && !(e.target as Element).closest('header')) open = false;
	}}
	onkeydown={(e) => e.key === 'Escape' && (open = false)}
/>

<header
	class={[
		'sticky top-0 z-40 transition-colors duration-300',
		scrolled ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
	]}
>
	<div class="shell flex items-center justify-between gap-6 py-3.5">
		<a href="/" class="flex items-center gap-2.5" aria-label="{SITE_NAME} — beranda">
			<img src={BRAND_MARK} alt="" width="26" height="40" class="h-9 w-auto" />
			<span class="font-display text-lg font-semibold tracking-tight">{SITE_NAME}</span>
		</a>

		<nav class="hidden items-center gap-7 text-[0.95rem] lg:flex" aria-label="Navigasi utama">
			{#each NAV as item (item.href)}
				<a
					href={item.href}
					aria-current={isActive(item.href) ? 'page' : undefined}
					class={[
						'relative py-1 transition-colors',
						isActive(item.href)
							? 'text-fg after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-signal'
							: 'text-muted hover:text-fg'
					]}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<a href={waLink()} target="_blank" rel="noopener" class="btn btn-signal hidden !px-4 !py-2.5 text-sm lg:inline-flex">
				<span class="icon-[lucide--message-circle] size-4"></span>Kontak
			</a>
			<button
				class="-mr-2 p-2 text-fg lg:hidden"
				aria-label={open ? 'Tutup menu' : 'Buka menu'}
				aria-expanded={open}
				aria-controls="mobile-menu"
				onclick={() => (open = !open)}
			>
				<span class={['size-6', open ? 'icon-[lucide--x]' : 'icon-[lucide--menu]']}></span>
			</button>
		</div>
	</div>

	{#if open}
		<div id="mobile-menu" class="border-t border-line bg-bg lg:hidden">
			<nav class="shell flex flex-col py-2" aria-label="Navigasi utama">
				{#each NAV as item (item.href)}
					<a
						href={item.href}
						aria-current={isActive(item.href) ? 'page' : undefined}
						class={[
							'flex items-center justify-between border-b border-line py-3.5 text-base last:border-0',
							isActive(item.href) ? 'text-signal' : 'text-fg'
						]}
					>
						{item.label}
						<span class="icon-[lucide--arrow-right] size-4 text-muted"></span>
					</a>
				{/each}
				<a href={waLink()} target="_blank" rel="noopener" class="btn btn-signal my-4">
					<span class="icon-[lucide--message-circle] size-4"></span>Hubungi kami
				</a>
			</nav>
		</div>
	{/if}
</header>
