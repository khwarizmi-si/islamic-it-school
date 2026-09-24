<script lang="ts">
	import './layout.css';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { syncReferral } from '$lib/referral.svelte';
	import { themeFor } from '$lib/theme';

	let { children } = $props();

	// Keep <html> on the right surface across client-side navigation (SSR sets it in hooks.server.ts).
	$effect(() => {
		document.documentElement.classList.remove('theme-night', 'theme-paper');
		document.documentElement.classList.add(themeFor(page.url.pathname));
	});

	afterNavigate(({ to }) => {
		if (!to) return;
		const withRef = syncReferral(to.url);
		// native API: SvelteKit's replaceState throws before the router finishes its first navigation
		if (withRef) history.replaceState(history.state, '', withRef);
	});
</script>

{@render children()}
