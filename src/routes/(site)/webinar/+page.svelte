<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { reveal } from '$lib/reveal';
	import { waLink } from '$lib/site';

	const audiences = [
		{
			title: 'Orang tua',
			icon: 'icon-[lucide--heart-handshake]',
			points: ['Memahami perkembangan anak di era digital', 'Tips mendampingi belajar online', 'Memilih sekolah yang tepat', 'Komunikasi efektif dengan guru', 'Mengembangkan karakter anak']
		},
		{
			title: 'Guru & pengajar',
			icon: 'icon-[lucide--presentation]',
			points: ['Metode pembelajaran inovatif', 'Teknologi dalam pendidikan', 'Manajemen kelas digital', 'Penilaian berbasis kompetensi', 'Pengembangan kurikulum']
		},
		{
			title: 'Penyelenggara pendidikan',
			icon: 'icon-[lucide--building-2]',
			points: ['Strategi digitalisasi sekolah', 'Manajemen lembaga pendidikan', 'Regulasi pendidikan terbaru', 'Kemitraan dengan orang tua', 'Peningkatan kualitas pendidikan']
		}
	];

	const SPEAKER = 'Ust. Purwanto Abdul Ghafar';
	const schedule = [
		{ title: 'Pendidikan Karakter di Era Digital', text: 'Membangun karakter anak di tengah dominasi teknologi.', icon: 'icon-[lucide--compass]' },
		{ title: 'Teknologi AI dalam Pembelajaran', text: 'Memanfaatkan kecerdasan buatan untuk meningkatkan kualitas belajar.', icon: 'icon-[lucide--bot]' },
		{ title: 'Kemitraan Orang Tua dan Sekolah', text: 'Membangun komunikasi yang efektif antara rumah dan sekolah.', icon: 'icon-[lucide--handshake]' },
		{ title: 'Metode Pembelajaran Abad 21', text: 'Strategi mengajar yang relevan dengan tuntutan masa depan.', icon: 'icon-[lucide--brain]' }
	];

	const reasons = [
		{ title: 'Biaya terjangkau', text: 'Investasi kecil untuk manfaat besar.', icon: 'icon-[lucide--wallet]' },
		{ title: 'Sertifikat resmi', text: 'Dapatkan sertifikat kehadiran.', icon: 'icon-[lucide--badge-check]' },
		{ title: 'Rekaman tersedia', text: 'Tonton ulang kapan saja.', icon: 'icon-[lucide--video]' },
		{ title: 'Diskusi interaktif', text: 'Tanya jawab langsung dengan pembicara.', icon: 'icon-[lucide--messages-square]' }
	];
</script>

<Seo
	title="Webinar Pendidikan — Khwarizmi"
	description="Diskusi dan seminar online untuk orang tua, guru, dan penyelenggara pendidikan."
/>

<main>
	<section class="shell grid items-end gap-8 pt-12 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
		<div>
			<p class="label mb-5 flex items-center gap-2 text-signal">
				<span class="icon-[lucide--radio] size-4"></span>Webinar
			</p>
			<h1 class="text-hero font-semibold">Diskusi pendidikan, dari rumah masing-masing.</h1>
		</div>
		<div>
			<p class="max-w-[44ch] text-lede text-muted">
				Ruang belajar bersama ribuan orang tua, guru, dan penyelenggara pendidikan yang sedang memikirkan hal yang sama.
			</p>
			<div class="mt-7 flex flex-wrap gap-3">
				<a href="#jadwal" class="btn btn-signal">Lihat jadwal<span class="icon-[lucide--arrow-down] size-4"></span></a>
				<a href={waLink('Halo, saya mau daftar webinar pendidikan.')} target="_blank" rel="noopener" class="btn btn-outline">
					<span class="icon-[lucide--message-circle] size-4"></span>Daftar via WhatsApp
				</a>
			</div>
		</div>
	</section>

	<section class="rule">
		<div class="shell band">
			<h2 class="max-w-xl text-title font-semibold" {@attach reveal}>Untuk siapa webinar ini?</h2>
			<div class="mt-12 grid gap-px overflow-hidden rounded-lg bg-line md:grid-cols-3">
				{#each audiences as a (a.title)}
					<div class="bg-bg p-7 lg:p-8" {@attach reveal}>
						<span class="{a.icon} size-6 text-signal"></span>
						<h3 class="mt-5 text-head font-semibold">{a.title}</h3>
						<ul class="mt-4 space-y-2.5">
							{#each a.points as p (p)}
								<li class="flex items-start gap-2.5 text-muted">
									<span class="icon-[lucide--check] mt-1 size-4 shrink-0 text-signal"></span>{p}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section id="jadwal" class="rule scroll-mt-24">
		<div class="shell band">
			<div class="flex flex-wrap items-end justify-between gap-6" {@attach reveal}>
				<h2 class="max-w-xl text-title font-semibold">Tema yang sedang disiapkan</h2>
				<p class="text-sm text-muted">Tanggal diumumkan lewat WhatsApp dan Instagram.</p>
			</div>

			<ul class="mt-10">
				{#each schedule as w (w.title)}
					<li class="rule" {@attach reveal}>
						<div class="flex flex-wrap items-center gap-x-6 gap-y-4 py-7">
							<span class="{w.icon} size-6 shrink-0 text-signal"></span>
							<div class="min-w-[16rem] flex-1">
								<h3 class="font-display text-lg font-semibold">{w.title}</h3>
								<p class="mt-1.5 text-muted">{w.text}</p>
								<p class="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
									<span class="flex items-center gap-1.5"><span class="icon-[lucide--user] size-3.5"></span>{SPEAKER}</span>
									<span class="flex items-center gap-1.5"><span class="icon-[lucide--clock] size-3.5"></span>Segera diumumkan</span>
								</p>
							</div>
							<a href={waLink(`Halo, saya mau daftar webinar "${w.title}".`)} target="_blank" rel="noopener" class="btn btn-outline shrink-0">
								Daftar<span class="icon-[lucide--arrow-right] size-4"></span>
							</a>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="rule">
		<div class="shell band-tight">
			<h2 class="label" {@attach reveal}>Yang Anda dapatkan</h2>
			<ul class="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
				{#each reasons as r (r.title)}
					<li class="rule pt-5" {@attach reveal}>
						<span class="{r.icon} size-5 text-signal"></span>
						<h3 class="mt-3 font-display font-semibold">{r.title}</h3>
						<p class="mt-1.5 text-sm text-muted">{r.text}</p>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="rule">
		<div class="shell band">
			<div class="rounded-xl bg-surface p-8 text-center lg:p-14" {@attach reveal}>
				<h2 class="mx-auto max-w-2xl text-title font-semibold">Siap bergabung dengan komunitas pendidikan kami?</h2>
				<p class="mx-auto mt-4 max-w-xl text-lede text-muted">
					Kapasitas tiap sesi terbatas agar diskusi tetap hidup. Amankan tempat Anda lebih awal.
				</p>
				<a href={waLink('Halo, saya mau daftar webinar pendidikan.')} target="_blank" rel="noopener" class="btn btn-signal mx-auto mt-8">
					<span class="icon-[lucide--message-circle] size-4"></span>Daftar via WhatsApp
				</a>
			</div>
		</div>
	</section>
</main>
