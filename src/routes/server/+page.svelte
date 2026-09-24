<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { EMAIL, WA_DISPLAY, waLink } from '$lib/site';

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
		{ text: 'Backup data lengkap', icon: 'icon-[lucide--check-circle-2] text-emerald-600' },
		{ text: 'Transfer data ke server baru', icon: 'icon-[lucide--refresh-cw] text-amber-600' },
		{ text: 'Konfigurasi server baru', icon: 'icon-[lucide--clock] text-muted' },
		{ text: 'Testing dan validasi', icon: 'icon-[lucide--clock] text-muted' }
	];

	const services = [
		{ name: 'Frontend Website', status: 'Online', note: 'Halaman website dapat diakses dengan normal', badge: 'bg-emerald-600/12 text-emerald-700', dot: 'bg-green-600 pulse-green' },
		{ name: 'Backend API', status: 'Offline', note: 'Sedang dalam proses migrasi server', badge: 'bg-red-600/12 text-red-700', dot: 'bg-red-600' },
		{ name: 'Database Server', status: 'Migrasi', note: 'Proses transfer data sedang berjalan', badge: 'bg-amber-500/15 text-amber-700', dot: 'bg-amber-600 pulse-amber' }
	];
</script>

<Seo title="Pemeliharaan Server — Khwarizmi" description="Server database dan backend sedang dalam pemeliharaan." />
<svelte:head><meta name="robots" content="noindex" /></svelte:head>

<main class="flex min-h-screen items-center justify-center bg-bg p-4 text-fg md:p-8">
	<div class="w-full max-w-4xl rounded-xl border border-line bg-surface p-6 md:p-8">
		<div class="mb-8 text-center">
			<div class="mx-auto mb-6 size-20 animate-float-soft rounded-full bg-surface-2 p-1">
				<div class="flex size-full items-center justify-center rounded-full bg-surface">
					<span class="icon-[lucide--server] size-8 text-signal"></span>
				</div>
			</div>
			<h1 class="mb-2 font-display text-2xl font-semibold text-fg md:text-3xl">Server Dalam Pemeliharaan</h1>
			<p class="mx-auto max-w-2xl text-muted">
				Kami sedang melakukan migrasi server database dan backend. Layanan akan kembali normal setelah proses migrasi selesai.
			</p>
		</div>

		<section class="mb-8 rounded-xl bg-fg p-6 text-bg">
			<h2 class="mb-4 flex items-center justify-center gap-2 text-lg font-semibold">
				<span class="icon-[lucide--info]"></span>Informasi Pemeliharaan
			</h2>
			<div class="rounded-lg bg-white/15 p-3 text-center backdrop-blur-xs">
				<p class="text-sm opacity-80">Layanan yang Terdampak</p>
				<p class="text-lg font-bold">Database & Backend Server</p>
			</div>
			<p class="mt-4 flex items-center justify-center gap-1 text-sm opacity-80">
				<span class="icon-[lucide--triangle-alert]"></span> Kami sedang bekerja untuk menyelesaikan proses ini secepatnya
			</p>
		</section>

		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
			<section class="rounded-xl bg-surface-2 p-6">
				<h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-fg">
					<span class="pulse-amber size-2.5 rounded-full bg-amber-600"></span>Status Pemeliharaan
				</h2>
				<div class="mb-2 flex justify-between text-sm">
					<span class="text-muted">Migrasi Database</span>
					<span class="font-medium text-signal">{progress}%</span>
				</div>
				<progress class="mb-6 block h-2.5 w-full" max="100" value={progress} aria-label="Progres migrasi database"></progress>
				<ul class="space-y-3 text-sm text-fg">
					{#each steps as s (s.text)}
						<li class="flex items-center gap-2"><span class={s.icon}></span>{s.text}</li>
					{/each}
				</ul>
			</section>

			<section class="rounded-xl bg-surface-2 p-6">
				<h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-fg">
					<span class="icon-[lucide--server]"></span>Status Layanan
				</h2>
				<ul class="space-y-4">
					{#each services as svc (svc.name)}
						<li class="rounded-lg border border-line bg-surface-2 p-4">
							<div class="mb-2 flex items-center justify-between">
								<span class="font-medium text-fg">{svc.name}</span>
								<span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium {svc.badge}">
									<span class="size-2.5 rounded-full {svc.dot}"></span>{svc.status}
								</span>
							</div>
							<p class="text-sm text-muted">{svc.note}</p>
						</li>
					{/each}
				</ul>
			</section>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<section class="rounded-xl bg-surface-2 p-6">
				<h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-fg">
					<span class="icon-[lucide--list-checks]"></span>Status Pemeliharaan
				</h2>
				<div class="py-2 text-center">
					<p class="mb-2 font-display text-xl font-semibold text-signal">Server Database & Backend</p>
					<p class="mb-2 text-lg font-medium text-signal" aria-live="polite">{messages[messageIndex]}</p>
					<p class="text-sm text-signal">Kami memprioritaskan keamanan dan keandalan data</p>
				</div>
			</section>

			<section class="rounded-xl bg-surface-2 p-6">
				<h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-fg">
					<span class="icon-[lucide--life-buoy]"></span>Bantuan Darurat
				</h2>
				<p class="mb-3 text-sm text-muted">Untuk keadaan darurat teknis selama pemeliharaan</p>
				<ul class="space-y-2 text-sm text-signal">
					<li>
						<a href="mailto:{EMAIL}" class="flex items-center gap-2 hover:underline">
							<span class="icon-[lucide--mail]"></span>{EMAIL}
						</a>
					</li>
					<li>
						<a href={waLink()} target="_blank" rel="noopener" class="flex items-center gap-2 hover:underline">
							<span class="icon-[lucide--phone]"></span>{WA_DISPLAY}
						</a>
					</li>
					<li>
						<a href={waLink('Halo saya butuh bantuan support')} target="_blank" rel="noopener" class="flex items-center gap-2 hover:underline">
							<span class="icon-[lucide--message-circle]"></span> Live Chat Support
						</a>
					</li>
				</ul>
			</section>
		</div>

		<p class="mt-8 border-t border-line pt-6 text-center text-sm text-muted">
			© {new Date().getFullYear()} Khwarizmi. Dilindungi hak cipta.
		</p>
	</div>
</main>

<style>
	progress {
		appearance: none;
		border: 0;
		border-radius: 100px;
		overflow: hidden;
		background: var(--color-surface-2);
	}
	progress::-webkit-progress-bar {
		background: var(--color-surface-2);
	}
	progress::-webkit-progress-value {
		background: var(--color-signal);
		border-radius: 100px;
		transition: width 0.5s ease;
	}
	progress::-moz-progress-bar {
		background: var(--color-signal);
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
