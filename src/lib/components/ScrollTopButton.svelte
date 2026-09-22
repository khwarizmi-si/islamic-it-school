<script lang="ts">
	const SHOW_AFTER_PX = 300;
	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

{#if scrollY > SHOW_AFTER_PX}
	<button
		class="fixed right-6 bottom-6 z-50 rounded-full bg-green-600 p-3 text-white shadow-lg transition hover:bg-green-700"
		aria-label="Kembali ke atas"
		onclick={() => scrollTo({ top: 0 })}
	>
		<span class="icon-[bx--up-arrow-alt] size-7"></span>
	</button>
{/if}
