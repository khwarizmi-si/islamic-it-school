import { redirect } from '@sveltejs/kit';

// The old generic detail page (?id=book-N) duplicated the per-book landings; send visitors there.
const TARGETS: Record<string, string> = {
	'book-1': '/lc',
	'book-2': '/itmi',
	'book-3': '/st',
	'book-4': '/mbt',
	'book-5': '/it-pf',
	'book-6': '/it-bp',
	'book-7': '/it-bm',
	'book-8': '/buku#paket'
};

export const ssr = false;

export const load = ({ url }) => {
	redirect(308, TARGETS[url.searchParams.get('id') ?? ''] ?? '/buku');
};
