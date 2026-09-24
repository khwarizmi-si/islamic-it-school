import { bookBySlug } from './books';

/**
 * Which surface a route starts on. The home hero and the book landings run dark (the landings
 * then override the palette with their own cover's hues); the catalogue and the reading-heavy
 * pages run on paper, where the covers themselves supply the colour.
 * Applied to <html> — both at prerender time (hooks.server.ts) and on client navigation
 * (root layout) — so the document background matches even when you overscroll.
 */
const NIGHT_PATHS = new Set(['/', '/qcb/audio-qcb']);

export function themeFor(pathname: string): 'theme-night' | 'theme-paper' {
	const slug = pathname.split('/')[1] ?? '';
	return NIGHT_PATHS.has(pathname) || bookBySlug.has(slug) ? 'theme-night' : 'theme-paper';
}
