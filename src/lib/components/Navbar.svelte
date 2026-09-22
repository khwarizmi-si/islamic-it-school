<script lang="ts">
	import { page } from '$app/state';
	import { NAV, waLink } from '$lib/site';

	let open = $state(false);
	const isActive = (href: string) => page.url.pathname === href;

	$effect(() => {
		page.url.pathname; // close the mobile menu on every navigation
		open = false;
	});
</script>

<svelte:window
	onclick={(e) => {
		if (open && !(e.target as Element).closest('header')) open = false;
	}}
	onkeydown={(e) => e.key === 'Escape' && (open = false)}
/>

<header class="glass sticky top-0 z-50 bg-white/95 py-3">
	<div class="mx-auto max-w-7xl px-4 md:px-6">
		<nav class="flex items-center justify-between" aria-label="Navigasi utama">
			<a href="/" aria-label="Beranda Islamic IT School">
				<img
					class="size-[70px] object-contain"
					src="/img/Logo-Sekolah-Impian.png"
					alt="Sekolah Impian"
					width="70"
					height="70"
				/>
			</a>

			<ul class="hidden items-center gap-8 md:flex">
				{#each NAV as item (item.href)}
					<li>
						<a
							href={item.href}
							target={item.external ? '_blank' : undefined}
							rel={item.external ? 'noopener' : undefined}
							aria-current={isActive(item.href) ? 'page' : undefined}
							class={[
								'transition-colors duration-200',
								isActive(item.href)
									? 'font-semibold text-orange-500'
									: 'font-medium text-gray-600 hover:text-gray-900'
							]}>{item.label}</a
						>
					</li>
				{/each}
			</ul>

			<a
				href={waLink()}
				class="hidden rounded-xl bg-linear-to-r from-orange-500 to-teal-600 px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:brightness-110 md:block"
			>
				Kontak
			</a>

			<button
				class="p-2 text-gray-700 transition-colors hover:text-orange-500 md:hidden"
				aria-label="Buka menu"
				aria-expanded={open}
				aria-controls="mobile-menu"
				onclick={() => (open = !open)}
			>
				<span class={['size-7', open ? 'icon-[bx--x]' : 'icon-[bx--menu]']}></span>
			</button>
		</nav>

		{#if open}
			<div
				id="mobile-menu"
				class="mt-4 space-y-1 rounded-lg border border-white/20 bg-white/90 px-2 pt-2 pb-3 shadow-lg backdrop-blur-lg md:hidden"
			>
				{#each NAV as item (item.href)}
					<a
						href={item.href}
						target={item.external ? '_blank' : undefined}
						rel={item.external ? 'noopener' : undefined}
						aria-current={isActive(item.href) ? 'page' : undefined}
						class={[
							'block rounded-md px-3 py-2 transition-all hover:bg-orange-50 hover:text-orange-500',
							isActive(item.href)
								? 'bg-orange-50 font-semibold text-orange-500'
								: 'font-medium text-gray-600'
						]}>{item.label}</a
					>
				{/each}
				<div class="mt-4 border-t border-gray-200 pt-4">
					<a
						href={waLink()}
						class="flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-teal-600 px-5 py-2.5 font-semibold text-white transition-all hover:from-orange-600 hover:to-teal-700"
					>
						<span class="icon-[bxl--whatsapp] size-5"></span>Kontak
					</a>
				</div>
			</div>
		{/if}
	</div>
</header>
