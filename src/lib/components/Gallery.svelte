<script lang="ts">
	let { images, alt }: { images: string[]; alt: string } = $props();

	let current = $state(0);
	let dialog = $state<HTMLDialogElement>();
	let touchX = 0;

	const SWIPE_PX = 50;
	const step = (d: number) => (current = (current + d + images.length) % images.length);
</script>

<div>
	<button
		class="mb-4 flex aspect-3/4 w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100 shadow-xl"
		aria-label="Lihat gambar layar penuh"
		onclick={() => dialog?.showModal()}
	>
		<img src={images[current]} alt="{alt} – gambar {current + 1}" class="h-full w-auto object-contain" loading="lazy" />
	</button>

	<div class="-mx-1 flex gap-3 overflow-x-auto px-1 py-2">
		{#each images as src, i (src)}
			<button
				class={[
					'size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:border-emerald-400 active:scale-95',
					i === current ? 'scale-105 border-emerald-400' : 'border-transparent'
				]}
				aria-label="Gambar {i + 1}"
				aria-pressed={i === current}
				onclick={() => (current = i)}
			>
				<img {src} alt="" class="size-full object-cover" loading="lazy" />
			</button>
		{/each}
	</div>

	<button
		class="mx-auto mt-3 flex items-center gap-1 text-sm font-medium text-emerald-600 md:hidden"
		onclick={() => dialog?.showModal()}
	>
		<span class="icon-[bx--fullscreen] size-4"></span>
		Lihat Fullscreen
	</button>
</div>

<dialog
	bind:this={dialog}
	class="m-0 size-full max-h-none max-w-none bg-black/90 p-4 backdrop:bg-black/60"
	aria-label="Galeri {alt}"
	onclick={(e) => e.target === dialog && dialog.close()}
	onkeydown={(e) => {
		if (e.key === 'ArrowLeft') step(-1);
		if (e.key === 'ArrowRight') step(1);
	}}
	ontouchstart={(e) => (touchX = e.changedTouches[0].screenX)}
	ontouchend={(e) => {
		const dx = touchX - e.changedTouches[0].screenX;
		if (Math.abs(dx) > SWIPE_PX) step(Math.sign(dx));
	}}
>
	<button
		class="absolute top-4 right-4 z-10 text-white transition-colors hover:text-emerald-400"
		aria-label="Tutup"
		onclick={() => dialog?.close()}
	>
		<span class="icon-[bx--x] size-10"></span>
	</button>

	<div class="flex size-full items-center justify-center">
		<img src={images[current]} alt="{alt} – gambar {current + 1}" class="max-h-[85vh] max-w-full object-contain" />
	</div>

	<button
		class="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-colors hover:bg-white/30"
		aria-label="Sebelumnya"
		onclick={() => step(-1)}
	>
		<span class="icon-[bx--chevron-left] size-8"></span>
	</button>
	<button
		class="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-colors hover:bg-white/30"
		aria-label="Berikutnya"
		onclick={() => step(1)}
	>
		<span class="icon-[bx--chevron-right] size-8"></span>
	</button>

	<div class="absolute inset-x-0 bottom-8 flex justify-center gap-2">
		{#each images as src, i (src)}
			<button
				class={['size-3 rounded-full transition-all', i === current ? 'bg-emerald-500' : 'bg-gray-300']}
				aria-label="Gambar {i + 1}"
				onclick={() => (current = i)}
			></button>
		{/each}
	</div>
</dialog>
