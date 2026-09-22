<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { waLink } from '$lib/site';

	const catalog = [
		{ title: 'Liquid Curicullum', image: '/img/lc.png' },
		{ title: 'Islamic Technology Mindset (ITMI)', image: '/img/itmi.png' },
		{ title: 'Sejarah Teknologi Kaum Muslimin', image: '/img/dariPerspektifKaumMuslimin.png' },
		{ title: 'Mental Belajar Teknologi', image: '/img/mentalBelajarTeknologi.png' },
		{ title: 'IT dengan Proyek Festival', image: '/img/denganProyekFestival.png' },
		{ title: 'IT Berorientasi Produktif', image: '/img/berorientasiProduktif.png' },
		{ title: 'IT Berorientasi Monetitatif', image: '/img/berorientasiMonetitatif.png' },
		{ title: 'Paket 1 Spesial', image: '/img/paket1.png' }
	];

	const plans = [
		{
			tier: 'Basic Plan',
			name: 'Technology',
			icon: 'icon-[bx--book-content]',
			featured: false,
			features: [
				{ icon: 'icon-[bx--check]', text: '7 Buku Seri Teknologi Islami' },
				{ icon: 'icon-[bx--video]', text: 'Akses Video Tutorial' }
			],
			cta: 'Hubungi Admin'
		},
		{
			tier: 'Complete Plan',
			name: 'Installation',
			icon: 'icon-[bx--rocket]',
			featured: true,
			features: [
				{ icon: 'icon-[bx--check]', text: '7 Buku Seri Teknologi Islami' },
				{ icon: 'icon-[bx--briefcase]', text: 'Pelatihan & Workshop ITMI' },
				{ icon: 'icon-[bx--support]', text: 'Support Pendampingan 12 Bulan' },
				{ icon: 'icon-[bx--cloud-download]', text: 'Akses Video & Perangkat Digital' }
			],
			cta: 'Dapatkan Paket Ini'
		}
	];
</script>

<Seo
	title="Buku Teknologi | Sekolah Impian"
	description="Katalog Buku Seri Teknologi Islami dan paket premium untuk orang tua dan guru."
/>

