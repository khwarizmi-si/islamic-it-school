<script lang="ts">
	import './layout.css';
	import { afterNavigate } from '$app/navigation';
	import { syncReferral } from '$lib/referral.svelte';

	let { children } = $props();

	afterNavigate(({ to }) => {
		if (!to) return;
		const withRef = syncReferral(to.url);
		// native API: SvelteKit's replaceState throws before the router finishes its first navigation
		if (withRef) history.replaceState(history.state, '', withRef);
	});
</script>

{@render children()}
