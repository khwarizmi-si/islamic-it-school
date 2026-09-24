<script lang="ts">
	let { images, alt }: { images: string[]; alt: string } = $props();

	let current = $state(0);
	let dialog = $state<HTMLDialogElement>();
	let touchX = 0;

	const SWIPE_PX = 50;
	const step = (d: number) => (current = (current + d + images.length) % images.length);
</script>

<figure class="m-0 min-w-0">
	<button
		class="group relative block w-full overflow-hidden rounded-sm bg-surface"
		aria-label="Lihat gambar layar penuh"
		onclick={() => dialog?.showModal()}
	>
		<img
			src={images[current]}
			alt="{alt} — gambar {current + 1}"
			class="aspect-3/4 w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
			loading="lazy"
		/>
		<span
			class="pointer-events-none absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-bg/80 px-3 py-1.5 text-xs backdrop-blur-sm"
		>
			<span class="icon-[lucide--maximize-2] size-3.5"></span>Perbesar
		</span>
	</button>

	<ul class="mt-3 flex min-w-0 gap-2.5 overflow-x-auto pb-1">
		{#each images as src, i (src)}
			<li>
				<button
					class={[
						'size-16 overflow-hidden rounded-sm border transition-all',
						i === current ? 'border-signal opacity-100' : 'border-line opacity-60 hover:opacity-100'
					]}
					aria-label="Gambar {i + 1}"
					aria-pressed={i === current}
					onclick={() => (current = i)}
				>
					<img {src} alt="" class="size-full object-cover" loading="lazy" />
				</button>
			</li>
		{/each}
	</ul>
</figure>

<dialog
	bind:this={dialog}
	class="m-0 size-full max-h-none max-w-none bg-black/92 p-4 text-white backdrop:bg-black/70"
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
	<button class="absolute top-4 right-4 z-10 p-2 transition-opacity hover:opacity-70" aria-label="Tutup" onclick={() => dialog?.close()}>
		<span class="icon-[lucide--x] size-7"></span>
	</button>

	<div class="flex size-full items-center justify-center">
		<img src={images[current]} alt="{alt} — gambar {current + 1}" class="max-h-[85vh] max-w-full object-contain" />
	</div>

	<button
		class="absolute top-1/2 left-3 -translate-y-1/2 rounded-full border border-white/25 p-3 transition-colors hover:bg-white/15"
		aria-label="Sebelumnya"
		onclick={() => step(-1)}
	>
		<span class="icon-[lucide--chevron-left] size-6"></span>
	</button>
	<button
		class="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-white/25 p-3 transition-colors hover:bg-white/15"
		aria-label="Berikutnya"
		onclick={() => step(1)}
	>
		<span class="icon-[lucide--chevron-right] size-6"></span>
	</button>

	<p class="absolute inset-x-0 bottom-6 text-center text-sm text-white/70">{current + 1} / {images.length}</p>
</dialog>
