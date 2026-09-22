import { bookBySlug } from '$lib/books';

export const match = (param: string) => bookBySlug.has(param);
