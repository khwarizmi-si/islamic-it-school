<script lang="ts">
	import BookShowcase from '$lib/components/BookShowcase.svelte';
	import Faq, { type FaqItem } from '$lib/components/Faq.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { MEDIA_BASE, mediaUrl, SOCIAL, waLink } from '$lib/site';

	// The 97 MB promo video can't ship as a Worker asset; it shows once MEDIA_BASE points at its host.
	const promoVideo = MEDIA_BASE ? mediaUrl('vid/Video Iklan Buku All Revisi.mp4') : null;
	let portrait = $state(false);

	const audiences = [
		{
			gradient: 'from-pink-400 via-purple-500 to-blue-600',
			text: 'text-purple-600',
			icon: 'icon-[bx--building-house]',
			lines: [
				'Keseluruhan isi buku sudah diterapkan dan dijalankan selama 8 tahun di Sekolah Impian.',
				'Ayah bunda yang berminat mendaftarkan putra/putrinya di Sekolah Impian, dipersilakan daftar di sini ya 👇'
			],
			href: SOCIAL.school,
			cta: 'SEKOLAH nya'
		},
		{
			gradient: 'from-orange-400 to-orange-600',
			text: 'text-orange-600',
			icon: 'icon-[bx--book-open]',
			lines: [
				'Orang tua dan Guru serta penyelenggara pendidikan yang ingin mempelajari metode ajar kami melalui Seri Buku Teknologi Islami, silakan beli bukunya di sini ya 👇'
			],
			href: '/buku',
			cta: 'BUKU nya'
		},
		{
			gradient: 'from-gray-700 to-gray-900',
			text: 'text-gray-600',
			icon: 'icon-[bx--chalkboard]',
			lines: [
				'Orang tua dan Guru serta penyelenggara pendidikan yang ingin memahami dan menyerap lebih dalam strategi dan metode pendidikan kami, silakan ikuti pelatihannya di sini ya 👇'
			],
			href: '/pelatihan',
			cta: 'PELATIHAN nya'
		},
		{
			gradient: 'from-blue-500 to-cyan-600',
			text: 'text-blue-600',
			icon: 'icon-[bx--desktop]',
			lines: [
				'Orang tua dan Guru serta penyelenggara pendidikan yang mau gabung diskusi dan seminar secara online, join di sini yuk 👇'
			],
			href: '/dokumentasi',
			cta: 'WEBINAR nya'
		},
		{
			gradient: 'from-red-600 to-red-800',
			text: 'text-red-700',
			icon: 'icon-[bxl--youtube]',
			lines: [
				'Orang tua dan Guru serta penyelenggara pendidikan yang mau melihat ratusan video tentang pendidikan khas Sekolah Impian, silakan klik di sini ya 👇'
			],
			href: '/channel',
			cta: 'CHANNEL nya'
		},
		{
			gradient: 'from-green-400 to-green-700',
			text: 'text-green-700',
			icon: 'icon-[bx--code-alt]',
			lines: [
				'Ayah Bunda yang ingin ananda kursus Coding, Game Developer, dan AI for kids silakan daftar di sini ya 👇'
			],
			href: '/kursus',
			cta: 'KURSUSAN nya'
		}
	];

	const faqs: FaqItem[] = [
		{
			q: 'Bagaimana cara membeli buku ini?',
			icon: 'icon-[bx--book]',
			accent: 'from-green-400 to-blue-500',
			a: `Anda bisa membeli buku kami melalui beberapa cara:<br><br>
				1. <strong>Marketplace</strong>: Shopee dan Lynk ID (cari dengan judul buku kami)<br>
				2. <strong>Website resmi</strong>: islamic-it-school.com<br><br>
				Jika membeli melalui affiliate dengan memasukkan kode referral yang diberikan, Anda akan mendapatkan voucher diskon 5%!`
		},
		{
			q: 'Bagaimana caranya menjadi agen affiliate?',
			icon: 'icon-[bx--group]',
			accent: 'from-purple-400 to-pink-500',
			a: `Cara menjadi affiliate sangat mudah:<br><br>
				1. Hubungi admin kami via WhatsApp<br>
				2. Anda akan mendapatkan link pendaftaran khusus<br>
				3. Admin akan menjelaskan seluruh prosesnya<br><br>
				Sebagai affiliate, Anda bisa memberikan kode referral kepada pembeli yang memberikan mereka diskon 5%, sementara Anda mendapatkan komisi dari setiap penjualan yang berhasil!`
		},
		{
			q: 'Apakah buku ini bisa diterapkan di rumah?',
			icon: 'icon-[bx--bulb]',
			accent: 'from-yellow-400 to-orange-500',
			a: '70% strategi, metode, dan pendekatan yang ditulis di dalam buku ini bisa diterapkan di rumah oleh ayah bunda terhadap ananda. Buku ini dirancang dengan langkah-langkah praktis yang mudah diimplementasikan dalam kehidupan sehari-hari di rumah.'
		},
		{
			q: 'Apakah ada bukti nyata keberhasilan dari strategi, metode, dan pendekatan yang ditulis di dalam buku ini?',
			icon: 'icon-[bx--desktop]',
			accent: 'from-indigo-400 to-cyan-500',
			a: `Berikut beberapa bukti nyata keberhasilan dari strategi yang kami tulis:
				<ol class="mt-4 space-y-4">
					<li><a href="https://youtu.be/3B9cosMlnyU" target="_blank" rel="noopener">1. Tonton Video Prototype Santri Sekolah Impian 1</a></li>
					<li><a href="https://youtu.be/JdxrOfQlFmQ" target="_blank" rel="noopener">2. Tonton Video Prototype Santri Sekolah Impian 2</a></li>
					<li><a href="https://youtu.be/ufnjqXq4MZc" target="_blank" rel="noopener">3. Tonton Video Prototype Santri Sekolah Impian 3</a></li>
					<li><a href="https://youtu.be/nv4x9TEXXU4" target="_blank" rel="noopener">4. Tonton Video Prototype Santri Sekolah Impian 4</a></li>
				</ol>
				<p class="mt-4">Untuk video-video lainnya dapat disaksikan di <a href="${SOCIAL.youtube}" target="_blank" rel="noopener">${SOCIAL.youtube}</a></p>`
		}
	];

	const faqJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() }
		}))
	}).replace(/</g, '\\u003c');
