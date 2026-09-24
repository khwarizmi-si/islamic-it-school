<script lang="ts">
	import { goto } from '$app/navigation';
	import Seo from '$lib/components/Seo.svelte';
	import { referral } from '$lib/referral.svelte';
	import { reveal } from '$lib/reveal';
	import { rupiah } from '$lib/site';

	const tabs = [
		{
			id: 'orangtua',
			label: 'Untuk orang tua',
			icon: 'icon-[lucide--home]',
			heading: 'Strategi mengajarkan teknologi untuk Gen Z dan Alpha',
			strategies: [
				{ icon: 'icon-[lucide--search]', title: 'Mengenal generasi digital', points: ['Memahami kelebihan Gen Z & Alpha sebagai digital native', 'Mengenali tantangan dan kelemahan generasi digital', 'Kiat menghadapi karakter unik generasi sekarang'] },
				{ icon: 'icon-[lucide--target]', title: 'Menginstal "tujuan besar"', points: ['Teknik menanamkan visi besar dalam belajar teknologi', 'Membuat anak memahami "why" sebelum "how"', 'Contoh praktis menetapkan tujuan belajar'] },
				{ icon: 'icon-[lucide--mountain]', title: 'Membangun mental "climber"', points: ['Teknik mengembangkan daya juang tinggi', 'Mengatasi mental block dalam belajar teknologi', 'Role model climber di dunia teknologi'] },
				{ icon: 'icon-[lucide--rocket]', title: 'Metode GCLWAMA & ICAVGP', points: ['Memulai dengan GCLWAMA: pendekatan bertahap', 'Mengakhiri dengan ICAVGP: evaluasi hasil belajar', 'Panduan praktis untuk orang tua'] }
			]
		},
		{
			id: 'guru',
			label: 'Untuk guru',
			icon: 'icon-[lucide--presentation]',
			heading: 'Strategi mengajar teknologi yang kreatif dan produktif',
			strategies: [
				{ icon: 'icon-[lucide--lightbulb]', title: 'Kreativitas vs inovasi', points: ['Memahami perbedaan kreativitas dan inovasi', 'Teknik stimulasi kreativitas dalam pembelajaran IT', 'Studi kasus kreativitas di dunia teknologi'] },
				{ icon: 'icon-[lucide--sparkles]', title: 'Membentuk anak kreatif', points: ['Metode pengajaran yang mendorong kreativitas', 'Mengembangkan pola pikir inovatif', 'Tools untuk mengasah kreativitas digital'] },
				{ icon: 'icon-[lucide--factory]', title: 'Meningkatkan produktivitas', points: ['Strategi membuat anak produktif dengan teknologi', 'Time management untuk generasi digital', 'Teknik produktivitas ala programmer'] },
				{ icon: 'icon-[lucide--chart-column]', title: 'Evaluasi pembelajaran', points: ['Mengukur kreativitas dan produktivitas siswa', 'Portofolio digital sebagai alat evaluasi', 'Teknik feedback yang membangun'] }
			]
		},
		{
			id: 'umum',
			label: 'Orang tua & guru',
			icon: 'icon-[lucide--users]',
			heading: 'Strategi mengajar teknologi untuk monetisasi & kemandirian',
			strategies: [
				{ icon: 'icon-[lucide--brain]', title: 'Kemandirian emosional', points: ['Teknik membangun kemandirian perilaku', 'Menanamkan nilai-nilai kemandirian', 'Mengatasi ketergantungan teknologi'] },
				{ icon: 'icon-[lucide--briefcase]', title: 'Dasar bisnis digital', points: ['Konsep dasar kemandirian finansial', 'Model bisnis di era digital', 'Etika bisnis dalam Islam'] },
				{ icon: 'icon-[lucide--banknote]', title: 'Monetisasi skill', points: ['Platform monetisasi untuk skill teknologi', 'Membangun personal brand digital', 'Strategi pricing untuk pemula'] },
				{ icon: 'icon-[lucide--hammer]', title: 'Project based learning', points: ['Metode pembelajaran berbasis proyek nyata', 'Studi kasus project monetisasi sukses', 'Template project untuk berbagai level'] }
			]
		}
	];

	const facilities = [
		{ icon: 'icon-[lucide--file-text]', title: 'Modul digital', text: 'Materi lengkap dalam format PDF' },
		{ icon: 'icon-[lucide--video]', title: 'Rekaman video', text: 'Akses rekaman semua sesi' },
		{ icon: 'icon-[lucide--award]', title: 'Sertifikat', text: 'Sertifikat elektronik resmi' },
		{ icon: 'icon-[lucide--users]', title: 'Komunitas', text: 'Akses grup diskusi alumni' }
	];

	const options = [
		{ label: 'Orang Tua', price: 250000, icon: 'icon-[lucide--home]' },
		{ label: 'Guru', price: 350000, icon: 'icon-[lucide--presentation]' },
		{ label: 'Orang Tua & Guru', price: 500000, icon: 'icon-[lucide--users]' }
	];

	let activeTab = $state('orangtua');
	let choice = $state<(typeof options)[number] | null>(null);
	let dialog = $state<HTMLDialogElement>();

	function register() {
		if (!choice) return;
		const params = new URLSearchParams({
			webinar_title: `Pelatihan Islamic IT Course - ${choice.label}`,
			price: String(choice.price),
			...(referral.code ? { ref: referral.code } : {})
		});
		goto(`/form_webinar?${params}`);
	}
</script>

<Seo
	title="Pelatihan Guru & Orang Tua — Khwarizmi"
	description="Pelatihan strategi mengajarkan teknologi untuk Gen Z dan Alpha, langsung dari pengajar Sekolah Impian."
/>

