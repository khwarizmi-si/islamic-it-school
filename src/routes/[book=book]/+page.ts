import { bookBySlug, books } from '$lib/books';

export const entries = () => books.map((b) => ({ book: b.slug }));

export const load = ({ params }) => ({ book: bookBySlug.get(params.book)! });