</script>

<Seo
	title="Islamic IT School - Buku Seri Teknologi Islami | Pendidikan IT Berkualitas"
	description="Buku Seri Teknologi Islami menyajikan strategi pengajaran IT yang telah terbukti selama 8 tahun di Sekolah Impian. Dirancang untuk membentuk generasi yang sholeh, kritis, dan unggul dalam teknologi."
/>
<svelte:head>
	{@html `<script type="application/ld+json">${faqJsonLd}</script>`}
</svelte:head>

<main>
	<section id="home" class="bg-white px-6 pb-16 md:px-12 lg:px-16 lg:pb-32">
		<div class="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
			<div class="order-last max-w-lg lg:order-first">
				<h1 class="mb-4 text-3xl leading-tight font-black text-gray-900 md:text-4xl lg:text-5xl">
					Buku Seri Teknologi Islami
				</h1>
				<p class="mb-6 leading-relaxed font-medium text-gray-600">
					Buku Seri Teknologi Islami, adalah buku yang berisi strategi ajar bidang Teknologi Informasi (IT).
				</p>
				<a
					href="#daftar-sekolah"
					class="inline-block rounded-xl bg-gray-900 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-gray-700"
				>
					Selengkapnya
				</a>
			</div>
			<div class="order-first mt-6 lg:mt-0">
				<BookShowcase />
			</div>
		</div>
	</section>

	<section class="bg-white px-3 py-10 md:px-20">
		<div class="mx-auto grid max-w-7xl items-center gap-8 px-5 lg:grid-cols-2">
			<div
				class={[
					'mx-auto flex w-full items-center justify-center overflow-hidden rounded-xl bg-gray-100 shadow-lg',
					portrait ? 'max-w-[400px]' : 'max-w-[600px]'
				]}
			>
				{#if promoVideo}
					<video
						autoplay
						loop
						muted
						playsinline
						controls
						class="h-auto max-h-[80vh] w-full object-contain"
						onloadedmetadata={(e) => (portrait = e.currentTarget.videoWidth <= e.currentTarget.videoHeight)}
					>
						<source src={promoVideo} type="video/mp4" />
					</video>
				{:else}
					<img src="/img/7buku-seri-teknologi.png" alt="Paket Buku Seri Teknologi Islami" loading="lazy" class="w-full object-contain p-6" />
				{/if}
			</div>

			<div class="space-y-4">
				<h2 class="text-3xl leading-tight font-black text-gray-900">Kenali Lebih Dekat Buku Seri Teknologi Islami</h2>
				<p class="leading-relaxed text-gray-500">
					Negara paling maju di dunia adalah yang paling menguasai teknologi. Sedangkan negara yang paling tertinggal
					adalah negara yang akses teknologinya paling terbatas. Begitu juga dengan manusia, yang akan menguasai zaman
					adalah mereka yang menguasai teknologi.
				</p>
				<p class="leading-relaxed text-gray-500">
					Untuk menyiapkan generasi yang siap menguasai zaman, kita butuh modul ajar teknologi yang efektif dan proven.
					Sehingga mereka mampu bersaing di ranah global
				</p>
				<p class="leading-relaxed font-bold text-gray-500">
					Dapatkan Paket Seri Teknologi Islami dan mari siapkan ananda untuk bersaing di era teknologi
				</p>
				<div class="flex flex-wrap gap-4 pt-2">
					<a
						href="/buku"
						class="inline-block rounded-xl bg-gray-900 px-5 py-2.5 font-semibold text-white transition hover:-translate-y-1 hover:bg-gray-600"
					>
						Dapatkan Sekarang
					</a>
					<a
						href="https://www.instagram.com/reel/DMZ9zeYRe4Z/"
						target="_blank"
						rel="noopener"
						class="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 transition hover:-translate-y-1"
					>
						<span class="icon-[bxl--instagram] size-4"></span>
						Lihat di Instagram
					</a>
				</div>
			</div>
		</div>
	</section>

	<section id="daftar-sekolah" class="mt-10 bg-white px-3 py-5 md:px-[100px] md:py-10">
		<div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
			{#each audiences as card (card.cta)}
				<article
					class="flex h-full flex-col justify-between rounded-2xl bg-linear-to-br p-6 text-white shadow-lg transition-transform duration-300 hover:scale-105 {card.gradient}"
				>
					<div>
						<div class="mx-auto mb-6 flex size-16 items-center justify-center rounded-xl bg-white/20">
							<span class="size-8 {card.icon}"></span>
						</div>
						{#each card.lines as line (line)}
							<h3 class="mb-3 text-center text-xl font-bold">{line}</h3>
						{/each}
					</div>
					<div class="text-center">
						<a
							href={card.href}
							class="inline-block rounded-xl bg-white px-6 py-3 font-semibold shadow-md transition-colors duration-300 hover:bg-white/20 hover:text-white {card.text}"
						>
							{card.cta}
						</a>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="bg-linear-to-br from-blue-50 via-purple-50 to-green-50 py-16">
		<div class="mx-auto max-w-4xl px-4">
			<div class="mb-12 text-center">
				<div class="gradient-bg mx-auto mb-4 flex size-16 animate-bounce items-center justify-center rounded-full">
					<span class="icon-[bx--help-circle] size-8 text-white"></span>
				</div>
				<h2 class="gradient-text mb-4 text-4xl leading-normal font-bold">Pertanyaan yang Sering Ditanyakan</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					Temukan jawaban untuk pertanyaan-pertanyaan umum tentang buku kami
				</p>
			</div>

			<Faq items={faqs} />

			<div class="mt-12 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg">
				<h3 class="mb-4 text-2xl font-bold text-gray-800">Masih Ada Pertanyaan?</h3>
				<p class="mb-6 text-gray-600">Tim kami siap membantu menjawab pertanyaan Anda tentang buku kami</p>
				<a
					href={waLink('Halo Admin, saya ingin bertanya tentang buku seri teknologi. Bisakah Anda memberikan informasi lebih lanjut?')}
					target="_blank"
					rel="noopener"
					class="gradient-bg inline-block rounded-xl px-8 py-3 font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105"
				>
					Hubungi Kami via WhatsApp
				</a>
			</div>
		</div>
	</section>
</main>
