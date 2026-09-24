import type { Handle } from '@sveltejs/kit';
import { themeFor } from '$lib/theme';

export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('<html', `<html class="${themeFor(event.url.pathname)}"`)
	});
