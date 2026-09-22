<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { referral } from '$lib/referral.svelte';
	import { reveal } from '$lib/reveal';
	import { rupiah } from '$lib/site';

	let { data } = $props();
	const book = $derived(data.book);

	const sections = [
		{ id: 'home', label: 'Home' },
		{ id: 'about', label: 'Tantangan' },
		{ id: 'details', label: 'Solusi' },
		{ id: 'specs', label: 'Detail Buku' },
		{ id: 'beli', label: 'Beli Sekarang' }
	];
	const numberColors = ['bg-emerald-100 text-emerald-600', 'bg-orange-100 text-orange-500', 'bg-teal-100 text-teal-500'];
	const tagColors = ['bg-emerald-100 text-emerald-800', 'bg-orange-100 text-orange-800', 'bg-blue-100 text-blue-800'];

	let menuOpen = $state(false);
	let activeSection = $state('home');

	const orderHref = $derived(
		`/form_beli?${new URLSearchParams({
			book_title: book.name,
			price: String(book.price),
			...(referral.code ? { ref: referral.code } : {})
		})}`
	);

	const specRows = $derived([
		['Penerbit', book.specs.publisher],
		['ISBN', book.specs.isbn],
		['Bahasa', book.specs.language],
		['Dimensi', book.specs.dimensions],
		['Halaman', book.specs.pages]
	]);

	/** Scroll-spy: highlight the topmost section crossing the upper part of the viewport. */
	function spy(node: HTMLElement) {
		const visible = new Set<string>();
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) visible[e.isIntersecting ? 'add' : 'delete'](e.target.id);
				activeSection = sections.find((s) => visible.has(s.id))?.id ?? activeSection;
			},
			{ rootMargin: '-100px 0px -60% 0px' }
		);
		node.querySelectorAll(':scope > section[id]').forEach((s) => io.observe(s));
		return () => io.disconnect();
	}
</script>

