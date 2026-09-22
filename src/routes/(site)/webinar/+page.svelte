<script lang="ts">
	import ScrollTopButton from '$lib/components/ScrollTopButton.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { waLink } from '$lib/site';

	const audiences = [
		{ title: 'Orang Tua', icon: 'icon-[bx--heart]', bg: 'from-orange-50 to-orange-100', dot: 'bg-orange-500', points: ['Memahami perkembangan anak di era digital', 'Tips mendampingi belajar online', 'Memilih sekolah yang tepat', 'Komunikasi efektif dengan guru', 'Mengembangkan karakter anak'] },
		{ title: 'Guru & Pengajar', icon: 'icon-[bx--chalkboard]', bg: 'from-teal-50 to-teal-100', dot: 'bg-teal-500', points: ['Metode pembelajaran inovatif', 'Teknologi dalam pendidikan', 'Manajemen kelas digital', 'Penilaian berbasis kompetensi', 'Pengembangan kurikulum'] },
		{ title: 'Penyelenggara Pendidikan', icon: 'icon-[bx--buildings]', bg: 'from-purple-50 to-purple-100', dot: 'bg-purple-500', points: ['Strategi digitalisasi sekolah', 'Manajemen lembaga pendidikan', 'Regulasi pendidikan terbaru', 'Kemitraan dengan orang tua', 'Peningkatan kualitas pendidikan'] }
	];

	const SPEAKER = 'Ust. Purwanto Abdul Ghafar';
	const schedule = [
		{ title: 'Pendidikan Karakter di Era Digital', text: 'Bagaimana membangun karakter anak di tengah dominasi teknologi', icon: 'icon-[bx--calendar] text-orange-600', btn: 'bg-orange-500 hover:bg-orange-600' },
		{ title: 'Teknologi AI dalam Pembelajaran', text: 'Memanfaatkan kecerdasan buatan untuk meningkatkan kualitas belajar', icon: 'icon-[bx--laptop] text-teal-600', btn: 'bg-teal-500 hover:bg-teal-600' },
		{ title: 'Kemitraan Orang Tua dan Sekolah', text: 'Membangun komunikasi yang efektif antara rumah dan sekolah', icon: 'icon-[bx--home-heart] text-purple-600', btn: 'bg-purple-500 hover:bg-purple-600' },
		{ title: 'Metode Pembelajaran Abad 21', text: 'Strategi mengajar yang relevan dengan tuntutan masa depan', icon: 'icon-[bx--brain] text-pink-600', btn: 'bg-pink-500 hover:bg-pink-600' }
	];

	const reasons = [
		{ title: 'Biaya Terjangkau', text: 'Investasi kecil untuk manfaat besar', icon: 'icon-[bx--gift] text-orange-600', bg: 'bg-orange-100' },
		{ title: 'Sertifikat Resmi', text: 'Dapatkan sertifikat kehadiran', icon: 'icon-[bx--badge-check] text-teal-600', bg: 'bg-teal-100' },
		{ title: 'Rekaman Tersedia', text: 'Tonton ulang kapan saja', icon: 'icon-[bx--play-circle] text-purple-600', bg: 'bg-purple-100' },
		{ title: 'Diskusi Interaktif', text: 'Tanya jawab langsung dengan expert', icon: 'icon-[bx--support] text-pink-600', bg: 'bg-pink-100' }
	];
</script>

<Seo
	title="Webinar Pendidikan Online - Sekolah Impian"
	description="Diskusi dan seminar online untuk orang tua, guru, dan penyelenggara pendidikan."
/>

