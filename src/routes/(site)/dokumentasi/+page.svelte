<script lang="ts">
	import ScrollTopButton from '$lib/components/ScrollTopButton.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { reveal } from '$lib/reveal';
	import { waLink } from '$lib/site';

	const programs = [
		{ name: 'Web Development', track: 'Fullstack Developer', icon: 'icon-[lucide--code-xml]', text: 'HTML, CSS, JavaScript, React, Node.js, dan database untuk menjadi developer fullstack yang siap kerja.', perks: ['12 minggu intensif', 'Sertifikat internasional', 'Job placement assistance', 'Portfolio 5 proyek'], price: 2_500_000, was: 3_500_000 },
		{ name: 'Mobile App Development', track: 'Flutter & React Native', icon: 'icon-[lucide--smartphone]', text: 'Membangun aplikasi mobile cross-platform untuk Android dan iOS, sampai terbit di marketplace.', perks: ['10 minggu intensif', 'Publish ke Play Store & App Store', 'Portfolio 3 aplikasi', 'Mentorship 1-on-1'], price: 2_800_000, was: 3_800_000 },
		{ name: 'Data Science', track: 'AI & Machine Learning', icon: 'icon-[lucide--chart-scatter]', text: 'Python, pandas, scikit-learn, dan TensorFlow untuk menganalisis data dan membangun model machine learning.', perks: ['14 minggu intensif', 'Capstone project', 'Mentorship expert', 'Kaggle competition'], price: 3_200_000, was: 4_500_000 },
		{ name: 'UI/UX Design', track: 'Digital Product Design', icon: 'icon-[lucide--pen-tool]', text: 'Figma, user research, wireframing, dan prototyping untuk desain yang mudah dipakai dan berdampak.', perks: ['8 minggu intensif', 'Portfolio 5 proyek', 'Design system', 'User testing workshop'], price: 2_200_000, was: 3_000_000 },
		{ name: 'Cybersecurity', track: 'Ethical Hacking', icon: 'icon-[lucide--shield-check]', text: 'Penetration testing, vulnerability assessment, dan network security untuk jadi praktisi keamanan siber.', perks: ['16 minggu intensif', 'Hands-on lab', 'Persiapan sertifikasi industri', 'Red team simulation'], price: 3_500_000, was: 4_800_000 },
		{ name: 'DevOps Engineering', track: 'Cloud & Infrastructure', icon: 'icon-[lucide--server]', text: 'Docker, Kubernetes, AWS, CI/CD, dan automation untuk mengelola infrastruktur cloud modern.', perks: ['12 minggu intensif', 'Persiapan sertifikasi AWS', 'Proyek nyata', 'Kubernetes mastery'], price: 3_500_000, was: 4_800_000 }
	];

	const filters = [
		{ id: 'all', label: 'Semua', icon: 'icon-[lucide--layout-grid]' },
		{ id: 'seminar', label: 'Seminar', icon: 'icon-[lucide--mic]' },
		{ id: 'praktik', label: 'Praktik', icon: 'icon-[lucide--monitor]' },
		{ id: 'diskusi', label: 'Diskusi', icon: 'icon-[lucide--users]' },
		{ id: 'workshop', label: 'Workshop', icon: 'icon-[lucide--wrench]' },
		{ id: 'sertifikat', label: 'Sertifikat', icon: 'icon-[lucide--award]' }
	];

	const photos = [
		{ src: '/img/webinar.JPG', category: 'seminar', date: '12 Jan 2024', title: 'Seminar IT bersertifikat', text: 'Seminar interaktif dengan pembicara ahli di bidang teknologi informasi terkini.' },
		{ src: '/img/BedahBuku.JPG', category: 'diskusi', date: '15 Jan 2024', title: 'Sesi bedah buku', text: 'Diskusi mendalam tentang konsep-konsep penting dalam literatur IT terbaru.' },
		{ src: '/img/praktekIt.JPG', category: 'praktik', date: '18 Jan 2024', title: 'Praktik lab IT', text: 'Pengalaman langsung dengan teknologi terbaru di lingkungan lab yang modern.' }
	];

	let filter = $state('all');
	const shown = $derived(photos.filter((p) => filter === 'all' || p.category === filter));
	const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
	const save = (p: number, was: number) => Math.round((1 - p / was) * 100);
</script>

<Seo
	title="Pelatihan IT & Dokumentasi — Khwarizmi"
	description="Program pelatihan IT intensif dan dokumentasi kegiatan pembelajaran Khwarizmi."
/>

