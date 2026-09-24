<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { referral } from '$lib/referral.svelte';
	import { reveal } from '$lib/reveal';
	import { BRAND_MARK, rupiah, SITE_NAME } from '$lib/site';

	let { data } = $props();
	const book = $derived(data.book);

	const sections = [
		{ id: 'tantangan', label: 'Tantangan' },
		{ id: 'solusi', label: 'Solusi' },
		{ id: 'detail', label: 'Detail buku' },
		{ id: 'beli', label: 'Beli' }
	];

	let menuOpen = $state(false);
	let activeSection = $state('');

	const orderHref = $derived(
		`/form_beli?${new URLSearchParams({
			book_title: book.name,
			price: String(book.price),
			...(referral.code ? { ref: referral.code } : {})
		})}`
	);

	const specRows = $derived([
		['Penulis', book.author],
		['Penerbit', book.specs.publisher],
		['ISBN', book.specs.isbn],
		['Bahasa', book.specs.language],
		['Dimensi', book.specs.dimensions],
		['Halaman', book.specs.pages]
	]);

	const discount = $derived(Math.round((1 - book.price / book.normalPrice) * 100));

	/** Scroll-spy: highlight the topmost section crossing the upper part of the viewport. */
	function spy(node: HTMLElement) {
		const visible = new Set<string>();
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) visible[e.isIntersecting ? 'add' : 'delete'](e.target.id);
				activeSection = sections.find((s) => visible.has(s.id))?.id ?? '';
			},
			{ rootMargin: '-96px 0px -60% 0px' }
		);
		node.querySelectorAll(':scope > section[id]').forEach((s) => io.observe(s));
		return () => io.disconnect();
	}
</script>

<Seo title="{book.name} — {SITE_NAME}" description={book.specs.description} image={book.hero.mockup} icon={BRAND_MARK} />

