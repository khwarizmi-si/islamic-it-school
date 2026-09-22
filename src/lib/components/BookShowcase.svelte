<script lang="ts">
	const FLIP_MS = 3000;

	const books = [
		{ front: '/img/7buku-seri-teknologi(2).png', back: '/img/7buku-seri-teknologi.png', alt: 'Paket 7 Buku Seri Teknologi Islami' },
		{ front: '/img/LC/f-mockup-lc.png', back: '/img/LC/b-mockup-lc.png', alt: 'Liquid Curriculum' },
		{ front: '/img/ITMI/f-mockup-itmi.png', back: '/img/ITMI/b-mockup-itmi.png', alt: 'Islamic Technology Mindset Installation' },
		{ front: '/img/ST/f-mockup-st.png', back: '/img/ST/b-mockup-st.png', alt: 'Sejarah Teknologi Kaum Muslimin' },
		{ front: '/img/BT/f-mockup-bt.png', back: '/img/BT/b-mockup-bt.png', alt: 'Mental Belajar Teknologi' },
		{ front: '/img/IT-PF/f-mockup-it-pf.png', back: '/img/IT-PF/b-mockup-it-pf.png', alt: 'IT dengan Proyek Festival' },
		{ front: '/img/IT-BP/f-mockup-it-bp.png', back: '/img/IT-BP/b-mockup-it-bp.png', alt: 'IT Berorientasi Produktif' },
		{ front: '/img/IT-BM/f-mockup-it-bm.png', back: '/img/IT-BM/mockup-it-bm.png', alt: 'IT Berorientasi Monetitatif' }
	];

	let active = $state(0);
	let flipped = $state(false);
	let pausedUntil = 0;

	$effect(() => {
		const id = setInterval(() => {
			if (Date.now() >= pausedUntil) flipped = !flipped;
		}, FLIP_MS);
		return () => clearInterval(id);
	});

	function flipNow() {
		flipped = !flipped;
		pausedUntil = Date.now() + FLIP_MS;
	}

	function select(i: number) {
		active = i;
		flipped = false;
		pausedUntil = Date.now() + FLIP_MS;
	}
</script>

<div class="relative w-full">
	<button
		class="relative block h-[280px] w-full perspective-[1000px] sm:h-[350px] md:h-[450px] lg:h-[500px]"
		aria-label="Balik buku"
		onclick={flipNow}
	>
		<span
			class="relative block size-full transition-transform duration-700 transform-3d"
			class:rotate-y-180={flipped}
		>
			<img
				src={books[active].front}
				alt={books[active].alt}
				class="absolute inset-0 size-full object-contain drop-shadow-lg backface-hidden"
				fetchpriority="high"
			/>
			<img
				src={books[active].back}
				alt="{books[active].alt} (sampul belakang)"
				class="absolute inset-0 size-full rotate-y-180 object-contain p-4 drop-shadow-md backface-hidden"
			/>
		</span>
	</button>

	<ul class="mt-6 flex snap-x gap-2 overflow-x-auto px-1 pb-2 sm:gap-3 lg:justify-center-safe" aria-label="Pilih buku">
		{#each books as book, i (book.front)}
			<li class="w-1/4 shrink-0 snap-start sm:w-1/5 lg:w-[90px]">
				<button
					class={[
						'flex h-20 w-full items-center justify-center rounded-lg bg-white p-1 shadow transition-transform hover:scale-105 sm:h-[100px] lg:h-[120px]',
						i === active && 'ring-3 ring-blue-500/60 outline-2 outline-blue-500'
					]}
					aria-label={book.alt}
					aria-pressed={i === active}
					onclick={() => select(i)}
				>
					<img src={book.front} alt="" class="size-full object-contain" loading="lazy" />
				</button>
			</li>
		{/each}
	</ul>
</div>