<main>
	<section class="shell grid items-end gap-8 pt-12 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
		<div>
			<p class="label mb-5 flex items-center gap-2 text-signal">
				<span class="icon-[lucide--graduation-cap] size-4"></span>Program pelatihan
			</p>
			<h1 class="text-hero font-semibold">Pelatihan IT intensif, dengan pendamping.</h1>
		</div>
		<div>
			<p class="max-w-[44ch] text-lede text-muted">
				Program bersertifikat untuk yang ingin serius berkarier di bidang teknologi — dari web sampai keamanan siber.
			</p>
			<div class="mt-7 flex flex-wrap gap-3">
				<a href="#program" class="btn btn-signal">Lihat program<span class="icon-[lucide--arrow-down] size-4"></span></a>
				<a href="#galeri" class="btn btn-outline">Dokumentasi kegiatan</a>
			</div>
		</div>
	</section>

	<section id="program" class="rule scroll-mt-24">
		<div class="shell band">
			<ul class="grid gap-px overflow-hidden rounded-lg bg-line md:grid-cols-2 lg:grid-cols-3">
				{#each programs as p (p.name)}
					<li class="flex flex-col bg-bg p-7 lg:p-8" {@attach reveal}>
						<span class="{p.icon} size-6 text-signal"></span>
						<h2 class="mt-5 text-head font-semibold">{p.name}</h2>
						<p class="mt-1 text-sm text-signal">{p.track}</p>
						<p class="mt-3 leading-relaxed text-muted">{p.text}</p>

						<ul class="mt-6 flex-1 space-y-2">
							{#each p.perks as perk (perk)}
								<li class="flex items-start gap-2.5 text-sm text-muted">
									<span class="icon-[lucide--check] mt-0.5 size-4 shrink-0 text-signal"></span>{perk}
								</li>
							{/each}
						</ul>

						<div class="rule mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-5">
							<span class="font-display text-xl font-semibold">{rp(p.price)}</span>
							<s class="text-sm text-muted">{rp(p.was)}</s>
							<span class="ml-auto text-sm font-medium text-signal">Hemat {save(p.price, p.was)}%</span>
						</div>
						<a href={waLink(`Halo, saya mau daftar program pelatihan ${p.name}.`)} target="_blank" rel="noopener" class="btn btn-outline mt-5">
							Daftar sekarang<span class="icon-[lucide--arrow-right] size-4"></span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section id="galeri" class="rule scroll-mt-24">
		<div class="shell band">
			<div class="flex flex-wrap items-end justify-between gap-6" {@attach reveal}>
				<div class="max-w-xl">
					<h2 class="text-title font-semibold">Dokumentasi pembelajaran</h2>
					<p class="mt-4 text-lede text-muted">Momen dari kelas, diskusi, dan praktik peserta kami.</p>
				</div>

				<div class="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
					{#each filters as f (f.id)}
						<button
							aria-pressed={filter === f.id}
							class={[
								'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors',
								filter === f.id ? 'border-fg bg-fg text-bg' : 'border-line text-muted hover:border-fg hover:text-fg'
							]}
							onclick={() => (filter = f.id)}
						>
							<span class="{f.icon} size-3.5"></span>{f.label}
						</button>
					{/each}
				</div>
			</div>

			<ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each shown as photo (photo.src)}
					<li class="group overflow-hidden rounded-lg bg-surface-2">
						<figure>
							<img src={photo.src} alt={photo.title} class="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
							<figcaption class="p-6">
								<p class="flex items-center gap-2 text-xs text-muted">
									<span class="rounded-full bg-signal/12 px-2 py-0.5 font-medium text-signal uppercase">{photo.category}</span>
									{photo.date}
								</p>
								<h3 class="mt-3 font-display text-lg font-semibold">{photo.title}</h3>
								<p class="mt-1.5 leading-relaxed text-muted">{photo.text}</p>
							</figcaption>
						</figure>
					</li>
				{:else}
					<li class="col-span-full rule py-14 text-center text-muted">
						<span class="icon-[lucide--image-off] mx-auto mb-3 block size-6"></span>
						Belum ada dokumentasi untuk kategori ini.
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="rule">
		<div class="shell band">
			<div class="grid items-center gap-8 rounded-xl bg-surface p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-14" {@attach reveal}>
				<div>
					<h2 class="text-title font-semibold">Bergabung dengan program pelatihan kami</h2>
					<p class="mt-4 text-lede text-muted">
						Jadilah bagian dari komunitas pembelajar yang terus berkembang, bersama mentor yang mendampingi sampai
						proyek Anda jadi.
					</p>
				</div>
				<div class="flex flex-col gap-3">
					<a href={waLink('Halo, saya mau daftar kelas pembelajaran ini.')} target="_blank" rel="noopener" class="btn btn-signal">
						<span class="icon-[lucide--message-circle] size-4"></span>Daftar sekarang
					</a>
					<a href="#galeri" class="btn btn-outline">Lihat galeri</a>
				</div>
			</div>
		</div>
	</section>
</main>

<ScrollTopButton />
