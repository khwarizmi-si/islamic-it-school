<script lang="ts">
	import Faq, { type FaqItem } from '$lib/components/Faq.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { reveal } from '$lib/reveal';
	import { MEDIA_BASE, mediaUrl, waLink } from '$lib/site';

	const introVideo = MEDIA_BASE ? mediaUrl('vid/itc.mp4') : null;
	let playing = $state(false);

	type Program = { icon: string; title: string; text: string; sessions: number; tag: string; onlyBogor?: boolean };
	const office: Program = { icon: 'icon-[lucide--file-spreadsheet]', title: 'Office for Kids', text: 'Menguasai Word, Excel, dan PowerPoint dengan cara yang menyenangkan.', sessions: 8, tag: 'Cocok untuk pemula' };
	const coding: Program = { icon: 'icon-[lucide--code-xml]', title: 'Coding for Kids', text: 'Belajar pemrograman sambil membuat game edukatif yang seru.', sessions: 12, tag: 'Bikin game sendiri' };
	const ai: Program = { icon: 'icon-[lucide--bot]', title: 'AI for Kids', text: 'Pengenalan AI dan cara memanfaatkannya secara sehat dan produktif.', sessions: 10, tag: 'Teknologi masa depan' };
	const game: Program = { icon: 'icon-[lucide--gamepad-2]', title: 'Game Developer', text: 'Dari sekadar pemain menjadi pembuat game yang serius.', sessions: 16, tag: 'Naik level jadi kreator' };

	const locations = {
		bogor: {
			label: 'Bogor',
			note: '6 program',
			programs: [
				office,
				coding,
				ai,
				game,
				{ icon: 'icon-[lucide--pen-tool]', title: 'Islamic Writing Creative', text: 'Menulis kreatif dengan nilai-nilai Islam yang kuat.', sessions: 8, tag: 'Penulis muslim masa depan', onlyBogor: true },
				{ icon: 'icon-[lucide--palette]', title: 'GCLWAMA', text: 'Gambar, Cerita, Layout, Warna, dan Matematika — lima elemen kreatif yang membuat belajar lebih visual dan mudah dipahami.', sessions: 10, tag: 'Komikus digital handal', onlyBogor: true }
			] as Program[]
		},
		bandung: { label: 'Bandung', note: '4 program', programs: [office, coding, ai, game] }
	};
	let location = $state<keyof typeof locations>('bogor');

	const benefits = [
		{ icon: 'icon-[lucide--paintbrush]', title: 'Kreativitas', text: 'Belajar teknologi mendorong anak berpikir kreatif, mengeksplorasi ide, dan membuat karya orisinal.' },
		{ icon: 'icon-[lucide--lightbulb]', title: 'Inovasi', text: 'Mendorong anak menjadi pencipta, bukan sekadar pengguna: berpikir kritis dan menghasilkan solusi baru.' },
		{ icon: 'icon-[lucide--puzzle]', title: 'Problem solving', text: 'Mengasah logika dan kemampuan memecahkan masalah secara sistematis sejak dini.' }
	];

	const specials = [
		{ icon: 'icon-[lucide--moon-star]', title: 'Kurikulum teknologi yang Islami', text: 'Belajar teknologi sambil memperkuat akidah dan akhlak. Setiap pertemuan dimulai dengan bismillah.' },
		{ icon: 'icon-[lucide--user-check]', title: 'Mentor yang mendampingi langsung', text: 'Mentor berpengalaman yang ahli teknologi sekaligus berkomitmen pada pendidikan Islami untuk anak.' },
		{ icon: 'icon-[lucide--blocks]', title: 'Belajar lewat proyek nyata', text: 'Bukan cuma teori. Setiap anak menghasilkan proyek yang bisa dibanggakan dan bermanfaat.' },
		{ icon: 'icon-[lucide--award]', title: 'Sertifikat & portofolio', text: 'Setiap anak mendapat sertifikat dan portofolio digital untuk menunjukkan karyanya.' },
		{ icon: 'icon-[lucide--users-round]', title: 'Kelas kecil & personal', text: 'Maksimal 8 anak per kelas agar setiap anak mendapat perhatian yang cukup.' }
	];

	const trials = [
		{ city: 'Bogor', date: '28 Juni 2025', venue: 'SIT Bunaya', address: 'Jl. Ibrahim Adjie No. 167 A, Loji, Bogor Barat 16117' },
		{ city: 'Bandung', date: '04 Juli 2025', venue: 'Pondok STFQ Plus Bandung', address: 'Komp. Soreang Indah, Jl. Kembar Blok U No.6, RT 05/RW 15, Cingcin, Kec. Soreang, Kab. Bandung 40912' }
	];

	const ageGroups = [
		{ icon: 'icon-[lucide--sprout]', name: 'Little Coders', ages: '6–8 tahun', focus: 'Kreativitas & dasar', items: ['Pengenalan komputer dasar', 'Office for Kids (sederhana)', 'Gambar digital & GCLWAMA', 'Islamic Writing Creative'] },
		{ icon: 'icon-[lucide--rocket]', name: 'Young Developers', ages: '9–12 tahun', focus: 'Logika & pemrograman', items: ['Office for Kids (lengkap)', 'Coding for Kids', 'AI for Kids (dasar)', 'Game Developer (pemula)'] },
		{ icon: 'icon-[lucide--lightbulb]', name: 'Teen Innovators', ages: '13–17 tahun', focus: 'Inovasi & karya', items: ['Semua program tersedia', 'Game Developer (advanced)', 'AI for Kids (mendalam)', 'Project-based learning'] }
	];

	const faqs: FaqItem[] = [
		{ q: 'Apa itu Islamic IT Course?', a: 'Islamic IT Course adalah program yang mengajarkan teknologi dan coding kepada anak-anak dengan pendekatan Islami. Kami menggabungkan pembelajaran teknologi modern dengan nilai-nilai Islam untuk menciptakan generasi muslim yang unggul di bidang teknologi.' },
		{ q: 'Untuk usia berapa program ini?', a: 'Program ini dirancang untuk anak usia 7 hingga 15 tahun. Kurikulumnya disesuaikan dengan tahap perkembangan kognitif dan kemampuan anak pada setiap kelompok usia.' },
		{ q: 'Apa saja yang dipelajari anak-anak?', a: 'Anak-anak belajar dasar-dasar coding (Python, HTML, CSS), game development, konsep AI dan machine learning, robotika dasar, serta nilai-nilai Islami yang terintegrasi dalam setiap pembelajaran.' },
		{ q: 'Apakah program ini online atau offline?', a: 'Kelas reguler berjalan di Bogor dan Bandung, dengan sesi online interaktif, video pembelajaran, serta konsultasi personal dan project-based learning untuk setiap peserta.' }
	];
