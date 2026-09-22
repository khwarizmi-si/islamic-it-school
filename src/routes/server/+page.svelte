<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { waLink } from '$lib/site';

	// ponytail: the progress is a friendly animation, not real telemetry — wire it to a status API if one appears.
	const TICK_MS = 5000;
	const MESSAGE_MS = 6000;
	const MAX_PROGRESS = 90;

	let progress = $state(45);
	let messageIndex = $state(0);
	const messages = [
		'Dalam Proses Migrasi',
		'Memindahkan data pengguna...',
		'Mengoptimasi tabel database...',
		'Mentransfer data log...',
		'Mengkonfigurasi server baru...',
		'Memverifikasi integritas data...'
	];

	$effect(() => {
		const tick = setInterval(() => {
			progress = Math.min(MAX_PROGRESS, progress + Math.floor(Math.random() * 2));
		}, TICK_MS);
		const rotate = setInterval(() => (messageIndex = (messageIndex % (messages.length - 1)) + 1), MESSAGE_MS);
		return () => {
			clearInterval(tick);
			clearInterval(rotate);
		};
	});

	const steps = [
		{ text: 'Backup data lengkap', icon: 'icon-[fa6-solid--circle-check] text-green-500' },
		{ text: 'Transfer data ke server baru', icon: 'icon-[fa6-solid--arrows-rotate] text-yellow-500' },
		{ text: 'Konfigurasi server baru', icon: 'icon-[fa6-solid--clock] text-gray-400' },
		{ text: 'Testing dan validasi', icon: 'icon-[fa6-solid--clock] text-gray-400' }
	];

	const services = [
		{ name: 'Frontend Website', status: 'Online', note: 'Halaman website dapat diakses dengan normal', badge: 'bg-green-50 text-green-600', dot: 'bg-green-600 pulse-green' },
		{ name: 'Backend API', status: 'Offline', note: 'Sedang dalam proses migrasi server', badge: 'bg-red-50 text-red-600', dot: 'bg-red-600' },
		{ name: 'Database Server', status: 'Migrasi', note: 'Proses transfer data sedang berjalan', badge: 'bg-amber-50 text-amber-600', dot: 'bg-amber-600 pulse-amber' }
	];
</script>

<Seo title="Pemeliharaan Server - Sekolah Impian" description="Server database dan backend sedang dalam pemeliharaan." />
<svelte:head><meta name="robots" content="noindex" /></svelte:head>

