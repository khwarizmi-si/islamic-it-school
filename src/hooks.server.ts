import type { Handle } from '@sveltejs/kit';
import { bookBySlug } from '$lib/books';
import { bookPalette } from '$lib/bookTheme';
import { themeFor } from '$lib/theme';

export const handle: Handle = ({ event, resolve }) => {
	const book = bookBySlug.get(event.url.pathname.split('/')[1] ?? '');
	// Inline style, not a :root rule — it has to beat the .theme-* class rules.
	const palette = book ? ` style="${bookPalette(book)}"` : '';

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('<html', `<html class="${themeFor(event.url.pathname)}"${palette}`)
	});
};
