<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { books } from '$lib/books';
	import { openBook } from '$lib/bookOpen';
	import { reveal } from '$lib/reveal';
	import { rupiah, waLink } from '$lib/site';

	let opening = $state(false);

	/** Same book-opening transition as the home page stack. */
	async function open(e: MouseEvent, href: string) {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
		e.preventDefault();
		if (opening) return;
		opening = true;
		await openBook((e.currentTarget as HTMLElement).querySelector('img') as HTMLImageElement, href);
		opening = false;
	}

	const plans = [
		{
			tier: 'Paket dasar',
			name: 'Technology',
			featured: false,
			blurb: 'Untuk yang ingin mulai dari bacaan dan menerapkannya sendiri di rumah atau kelas.',
			features: [
				{ icon: 'icon-[lucide--book-open]', text: '7 buku Seri Teknologi Islami' },
				{ icon: 'icon-[lucide--play-circle]', text: 'Akses video tutorial' }
			],
			cta: 'Hubungi admin'
		},
		{
			tier: 'Paket lengkap',
			name: 'Installation',
			featured: true,
			blurb: 'Untuk sekolah dan lembaga yang ingin metode ini benar-benar terpasang, bukan sekadar dibaca.',
			features: [
				{ icon: 'icon-[lucide--book-open]', text: '7 buku Seri Teknologi Islami' },
				{ icon: 'icon-[lucide--presentation]', text: 'Pelatihan & workshop ITMI' },
				{ icon: 'icon-[lucide--life-buoy]', text: 'Pendampingan 12 bulan' },
				{ icon: 'icon-[lucide--cloud-download]', text: 'Akses video & perangkat digital' }
			],
			cta: 'Dapatkan paket ini'
		}
	];
</script>

<Seo
	title="Koleksi Buku — Khwarizmi"
	description="Tujuh judul Seri Teknologi Islami beserta paket lengkap untuk sekolah, guru, dan orang tua."
/>

<main>
	<section class="shell grid items-end gap-8 pt-12 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
		<div>
			<p class="label mb-5 flex items-center gap-2 text-signal">
				<span class="icon-[lucide--library-big] size-4"></span>Koleksi lengkap
			</p>
			<h1 class="text-hero font-semibold">Satu seri, tujuh cara memandang teknologi.</h1>
		</div>
		<p class="max-w-[42ch] text-lede text-muted">
			Dari memasang pola pikir, membangun mental belajar, sampai memonetisasi keterampilan. Setiap judul berdiri
			sendiri, tapi paling kuat jika dibaca sebagai satu rangkaian.
		</p>
	</section>

	<section id="buku" class="rule scroll-mt-24">
		<div class="shell band-tight">
			<ul class="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
				{#each books as book, i (book.slug)}
					<li {@attach reveal} style:transition-delay="{Math.min(i, 5) * 60}ms">
						<a href="/{book.slug}" class="group block" onclick={(e) => open(e, `/${book.slug}`)}>
							<div class="overflow-hidden rounded-sm bg-surface shadow-[0_0.6rem_1.8rem_oklch(0.3_0.05_300/0.16)]">
								<img
									src="{book.img}/cover.jpg"
									alt="Sampul {book.name}"
									class="aspect-2/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
									loading={i < 4 ? 'eager' : 'lazy'}
								/>
							</div>
							<h2 class="mt-4 font-display text-base leading-snug font-semibold">{book.short}</h2>
							<p class="mt-1 text-sm text-muted">{rupiah(book.price)}</p>
							<span class="mt-2 inline-flex items-center gap-1.5 text-sm text-signal">
								Detail buku
								<span class="icon-[lucide--arrow-right] size-3.5 transition-transform duration-300 group-hover:translate-x-1"></span>
							</span>
						</a>
					</li>
				{/each}

				<li class="flex" {@attach reveal}>
					<a
						href={waLink('Halo Admin, saya ingin memesan Paket 1 Spesial (7 buku Seri Teknologi Islami).')}
						target="_blank"
						rel="noopener"
						class="group flex w-full flex-col justify-between rounded-sm border border-line p-5 transition-colors hover:border-signal"
					>
						<div>
							<span class="icon-[lucide--package] size-6 text-signal"></span>
							<h2 class="mt-4 font-display text-base leading-snug font-semibold">Paket 1 Spesial</h2>
							<p class="mt-1.5 text-sm text-muted">Tujuh judul sekaligus, harga khusus.</p>
						</div>
						<span class="mt-6 inline-flex items-center gap-1.5 text-sm text-signal">
							Tanya harga paket
							<span class="icon-[lucide--arrow-up-right] size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"></span>
						</span>
					</a>
				</li>
			</ul>
		</div>
	</section>

	<section id="paket" class="rule scroll-mt-24">
		<div class="shell band">
			<div class="max-w-2xl" {@attach reveal}>
				<h2 class="text-title font-semibold">Untuk lembaga: pilih cara memasangnya</h2>
				<p class="mt-4 text-lede text-muted">
					Buku bisa berhenti di rak, atau benar-benar berjalan di kelas. Dua paket di bawah membedakan keduanya.
				</p>
			</div>

			<div class="mt-12 grid gap-6 lg:grid-cols-2">
				{#each plans as plan (plan.name)}
					<article
						class={[
							'flex flex-col rounded-lg p-8 lg:p-10',
							plan.featured ? 'bg-surface ring-1 ring-signal/40' : 'border border-line'
						]}
						{@attach reveal}
					>
						<p class="label">{plan.tier}</p>
						<h3 class="mt-3 font-display text-3xl font-semibold">{plan.name}</h3>
						<p class="mt-4 leading-relaxed text-muted">{plan.blurb}</p>

						<ul class="mt-8 flex-1 space-y-4">
							{#each plan.features as f (f.text)}
								<li class="flex items-start gap-3">
									<span class="{f.icon} mt-0.5 size-5 shrink-0 text-signal"></span>
									<span>{f.text}</span>
								</li>
							{/each}
						</ul>

						<a
							href={waLink(`Halo Admin, saya tertarik dengan Paket ${plan.name}.`)}
							target="_blank"
							rel="noopener"
							class={['btn mt-10', plan.featured ? 'btn-signal' : 'btn-outline']}
						>
							<span class="icon-[lucide--message-circle] size-4"></span>{plan.cta}
						</a>
					</article>
				{/each}
			</div>
		</div>
	</section>
</main>