<main class="bg-slate-50 pt-20 pb-20 text-slate-800">
	<section class="mx-auto mb-16 max-w-7xl px-4 text-center">
		<p class="mb-6 inline-block rounded-full border border-orange-100 bg-orange-50 px-4 py-1.5 text-sm font-bold text-orange-600 uppercase">
			Koleksi Terbatas {new Date().getFullYear()}
		</p>
		<h1 class="mb-6 text-4xl leading-tight font-black md:text-6xl">
			<span class="gradient-text">Buku Seri Teknologi Islami</span><br />
			<span class="text-slate-800">Membangun Masa Depan</span>
		</h1>
		<p class="mx-auto mb-10 max-w-2xl text-lg text-slate-500">
			Kurikulum teknologi pilihan untuk membantu orang tua dan guru dalam menanamkan nilai Islami pada penggunaan
			teknologi.
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<a href="#paket" class="gradient-bg rounded-2xl px-10 py-4 font-bold text-white shadow-xl shadow-orange-200 transition hover:scale-[1.02] hover:opacity-90">
				Lihat Paket
			</a>
			<a href="#buku" class="rounded-2xl border border-slate-200 bg-white px-10 py-4 font-bold text-slate-700 transition-all hover:bg-slate-50">
				Jelajahi Judul
			</a>
		</div>
	</section>

	<section id="buku" class="mx-auto max-w-7xl scroll-mt-28 px-4 py-12">
		<h2 class="mb-10 flex items-center gap-2 text-2xl font-extrabold text-slate-800">
			<span class="icon-[bx--collection] text-teal-500"></span> Katalog Buku
		</h2>
		<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each catalog as book (book.title)}
				<li
					class="group flex h-full flex-col rounded-4xl border border-slate-200/80 bg-white p-5 transition-all duration-400 hover:-translate-y-2.5 hover:border-teal-600 hover:shadow-xl"
				>
					<div class="mb-5 flex h-52 items-center justify-center overflow-hidden rounded-3xl bg-slate-50">
						<img
							src={book.image}
							alt={book.title}
							class="max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-110"
							loading="lazy"
						/>
					</div>
					<h3 class="mb-5 grow text-base leading-snug font-bold text-slate-800">{book.title}</h3>
					<a
						href={waLink(`Halo Admin, saya ingin memesan buku: ${book.title}`)}
						class="gradient-bg flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-lg shadow-orange-100 transition hover:scale-[1.02] hover:opacity-90"
					>
						<span class="icon-[bxl--whatsapp] size-5"></span> Pesan
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<section id="paket" class="mx-auto mt-32 mb-20 max-w-7xl scroll-mt-28 px-4">
		<div class="mb-16 text-center">
			<p class="mb-4 inline-block rounded-full border border-orange-100 bg-orange-50 px-4 py-1 text-xs font-bold tracking-widest text-orange-600 uppercase">
				Penawaran Eksklusif
			</p>
			<h2 class="text-3xl font-black tracking-tight text-slate-800 md:text-5xl">
				PILIH PAKET <span class="gradient-text">PREMIUM</span>
			</h2>
			<p class="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
				Investasi terbaik untuk mendukung kurikulum teknologi yang beradab dan berwawasan masa depan.
			</p>
		</div>

		<div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
			{#each plans as plan (plan.name)}
				<article
					class={[
						'group relative flex flex-col overflow-hidden rounded-[3rem] p-10 transition-all duration-500 hover:-translate-y-2',
						plan.featured
							? 'border-2 border-transparent bg-slate-900 shadow-2xl hover:border-orange-500/30'
							: 'border border-slate-100 bg-white shadow-xl hover:shadow-2xl'
					]}
				>
					{#if plan.featured}
						<span class="absolute top-8 -right-9 z-20 rotate-45 bg-orange-500 px-10 py-1 text-xs font-black tracking-widest text-white uppercase shadow-lg">
							Most Popular
						</span>
						<div class="absolute -right-20 -bottom-20 size-64 rounded-full bg-orange-500/10 blur-3xl"></div>
					{:else}
						<div class="absolute top-0 right-0 -mt-20 -mr-20 size-40 rounded-full bg-teal-50 transition-transform group-hover:scale-110"></div>
					{/if}

					<div class="relative z-10 flex h-full flex-col">
						<div class="mb-10 flex items-start justify-between">
							<div>
								<h3 class={['mb-2 text-sm font-bold tracking-widest uppercase', plan.featured ? 'text-orange-400' : 'text-teal-600']}>
									{plan.tier}
								</h3>
								<p class={['text-3xl font-black', plan.featured ? 'text-white' : 'text-slate-800']}>{plan.name}</p>
							</div>
							<div
								class={[
									'flex size-14 items-center justify-center rounded-2xl text-2xl shadow-xl transition-transform',
									plan.featured
										? 'bg-orange-500 text-white shadow-orange-500/40 group-hover:-rotate-12'
										: 'border border-teal-50 bg-white text-teal-500 group-hover:rotate-12'
								]}
							>
								<span class={plan.icon}></span>
							</div>
						</div>

						<ul class="mb-12 grow space-y-6">
							{#each plan.features as f (f.text)}
								<li class={['group/item flex items-start gap-4', plan.featured ? 'text-slate-300' : 'text-slate-600']}>
									<span
										class={[
											'mt-1 flex size-6 shrink-0 items-center justify-center rounded-full transition-colors group-hover/item:text-white',
											plan.featured
												? 'bg-orange-500/20 text-orange-500 group-hover/item:bg-orange-500'
												: 'bg-teal-100 text-teal-600 group-hover/item:bg-teal-500'
										]}
									>
										<span class="{f.icon} text-xl"></span>
									</span>
									<span class="font-medium">{f.text}</span>
								</li>
							{/each}
						</ul>

						<a
							href={waLink(`Halo Admin, saya tertarik dengan Paket ${plan.name}`)}
							class={[
								'block w-full rounded-2xl py-5 text-center transition-all',
								plan.featured
									? 'gradient-bg text-xl font-black text-white shadow-xl shadow-orange-500/20 hover:brightness-110'
									: 'border-2 border-slate-800 text-lg font-bold text-slate-800 hover:bg-slate-800 hover:text-white'
							]}
						>
							{plan.cta}
						</a>
					</div>
				</article>
			{/each}
		</div>
	</section>
</main>

<SiteFooter />
