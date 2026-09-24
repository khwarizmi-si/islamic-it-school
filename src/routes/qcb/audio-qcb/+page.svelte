<script lang="ts">
	import { page } from '$app/state';
	import { BRAND_MARK, mediaUrl, SITE_NAME } from '$lib/site';
	import pages from './audios.json';

	const voices = [
		{ id: 'ikhwan', label: 'Ikhwan', icon: 'icon-[lucide--user]' },
		{ id: 'akhwat', label: 'Akhwat', icon: 'icon-[lucide--user-round]' }
	];

	const entry = $derived(pages.find((p) => p.id === page.url.searchParams.get('id')));
	let voice = $state('');
	const audios = $derived(entry?.audios.filter((a) => a.voice === voice) ?? []);
</script>

<svelte:head>
	<title>{entry ? `${entry.title} — Audio QCB` : 'Audio QCB'}</title>
	<link rel="icon" href={BRAND_MARK} />
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen bg-bg text-fg">
	<main class="shell flex min-h-screen max-w-xl flex-col justify-center py-12">
		{#if entry}
			<div class="flex items-center gap-2.5">
				<img src={BRAND_MARK} alt="" width="22" height="34" class="h-8 w-auto" />
				<span class="font-display font-semibold">{SITE_NAME}</span>
			</div>

			<p class="label mt-10">{entry.title}</p>
			<h1 class="mt-2 font-display text-3xl leading-tight font-semibold">{entry.subtitle}</h1>

			<fieldset class="mt-9">
				<legend class="mb-3 flex items-center gap-2 text-sm font-semibold">
					<span class="icon-[lucide--mic] size-4 text-signal"></span>Pilih suara
				</legend>
				<div class="grid grid-cols-2 gap-3">
					{#each voices as v (v.id)}
						<label
							class={[
								'flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-5 py-4 font-medium transition-colors',
								voice === v.id ? 'border-signal bg-signal/10 text-fg' : 'border-line text-muted hover:border-fg hover:text-fg'
							]}
						>
							<input type="radio" name="voice" value={v.id} bind:group={voice} class="sr-only" />
							<span class="{v.icon} size-4"></span>{v.label}
						</label>
					{/each}
				</div>
			</fieldset>

			{#if voice}
				<ul class="mt-8 space-y-4">
					{#each audios as a (a.url)}
						<li class="rounded-lg border border-line bg-surface p-5">
							<h2 class="mb-3 flex items-center gap-2 font-display font-semibold">
								<span class="icon-[lucide--audio-lines] size-4 text-signal"></span>Audio {a.title}
							</h2>
							<audio controls preload="none" class="w-full" src={mediaUrl(`qcb/${a.url}`)}></audio>
						</li>
					{:else}
						<li class="rounded-lg border border-line p-6 text-center text-muted">Belum ada audio untuk suara ini.</li>
					{/each}
				</ul>
			{:else}
				<p class="mt-8 flex items-center gap-2 text-sm text-muted">
					<span class="icon-[lucide--arrow-up] size-4"></span>Pilih salah satu suara untuk memutar audio.
				</p>
			{/if}
		{:else}
			<div class="text-center">
				<span class="icon-[lucide--file-question] mx-auto block size-10 text-signal"></span>
				<h1 class="mt-5 font-display text-2xl font-semibold">Audio tidak ditemukan</h1>
				<p class="mt-2 text-muted">Periksa kembali kode QR pada buku, atau hubungi kami jika masalah berlanjut.</p>
				<a href="/" class="btn btn-outline mt-7">Kembali ke beranda</a>
			</div>
		{/if}
	</main>
</div>
