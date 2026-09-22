<script lang="ts">
	import { goto } from '$app/navigation';
	import Seo from '$lib/components/Seo.svelte';
	import { referral } from '$lib/referral.svelte';

	const tabs = [
		{
			id: 'orangtua',
			label: 'Untuk Orang Tua',
			icon: 'icon-[bx--home-heart]',
			heading: 'Strategi Mengajarkan Teknologi untuk Gen Z dan Alpha',
			strategies: [
				{ emoji: '🔍', title: 'Mengenal Generasi Digital', points: ['Memahami kelebihan Gen Z & Alpha sebagai digital native', 'Mengenali tantangan dan kelemahan generasi digital', 'Kiat menghadapi karakter unik generasi sekarang'] },
				{ emoji: '🎯', title: 'Menginstal "Tujuan Besar"', points: ['Teknik menanamkan visi besar dalam belajar teknologi', 'Membuat anak memahami "why" sebelum "how"', 'Contoh praktis menetapkan tujuan belajar'] },
				{ emoji: '🧗', title: 'Membangun Mental "Climber"', points: ['Teknik mengembangkan daya juang tinggi', 'Mengatasi mental block dalam belajar teknologi', 'Role model climber di dunia teknologi'] },
				{ emoji: '🚀', title: 'Metode GCLWAMA & ICAVGP', points: ['Memulai dengan GCLWAMA: pendekatan bertahap', 'Mengakhiri dengan ICAVGP: evaluasi hasil belajar', 'Panduan praktis untuk orang tua'] }
			]
		},
		{
			id: 'guru',
			label: 'Untuk Guru',
			icon: 'icon-[bx--chalkboard]',
			heading: 'Strategi Mengajar Teknologi yang Kreatif dan Produktif',
			strategies: [
				{ emoji: '💡', title: 'Kreativitas vs Inovasi', points: ['Memahami perbedaan kreativitas dan inovasi', 'Teknik stimulasi kreativitas dalam pembelajaran IT', 'Studi kasus kreativitas di dunia teknologi'] },
				{ emoji: '✨', title: 'Membentuk Anak Kreatif', points: ['Metode pengajaran yang mendorong kreativitas', 'Mengembangkan pola pikir inovatif', 'Tools untuk mengasah kreativitas digital'] },
				{ emoji: '🏭', title: 'Meningkatkan Produktivitas', points: ['Strategi membuat anak produktif dengan teknologi', 'Time management untuk generasi digital', 'Teknik produktivitas ala programmer'] },
				{ emoji: '📊', title: 'Evaluasi Pembelajaran', points: ['Mengukur kreativitas dan produktivitas siswa', 'Portofolio digital sebagai alat evaluasi', 'Teknik feedback yang membangun'] }
			]
		},
		{
			id: 'umum',
			label: 'Orang Tua & Guru',
			icon: 'icon-[bx--group]',
			heading: 'Strategi Mengajar Teknologi untuk Monetisasi & Kemandirian',
			strategies: [
				{ emoji: '🧠', title: 'Kemandirian Emosional', points: ['Teknik membangun kemandirian perilaku', 'Menanamkan nilai-nilai kemandirian', 'Mengatasi ketergantungan teknologi'] },
				{ emoji: '💼', title: 'Dasar Bisnis Digital', points: ['Konsep dasar kemandirian finansial', 'Model bisnis di era digital', 'Etika bisnis dalam Islam'] },
				{ emoji: '💰', title: 'Monetisasi Skill', points: ['Platform monetisasi untuk skill teknologi', 'Membangun personal brand digital', 'Strategi pricing untuk pemula'] },
				{ emoji: '🛠️', title: 'Project Based Learning', points: ['Metode pembelajaran berbasis proyek nyata', 'Studi kasus project monetisasi sukses', 'Template project untuk berbagai level'] }
			]
		}
	];
	const emojiColors = ['text-orange-500', 'text-teal-500', 'text-blue-500', 'text-purple-500'];

	const facilities = [
		{ icon: 'icon-[bx--book]', title: 'Modul Digital', text: 'Materi lengkap dalam format PDF' },
		{ icon: 'icon-[bx--video]', title: 'Rekaman Video', text: 'Akses rekaman semua sesi' },
		{ icon: 'icon-[bx--certification]', title: 'Sertifikat', text: 'Sertifikat elektronik' },
		{ icon: 'icon-[bx--group]', title: 'Komunitas', text: 'Akses grup diskusi' }
	];

	const options = [
		{ label: 'Orang Tua', price: 250000, icon: 'icon-[bx--home-heart] text-orange-500', selected: 'border-orange-400 bg-orange-50 ring-orange-500' },
		{ label: 'Guru', price: 350000, icon: 'icon-[bx--chalkboard] text-teal-500', selected: 'border-teal-400 bg-teal-50 ring-teal-500' },
		{ label: 'Orang Tua & Guru', price: 500000, icon: 'icon-[bx--group] text-blue-500', selected: 'border-blue-400 bg-blue-50 ring-blue-500' }
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

{#snippet registerButton(extra: string)}
	<button
		class="btn-shine inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg {extra}"
		onclick={() => dialog?.showModal()}
	>
		<span class="icon-[bx--book-open] size-6"></span>
		Daftar Sekarang
	</button>
{/snippet}

<Seo
	title="Islamic IT Course - Pelatihan Guru & Orang Tua"
	description="Pelatihan guru dan orang tua: strategi mengajarkan teknologi untuk Gen Z & Alpha."
/>

<main>
	<section class="bg-linear-to-r from-blue-50 to-teal-50 px-4 py-20">
		<div class="mx-auto max-w-6xl text-center">
			<h1 class="mb-6 text-4xl font-extrabold md:text-5xl lg:text-6xl">
				<span class="gradient-tri-text">Pelatihan Guru & Orang Tua</span><br />
				<span class="text-gray-800">Mengajar Teknologi untuk Gen Z & Alpha</span>
			</h1>
			<p class="mx-auto mb-8 max-w-3xl text-xl text-gray-700">
				Bekali diri dengan metode terbaik untuk membimbing anak-anak di era digital
			</p>
			{@render registerButton('')}
		</div>
	</section>

	<section class="px-4 py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-3xl font-extrabold md:text-4xl"><span class="gradient-tri-text">📋 Strategi Pengajaran</span></h2>
				<p class="mx-auto max-w-3xl text-xl text-gray-700">Konten khusus disesuaikan untuk orang tua dan guru</p>
			</div>

			<div class="mb-12 flex flex-wrap justify-center gap-4" role="tablist">
				{#each tabs as tab (tab.id)}
					<button
						role="tab"
						id="tab-{tab.id}"
						aria-selected={activeTab === tab.id}
						aria-controls="panel-{tab.id}"
						class={[
							'flex items-center gap-2 rounded-lg border-2 px-6 py-3 font-semibold shadow-md transition-all',
							activeTab === tab.id ? 'gradient-bg border-white text-white' : 'border-transparent bg-white'
						]}
						onclick={() => (activeTab = tab.id)}
					>
						<span class="{tab.icon} size-5"></span>{tab.label}
					</button>
				{/each}
			</div>

			{#each tabs as tab (tab.id)}
				<div
					role="tabpanel"
					id="panel-{tab.id}"
					aria-labelledby="tab-{tab.id}"
					hidden={activeTab !== tab.id}
					class="mb-8 animate-fade-in-up rounded-2xl bg-white p-8 shadow-lg"
				>
					<h3 class="mb-6 text-center text-2xl font-bold"><span class="gradient-tri-text">{tab.heading}</span></h3>
					<div class="grid gap-8 md:grid-cols-2">
						{#each tab.strategies as s, i (s.title)}
							<div class="rounded-xl border border-gray-200 bg-gray-50 p-6 card-lift">
								<div class="mb-4 text-4xl {emojiColors[i]}">{s.emoji}</div>
								<h4 class="mb-3 text-xl font-semibold">{s.title}</h4>
								<ul class="list-inside list-disc space-y-2 text-gray-700">
									{#each s.points as p (p)}
										<li>{p}</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="bg-gray-50 px-4 py-20">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-16 text-center text-3xl font-extrabold md:text-4xl"><span class="gradient-tri-text">🎁 Fasilitas Peserta</span></h2>
			<div class="grid gap-6 md:grid-cols-4">
				{#each facilities as f (f.title)}
					<div class="rounded-xl bg-white p-6 text-center shadow-sm">
						<span class="{f.icon} mb-3 size-10 text-blue-500"></span>
						<h3 class="mb-2 font-bold text-gray-800">{f.title}</h3>
						<p class="text-sm text-gray-600">{f.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="bg-linear-to-r from-green-600 to-teal-600 px-4 py-16 text-white">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-6 text-3xl font-bold md:text-4xl">Siap Mengubah Cara Mengajar Teknologi?</h2>
			<p class="mx-auto mb-8 max-w-2xl text-xl">Daftar sekarang dan dapatkan metode terbaik untuk membimbing generasi digital</p>
			{@render registerButton('font-bold')}
		</div>
	</section>
</main>

<dialog
	bind:this={dialog}
	class="m-auto w-full max-w-md rounded-2xl bg-white p-8 backdrop:bg-black/50"
	aria-labelledby="reg-title"
	onclick={(e) => e.target === dialog && dialog.close()}
>
	<h3 id="reg-title" class="mb-6 text-center text-2xl font-bold text-gray-800">Pilih Jenis Pelatihan</h3>
	<div class="mb-6 space-y-4" role="radiogroup">
		{#each options as opt (opt.label)}
			<button
				role="radio"
				aria-checked={choice === opt}
				class={[
					'flex w-full items-center gap-2 rounded-lg border px-6 py-4 text-left transition',
					choice === opt ? `ring-2 ring-offset-2 ${opt.selected}` : 'border-gray-200 bg-gray-100 hover:bg-gray-50'
				]}
				onclick={() => (choice = opt)}
			>
				<span class="{opt.icon} size-5"></span>
				Untuk {opt.label}
			</button>
		{/each}
	</div>
	<button
		class="w-full rounded-lg bg-linear-to-r from-green-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
		disabled={!choice}
		onclick={register}
	>
		Lanjut ke Pendaftaran
	</button>
</dialog>