</script>

<Seo
	title="Kursus IT untuk Anak — Khwarizmi"
	description="Kursus Coding, Game Developer, AI, dan Office for Kids dengan pendekatan Islami di Bogor dan Bandung."
/>

<main>
	<section class="shell grid items-end gap-8 pt-12 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
		<div>
			<p class="label mb-5 flex items-center gap-2 text-signal">
				<span class="icon-[lucide--code-xml] size-4"></span>Islamic IT Course
			</p>
			<h1 class="text-hero font-semibold">Apapun cita-cita anak, ia harus paham teknologi.</h1>
		</div>
		<div>
			<p class="max-w-[44ch] text-lede text-muted">
				Kursus Coding, Game Developer, AI, dan Office untuk anak — diajarkan dengan adab, di kelas kecil, bersama mentor
				yang mendampingi langsung.
			</p>
			<div class="mt-7 flex flex-wrap gap-3">
				<a href="#program" class="btn btn-signal">Lihat program<span class="icon-[lucide--arrow-down] size-4"></span></a>
				<a href={waLink('Halo, saya mau informasi lebih lanjut tentang kursus Islamic IT Course untuk anak.')} target="_blank" rel="noopener" class="btn btn-outline">
					<span class="icon-[lucide--message-circle] size-4"></span>Konsultasi gratis
				</a>
			</div>
		</div>
	</section>

	<section class="rule">
		<div class="shell band-tight grid items-center gap-10 lg:grid-cols-2">
			<figure class="overflow-hidden rounded-lg bg-surface-2" {@attach reveal}>
				{#if playing && introVideo}
					<!-- svelte-ignore a11y_media_has_caption -->
					<video class="aspect-video w-full" controls playsinline autoplay src={introVideo}></video>
				{:else}
					<button class="group relative block w-full" aria-label="Putar video pengenalan" disabled={!introVideo} onclick={() => (playing = true)}>
						<img src="/img/foto-mengajar.jpg" alt="Sesi kelas Islamic IT Course" class="aspect-video w-full object-cover" loading="lazy" />
						{#if introVideo}
							<span class="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors group-hover:bg-black/25">
								<span class="flex size-16 items-center justify-center rounded-full bg-bg text-signal">
									<span class="icon-[lucide--play] size-7"></span>
								</span>
							</span>
						{/if}
					</button>
				{/if}
			</figure>
			<div {@attach reveal}>
				<h2 class="text-title font-semibold">Kenapa teknologi perlu dikenalkan sejak dini?</h2>
				<p class="mt-4 leading-relaxed text-muted">
					Mengenal teknologi sejak usia dini membuka pintu menuju masa depan yang penuh potensi: anak tumbuh dengan pola
					pikir adaptif, kreatif, dan siap menghadapi tantangan zaman digital.
				</p>
				<ul class="mt-8 space-y-6">
					{#each benefits as b (b.title)}
						<li class="flex items-start gap-4">
							<span class="{b.icon} mt-0.5 size-5 shrink-0 text-signal"></span>
							<div>
								<h3 class="font-display font-semibold">{b.title}</h3>
								<p class="mt-1 leading-relaxed text-muted">{b.text}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	<section id="program" class="rule scroll-mt-24">
		<div class="shell band">
			<div class="flex flex-wrap items-end justify-between gap-6" {@attach reveal}>
				<div class="max-w-xl">
					<h2 class="text-title font-semibold">Program kursus</h2>
					<p class="mt-4 text-lede text-muted">Dari Office sampai AI, dari Coding sampai Game Developer.</p>
				</div>
				<div class="flex gap-2" role="tablist" aria-label="Lokasi kursus">
					{#each Object.entries(locations) as [key, loc] (key)}
						<button
							role="tab"
							aria-selected={location === key}
							class={[
								'inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors',
								location === key ? 'border-fg bg-fg text-bg' : 'border-line text-muted hover:border-fg hover:text-fg'
							]}
							onclick={() => (location = key as keyof typeof locations)}
						>
							<span class="icon-[lucide--map-pin] size-4"></span>{loc.label}
							<span class="opacity-70">{loc.note}</span>
						</button>
					{/each}
				</div>
			</div>

			<div role="tabpanel">
				<ul class="mt-12 grid gap-px overflow-hidden rounded-lg bg-line md:grid-cols-2 lg:grid-cols-3">
				{#each locations[location].programs as p (p.title)}
					<li class="flex flex-col bg-bg p-7 lg:p-8">
						<div class="flex items-start justify-between gap-4">
							<span class="{p.icon} size-6 text-signal"></span>
							{#if p.onlyBogor}
								<span class="rounded-full border border-signal/40 px-2.5 py-1 text-xs font-medium text-signal">Khusus Bogor</span>
							{/if}
						</div>
						<h3 class="mt-5 text-head font-semibold">{p.title}</h3>
						<p class="mt-3 flex-1 leading-relaxed text-muted">{p.text}</p>
						<div class="rule mt-6 flex items-center justify-between gap-3 pt-4 text-sm">
							<span class="text-muted">{p.sessions} pertemuan</span>
							<span class="font-medium text-signal">{p.tag}</span>
						</div>
					</li>
				{/each}
				</ul>
			</div>
		</div>
	</section>

	<section class="rule">
		<div class="shell band-tight">
			<h2 class="max-w-xl text-title font-semibold" {@attach reveal}>Apa yang membuat kursus ini berbeda</h2>
			<ul class="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each specials as s (s.title)}
					<li class="rule pt-5" {@attach reveal}>
						<span class="{s.icon} size-5 text-signal"></span>
						<h3 class="mt-3 font-display text-lg font-semibold">{s.title}</h3>
						<p class="mt-2 leading-relaxed text-muted">{s.text}</p>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section id="kelas-coba" class="rule scroll-mt-24">
		<div class="shell band grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
			<div {@attach reveal}>
				<h2 class="text-title font-semibold">Kelas coba gratis</h2>
				<p class="mt-4 leading-relaxed text-muted">
					Berikut kelas coba yang pernah kami adakan. Ikuti kanal kami untuk info batch berikutnya.
				</p>
				<a href={waLink('Halo, saya mau info kelas coba gratis Islamic IT Course berikutnya.')} target="_blank" rel="noopener" class="btn btn-outline mt-6">
					<span class="icon-[lucide--bell] size-4"></span>Info batch berikutnya
				</a>
			</div>

			<ul class="grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2">
				{#each trials as t (t.city)}
					<li class="bg-bg p-7" {@attach reveal}>
						<div class="flex items-center justify-between gap-3">
							<h3 class="font-display text-lg font-semibold">{t.city}</h3>
							<span class="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-muted">Selesai</span>
						</div>
						<p class="mt-4 flex items-center gap-2 text-sm">
							<span class="icon-[lucide--calendar] size-4 shrink-0 text-signal"></span>{t.date}
						</p>
						<p class="mt-2.5 flex items-start gap-2 text-sm text-muted">
							<span class="icon-[lucide--map-pin] mt-0.5 size-4 shrink-0 text-signal"></span>
							<span><span class="font-medium text-fg">{t.venue}</span><br />{t.address}</span>
						</p>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="rule">
		<div class="shell band-tight">
			<h2 class="text-title font-semibold" {@attach reveal}>Kelompok usia</h2>
			<ul class="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
				{#each ageGroups as g (g.name)}
					<li {@attach reveal}>
						<span class="{g.icon} size-6 text-signal"></span>
						<h3 class="mt-4 font-display text-lg font-semibold">{g.name}</h3>
						<p class="mt-1 text-sm text-muted">{g.ages} · {g.focus}</p>
						<ul class="mt-4 space-y-2">
							{#each g.items as item (item)}
								<li class="flex items-start gap-2.5 text-muted">
									<span class="icon-[lucide--minus] mt-1.5 size-3.5 shrink-0 text-signal"></span>{item}
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="rule">
		<div class="shell band grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
			<div {@attach reveal}>
				<h2 class="text-title font-semibold">Pertanyaan orang tua</h2>
				<p class="mt-4 leading-relaxed text-muted">Masih ada yang ingin ditanyakan? Tim kami siap menjawab.</p>
				<a href={waLink('Halo, saya ingin bertanya tentang kursus Islamic IT Course.')} target="_blank" rel="noopener" class="btn btn-signal mt-6">
					<span class="icon-[lucide--message-circle] size-4"></span>Hubungi kami
				</a>
			</div>
			<Faq items={faqs} name="faq-kursus" />
		</div>
	</section>
</main>