{#snippet check(cls = 'size-6')}
	<span class="icon-[bx--check] {cls}"></span>
{/snippet}

<Seo title={book.title} description={book.specs.description} image={book.hero.mockup} icon="{book.img}/cover.jpg" />

<header class="book-glass fixed top-0 z-50 w-full">
	<nav class="container mx-auto px-6 py-4" aria-label="Navigasi halaman">
		<div class="flex items-center justify-between">
			<a href="#home" class="bg-linear-to-r from-emerald-500 to-orange-500 bg-clip-text text-2xl font-bold text-transparent">
				{book.short}
			</a>
			<div class="hidden gap-8 md:flex">
				{#each sections as s (s.id)}
					<a
						href="#{s.id}"
						class={[
							'relative font-medium transition-colors hover:text-emerald-600',
							activeSection === s.id &&
								'text-emerald-600 after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:rounded after:bg-linear-to-r after:from-emerald-500 after:to-amber-500'
						]}>{s.label}</a
					>
				{/each}
			</div>
			<button class="md:hidden" aria-label="Buka menu" aria-expanded={menuOpen} onclick={() => (menuOpen = !menuOpen)}>
				<span class="icon-[bx--menu] size-6"></span>
			</button>
		</div>
		{#if menuOpen}
			<div class="flex flex-col gap-1 pt-4 pb-2 md:hidden">
				{#each sections as s (s.id)}
					<a
						href="#{s.id}"
						onclick={() => (menuOpen = false)}
						class={[
							'block py-3 font-medium transition-all hover:pl-2 hover:text-emerald-600',
							activeSection === s.id && 'border-l-3 border-emerald-600 bg-emerald-600/10 pl-4 font-semibold text-emerald-600'
						]}>{s.label}</a
					>
				{/each}
			</div>
		{/if}
	</nav>
</header>

<main class="overflow-x-clip bg-gray-50 text-gray-900" {@attach spy}>
	<section id="home" class="book-gradient relative flex min-h-screen items-center overflow-hidden pt-20">
		<div class="absolute inset-0 bg-white/10"></div>
		<div class="relative z-10 container mx-auto px-6 py-12">
			<div class="grid items-center gap-12 lg:grid-cols-2">
				<div class="animate-fade-in-left">
					<h1 class="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
						<span class="block">{book.hero.question}</span>
						<span class="block bg-linear-to-r from-yellow-300 to-white bg-clip-text text-transparent">{book.hero.answer}</span>
					</h1>
					<div class="mb-8 space-y-4 text-lg leading-relaxed text-gray-100 lg:text-xl [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
						{@html book.hero.introHtml}
					</div>
					<div class="flex flex-col gap-4 sm:flex-row">
						<a
							href="#beli"
							class="rounded-full bg-linear-to-r from-emerald-500 to-orange-500 px-6 py-3 text-center text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-emerald-600 hover:to-orange-600 hover:shadow-xl"
						>
							{book.hero.cta}
						</a>
						<a
							href={book.shopee}
							target="_blank"
							rel="noopener"
							class="book-glass rounded-full px-6 py-3 text-center text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-white/50"
						>
							Beli di Shopee
						</a>
					</div>
					<p class="mt-4 animate-pulse text-sm text-white">{book.hero.warning}</p>
				</div>
				<div class="flex animate-fade-in-right justify-center">
					<div class="relative max-w-md">
						<div class="absolute inset-0 animate-pulse-slow rounded-3xl bg-linear-to-r from-emerald-500 to-orange-500 opacity-30 blur-3xl"></div>
						<img
							src={book.hero.mockup}
							alt="Cover {book.name}"
							class="relative z-10 w-full animate-float-soft rounded-3xl border-4 border-white shadow-2xl transition-transform duration-500 hover:scale-105"
							fetchpriority="high"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="absolute top-20 left-10 size-20 animate-float-soft rounded-full bg-white/30"></div>
		<div class="absolute right-10 bottom-20 size-16 animate-float-soft rounded-full bg-white/20 [animation-delay:1s]"></div>
		<div class="absolute top-1/2 left-1/4 size-12 animate-float-soft rounded-full bg-white/25 [animation-delay:2s]"></div>
	</section>

	<section id="about" class="scroll-mt-16 bg-white py-20">
		<div class="container mx-auto px-6">
			<div class="mb-16 text-center" {@attach reveal}>
				<h2 class="book-heading mb-6">{book.problems.title}</h2>
				<p class="mx-auto max-w-3xl text-xl text-gray-600">{book.problems.subtitle}</p>
			</div>
			<div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
				{#each book.problems.items as item, i (item.title)}
					<div class="relative rounded-2xl bg-gray-50 p-8 shadow-md transition-shadow hover:shadow-lg" {@attach reveal}>
						<div class="absolute -top-5 -left-5 flex size-12 items-center justify-center rounded-full text-2xl font-bold shadow-sm {numberColors[i % 3]}">
							{i + 1}
						</div>
						<h3 class="mb-3 pt-4 text-xl font-bold">{item.title}</h3>
						<p class="text-gray-600">{item.text}</p>
					</div>
				{/each}
			</div>
			<div class="mt-16 text-center" {@attach reveal}>
				<p class="inline-block border-l-4 border-red-500 bg-red-100 p-4 font-bold text-red-700">{book.problems.alert}</p>
			</div>
		</div>
	</section>

	<section id="details" class="scroll-mt-16 bg-gray-100 py-20">
		<div class="container mx-auto px-6">
			<div class="mb-16 text-center" {@attach reveal}>
				<h2 class="book-heading mb-6">{book.solution.title}</h2>
				<p class="text-xl text-gray-600">{book.solution.subtitle}</p>
			</div>
			<div class="grid items-center gap-12 lg:grid-cols-2">
				<div class="order-last lg:order-first" {@attach reveal}>
					<div class="space-y-8">
						{#each book.solution.items as item (item.title)}
							<div class="flex items-start gap-4">
								<div class="mt-1 shrink-0 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 p-3 text-white">
									{@render check()}
								</div>
								<div>
									<h3 class="mb-2 text-xl font-bold text-gray-800">{item.title}</h3>
									<p class="text-gray-600">{@html item.html}</p>
								</div>
							</div>
						{/each}
					</div>
					<blockquote class="mt-12 rounded-r-lg border-l-4 border-emerald-500 bg-linear-to-r from-emerald-50 to-teal-50 p-6 shadow-sm">
						<p class="text-lg font-semibold text-emerald-800 italic">"{book.solution.quote}"</p>
						<footer class="mt-3 font-medium text-gray-600">- {book.solution.quoteBy}</footer>
					</blockquote>
				</div>
				<div class="order-first flex justify-center lg:order-last" {@attach reveal}>
					<img
						src="{book.img}/cover.jpg"
						alt="Isi Buku {book.name}"
						class="w-full max-w-md rounded-2xl border-4 border-white shadow-2xl transition-transform duration-300 hover:scale-105"
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	</section>

	<section id="specs" class="scroll-mt-16 bg-white py-20">
		<div class="container mx-auto px-6">
			<h2 class="book-heading mb-4 text-center" {@attach reveal}>DETAIL BUKU</h2>
			<div class="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2">
				<div class="h-full rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-lg" {@attach reveal}>
					<h3 class="mb-2 text-2xl font-bold text-gray-800">{book.name}</h3>
					<p class="mb-6 font-medium text-emerald-600">{book.author}</p>
					<p class="mb-6 leading-relaxed text-gray-600">{book.specs.description}</p>

					<dl class="grid gap-4 md:grid-cols-2">
						<div class="md:col-span-2">
							<dt class="text-sm font-semibold text-gray-500">Kategori</dt>
							<dd class="mt-1 flex flex-wrap gap-2">
								{#each book.specs.categories as cat, i (cat)}
									<span class="rounded-full px-3 py-1 text-xs {tagColors[i % 3]}">{cat}</span>
								{/each}
							</dd>
						</div>
						{#each specRows as [label, value] (label)}
							<div>
								<dt class="text-sm font-semibold text-gray-500">{label}</dt>
								<dd class="text-gray-700">{value}</dd>
							</div>
						{/each}
					</dl>

					<div class="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row">
						<a
							href={orderHref}
							target="_blank"
							rel="noopener"
							class="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
						>
							<span class="icon-[bx--message-dots] size-5"></span>
							Pesan Sekarang
						</a>
						<!-- Referred buyers order through the form, so the marketplace links are hidden for them. -->
						{#if !referral.code}
							<a
								href={book.lynk}
								target="_blank"
								rel="noopener"
								class="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
							>
								<span class="icon-[bx--cart] size-5"></span>
								Lynk.id
							</a>
							<a
								href={book.shopee}
								target="_blank"
								rel="noopener"
								class="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
							>
								<span class="icon-[bx--shopping-bag] size-5"></span>
								Shopee
							</a>
						{/if}
					</div>
				</div>
				<div class="h-full" {@attach reveal}>
					<Gallery images={book.gallery} alt={book.name} />
				</div>
			</div>
		</div>
	</section>

	<section id="beli" class="scroll-mt-16 book-gradient relative overflow-hidden py-12 md:py-20">
		<div class="absolute inset-0 bg-black/30"></div>
		<div class="relative z-10 container mx-auto px-4 sm:px-6">
			<div class="mx-auto max-w-3xl text-center" {@attach reveal}>
				<h2 class="mb-4 text-2xl font-bold text-white md:mb-6 md:text-3xl lg:text-4xl">{book.cta.title}</h2>
				<p class="mb-6 text-lg text-gray-200 md:mb-8 md:text-xl">{book.cta.subtitle}</p>

				<div class="book-glass relative mb-6 rounded-xl p-6 text-left md:mb-8 md:rounded-2xl md:p-8">
					<h3 class="mb-3 text-xl font-bold text-emerald-600 md:mb-4 md:text-2xl">{book.cta.heading}</h3>
					<div class="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
						<ul class="space-y-2 text-gray-700 md:space-y-3">
							{#each book.cta.bullets as bullet (bullet)}
								<li class="flex items-start gap-2">
									{@render check('mt-0.5 size-5 shrink-0 text-emerald-600')}
									<span>{bullet}</span>
								</li>
							{/each}
						</ul>
						<div class="relative mt-4 md:mt-0">
							<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-md md:p-6">
								<p class="mb-2 text-sm text-gray-500">Harga Normal</p>
								<p class="flex items-end justify-between gap-2 md:justify-start">
									<s class="text-lg text-gray-400 md:text-xl">{rupiah(book.normalPrice)}</s>
									<span class="text-2xl font-bold text-orange-600 md:text-4xl">{rupiah(book.price)}</span>
								</p>
								<p class="mt-3 border-t border-gray-200 pt-3 text-xs text-gray-500 md:mt-4 md:pt-4 md:text-sm">+ Ongkos Kirim</p>
							</div>
							<div class="absolute -right-2 -bottom-2 size-12 rounded-full bg-emerald-500 opacity-10 md:size-16"></div>
							<div class="absolute -top-2 -left-2 size-8 rounded-full bg-orange-500 opacity-10 md:size-12"></div>
						</div>
					</div>
				</div>

				<div class="flex flex-col justify-center gap-3 sm:flex-row md:gap-4">
					<a
						href={book.lynk}
						target="_blank"
						rel="noopener"
						class="rounded-full bg-white px-6 py-3 text-center text-base font-semibold text-emerald-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100 md:px-8 md:py-4 md:text-lg"
					>
						PESAN SEKARANG - {rupiah(book.price)}
					</a>
					<a
						href={book.shopee}
						target="_blank"
						rel="noopener"
						class="book-glass rounded-full px-6 py-3 text-center text-base font-semibold text-white transition-all duration-300 hover:bg-white/20 md:px-8 md:py-4 md:text-lg"
					>
						BELI DI SHOPEE
					</a>
				</div>
				<p class="mt-4 animate-pulse text-xs text-white md:mt-6 md:text-sm">{book.cta.promo}</p>
			</div>
		</div>
	</section>
</main>

<footer class="bg-gray-800 py-8 text-center">
	<p class="mb-4 bg-linear-to-r from-emerald-400 to-orange-500 bg-clip-text text-2xl font-bold text-transparent">{book.name}</p>
	<p class="text-gray-400">© {new Date().getFullYear()} Islamic IT School. Semua hak cipta dilindungi.</p>
</footer>

<style>
	:global(.book-gradient) {
		background: linear-gradient(135deg, #10b981 0%, #0d9488 50%, #f97316 100%);
	}
	:global(.book-glass) {
		background: rgb(255 255 255 / 0.85);
		backdrop-filter: blur(10px);
		border: 1px solid rgb(255 255 255 / 0.3);
		box-shadow: 0 8px 32px rgb(0 0 0 / 0.1);
	}
	:global(.book-heading) {
		font-size: clamp(1.875rem, 1.5rem + 1vw, 2.25rem);
		font-weight: 700;
		background: linear-gradient(to right, #059669, #ea580c);
		background-clip: text;
		color: transparent;
	}
</style>
