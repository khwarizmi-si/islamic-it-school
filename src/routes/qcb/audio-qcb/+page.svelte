<script lang="ts">
	import { page } from '$app/state';
	import { mediaUrl } from '$lib/site';
	import pages from './audios.json';

	const voices = [
		{ id: 'ikhwan', label: 'Ikhwan' },
		{ id: 'akhwat', label: 'Akhwat' }
	];

	const entry = $derived(pages.find((p) => p.id === page.url.searchParams.get('id')));
	let voice = $state('');
	const audios = $derived(entry?.audios.filter((a) => a.voice === voice) ?? []);
</script>

<svelte:head>
	<title>{entry ? `${entry.title} | Audio QCB` : 'Audio QCB'}</title>
	<link rel="icon" href="/qcb/logo-si.png" />
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-linear-135 from-[#ff6b35] to-green-500 px-4 py-8">
	<div class="w-full max-w-lg animate-fade-in-up rounded-3xl border border-white/20 bg-white/25 p-8 text-center shadow-2xl backdrop-blur-xl">
		{#if entry}
			<div class="mx-auto mb-6 flex size-24 animate-float-soft items-center justify-center rounded-full bg-white/20">
				<img src="/qcb/Logo-SI.jpg" alt="Sekolah Impian" class="size-20 rounded-full object-cover" />
			</div>
			<p class="mb-2 text-xl text-white/70">{entry.title}</p>
			<h1 class="mb-6 text-2xl text-white">{entry.subtitle}</h1>

			<fieldset class="mb-6 text-left">
				<legend class="mb-3 flex items-center gap-2 font-semibold text-white">
					<span class="icon-[bx--microphone] size-5"></span>Pilih Suara
				</legend>
				<div class="grid grid-cols-2 gap-3">
					{#each voices as v (v.id)}
						<label
							class={[
								'flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 px-5 py-4 font-medium text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/25',
								voice === v.id ? 'border-green-400 bg-white/25' : 'border-white/20 bg-white/15'
							]}
						>
							<input type="radio" name="voice" value={v.id} bind:group={voice} class="sr-only" />
							<span class="icon-[bx--user] size-5"></span>{v.label}
						</label>
					{/each}
				</div>
			</fieldset>

			{#if voice}
				<ul class="space-y-6">
					{#each audios as a, i (a.url)}
						<li class="animate-fade-in-up rounded-2xl bg-white/10 p-6" style:animation-delay="{i * 0.1}s">
							<h2 class="mb-4 text-lg font-semibold text-white">{a.title}</h2>
							<audio controls preload="none" class="w-full invert hue-rotate-180" src={mediaUrl(`qcb/${a.url}`)}></audio>
						</li>
					{:else}
						<li class="rounded-2xl bg-white/10 p-6 text-white/80">Belum ada audio untuk suara ini.</li>
					{/each}
				</ul>
			{/if}
		{:else}
			<div class="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-red-500/20">
				<span class="icon-[bx--error-circle] size-12 text-red-300"></span>
			</div>
			<h1 class="mb-2 text-2xl font-bold text-white">Oops!</h1>
			<p class="text-white/80">Audio tidak dapat dimuat</p>
		{/if}
	</div>
</main>
