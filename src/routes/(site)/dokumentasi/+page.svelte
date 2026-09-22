<script lang="ts">
	import ScrollTopButton from '$lib/components/ScrollTopButton.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { reveal } from '$lib/reveal';
	import { SOCIAL, waLink } from '$lib/site';

	const programs = [
		{ name: 'Web Development', track: 'Fullstack Developer', icon: 'icon-[bx--code-alt]', grad: 'from-blue-500 to-purple-600', text: 'Pelajari HTML, CSS, JavaScript, React, Node.js, dan database untuk menjadi developer fullstack yang handal dan siap kerja.', perks: ['12 Minggu Intensif', 'Sertifikat Internasional', 'Job Placement Assistance', 'Portfolio 5 Proyek'], price: 'Rp 2.500.000', was: 'Rp 3.500.000', save: 'Hemat 30%' },
		{ name: 'Mobile App Development', track: 'Flutter & React Native', icon: 'icon-[bx--mobile-alt]', grad: 'from-green-500 to-teal-600', text: 'Kuasai pembuatan aplikasi mobile cross-platform dengan Flutter dan React Native untuk Android & iOS marketplace.', perks: ['10 Minggu Intensif', 'Publish ke Play Store & App Store', 'Portfolio 3 Aplikasi', 'Mentorship 1-on-1'], price: 'Rp 2.800.000', was: 'Rp 3.800.000', save: 'Hemat 26%' },
		{ name: 'Data Science', track: 'AI & Machine Learning', icon: 'icon-[bx--data]', grad: 'from-purple-500 to-pink-600', text: 'Pelajari Python, pandas, scikit-learn, TensorFlow untuk menganalisis data dan membangun model machine learning canggih.', perks: ['14 Minggu Intensif', 'Capstone Project', 'Mentorship Expert', 'Kaggle Competition'], price: 'Rp 3.200.000', was: 'Rp 4.500.000', save: 'Hemat 29%' },
		{ name: 'UI/UX Design', track: 'Digital Product Design', icon: 'icon-[bx--palette]', grad: 'from-orange-500 to-red-600', text: 'Kuasai Figma, Adobe XD, user research, wireframing, dan prototyping untuk menciptakan desain yang user-friendly dan convert tinggi.', perks: ['8 Minggu Intensif', 'Portfolio 5 Proyek', 'Design System Creation', 'User Testing Workshop'], price: 'Rp 2.200.000', was: 'Rp 3.000.000', save: 'Hemat 27%' },
		{ name: 'Cybersecurity', track: 'Ethical Hacking', icon: 'icon-[bx--shield]', grad: 'from-red-500 to-orange-600', text: 'Pelajari penetration testing, vulnerability assessment, dan network security untuk menjadi cybersecurity expert yang dicari industri.', perks: ['16 Minggu Intensif', 'Hands-on Lab Sessions', 'Industry Certification Prep', 'Red Team Simulation'], price: 'Rp 3.500.000', was: 'Rp 4.800.000', save: 'Hemat 27%' },
		{ name: 'DevOps Engineering', track: 'Cloud & Infrastructure', icon: 'icon-[bx--server]', grad: 'from-teal-500 to-blue-600', text: 'Kuasai Docker, Kubernetes, AWS, CI/CD, dan automation untuk mengelola infrastruktur cloud modern dan scalable.', perks: ['12 Minggu Intensif', 'AWS Certification Prep', 'Real-world Projects', 'Kubernetes Mastery'], price: 'Rp 3.500.000', was: 'Rp 4.800.000', save: 'Hemat 27%' }
	];

	const filters = [
		{ id: 'all', label: 'Semua', emoji: '🔳', icon: 'icon-[bx--grid-alt]' },
		{ id: 'seminar', label: 'Seminar', emoji: '🎤', icon: 'icon-[bx--microphone]' },
		{ id: 'praktik', label: 'Praktik', emoji: '💻', icon: 'icon-[bx--code-alt]' },
		{ id: 'diskusi', label: 'Diskusi', emoji: '👥', icon: 'icon-[bx--group]' },
		{ id: 'workshop', label: 'Workshop', emoji: '🛠', icon: 'icon-[bx--wrench]' },
		{ id: 'sertifikat', label: 'Sertifikat', emoji: '🏅', icon: 'icon-[bx--award]' }
	];

	const photos = [
		{ src: '/img/webinar.JPG', category: 'seminar', badge: 'bg-orange-500', date: '12 Jan 2024', title: 'Seminar IT Bersertifikat', text: 'Seminar interaktif dengan pembicara ahli di bidang teknologi informasi terkini' },
		{ src: '/img/BedahBuku.JPG', category: 'diskusi', badge: 'bg-teal-500', date: '15 Jan 2024', title: 'Sesi Bedah Buku', text: 'Diskusi mendalam tentang konsep-konsep penting dalam literatur IT terbaru' },
		{ src: '/img/praktekIt.JPG', category: 'praktik', badge: 'bg-purple-500', date: '18 Jan 2024', title: 'Praktek Lab IT', text: 'Pengalaman hands-on dengan teknologi terbaru dalam lingkungan lab yang modern' }
	];

	let filter = $state('all');
	const shown = $derived(photos.filter((p) => filter === 'all' || p.category === filter));