<main class="bg-linear-135 from-slate-50 to-slate-200">
	<section class="relative overflow-hidden px-4 pt-20 pb-16">
		<div class="mx-auto max-w-6xl text-center">
			<span class="icon-[bx--video] absolute top-20 left-10 size-10 animate-float-soft text-orange-400 opacity-20"></span>
			<span class="icon-[bx--group] absolute top-32 right-20 size-10 animate-float-soft text-teal-400 opacity-20 [animation-delay:1s]"></span>
			<span class="icon-[bx--book-open] absolute bottom-20 left-20 size-10 animate-float-soft text-orange-400 opacity-20 [animation-delay:2s]"></span>

			<h1 class="relative mb-6 text-3xl font-extrabold md:text-5xl lg:text-6xl">
				<span class="gradient-text">Webinar Pendidikan</span><br />
				<span class="text-gray-800">Masa Depan Gemilang</span>
			</h1>
			<p class="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl">
				Bergabunglah dengan <strong>ribuan orang tua, guru, dan penyelenggara pendidikan</strong> dalam diskusi dan seminar
				online yang akan mengubah cara pandang Anda tentang pendidikan modern
			</p>
			<div class="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
				<a href="#daftar" class="webinar-btn flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl">
					<span class="icon-[bx--video-recording] size-6"></span> Daftar Webinar
				</a>
				<a href="#jadwal" class="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-gray-800 shadow-lg transition-all hover:shadow-xl">
					<span class="icon-[bx--calendar] size-6"></span> Lihat Jadwal
				</a>
			</div>
		</div>
	</section>

	<section class="bg-white px-4 py-16">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-4 text-center text-3xl font-bold md:text-4xl"><span class="gradient-text">Untuk Siapa</span> Webinar Ini?</h2>
			<p class="mb-12 text-center text-lg text-gray-600">Dirancang khusus untuk komunitas pendidikan Indonesia</p>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				{#each audiences as a (a.title)}
					<div class="webinar-card rounded-2xl bg-linear-to-br p-8 text-center {a.bg}">
						<div class="mx-auto mb-6 flex size-20 items-center justify-center rounded-full {a.dot}">
							<span class="{a.icon} size-8 text-white"></span>
						</div>
						<h3 class="mb-4 text-2xl font-bold text-gray-800">{a.title}</h3>
						<ul class="space-y-2 text-left text-gray-600">
							{#each a.points as p (p)}
								<li>✓ {p}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section id="jadwal" class="scroll-mt-24 bg-gray-50 px-4 py-16">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-4 text-center text-3xl font-bold md:text-4xl"><span class="gradient-text">Jadwal Webinar</span> Terbaru</h2>
			<p class="mb-12 text-center text-lg text-gray-600">Webinar rutin setiap minggu dengan topik yang berbeda</p>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				{#each schedule as w (w.title)}
					<article class="webinar-card flex items-start gap-4 rounded-2xl bg-white p-6 shadow-lg">
						<div class="pulse-bg flex size-16 shrink-0 items-center justify-center rounded-full">
							<span class="{w.icon} size-7"></span>
						</div>
						<div class="flex-1">
							<h3 class="mb-2 text-xl font-bold text-gray-800">{w.title}</h3>
							<p class="mb-3 text-gray-600">{w.text}</p>
							<ul class="space-y-1 text-sm text-gray-500">
								<li class="flex items-center gap-2"><span class="icon-[bx--time]"></span>Coming Soon</li>
								<li class="flex items-center gap-2"><span class="icon-[bx--user]"></span>{SPEAKER}</li>
								<li class="flex items-center gap-2"><span class="icon-[bx--group]"></span>-</li>
							</ul>
							<a
								href={waLink(`Halo, saya mau daftar webinar "${w.title}"`)}
								target="_blank"
								rel="noopener"
								class="mt-4 inline-block rounded-lg px-4 py-2 font-semibold text-white transition-colors {w.btn}"
							>
								Daftar Sekarang
							</a>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="bg-white px-4 py-16">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-12 text-center text-3xl font-bold md:text-4xl"><span class="gradient-text">Mengapa Memilih</span> Webinar Kami?</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each reasons as r (r.title)}
					<div class="p-6 text-center">
						<div class="mx-auto mb-4 flex size-16 items-center justify-center rounded-full {r.bg}">
							<span class="{r.icon} size-7"></span>
						</div>
						<h3 class="mb-2 font-bold text-gray-800">{r.title}</h3>
						<p class="text-sm text-gray-600">{r.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section id="daftar" class="scroll-mt-24 bg-linear-to-br from-orange-500 to-teal-600 px-4 py-20">
		<div class="mx-auto max-w-4xl text-center text-white">
			<h2 class="mb-6 text-3xl font-bold md:text-5xl">Siap Bergabung dengan Komunitas Pendidikan Terdepan?</h2>
			<p class="mb-8 text-xl opacity-90 md:text-2xl">Daftar sekarang dan jadilah bagian dari revolusi pendidikan Indonesia!</p>
			<a
				href={waLink('Halo, saya mau daftar webinar pendidikan!')}
				class="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-orange-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
			>
				<span class="icon-[bxl--whatsapp] size-6"></span> Daftar via WhatsApp
			</a>
			<p class="mt-6 text-sm opacity-80">*Kapasitas terbatas! Daftar sekarang untuk mengamankan tempat Anda</p>
		</div>
	</section>
</main>

<ScrollTopButton />

<style>
	.webinar-btn {
		background: linear-gradient(135deg, #f97316 0%, #0d9488 100%);
	}
	.webinar-btn:hover {
		transform: translateY(-2px);
	}
	.webinar-card {
		transition:
			transform 0.4s ease,
			box-shadow 0.4s ease;
	}
	.webinar-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgb(0 0 0 / 0.1);
	}
	.pulse-bg {
		animation: pulse-bg 2s infinite;
	}
	@keyframes pulse-bg {
		0%,
		100% {
			background-color: rgb(249 115 22 / 0.1);
		}
		50% {
			background-color: rgb(13 148 136 / 0.1);
		}
	}
</style>
