<script lang="ts">
	import BookStack from '$lib/components/BookStack.svelte';
	import Faq, { type FaqItem } from '$lib/components/Faq.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { reveal } from '$lib/reveal';
	import { books } from '$lib/books';
	import { MEDIA_BASE, mediaUrl, SOCIAL, waLink } from '$lib/site';

	// The 97 MB promo video can't ship as a Worker asset; it appears once MEDIA_BASE points at its host.
	const promoVideo = MEDIA_BASE ? mediaUrl('vid/Video Iklan Buku All Revisi.mp4') : null;

	const audiences = [
		{
			icon: 'icon-[lucide--school]',
			title: 'Sekolah',
			text: 'Keseluruhan isi buku sudah diterapkan dan dijalankan selama 8 tahun di Sekolah Impian. Ayah bunda yang berminat mendaftarkan putra/putrinya, silakan daftar di sini.',
			cta: 'Profil sekolah',
			href: SOCIAL.school,
			external: true
		},
		{
			icon: 'icon-[lucide--book-open]',
			title: 'Buku',
			text: 'Orang tua, guru, dan penyelenggara pendidikan yang ingin mempelajari metode ajar kami melalui Seri Buku Teknologi Islami.',
			cta: 'Lihat koleksi buku',
			href: '/buku'
		},
		{
			icon: 'icon-[lucide--presentation]',
			title: 'Pelatihan',
			text: 'Untuk yang ingin memahami dan menyerap lebih dalam strategi dan metode pendidikan kami, langsung dari pengajarnya.',
			cta: 'Ikuti pelatihan',
			href: '/pelatihan'
		},
		{
			icon: 'icon-[lucide--calendar-days]',
			title: 'Webinar',
			text: 'Untuk yang mau bergabung dalam diskusi dan seminar pendidikan secara online bersama komunitas guru dan orang tua.',
			cta: 'Jadwal webinar',
			href: '/dokumentasi'
		},
		{
			icon: 'icon-[lucide--youtube]',
			title: 'Channel',
			text: 'Ratusan video tentang pendidikan khas Sekolah Impian, bisa ditonton kapan saja dan gratis.',
			cta: 'Tonton channel',
			href: '/channel'
		},
		{
			icon: 'icon-[lucide--code-xml]',
			title: 'Kursus',
			text: 'Ayah bunda yang ingin ananda belajar Coding, Game Developer, dan AI for Kids bersama mentor kami.',
			cta: 'Daftar kursus',
			href: '/kursus'
		}
	];

	const faqs: FaqItem[] = [
		{
			q: 'Bagaimana cara membeli buku ini?',
			a: `Anda bisa membeli buku kami melalui beberapa cara:<br><br>
				1. <strong>Marketplace</strong>: Shopee dan Lynk ID (cari dengan judul buku kami)<br>
				2. <strong>Website resmi</strong>: islamic-it-school.com<br><br>
				Jika membeli melalui affiliate dengan memasukkan kode referral yang diberikan, Anda akan mendapatkan voucher diskon 5%.`
		},
		{
			q: 'Bagaimana caranya menjadi agen affiliate?',
			a: `Cara menjadi affiliate sangat mudah:<br><br>
				1. Hubungi admin kami via WhatsApp<br>
				2. Anda akan mendapatkan link pendaftaran khusus<br>
				3. Admin akan menjelaskan seluruh prosesnya<br><br>
				Sebagai affiliate, Anda bisa memberikan kode referral kepada pembeli yang memberikan mereka diskon 5%, sementara Anda mendapatkan komisi dari setiap penjualan yang berhasil.`
		},
		{
			q: 'Apakah buku ini bisa diterapkan di rumah?',
			a: '70% strategi, metode, dan pendekatan yang ditulis di dalam buku ini bisa diterapkan di rumah oleh ayah bunda terhadap ananda. Buku ini dirancang dengan langkah-langkah praktis yang mudah diimplementasikan dalam kehidupan sehari-hari di rumah.'
		},
		{
			q: 'Apakah ada bukti nyata keberhasilan dari metode yang ditulis di dalam buku ini?',
			a: `Berikut beberapa bukti nyata keberhasilan dari strategi yang kami tulis:
				<ol>
					<li><a href="https://youtu.be/3B9cosMlnyU" target="_blank" rel="noopener">Video prototype santri Sekolah Impian 1</a></li>
					<li><a href="https://youtu.be/JdxrOfQlFmQ" target="_blank" rel="noopener">Video prototype santri Sekolah Impian 2</a></li>
					<li><a href="https://youtu.be/ufnjqXq4MZc" target="_blank" rel="noopener">Video prototype santri Sekolah Impian 3</a></li>
					<li><a href="https://youtu.be/nv4x9TEXXU4" target="_blank" rel="noopener">Video prototype santri Sekolah Impian 4</a></li>
				</ol>
				<p>Video lainnya dapat disaksikan di <a href="${SOCIAL.youtube}" target="_blank" rel="noopener">channel YouTube kami</a>.</p>`
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
	title="Khwarizmi — Buku Seri Teknologi Islami"
	description="Tujuh buku strategi ajar Teknologi Informasi yang telah dijalankan delapan tahun di Sekolah Impian, untuk guru dan orang tua."
/>
<svelte:head>
	{@html `<script type="application/ld+json">${faqJsonLd}</script>`}
</svelte:head>

<main>
	<!-- Hero -->
	<section class="relative overflow-hidden">
		<div
			class="pointer-events-none absolute inset-x-0 -top-40 h-[34rem] opacity-70"
			style="background: radial-gradient(45rem 28rem at 72% 30%, var(--color-surface-2), transparent 70%)"
			aria-hidden="true"
		></div>

		<div class="shell relative grid items-center gap-12 pt-10 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16 lg:pb-24">
			<div>
				<p class="label mb-6 flex items-center gap-2 text-signal">
					<span class="icon-[lucide--book-marked] size-4"></span>Seri Teknologi Islami
				</p>
				<h1 class="text-hero font-semibold">Tujuh buku yang mengubah cara anak bertemu teknologi.</h1>
				<p class="mt-6 max-w-[46ch] text-lede text-muted">
					Strategi ajar Teknologi Informasi yang sudah dijalankan delapan tahun di Sekolah Impian — lengkap dengan
					mental belajar, adab, dan cara memonetisasinya.
				</p>
				<div class="mt-9 flex flex-wrap gap-3">
					<a href="/buku" class="btn btn-signal">Lihat koleksi<span class="icon-[lucide--arrow-right] size-4"></span></a>
					<a href="/pelatihan" class="btn btn-outline">Ikuti pelatihan</a>
				</div>

				<dl class="rule mt-12 flex flex-wrap gap-x-12 gap-y-6 pt-6">
					{#each [['Penerbit', 'Bintang Semesta Media'], ['Penulis', 'Ust. Purwanto Abdul Ghaffar'], ['Seri', `${books.length} judul lengkap`]] as [k, v] (k)}
						<div>
							<dt class="label mb-1.5">{k}</dt>
							<dd class="font-display">{v}</dd>
						</div>
					{/each}
				</dl>
			</div>

			<BookStack />
		</div>
	</section>

	<!-- Audiences: the page steps out of the dark here, so the six routes read as a fresh chapter. -->
	<section id="mulai" class="theme-paper scroll-mt-24 bg-bg text-fg">
		<div class="shell band">
			<div class="max-w-2xl" {@attach reveal}>
				<h2 class="text-title font-semibold">Mulai dari mana?</h2>
				<p class="mt-4 text-lede text-muted">
					Satu metode, enam pintu masuk. Pilih yang paling dekat dengan peran Anda hari ini.
				</p>
			</div>

			<ul class="mt-12 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2 lg:grid-cols-3">
				{#each audiences as a (a.title)}
					<li class="group bg-bg transition-colors duration-300 hover:bg-surface">
						<a
							href={a.href}
							target={a.external ? '_blank' : undefined}
							rel={a.external ? 'noopener' : undefined}
							class="flex h-full flex-col p-7 lg:p-8"
						>
							<span class="{a.icon} size-6 text-signal"></span>
							<h3 class="mt-5 text-head font-semibold">{a.title}</h3>
							<p class="mt-3 flex-1 leading-relaxed text-muted">{a.text}</p>
							<span class="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
								{a.cta}
								<span
									class={[
										'size-4 transition-transform duration-300 group-hover:translate-x-1',
										a.external ? 'icon-[lucide--arrow-up-right]' : 'icon-[lucide--arrow-right]'
									]}
								></span>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- Story: the logo's teal, carrying its own surface rather than sitting as an accent. -->
	<section class="theme-teal bg-bg text-fg">
		<div class="shell band grid items-center gap-12 lg:grid-cols-2">
			<figure class="overflow-hidden rounded-lg bg-surface" {@attach reveal}>
				{#if promoVideo}
					<!-- svelte-ignore a11y_media_has_caption -->
					<video autoplay loop muted playsinline controls class="aspect-video w-full object-cover" src={promoVideo}></video>
				{:else}
					<img
						src="/img/7buku-seri-teknologi.png"
						alt="Paket lengkap tujuh buku Seri Teknologi Islami"
						class="aspect-video w-full object-contain p-6"
						loading="lazy"
					/>
				{/if}
			</figure>

			<div {@attach reveal}>
				<h2 class="text-title font-semibold">Menguasai zaman dimulai dari menguasai teknologi.</h2>
				<div class="mt-6 space-y-4 leading-relaxed text-muted">
					<p>
						Negara paling maju adalah yang paling menguasai teknologi; yang paling tertinggal adalah yang aksesnya
						paling terbatas. Begitu pula manusia.
					</p>
					<p>
						Untuk menyiapkan generasi yang siap menguasai zaman, kita butuh modul ajar teknologi yang efektif dan sudah
						terbukti, agar mereka mampu bersaing di ranah global.
					</p>
					<p class="font-semibold text-fg">
						Dapatkan Paket Seri Teknologi Islami, dan siapkan ananda untuk bersaing di era teknologi.
					</p>
				</div>
				<div class="mt-8 flex flex-wrap gap-3">
					<a href="/buku" class="btn btn-solid">Dapatkan sekarang<span class="icon-[lucide--arrow-right] size-4"></span></a>
					<a
						href="https://www.instagram.com/reel/DMZ9zeYRe4Z/"
						target="_blank"
						rel="noopener"
						class="btn btn-outline"
					>
						<span class="icon-[lucide--instagram] size-4"></span>Lihat di Instagram
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ: back to the dark surface so the page closes into the footer. -->
	<section class="theme-night bg-bg text-fg">
		<div class="shell band grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
			<div {@attach reveal}>
				<h2 class="text-title font-semibold">Pertanyaan yang sering ditanyakan</h2>
				<p class="mt-4 leading-relaxed text-muted">
					Belum terjawab? Tim kami membalas setiap pertanyaan lewat WhatsApp.
				</p>
				<a
					href={waLink('Halo Admin, saya ingin bertanya tentang Buku Seri Teknologi Islami.')}
					target="_blank"
					rel="noopener"
					class="btn btn-signal mt-6"
				>
					<span class="icon-[lucide--message-circle] size-4"></span>Tanya via WhatsApp
				</a>
			</div>
			<Faq items={faqs} />
		</div>
	</section>
</main>
