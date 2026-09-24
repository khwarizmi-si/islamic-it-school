<script lang="ts">
	import './layout.css';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { syncReferral } from '$lib/referral.svelte';
	import { themeFor } from '$lib/theme';

	let { children } = $props();

	// Keep <html> on the right surface across client-side navigation (SSR sets it in hooks.server.ts).
	$effect(() => {
		document.documentElement.classList.remove('theme-night', 'theme-paper');
		document.documentElement.classList.add(themeFor(page.url.pathname));
	});

	// Cross-document-style morph: elements sharing a view-transition-name (the book covers)
	// animate from their old box to the new one instead of the page simply swapping.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	afterNavigate(({ to }) => {
		if (!to) return;
		const withRef = syncReferral(to.url);
		// native API: SvelteKit's replaceState throws before the router finishes its first navigation
		if (withRef) history.replaceState(history.state, '', withRef);
	});
</script>

{@render children()}
