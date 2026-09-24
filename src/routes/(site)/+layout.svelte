<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	let { children } = $props();

</script>

<div class="flex min-h-screen flex-col overflow-x-clip bg-bg text-fg">
	<Navbar />
	<div class="flex-1">{@render children()}</div>
	<SiteFooter />
</div>
