<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { reveal } from '$lib/reveal';
	import { SOCIAL, WA_DISPLAY, waLink } from '$lib/site';

	const channels = [
		{
			name: 'Instagram',
			handle: SOCIAL.instagramHandle,
			blurb: 'Foto dan video pendek dari kelas, buku, dan kegiatan harian.',
			icon: 'icon-[lucide--instagram]',
			stats: [
				['4K', 'Pengikut'],
				['724', 'Postingan']
			],
			href: SOCIAL.instagram,
			cta: 'Ikuti'
		},
		{
			name: 'YouTube',
			handle: 'Sekolah Impian',
			blurb: 'Ratusan video: metode ajar, bedah buku, dan karya santri.',
			icon: 'icon-[lucide--youtube]',
			stats: [
				['6.88K', 'Subscriber'],
				['249', 'Video'],
				['798K', 'Tayangan']
			],
			href: SOCIAL.youtube,
			cta: 'Subscribe'
		},
		{
			name: 'WhatsApp',
			handle: WA_DISPLAY,
			blurb: 'Tanya langsung soal buku, pelatihan, atau pendaftaran kursus.',
			icon: 'icon-[lucide--message-circle]',
			stats: [
				['24/7', 'Terbuka'],
				['Cepat', 'Dibalas']
			],
			href: waLink(),
			cta: 'Chat'
		},
		{
			name: 'Website sekolah',
			handle: 'sekolahimpian.com',
			blurb: 'Profil lengkap sekolah, program, dan jalur pendaftaran santri.',
			icon: 'icon-[lucide--globe]',
			stats: [
				['Lengkap', 'Informasi'],
				['Rutin', 'Diperbarui']
			],
			href: SOCIAL.school,
			cta: 'Kunjungi'
		}
	];
</script>

<Seo title="Kanal & Media Sosial — Khwarizmi" description="Ikuti Khwarizmi di Instagram, YouTube, WhatsApp, dan website sekolah." />

<main>
	<section class="shell grid items-end gap-8 pt-12 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
		<div>
			<p class="label mb-5 flex items-center gap-2 text-signal">
				<span class="icon-[lucide--share-2] size-4"></span>Kanal kami
			</p>
			<h1 class="text-hero font-semibold">Ikuti pembelajaran kami setiap hari.</h1>
		</div>
		<p class="max-w-[42ch] text-lede text-muted">
			Konten edukasi, dokumentasi kelas, dan pengumuman program terbaru — pilih kanal yang paling nyaman untuk Anda.
		</p>
	</section>

	<section class="rule">
		<div class="shell band-tight">
			<ul class="grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2">
				{#each channels as c (c.name)}
					<li class="bg-bg" {@attach reveal}>
						<a href={c.href} target="_blank" rel="noopener" class="group flex h-full flex-col p-7 lg:p-9">
							<div class="flex items-center justify-between gap-4">
								<span class="{c.icon} size-6 text-signal"></span>
								<span class="icon-[lucide--arrow-up-right] size-5 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"></span>
							</div>
							<h2 class="mt-5 text-head font-semibold">{c.name}</h2>
							<p class="mt-1 text-sm text-signal">{c.handle}</p>
							<p class="mt-3 flex-1 leading-relaxed text-muted">{c.blurb}</p>

							<dl class="rule mt-7 flex flex-wrap gap-x-10 gap-y-4 pt-5">
								{#each c.stats as [value, label] (label)}
									<div>
										<dt class="text-xs text-muted">{label}</dt>
										<dd class="font-display text-xl font-semibold">{value}</dd>
									</div>
								{/each}
							</dl>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="rule">
		<div class="shell band">
			<div class="rounded-xl bg-surface p-8 text-center lg:p-14" {@attach reveal}>
				<h2 class="mx-auto max-w-2xl text-title font-semibold">Jangan sampai ketinggalan kelas berikutnya</h2>
				<p class="mx-auto mt-4 max-w-xl text-lede text-muted">
					Pengumuman batch pelatihan, webinar, dan kelas coba gratis selalu keluar lebih dulu di kanal kami.
				</p>
				<div class="mt-8 flex flex-wrap justify-center gap-3">
					<a href={SOCIAL.instagram} target="_blank" rel="noopener" class="btn btn-signal">
						<span class="icon-[lucide--instagram] size-4"></span>Ikuti Instagram
					</a>
					<a href={SOCIAL.youtube} target="_blank" rel="noopener" class="btn btn-outline">
						<span class="icon-[lucide--youtube] size-4"></span>Subscribe YouTube
					</a>
				</div>
			</div>
		</div>
	</section>
</main>
