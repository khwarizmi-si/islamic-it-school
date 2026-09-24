<script lang="ts">
	const SHOW_AFTER_PX = 400;
	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

{#if scrollY > SHOW_AFTER_PX}
	<button
		class="fixed right-5 bottom-5 z-30 flex size-11 items-center justify-center rounded-full border border-line bg-bg/90 text-fg shadow-lg backdrop-blur-sm transition-colors hover:border-fg"
		aria-label="Kembali ke atas"
		onclick={() => scrollTo({ top: 0 })}
	>
		<span class="icon-[lucide--arrow-up] size-5"></span>
	</button>
{/if}
