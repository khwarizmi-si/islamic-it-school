import { bookBySlug } from './books';

/**
 * Which surface a route runs on. Cover-led pages (home, catalogue, book landings, the QCB
 * audio page) use the dark violet; reading-led pages use paper.
 * Applied to <html> — both at prerender time (hooks.server.ts) and on client navigation
 * (root layout) — so the document background matches even when you overscroll.
 */
const NIGHT_PATHS = new Set(['/', '/buku', '/qcb/audio-qcb']);

export function themeFor(pathname: string): 'theme-night' | 'theme-paper' {
	const slug = pathname.split('/')[1] ?? '';
	return NIGHT_PATHS.has(pathname) || bookBySlug.has(slug) ? 'theme-night' : 'theme-paper';
}
