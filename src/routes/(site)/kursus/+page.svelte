<script lang="ts">
	import Faq, { type FaqItem } from '$lib/components/Faq.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { mediaUrl, waLink } from '$lib/site';

	const introVideo = mediaUrl('vid/itc.mp4');
	let playing = $state(false);

	type Program = { emoji: string; title: string; text: string; sessions: number; tag: string; color: string; special?: boolean };
	const office: Program = { emoji: '📊', title: 'Office for Kids', text: 'Menguasai Word, Excel, dan PowerPoint dengan cara yang fun!', sessions: 8, tag: 'Perfect untuk pemula! 🌟', color: 'green' };
	const coding: Program = { emoji: '💻', title: 'Coding for Kids', text: 'Pemrograman sambil bikin game edukatif yang seru!', sessions: 12, tag: 'Bikin game sendiri! 🎮', color: 'blue' };
	const ai: Program = { emoji: '🤖', title: 'AI for Kids', text: 'Pengenalan AI dan penggunaannya untuk masa depan!', sessions: 10, tag: 'Teknologi masa depan! 🚀', color: 'purple' };
	const game: Program = { emoji: '🎯', title: 'Game Developer', text: 'Dari hanya gamer jadi Pembuat Game profesional!', sessions: 16, tag: 'Level up jadi creator! 🏆', color: 'orange' };

	const locations = {
		bogor: {
			label: '📍 Bogor (6 Program)',
			active: 'bg-green-500',
			programs: [
				office,
				coding,
				ai,
				game,
				{ emoji: '✍️', title: 'Islamic Writing Creative', text: 'Menulis kreatif dengan nilai-nilai Islam yang indah!', sessions: 8, tag: 'Penulis Muslim masa depan! ✨', color: 'teal', special: true },
				{ emoji: '🎨', title: 'GCLWAMA', text: 'Gambar, Cerita, Layout, Warna, dan Matematika — lima elemen kreatif yang membuat belajar jadi lebih seru, visual, dan mudah dipahami.', sessions: 10, tag: 'Komikus digital handal! 🎭', color: 'pink', special: true }
			] as Program[]
		},
		bandung: { label: '📍 Bandung (4 Program)', active: 'bg-orange-500', programs: [office, coding, ai, game] }
	};
	// Full class names so Tailwind can see them.
	const tones: Record<string, { icon: string; tag: string }> = {
		green: { icon: 'bg-green-500', tag: 'bg-green-100 text-green-700' },
		blue: { icon: 'bg-blue-500', tag: 'bg-blue-100 text-blue-700' },
		purple: { icon: 'bg-purple-500', tag: 'bg-purple-100 text-purple-700' },
		orange: { icon: 'bg-orange-500', tag: 'bg-orange-100 text-orange-700' },
		teal: { icon: 'bg-teal-500', tag: 'bg-green-100 text-green-700' },
		pink: { icon: 'bg-pink-500', tag: 'bg-pink-100 text-pink-700' }
	};
	let location = $state<keyof typeof locations>('bogor');

	const benefits = [
		{ emoji: '🎨', title: 'Kreativitas', text: 'Belajar teknologi mendorong anak untuk berpikir kreatif, mengeksplorasi ide, dan membuat karya yang orisinal.', cls: 'from-purple-50 to-purple-100 border-purple-200', title_: 'text-purple-800', body: 'text-purple-700' },
		{ emoji: '💡', title: 'Inovasi', text: 'Mendorong anak untuk menjadi pencipta, bukan hanya pengguna — berpikir kritis dan menghasilkan solusi baru.', cls: 'from-blue-50 to-blue-100 border-blue-200', title_: 'text-blue-800', body: 'text-blue-700' },
		{ emoji: '🧩', title: 'Problem Solving', text: 'Mengasah logika dan kemampuan memecahkan masalah secara sistematis dan terstruktur sejak dini.', cls: 'from-green-50 to-green-100 border-green-200', title_: 'text-green-800', body: 'text-green-700' }
	];

	const specials = [
		{ emoji: '🕌', title: 'Kurikulum Teknologi yang Islami', text: 'Belajar teknologi sambil memperkuat akidah dan akhlak. Setiap pembelajaran dimulai dengan Bismillah!', border: 'border-green-200', title_: 'text-green-800', body: 'text-green-700' },
		{ emoji: '👨‍🏫', title: 'Belajar Langsung dengan Para Mentor Ahli', text: 'Mentor berpengalaman yang tidak hanya ahli teknologi, tapi juga berkomitmen pada pendidikan Islami untuk anak.', border: 'border-blue-200', title_: 'text-blue-800', body: 'text-blue-700' },
		{ emoji: '🎮', title: 'Metode Pembelajaran Fun & Berbasis Project', text: 'Bukan cuma teori! Setiap anak akan membuat project nyata yang bisa dibanggakan dan bermanfaat.', border: 'border-purple-200', title_: 'text-purple-800', body: 'text-purple-700' }
	];

	const trials = [
		{ city: 'Kelas Coba Gratis - Bogor', date: '28 Juni 2025', venue: 'SIT Bunaya', address: ['Jl. Ibrahim Adjie No. 167 A', 'Loji, Bogor Barat 16117'], border: 'border-green-200', accent: 'text-green-600' },
		{ city: 'Kelas Coba - Bandung', date: '04 Juli 2025', venue: 'Pondok STFQ Plus Bandung', address: ['Komp. Soreang Indah, Jl. Kembar', 'Blok U No.6, RT 05/RW 15', 'Cingcin, Kec. Soreang', 'Kab. Bandung, Jabar 40912'], border: 'border-orange-200', accent: 'text-orange-600' }
	];

	const ageGroups = [
		{ emoji: '🌱', name: 'Little Coders', ages: 'Usia 6-8 Tahun', items: ['Pengenalan komputer dasar', 'Office for Kids (sederhana)', 'Gambar digital & GCLWAMA', 'Islamic Writing Creative'], focus: 'Fokus: Kreativitas & Dasar', c: { border: 'border-green-200', title: 'text-green-800', sub: 'text-green-600', body: 'text-green-700', pill: 'bg-green-100 text-green-800' } },
		{ emoji: '🚀', name: 'Young Developers', ages: 'Usia 9-12 Tahun', items: ['Office for Kids (lengkap)', 'Coding for Kids', 'AI for Kids (dasar)', 'Game Developer (pemula)'], focus: 'Fokus: Logic & Programming', c: { border: 'border-blue-200', title: 'text-blue-800', sub: 'text-blue-600', body: 'text-blue-700', pill: 'bg-blue-100 text-blue-800' } },
		{ emoji: '💡', name: 'Teen Innovators', ages: 'Usia 13-17 Tahun', items: ['Semua program tersedia', 'Game Developer (advanced)', 'AI for Kids (mendalam)', 'Project-based learning'], focus: 'Fokus: Innovation & Creation', c: { border: 'border-purple-200', title: 'text-purple-800', sub: 'text-purple-600', body: 'text-purple-700', pill: 'bg-purple-100 text-purple-800' } }
	];

	const faqs: FaqItem[] = [
		{ q: 'Apa itu Islamic IT School?', icon: 'icon-[bx--book]', accent: 'from-green-400 to-blue-500', a: 'Islamic IT School adalah platform pendidikan inovatif yang mengajarkan teknologi dan coding kepada anak-anak dengan pendekatan Islami. Kami menggabungkan pembelajaran teknologi modern dengan nilai-nilai Islam untuk menciptakan generasi muslim yang unggul di bidang teknologi.' },
		{ q: 'Untuk usia berapa program ini?', icon: 'icon-[bx--group]', accent: 'from-purple-400 to-pink-500', a: 'Program ini dirancang khusus untuk anak-anak usia 7 hingga 15 tahun. Kami memiliki kurikulum yang disesuaikan dengan tahap perkembangan kognitif dan kemampuan anak pada setiap kelompok usia untuk memastikan pembelajaran yang optimal.' },
		{ q: 'Apa saja yang dipelajari anak-anak?', icon: 'icon-[bx--bulb]', accent: 'from-yellow-400 to-orange-500', a: 'Anak-anak akan belajar dasar-dasar coding (Python, HTML, CSS), game development, konsep AI dan machine learning, robotika dasar, serta nilai-nilai Islami yang terintegrasi dalam setiap pembelajaran. Semua materi disampaikan dengan pendekatan yang menyenangkan dan mudah dipahami.' },
		{ q: 'Apakah program ini online atau offline?', icon: 'icon-[bx--desktop]', accent: 'from-indigo-400 to-cyan-500', a: 'Saat ini program berjalan secara online dengan sesi interaktif langsung, video pembelajaran berkualitas tinggi, dan platform pembelajaran yang mudah diakses. Kami juga menyediakan sesi konsultasi personal dan project-based learning untuk memastikan setiap anak mendapat perhatian yang optimal.' }
	];