<div class="min-h-screen bg-bg text-fg">
	<header class="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
		<div class="shell flex items-center justify-between gap-4 py-3.5">
			<a href="/" class="flex items-center gap-2.5" aria-label="Beranda {SITE_NAME}">
				<img src={BRAND_MARK} alt="" width="22" height="34" class="h-8 w-auto" />
				<span class="font-display leading-tight font-semibold">{book.short}</span>
			</a>

			<nav class="hidden items-center gap-7 text-sm md:flex" aria-label="Bagian halaman">
				{#each sections as s (s.id)}
					<a href="#{s.id}" class={['transition-colors', activeSection === s.id ? 'text-signal' : 'text-muted hover:text-fg']}>
						{s.label}
					</a>
				{/each}
			</nav>

			<div class="flex items-center gap-2">
				<a href="#beli" class="btn btn-signal !px-4 !py-2.5 text-sm">{rupiah(book.price)}</a>
				<button
					class="-mr-2 p-2 md:hidden"
					aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
					aria-expanded={menuOpen}
					onclick={() => (menuOpen = !menuOpen)}
				>
					<span class={['size-6', menuOpen ? 'icon-[lucide--x]' : 'icon-[lucide--menu]']}></span>
				</button>
			</div>
		</div>
		{#if menuOpen}
			<nav class="shell flex flex-col border-t border-line py-1 md:hidden" aria-label="Bagian halaman">
				{#each sections as s (s.id)}
					<a
						href="#{s.id}"
						onclick={() => (menuOpen = false)}
						class={['border-b border-line py-3.5 last:border-0', activeSection === s.id ? 'text-signal' : 'text-fg']}
					>
						{s.label}
					</a>
				{/each}
			</nav>
		{/if}
	</header>

	<main {@attach spy}>
		<!-- Hero -->
		<section class="relative overflow-hidden">
			<div
				class="pointer-events-none absolute inset-0 opacity-80"
				style="background: radial-gradient(40rem 26rem at 78% 18%, var(--color-surface-2), transparent 72%)"
				aria-hidden="true"
			></div>
			<div class="shell relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
				<div>
					<p class="label mb-5 text-signal">Seri Teknologi Islami</p>
					<h1 class="text-hero font-semibold">
						{book.hero.question}<br /><span class="text-signal">{book.hero.answer}</span>
					</h1>
					<div
						class="mt-6 max-w-[48ch] space-y-3 text-lede text-muted [&_strong]:text-fg [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_.font-bold]:text-fg [&_.font-semibold]:text-fg"
					>
						{@html book.hero.introHtml}
					</div>

					<div class="mt-9 flex flex-wrap gap-3">
						<a href="#beli" class="btn btn-signal">{book.hero.cta}<span class="icon-[lucide--arrow-down] size-4"></span></a>
						<a href={book.shopee} target="_blank" rel="noopener" class="btn btn-outline">
							Beli di Shopee<span class="icon-[lucide--arrow-up-right] size-4"></span>
						</a>
					</div>

					<p class="mt-7 flex items-start gap-2.5 text-sm text-muted">
						<span class="icon-[lucide--triangle-alert] mt-0.5 size-4 shrink-0 text-signal"></span>
						{book.hero.warning}
					</p>
				</div>

				<figure class="relative mx-auto max-w-md">
					<img
						src={book.hero.mockup}
						alt="Sampul {book.name}"
						class="w-full animate-float-soft rounded-sm shadow-[0_2rem_5rem_oklch(0.05_0.02_300/0.65)]"
						fetchpriority="high"
					/>
				</figure>
			</div>
		</section>

		<!-- Problems -->
		<section id="tantangan" class="rule scroll-mt-20">
			<div class="shell band">
				<div class="max-w-2xl" {@attach reveal}>
					<h2 class="text-title font-semibold">{book.problems.title}</h2>
					<p class="mt-4 text-lede text-muted">{book.problems.subtitle}</p>
				</div>

				<ol class="mt-12 grid gap-px overflow-hidden rounded-lg bg-line lg:grid-cols-3">
					{#each book.problems.items as item, i (item.title)}
						<li class="bg-bg p-7 lg:p-8" {@attach reveal} style:transition-delay="{i * 90}ms">
							<span class="font-display text-sm text-signal">{String(i + 1).padStart(2, '0')}</span>
							<h3 class="mt-4 text-head font-semibold">{item.title}</h3>
							<p class="mt-3 leading-relaxed text-muted">{item.text}</p>
						</li>
					{/each}
				</ol>

				<p class="mt-10 flex items-center gap-3 font-display text-lg font-semibold" {@attach reveal}>
					<span class="icon-[lucide--circle-alert] size-5 shrink-0 text-signal"></span>
					{book.problems.alert}
				</p>
			</div>
		</section>

		<!-- Solution -->
		<section id="solusi" class="rule scroll-mt-20">
			<div class="shell band grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
				<div {@attach reveal}>
					<h2 class="text-title font-semibold">{book.solution.title}</h2>
					<p class="mt-4 text-lede text-muted">{book.solution.subtitle}</p>

					<div class="mt-10 space-y-8">
						{#each book.solution.items as item (item.title)}
							<div class="flex items-start gap-4">
								<span class="icon-[lucide--check] mt-1 size-5 shrink-0 text-signal"></span>
								<div>
									<h3 class="text-head font-semibold">{item.title}</h3>
									<p class="mt-2 leading-relaxed text-muted [&_.font-semibold]:text-fg">{@html item.html}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="lg:sticky lg:top-24" {@attach reveal}>
					<img
						src="{book.img}/cover.jpg"
						alt="Isi buku {book.name}"
						class="w-full rounded-sm shadow-[0_1.5rem_4rem_oklch(0.05_0.02_300/0.6)]"
						loading="lazy"
					/>
					<blockquote class="mt-8 rounded-lg bg-surface p-7">
						<span class="icon-[lucide--quote] size-6 text-signal"></span>
						<p class="mt-4 font-display text-lg leading-relaxed">{book.solution.quote}</p>
						<footer class="mt-4 text-sm text-muted">{book.solution.quoteBy}</footer>
					</blockquote>
				</div>
			</div>
		</section>

		<!-- Specs + gallery -->
		<section id="detail" class="rule scroll-mt-20">
			<div class="shell band grid gap-12 lg:grid-cols-2 lg:items-start">
				<div {@attach reveal}>
					<h2 class="text-title font-semibold">Detail buku</h2>
					<p class="mt-4 leading-relaxed text-muted">{book.specs.description}</p>

					<ul class="mt-8 flex flex-wrap gap-2">
						{#each book.specs.categories as cat (cat)}
							<li class="rounded-full border border-line px-3 py-1 text-sm text-muted">{cat}</li>
						{/each}
					</ul>

					<dl class="mt-8 grid grid-cols-2 gap-x-8">
						{#each specRows as [label, value] (label)}
							<div class="rule flex justify-between gap-4 py-3 max-sm:col-span-2">
								<dt class="text-sm text-muted">{label}</dt>
								<dd class="text-right text-sm font-medium">{value}</dd>
							</div>
						{/each}
					</dl>

					<div class="mt-8 flex flex-wrap gap-3">
						<a href={orderHref} target="_blank" rel="noopener" class="btn btn-signal">
							<span class="icon-[lucide--shopping-bag] size-4"></span>Pesan sekarang
						</a>
						<!-- Referred buyers order through the form, so the marketplace links are hidden for them. -->
						{#if !referral.code}
							<a href={book.lynk} target="_blank" rel="noopener" class="btn btn-outline">
								Lynk.id<span class="icon-[lucide--arrow-up-right] size-4"></span>
							</a>
							<a href={book.shopee} target="_blank" rel="noopener" class="btn btn-outline">
								Shopee<span class="icon-[lucide--arrow-up-right] size-4"></span>
							</a>
						{/if}
					</div>
				</div>

				<!-- min-w-0: without it the grid item takes the thumbnail row's min-content width and the page overflows -->
				<div class="min-w-0" {@attach reveal}>
					<Gallery images={book.gallery} alt={book.name} />
				</div>
			</div>
		</section>

		<!-- Buy -->
		<section id="beli" class="rule scroll-mt-20 bg-surface">
			<div class="shell band grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
				<div {@attach reveal}>
					<h2 class="text-title font-semibold">{book.cta.title}</h2>
					<p class="mt-4 text-lede text-muted">{book.cta.subtitle}</p>
					<ul class="mt-8 space-y-4">
						{#each book.cta.bullets as bullet (bullet)}
							<li class="flex items-start gap-3">
								<span class="icon-[lucide--check] mt-1 size-4 shrink-0 text-signal"></span>
								<span>{bullet}</span>
							</li>
						{/each}
					</ul>
				</div>

				<div class="rounded-lg bg-bg p-8 lg:p-10" {@attach reveal}>
					<p class="label">{book.cta.heading}</p>
					<div class="mt-5 flex flex-wrap items-baseline gap-3">
						<span class="font-display text-4xl font-semibold text-signal">{rupiah(book.price)}</span>
						<s class="text-lg text-muted">{rupiah(book.normalPrice)}</s>
						{#if discount > 0}
							<span class="rounded-full bg-signal/15 px-2.5 py-1 text-sm font-semibold text-signal">Hemat {discount}%</span>
						{/if}
					</div>
					<p class="mt-2 text-sm text-muted">Belum termasuk ongkos kirim.</p>

					<div class="mt-8 flex flex-col gap-3">
						<a href={orderHref} target="_blank" rel="noopener" class="btn btn-signal">
							<span class="icon-[lucide--shopping-bag] size-4"></span>Pesan sekarang
						</a>
						<a href={book.shopee} target="_blank" rel="noopener" class="btn btn-outline">
							Beli di Shopee<span class="icon-[lucide--arrow-up-right] size-4"></span>
						</a>
					</div>

					<p class="mt-6 flex items-start gap-2.5 text-sm text-muted">
						<span class="icon-[lucide--clock] mt-0.5 size-4 shrink-0 text-signal"></span>
						{book.cta.promo}
					</p>
				</div>
			</div>
		</section>
	</main>

	<footer class="rule">
		<div class="shell flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
			<a href="/" class="flex items-center gap-2.5 text-fg">
				<img src={BRAND_MARK} alt="" width="20" height="30" class="h-7 w-auto" />
				<span class="font-display font-semibold">{SITE_NAME}</span>
			</a>
			<p>© {new Date().getFullYear()} {SITE_NAME}. Seluruh hak cipta dilindungi.</p>
		</div>
	</footer>
</div>
