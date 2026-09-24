<script lang="ts">
	import { page } from '$app/state';
	import { SITE_NAME, SITE_URL } from '$lib/site';

	let {
		title,
		description = 'Buku Seri Teknologi Islami: strategi ajar teknologi yang telah terbukti delapan tahun di Sekolah Impian.',
		image = '/img/khwarizmi-mark-512.png',
		icon = '/img/khwarizmi-mark.webp'
	}: { title: string; description?: string; image?: string; icon?: string } = $props();

	const canonical = $derived(SITE_URL + page.url.pathname);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<link rel="icon" href={icon} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="id_ID" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={SITE_URL + image} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