<main class="flex min-h-screen items-center justify-center bg-linear-135 from-slate-50 to-slate-200 p-4 md:p-8">
	<div class="w-full max-w-4xl rounded-xl bg-white p-6 shadow-[0_10px_25px_-5px_rgb(0_0_0/0.1)] md:p-8">
		<div class="mb-8 text-center">
			<div class="mx-auto mb-6 size-20 animate-float-soft rounded-full bg-linear-to-br from-sky-100 to-sky-200 p-1">
				<div class="flex size-full items-center justify-center rounded-full bg-white">
					<span class="icon-[fa6-solid--server] size-8 text-sky-600"></span>
				</div>
			</div>
			<h1 class="mb-2 text-2xl font-bold text-slate-800 md:text-3xl">Server Dalam Pemeliharaan</h1>
			<p class="mx-auto max-w-2xl text-slate-600">
				Kami sedang melakukan migrasi server database dan backend. Layanan akan kembali normal setelah proses migrasi selesai.
			</p>
		</div>

		<section class="mb-8 rounded-xl bg-linear-135 from-sky-500 to-sky-600 p-6 text-white">
			<h2 class="mb-4 flex items-center justify-center gap-2 text-lg font-semibold">
				<span class="icon-[fa6-solid--circle-info]"></span>Informasi Pemeliharaan
			</h2>
			<div class="rounded-lg bg-white/15 p-3 text-center backdrop-blur-xs">
				<p class="text-sm opacity-80">Layanan yang Terdampak</p>
				<p class="text-lg font-bold">Database & Backend Server</p>
			</div>
			<p class="mt-4 flex items-center justify-center gap-1 text-sm opacity-80">
				<span class="icon-[fa6-solid--triangle-exclamation]"></span> Kami sedang bekerja untuk menyelesaikan proses ini secepatnya
			</p>
		</section>

		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
			<section class="rounded-xl bg-slate-50 p-6">
				<h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
					<span class="pulse-amber size-2.5 rounded-full bg-amber-600"></span>Status Pemeliharaan
				</h2>
				<div class="mb-2 flex justify-between text-sm">
					<span class="text-slate-600">Migrasi Database</span>
					<span class="font-medium text-sky-700">{progress}%</span>
				</div>
				<progress class="mb-6 block h-2.5 w-full" max="100" value={progress} aria-label="Progres migrasi database"></progress>
				<ul class="space-y-3 text-sm text-slate-700">
					{#each steps as s (s.text)}
						<li class="flex items-center gap-2"><span class={s.icon}></span>{s.text}</li>
					{/each}
				</ul>
			</section>

			<section class="rounded-xl bg-slate-50 p-6">
				<h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
					<span class="icon-[fa6-solid--server]"></span>Status Layanan
				</h2>
				<ul class="space-y-4">
					{#each services as svc (svc.name)}
						<li class="rounded-lg border border-slate-200 bg-slate-50 p-4">
							<div class="mb-2 flex items-center justify-between">
								<span class="font-medium text-slate-800">{svc.name}</span>
								<span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium {svc.badge}">
									<span class="size-2.5 rounded-full {svc.dot}"></span>{svc.status}
								</span>
							</div>
							<p class="text-sm text-slate-600">{svc.note}</p>
						</li>
					{/each}
				</ul>
			</section>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<section class="rounded-xl bg-sky-50 p-6">
				<h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-sky-800">
					<span class="icon-[fa6-solid--list-check]"></span>Status Pemeliharaan
				</h2>
				<div class="py-2 text-center">
					<p class="mb-2 text-xl font-bold text-sky-700">Server Database & Backend</p>
					<p class="mb-2 text-lg font-medium text-sky-600" aria-live="polite">{messages[messageIndex]}</p>
					<p class="text-sm text-sky-600">Kami memprioritaskan keamanan dan keandalan data</p>
				</div>
			</section>

			<section class="rounded-xl bg-slate-50 p-6">
				<h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
					<span class="icon-[fa6-solid--headset]"></span>Bantuan Darurat
				</h2>
				<p class="mb-3 text-sm text-slate-600">Untuk keadaan darurat teknis selama pemeliharaan</p>
				<ul class="space-y-2 text-sm text-sky-700">
					<li>
						<a href="mailto:sekolahimpianstudio@gmail.com" class="flex items-center gap-2 hover:underline">
							<span class="icon-[fa6-solid--envelope]"></span> sekolahimpianstudio@gmail.com
						</a>
					</li>
					<li>
						<a href={waLink()} target="_blank" rel="noopener" class="flex items-center gap-2 hover:underline">
							<span class="icon-[fa6-solid--phone]"></span> +62 851 6123 1559
						</a>
					</li>
					<li>
						<a href={waLink('Halo saya butuh bantuan support')} target="_blank" rel="noopener" class="flex items-center gap-2 hover:underline">
							<span class="icon-[fa6-solid--message]"></span> Live Chat Support
						</a>
					</li>
				</ul>
			</section>
		</div>

		<p class="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-600">
			© {new Date().getFullYear()} Sekolah Impian. Dilindungi hak cipta.
		</p>
	</div>
</main>

<style>
	progress {
		appearance: none;
		border: 0;
		border-radius: 100px;
		overflow: hidden;
		background: #e2e8f0;
	}
	progress::-webkit-progress-bar {
		background: #e2e8f0;
	}
	progress::-webkit-progress-value {
		background: linear-gradient(90deg, #0ea5e9, #0284c7);
		border-radius: 100px;
		transition: width 0.5s ease;
	}
	progress::-moz-progress-bar {
		background: linear-gradient(90deg, #0ea5e9, #0284c7);
		border-radius: 100px;
	}
	.pulse-green {
		animation: pulse-ring 2s infinite;
		--ring: rgb(22 163 74 / 0.7);
	}
	.pulse-amber {
		animation: pulse-ring 2s infinite;
		--ring: rgb(217 119 6 / 0.7);
	}
	@keyframes pulse-ring {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 var(--ring);
		}
		70% {
			transform: scale(1);
			box-shadow: 0 0 0 6px transparent;
		}
		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 transparent;
		}
	}
</style>
