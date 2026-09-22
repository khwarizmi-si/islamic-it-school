<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<div class="overflow-x-clip">
	<Navbar />
	{@render children()}
</div>
