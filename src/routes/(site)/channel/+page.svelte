<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { reveal } from '$lib/reveal';
	import { SOCIAL, waLink } from '$lib/site';

	const channels = [
		{
			name: 'Instagram',
			handle: '@sekolahimpianofficial',
			blurb: 'Foto dan video inspiratif setiap hari',
			gradient: 'from-pink-500 via-purple-500 to-orange-400',
			hover: 'hover:bg-pink-100 hover:text-pink-800',
			icon: 'icon-[bxl--instagram]',
			stats: [['4K', 'Followers'], ['724', 'Posts'], ['40', 'Following']],
			href: SOCIAL.instagram,
			cta: 'Follow'
		},
		{
			name: 'YouTube',
			handle: 'GSI Channel',
			blurb: 'Tutorial dan konten edukatif berkualitas',
			gradient: 'from-red-500 to-red-700',
			hover: 'hover:bg-red-100 hover:text-red-800',
			icon: 'icon-[bxl--youtube]',
			stats: [['6.88K', 'Subscribers'], ['249', 'Videos'], ['798K', 'Views']],
			href: SOCIAL.youtube,
			cta: 'Subscribe'
		},
		{
			name: 'WhatsApp',
			handle: '+62 851-6123-1559',
			blurb: 'Konsultasi langsung dengan tim kami',
			gradient: 'from-green-500 to-green-600',
			hover: 'hover:bg-green-100 hover:text-green-800',
			icon: 'icon-[bxl--whatsapp]',
			stats: [['24/7', 'Support'], ['Fast', 'Response']],
			href: waLink(),
			cta: 'Chat Now'
		},
		{
			name: 'Website',
			handle: 'sekolahimpian.com',
			blurb: 'Informasi lengkap tentang program kami',
			gradient: 'from-blue-600 to-purple-600',
			hover: 'hover:bg-blue-100 hover:text-blue-800',
			icon: 'icon-[bx--globe]',
			stats: [['Complete', 'Info'], ['Updated', 'Content']],
			href: SOCIAL.school,
			cta: 'Visit'
		}
	];

	const perks = [
		['📸 Daily Updates', 'from-pink-500 to-orange-400'],
		['🎥 Video Tutorials', 'from-red-500 to-red-600'],
		['💬 Direct Support', 'from-green-500 to-green-600'],
		['🌐 Complete Info', 'from-blue-500 to-purple-600']
	];
</script>

<Seo title="Our Social Media | Islamic IT School" description="Ikuti Sekolah Impian di Instagram, YouTube, WhatsApp, dan website kami." />

<main class="relative overflow-hidden px-4 py-20">
	<div class="mx-auto max-w-6xl text-center">
		<div class="animate-fade-in-up">
			<h1 class="mb-6 text-3xl font-extrabold md:text-5xl lg:text-6xl">
				<span class="gradient-tri-text">Connect With Us</span>
			</h1>
			<p class="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
				Bergabunglah dengan komunitas kami di berbagai platform media sosial dan dapatkan konten edukatif, tips, serta
				update terbaru setiap hari
			</p>
		</div>

		<ul class="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each channels as c (c.name)}
				<li class="social-card rounded-2xl bg-linear-to-br p-8 text-white shadow-xl {c.gradient}" {@attach reveal}>
					<div class="flex h-full flex-col items-center">
						<div class="mb-6 rounded-full bg-white/20 p-4">
							<span class="{c.icon} size-12"></span>
						</div>
						<h2 class="mb-2 text-2xl font-bold">{c.name}</h2>
						<p class="mb-3 text-lg font-semibold">{c.handle}</p>
						<p class="mb-6 text-center text-sm opacity-90">{c.blurb}</p>
						<dl class="mb-8 grid w-full gap-4" style:grid-template-columns="repeat({c.stats.length}, minmax(0, 1fr))">
							{#each c.stats as [value, label] (label)}
								<div class="flex flex-col-reverse text-center">
									<dt class="text-xs opacity-80">{label}</dt>
									<dd class="text-2xl font-bold">{value}</dd>
								</div>
							{/each}
						</dl>
						<a
							href={c.href}
							target="_blank"
							rel="noopener"
							class="mt-auto flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-800 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl {c.hover}"
						>
							<span class="{c.icon} size-5"></span>{c.cta}
						</a>
					</div>
				</li>
			{/each}
		</ul>

		<div class="mt-20 animate-fade-in-up rounded-2xl border border-white/20 bg-white/60 p-8 shadow-xl backdrop-blur-lg [animation-delay:0.6s]">
			<h2 class="mb-4 text-3xl font-bold text-gray-900">Stay Connected!</h2>
			<p class="mx-auto mb-6 max-w-2xl text-gray-600">
				Jangan lewatkan update terbaru dari kami. Follow semua channel media sosial untuk mendapatkan konten eksklusif
				dan berinteraksi dengan komunitas yang luar biasa.
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				{#each perks as [label, gradient] (label)}
					<span class="rounded-full bg-linear-to-r px-4 py-2 text-sm font-semibold text-white {gradient}">{label}</span>
				{/each}
			</div>
		</div>
	</div>
</main>

<style>
	.social-card {
		position: relative;
		overflow: hidden;
		background-size: 200% 200%;
		animation: var(--animate-gradient-shift);
		transition:
			transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.4s,
			opacity 0.6s;
	}
	.social-card::before {
		content: '';
		position: absolute;
		inset: 0;
		translate: -100% 0;
		background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.2), transparent);
		transition: translate 0.6s;
		pointer-events: none;
	}
	.social-card:hover::before {
		translate: 100% 0;
	}
	.social-card:hover {
		transform: translateY(-10px) scale(1.02);
		box-shadow: 0 25px 50px rgb(0 0 0 / 0.25);
	}
</style>