</script>

<Seo
	title="Kursus IT untuk Anak - Islamic IT Course"
	description="Kursus Coding, Game Developer, AI, dan Office for Kids dengan pendekatan Islami di Bogor dan Bandung."
/>

<main class="bg-linear-135 from-sky-50 to-emerald-50">
	<section class="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
		<div class="pointer-events-none absolute inset-0">
			<div class="absolute top-20 left-10 size-16 animate-float-soft rounded-full bg-green-400/20 blur-xl"></div>
			<div class="absolute top-32 right-20 size-20 animate-float-soft rounded-full bg-orange-400/20 blur-xl [animation-delay:1s]"></div>
			<div class="absolute bottom-40 left-1/4 size-12 animate-float-soft rounded-full bg-teal-400/20 blur-xl [animation-delay:2s]"></div>
		</div>

		<div class="relative z-10 mx-auto max-w-6xl text-center">
			<h1 class="mb-6 text-3xl font-extrabold md:text-5xl lg:text-6xl">
				<span class="gradient-tri-text">Islamic IT Course</span><br />
				<span class="text-gray-800">Masa Depan Gemilang Anak</span>
			</h1>
			<p class="mx-auto mb-8 max-w-4xl text-xl leading-relaxed font-medium text-gray-700 md:text-2xl">
				🌟 <em>Di zaman secanggih ini, apapun cita-cita anak kita, ia harus paham teknologi!</em> 🌟
			</p>

			<div class="mx-auto mb-12 grid max-w-4xl gap-8 md:grid-cols-2">
				<div class="card-lift rounded-2xl border border-white/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
					<div class="mb-4 text-4xl">💻</div>
					<h2 class="mb-3 text-xl font-bold text-gray-800">Teknologi untuk Semua Profesi</h2>
					<p class="text-gray-600">Dokter, insinyur, pengacara, bahkan PNS - semua butuh teknologi. Hanya yang mengerti teknologi yang akan sukses!</p>
				</div>
				<div class="card-lift rounded-2xl border border-white/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
					<div class="mb-4 text-4xl">🕌</div>
					<h2 class="mb-3 text-xl font-bold text-gray-800">Teknologi + Akhlak Islami</h2>
					<p class="text-gray-600">Pintar saja tidak cukup, kaya saja tidak cukup. Anak kita harus sholeh dan Islami!</p>
				</div>
			</div>

			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a href="#programs" class="btn-shine flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-white shadow-lg">
					<span class="icon-[bx--rocket] size-6"></span> Kenali Program Kursus
				</a>
				<a
					href="#trial-class"
					class="flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white/90 px-8 py-4 text-lg font-bold text-gray-800 shadow-lg transition-all hover:border-green-300 hover:bg-white"
				>
					<span class="icon-[bx--calendar] size-6"></span> Kelas Gratis 28 Juni 2025
				</a>
			</div>
		</div>
	</section>

	<section class="bg-linear-to-br from-indigo-50 via-blue-50 to-cyan-50 px-4 py-20">
		<div class="mx-auto max-w-7xl">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-4xl font-extrabold md:text-5xl"><span class="gradient-tri-text">🎬 Apa itu Islamic IT Course?</span></h2>
				<p class="mx-auto max-w-2xl text-xl text-gray-700">
					Yuk tonton video penjelasannya! Kursus IT yang beda dari yang lain: canggih + Islami!
				</p>
			</div>
			<div class="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
				{#if playing && introVideo}
					<!-- svelte-ignore a11y_media_has_caption -->
					<video class="aspect-video w-full" controls playsinline autoplay src={introVideo}></video>
				{:else}
					<button class="group relative block w-full" aria-label="Putar video" disabled={!introVideo} onclick={() => (playing = true)}>
						<img src="/img/foto-mengajar.jpg" alt="Kegiatan mengajar Islamic IT Course" class="aspect-video w-full object-cover" loading="lazy" />
						{#if introVideo}
							<span class="absolute inset-0 flex items-center justify-center bg-black/40 transition-all group-hover:bg-black/30">
								<span class="flex size-20 items-center justify-center rounded-full bg-white text-5xl text-red-600 shadow-lg transition-transform group-hover:scale-110">▶</span>
							</span>
						{/if}
					</button>
				{/if}
			</div>
		</div>
	</section>

	<section id="benefits" class="px-4 py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-3xl font-extrabold md:text-4xl"><span class="gradient-tri-text">Kenapa Perlu Belajar Teknologi Sejak Dini?</span></h2>
				<p class="mx-auto max-w-3xl text-xl text-gray-700">
					Mengenal teknologi sejak usia dini membuka pintu menuju masa depan yang penuh potensi. Anak-anak akan tumbuh dengan
					pola pikir yang adaptif, kreatif, dan siap menghadapi tantangan zaman digital.
				</p>
			</div>
			<div class="grid gap-8 md:grid-cols-3">
				{#each benefits as b (b.title)}
					<div class="card-lift rounded-2xl border-2 bg-linear-to-br p-8 text-center shadow-lg {b.cls}">
						<div class="mb-6 text-6xl">{b.emoji}</div>
						<h3 class="mb-4 text-2xl font-bold {b.title_}">{b.title}</h3>
						<p class={b.body}>{b.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section id="programs" class="scroll-mt-24 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-20">
		<div class="mx-auto max-w-7xl">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-4xl font-extrabold md:text-5xl"><span class="gradient-tri-text">🎯 Program Kursus untuk Anak! 🎯</span></h2>
				<p class="mx-auto mb-8 max-w-3xl text-xl text-gray-700">Dari Office sampai AI, dari Coding sampai Game Developer - semua ada di sini!</p>
				<p class="special-badge inline-block rounded-full px-6 py-3 text-lg font-bold text-white">⭐ Program Lengkap untuk Masa Depan Digital Anak! ⭐</p>
			</div>

			<div class="mb-12 flex justify-center">
				<div class="flex gap-2 rounded-2xl border-2 border-white/50 bg-white/80 p-2 shadow-lg backdrop-blur-sm" role="tablist">
					{#each Object.entries(locations) as [key, loc] (key)}
						<button
							role="tab"
							aria-selected={location === key}
							class={[
								'rounded-xl px-6 py-3 text-lg font-bold transition-all',
								location === key ? `${loc.active} text-white shadow-lg` : 'text-gray-600 hover:bg-gray-100'
							]}
							onclick={() => (location = key as keyof typeof locations)}
						>
							{loc.label}
						</button>
					{/each}
				</div>
			</div>

			<div role="tabpanel">
			<ul class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each locations[location].programs as p (p.title)}
					<li class={['program-card rounded-3xl p-8 text-center', p.special && 'border-4! border-yellow-300!']}>
						{#if p.special}
							<p class="special-badge mx-auto mb-4 flex h-8 w-fit items-center rounded-full px-3 text-xs font-bold text-white">KHUSUS BOGOR</p>
						{/if}
						<div class="program-icon mx-auto mb-6 flex size-16 items-center justify-center rounded-full text-2xl {tones[p.color].icon}">{p.emoji}</div>
						<h3 class="mb-3 text-xl font-bold text-gray-800">{p.title}</h3>
						<p class="mb-4 text-gray-600">{p.text}</p>
						<p class="mb-4 text-sm text-gray-500">{p.sessions} pertemuan</p>
						<p class="rounded-lg p-3 font-semibold {tones[p.color].tag}">{p.tag}</p>
					</li>
				{/each}
			</ul>
			</div>
		</div>
	</section>

	<section class="bg-linear-to-r from-green-50 via-teal-50 to-blue-50 px-4 py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-3xl font-extrabold md:text-4xl"><span class="gradient-tri-text">⭐ Apa Istimewanya Kursus Kami? ⭐</span></h2>
				<p class="mx-auto max-w-3xl text-xl text-gray-700">
					Islamic IT Course bukan sekadar kursus biasa. Ini pengalaman belajar yang akan mengubah masa depan anak!
				</p>
			</div>
			<div class="grid gap-8 md:grid-cols-3">
				{#each specials as s (s.title)}
					<div class="card-lift rounded-3xl border-2 bg-white/90 p-8 text-center shadow-xl {s.border}">
						<div class="mb-6 text-6xl">{s.emoji}</div>
						<h3 class="mb-4 text-2xl font-bold {s.title_}">{s.title}</h3>
						<p class={s.body}>{s.text}</p>
					</div>
				{/each}
			</div>
			<div class="mt-16 grid gap-8 text-center md:grid-cols-2">
				<div class="rounded-3xl border-2 border-yellow-200 bg-linear-to-br from-yellow-50 to-orange-100 p-8">
					<div class="mb-4 text-5xl">🏆</div>
					<h3 class="mb-3 text-xl font-bold text-orange-800">Sertifikat & Portfolio</h3>
					<p class="text-orange-700">Setiap anak mendapat sertifikat dan portfolio digital untuk menunjukkan karya-karya mereka!</p>
				</div>
				<div class="rounded-3xl border-2 border-green-200 bg-linear-to-br from-green-50 to-teal-100 p-8">
					<div class="mb-4 text-5xl">👨‍👩‍👧‍👦</div>
					<h3 class="mb-3 text-xl font-bold text-teal-800">Kelas Kecil & Personal</h3>
					<p class="text-teal-700">Maksimal 8 anak per kelas untuk memastikan setiap anak mendapat perhatian optimal!</p>
				</div>
			</div>
		</div>
	</section>

	<section id="trial-class" class="scroll-mt-24 bg-linear-to-br from-orange-50 via-yellow-50 to-green-50 px-4 py-20 text-center">
		<div class="mx-auto max-w-4xl">
			<h2 class="mb-6 text-3xl font-extrabold md:text-4xl"><span class="gradient-tri-text">🎉 Kelas Coba GRATIS untuk Anak! 🎉</span></h2>
			<p class="mb-12 text-xl text-gray-700">Berikut adalah informasi kelas coba gratis yang pernah kami adakan.</p>

			<div class="grid gap-8 md:grid-cols-2">
				{#each trials as t (t.city)}
					<article class="card-lift relative flex flex-col rounded-3xl border-4 bg-white p-8 shadow-2xl {t.border}">
						<span class="absolute top-4 right-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">PROGRAM SELESAI</span>
						<div class="mb-4 text-5xl">📅</div>
						<h3 class="mb-4 text-xl font-bold text-gray-800 md:text-2xl">{t.city}</h3>
						<div class="mb-6 space-y-3">
							<p class="flex items-center justify-center gap-3 font-semibold">
								<span class="icon-[bx--calendar] size-5 {t.accent}"></span>{t.date}
							</p>
							<div class="flex items-start justify-center gap-3">
								<span class="icon-[bx--map] mt-1 size-5 shrink-0 {t.accent}"></span>
								<address class="not-italic">
									<p class="font-semibold">{t.venue}</p>
									{#each t.address as line (line)}
										<p class="text-sm text-gray-600">{line}</p>
									{/each}
								</address>
							</div>
						</div>
						<p class="mt-auto flex h-[72px] items-center justify-center rounded-lg bg-gray-100 p-3 font-semibold text-gray-700">
							Program ini telah selesai dilaksanakan
						</p>
					</article>
				{/each}
			</div>
			<p class="mt-8 mb-2 text-lg font-semibold text-gray-700">⭐ Ikuti perkembangan kami untuk info kelas selanjutnya! ⭐</p>
		</div>

		<div class="mx-auto mt-16 max-w-6xl rounded-2xl bg-linear-to-r from-green-500 via-teal-500 to-orange-500 p-8 text-white">
			<h3 class="mb-4 text-2xl font-bold md:text-3xl">🚀 Masa Depan Gemilang Anak Dimulai dari Dunia Digital!</h3>
			<p class="mb-6 text-lg md:text-xl">
				Yuk kenalkan anak dengan IT sejak dini dan berikan bekal akhlak Islami untuk masa depannya!<br />
				<span class="font-bold">🎯 Tersedia di 2 Kota: Bogor & Bandung</span>
			</p>
			<a
				href={waLink('Halo, saya mau informasi lebih lanjut tentang kursus Islamic IT Course untuk anak!')}
				target="_blank"
				rel="noopener"
				class="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-green-700"
			>
				<span class="icon-[bxl--whatsapp] size-6"></span> Konsultasi Gratis
			</a>
		</div>
	</section>

	<section class="bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 px-4 py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-3xl font-extrabold md:text-4xl"><span class="gradient-tri-text">👶 Kelompok Usia Kursus 👶</span></h2>
				<p class="mx-auto max-w-3xl text-xl text-gray-700">Program disesuaikan dengan tahap perkembangan anak untuk hasil pembelajaran yang optimal</p>
			</div>
			<div class="grid gap-8 md:grid-cols-3">
				{#each ageGroups as g (g.name)}
					<div class="card-lift rounded-3xl border-2 bg-white/90 p-8 shadow-xl {g.c.border}">
						<div class="mb-6 text-center text-6xl">{g.emoji}</div>
						<h3 class="mb-4 text-center text-2xl font-bold {g.c.title}">{g.name}</h3>
						<p class="mb-3 text-center text-lg font-semibold {g.c.sub}">{g.ages}</p>
						<ul class="list-inside list-disc space-y-2 text-sm {g.c.body}">
							{#each g.items as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
						<p class="mt-6 text-center">
							<span class="rounded-full px-3 py-1 text-sm font-semibold {g.c.pill}">{g.focus}</span>
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="bg-linear-to-br from-blue-50 via-purple-50 to-green-50 py-16">
		<div class="mx-auto max-w-4xl px-4">
			<div class="mb-12 text-center">
				<div class="gradient-tri mx-auto mb-4 flex size-16 animate-bounce items-center justify-center rounded-full">
					<span class="icon-[bx--help-circle] size-8 text-white"></span>
				</div>
				<h2 class="gradient-tri-text mb-4 text-4xl leading-normal font-bold">Pertanyaan yang Sering Ditanyakan</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">Temukan jawaban untuk pertanyaan-pertanyaan umum tentang Islamic IT School</p>
			</div>

			<Faq items={faqs} />

			<div class="mt-12 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg">
				<h3 class="mb-4 text-2xl font-bold text-gray-800">Masih Ada Pertanyaan?</h3>
				<p class="mb-6 text-gray-600">Tim kami siap membantu menjawab pertanyaan Anda tentang Islamic IT School</p>
				<a
					href={waLink()}
					target="_blank"
					rel="noopener"
					class="gradient-bg inline-block rounded-xl px-8 py-3 font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105"
				>
					Hubungi Kami
				</a>
			</div>
		</div>
	</section>
</main>

<style>
	.special-badge {
		background: linear-gradient(135deg, #ff6b6b, #ffa500);
		animation: glow 2s ease-in-out infinite alternate;
	}
	@keyframes glow {
		from {
			box-shadow: 0 0 20px rgb(255 107 107 / 0.5);
		}
		to {
			box-shadow: 0 0 30px rgb(255 165 0 / 0.5);
		}
	}
	.program-card {
		background: linear-gradient(135deg, rgb(255 255 255 / 0.9), rgb(255 255 255 / 0.7));
		backdrop-filter: blur(10px);
		border: 2px solid rgb(255 255 255 / 0.3);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}
	.program-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 20px 40px rgb(0 0 0 / 0.1);
	}
	.program-icon {
		animation: var(--animate-bounce);
	}
</style>