</script>

<Seo
	title="Pelatihan IT Terbaik - Sekolah Impian"
	description="Program pelatihan IT dan dokumentasi kegiatan pembelajaran Sekolah Impian."
/>

<main class="bg-linear-to-br from-slate-50 to-slate-200">
	<section class="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
		<p class="mb-6 inline-flex animate-pulse-slow items-center gap-2 rounded-full bg-linear-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
			<span class="icon-[bx--rocket]"></span> Program Pelatihan Terbaik
		</p>
		<h1 class="mb-8 text-4xl leading-tight font-extrabold md:text-6xl lg:text-7xl">
			<span class="gradient-text">Pelatihan IT</span><br />
			<span class="text-gray-800">Masa Depan Dimulai Dari Sini</span>
		</h1>
		<p class="mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-gray-600">
			Bergabunglah dengan ribuan peserta yang telah sukses mengembangkan karir IT mereka melalui program pelatihan
			komprehensif dan bersertifikat internasional
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<a href="#programs" class="rounded-xl bg-linear-to-r from-orange-500 to-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-orange-600 hover:to-teal-700 hover:shadow-2xl">
				Lihat Program
			</a>
			<a href="#gallery" class="rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-gray-700 shadow-md transition-all duration-300 hover:border-orange-500 hover:text-orange-500 hover:shadow-lg">
				Dokumentasi
			</a>
		</div>
	</section>

	<section id="programs" class="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-bold md:text-5xl"><span class="gradient-text">Program Pelatihan Unggulan</span></h2>
			<p class="text-xl text-gray-600">Pilih program yang sesuai dengan tujuan karir Anda</p>
		</div>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each programs as p (p.name)}
				<article class="flex flex-col rounded-3xl border border-white/20 bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
					<div class="mb-6 flex items-center gap-4">
						<div class="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-r shadow-lg {p.grad}">
							<span class="{p.icon} size-7 text-white"></span>
						</div>
						<div>
							<h3 class="text-2xl font-bold text-gray-800">{p.name}</h3>
							<p class="font-semibold text-orange-500">{p.track}</p>
						</div>
					</div>
					<p class="mb-6 leading-relaxed text-gray-600">{p.text}</p>
					<ul class="mb-8 space-y-3">
						{#each p.perks as perk (perk)}
							<li class="flex items-center gap-3 text-gray-600">
								<span class="icon-[bx--check-circle] size-5 text-green-500"></span>{perk}
							</li>
						{/each}
					</ul>
					<div class="mt-auto mb-6 flex flex-wrap items-center justify-between gap-2">
						<p>
							<span class="gradient-text text-3xl font-bold">{p.price}</span>
							<s class="ml-2 text-lg text-gray-400">{p.was}</s>
						</p>
						<span class="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">{p.save}</span>
					</div>
					<a
						href={waLink(`Halo, saya mau daftar program pelatihan ${p.name}!`)}
						target="_blank"
						rel="noopener"
						class="w-full rounded-xl bg-linear-to-r from-orange-500 to-teal-600 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-teal-700 hover:shadow-xl"
					>
						Daftar Sekarang
					</a>
				</article>
			{/each}
		</div>
	</section>

	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
		<header class="mb-16 text-center" {@attach reveal}>
			<p class="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-linear-135 from-orange-500/10 to-teal-600/10 px-4 py-2 text-sm font-semibold">
				<span class="icon-[bx--camera] text-orange-500"></span> Galeri Pembelajaran
			</p>
			<h2 class="relative mb-6 inline-block text-3xl font-extrabold tracking-wide text-gray-900 md:text-4xl lg:text-5xl">
				Dokumentasi Pembelajaran
				<span class="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-linear-to-r from-orange-500 to-teal-500"></span>
			</h2>
			<p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
				Kumpulan momen terbaik dari proses belajar, kolaborasi, dan pencapaian peserta dalam berbagai program pelatihan
				IT kami
			</p>
		</header>

		<label class="mb-4 block md:hidden">
			<span class="sr-only">Filter kategori</span>
			<select bind:value={filter} class="w-full rounded-lg bg-white/80 px-4 py-3 font-semibold shadow">
				{#each filters as f (f.id)}
					<option value={f.id}>{f.emoji} {f.label}</option>
				{/each}
			</select>
		</label>
		<div class="mb-12 hidden flex-wrap justify-center gap-4 md:flex" role="group" aria-label="Filter kategori">
			{#each filters as f (f.id)}
				<button
					aria-pressed={filter === f.id}
					class={[
						'flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-300',
						filter === f.id
							? 'gradient-bg text-white shadow-[0_4px_15px_rgb(249_115_22/0.3)]'
							: 'bg-white/70 hover:bg-orange-500/10 hover:text-orange-500'
					]}
					onclick={() => (filter = f.id)}
				>
					<span class={f.icon}></span>{f.label}
				</button>
			{/each}
		</div>

		<section id="gallery" class="grid scroll-mt-24 grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
			{#each shown as photo (photo.src)}
				<figure class="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/80 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
					<img src={photo.src} alt={photo.title} class="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
					<figcaption class="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
						<p class="mb-2 flex items-center gap-2">
							<span class="rounded-full px-2 py-1 text-xs font-semibold uppercase {photo.badge}">{photo.category}</span>
							<span class="text-xs text-gray-200">{photo.date}</span>
						</p>
						<h3 class="mb-2 text-lg font-bold">{photo.title}</h3>
						<span class="mb-2 h-1 w-16 rounded-full bg-linear-to-r from-orange-400 to-teal-500"></span>
						<p class="text-sm text-gray-200">{photo.text}</p>
					</figcaption>
				</figure>
			{:else}
				<p class="col-span-full py-12 text-center text-gray-500">Belum ada dokumentasi untuk kategori ini.</p>
			{/each}
		</section>

		<div class="mt-20 rounded-3xl border border-orange-200/50 bg-linear-to-r from-orange-500/10 to-teal-500/10 p-12 text-center" {@attach reveal}>
			<h2 class="gradient-text mb-6 text-3xl font-bold">Bergabung dengan Program Pelatihan Kami</h2>
			<p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
				Jadilah bagian dari komunitas pembelajar yang terus berkembang dan raih kesempatan untuk mengembangkan karir IT Anda
				bersama mentor berpengalaman
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href={waLink('Halo, saya mau daftar kelas pembelajaran ini!')}
					target="_blank"
					rel="noopener"
					class="gradient-bg inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
				>
					<span class="icon-[bxl--whatsapp] size-6"></span> Daftar Sekarang
				</a>
				<a href="#gallery" class="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-gray-700 shadow-md transition-all hover:border-orange-500 hover:text-orange-500 hover:shadow-lg">
					<span class="icon-[bx--images] size-6"></span> Lihat Galeri
				</a>
			</div>
		</div>
	</div>
</main>

<footer class="mt-20 bg-gray-900 py-12 text-white">
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3">
		<div>
			<p class="mb-4 flex items-center gap-3 text-xl font-bold">
				<img class="w-16" src="/img/Logo-Sekolah-Impian.png" alt="" width="64" height="64" loading="lazy" /> Sekolah Impian
			</p>
			<p class="leading-relaxed text-gray-400">Menciptakan generasi IT yang kompeten dan siap menghadapi tantangan teknologi masa depan</p>
		</div>
		<div>
			<h2 class="mb-4 text-lg font-semibold">Kontak</h2>
			<ul class="space-y-2 text-gray-400">
				<li class="flex items-center gap-2"><span class="icon-[bxl--whatsapp]"></span>+62 851-6123-1559</li>
				<li class="flex items-center gap-2"><span class="icon-[bx--envelope]"></span>info@sekolahimpian.com</li>
				<li class="flex items-center gap-2"><span class="icon-[bx--map]"></span>Indonesia</li>
			</ul>
		</div>
		<div>
			<h2 class="mb-4 text-lg font-semibold">Ikuti Kami</h2>
			<div class="flex gap-4 text-gray-400">
				<a href={SOCIAL.instagram} target="_blank" rel="noopener" aria-label="Instagram" class="transition-colors hover:text-white"><span class="icon-[bxl--instagram] size-7"></span></a>
				<a href={SOCIAL.youtube} target="_blank" rel="noopener" aria-label="YouTube" class="transition-colors hover:text-white"><span class="icon-[bxl--youtube] size-7"></span></a>
				<a href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp" class="transition-colors hover:text-white"><span class="icon-[bxl--whatsapp] size-7"></span></a>
			</div>
		</div>
	</div>
</footer>

<ScrollTopButton />