<main>
	<section class="shell grid items-end gap-8 pt-12 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
		<div>
			<p class="label mb-5 flex items-center gap-2 text-signal">
				<span class="icon-[lucide--graduation-cap] size-4"></span>Pelatihan
			</p>
			<h1 class="text-hero font-semibold">Mengajar teknologi untuk Gen Z &amp; Alpha.</h1>
		</div>
		<div>
			<p class="max-w-[44ch] text-lede text-muted">
				Bekali diri dengan metode yang sudah dipakai mendampingi anak-anak di era digital — bukan teori, tapi yang
				dijalankan setiap hari di kelas.
			</p>
			<button class="btn btn-signal mt-7" onclick={() => dialog?.showModal()}>
				<span class="icon-[lucide--pen-line] size-4"></span>Daftar pelatihan
			</button>
		</div>
	</section>

	<section class="rule">
		<div class="shell band">
			<div class="max-w-2xl" {@attach reveal}>
				<h2 class="text-title font-semibold">Strategi pengajaran</h2>
				<p class="mt-4 text-lede text-muted">Materi disesuaikan dengan peran Anda: orang tua, guru, atau keduanya.</p>
			</div>

			<div class="mt-10 flex flex-wrap gap-2" role="tablist">
				{#each tabs as tab (tab.id)}
					<button
						role="tab"
						id="tab-{tab.id}"
						aria-selected={activeTab === tab.id}
						aria-controls="panel-{tab.id}"
						class={[
							'inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors',
							activeTab === tab.id ? 'border-fg bg-fg text-bg' : 'border-line text-muted hover:border-fg hover:text-fg'
						]}
						onclick={() => (activeTab = tab.id)}
					>
						<span class="{tab.icon} size-4"></span>{tab.label}
					</button>
				{/each}
			</div>

			{#each tabs as tab (tab.id)}
				<div role="tabpanel" id="panel-{tab.id}" aria-labelledby="tab-{tab.id}" hidden={activeTab !== tab.id} class="mt-10">
					<h3 class="font-display text-head font-semibold">{tab.heading}</h3>
					<div class="mt-8 grid gap-x-10 gap-y-10 md:grid-cols-2">
						{#each tab.strategies as s (s.title)}
							<div class="animate-rise">
								<span class="{s.icon} size-6 text-signal"></span>
								<h4 class="mt-4 font-display text-lg font-semibold">{s.title}</h4>
								<ul class="mt-3 space-y-2">
									{#each s.points as p (p)}
										<li class="flex items-start gap-2.5 leading-relaxed text-muted">
											<span class="icon-[lucide--minus] mt-1.5 size-3.5 shrink-0 text-signal"></span>{p}
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="rule">
		<div class="shell band-tight">
			<h2 class="label" {@attach reveal}>Fasilitas peserta</h2>
			<ul class="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
				{#each facilities as f (f.title)}
					<li class="rule pt-5" {@attach reveal}>
						<span class="{f.icon} size-5 text-signal"></span>
						<h3 class="mt-3 font-display font-semibold">{f.title}</h3>
						<p class="mt-1.5 text-sm text-muted">{f.text}</p>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="rule">
		<div class="shell band">
			<div class="grid items-center gap-10 rounded-xl bg-surface p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12" {@attach reveal}>
				<div>
					<h2 class="text-title font-semibold">Siap mengubah cara mengajar teknologi?</h2>
					<p class="mt-4 text-lede text-muted">
						Pilih kelas yang sesuai peran Anda, lalu lanjutkan ke pendaftaran. Kuota tiap batch terbatas agar sesi tetap
						interaktif.
					</p>
				</div>
				<div class="flex flex-col gap-3">
					{#each options as opt (opt.label)}
						<button
							class="flex items-center justify-between gap-4 rounded-lg border border-line bg-bg px-5 py-4 text-left transition-colors hover:border-signal"
							onclick={() => {
								choice = opt;
								dialog?.showModal();
							}}
						>
							<span class="flex items-center gap-3">
								<span class="{opt.icon} size-5 text-signal"></span>
								<span class="font-medium">{opt.label}</span>
							</span>
							<span class="text-sm text-muted">{rupiah(opt.price)}</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</section>
</main>

<dialog bind:this={dialog} class="m-auto w-full max-w-md rounded-xl bg-surface p-8 text-fg backdrop:bg-black/55" aria-labelledby="reg-title">
	<h2 id="reg-title" class="font-display text-2xl font-semibold">Pilih jenis pelatihan</h2>
	<p class="mt-2 text-sm text-muted">Harga sudah termasuk modul, rekaman, dan sertifikat.</p>

	<div class="mt-6 space-y-3" role="radiogroup" aria-label="Jenis pelatihan">
		{#each options as opt (opt.label)}
			<button
				role="radio"
				aria-checked={choice === opt}
				class={[
					'flex w-full items-center justify-between gap-4 rounded-lg border px-5 py-4 text-left transition-colors',
					choice === opt ? 'border-signal bg-signal/10' : 'border-line hover:border-fg'
				]}
				onclick={() => (choice = opt)}
			>
				<span class="flex items-center gap-3">
					<span class="{opt.icon} size-5 text-signal"></span>
					<span class="font-medium">{opt.label}</span>
				</span>
				<span class="text-sm text-muted">{rupiah(opt.price)}</span>
			</button>
		{/each}
	</div>

	<div class="mt-7 flex gap-3">
		<button class="btn btn-outline flex-1" onclick={() => dialog?.close()}>Batal</button>
		<button class="btn btn-signal flex-1" disabled={!choice} onclick={register}>
			Lanjut<span class="icon-[lucide--arrow-right] size-4"></span>
		</button>
	</div>
</dialog>
