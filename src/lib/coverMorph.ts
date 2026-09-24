/**
 * Shared-element page transition for the book covers (Apple Books / Material container
 * transform). Naming the clicked cover and the destination hero the same thing is all the
 * View Transitions API needs — the browser morphs one into the other.
 * The name is set imperatively so it lands before SvelteKit starts the transition.
 */
export function markCover(event: MouseEvent) {
	const img = (event.currentTarget as HTMLElement).querySelector('img');
	if (img) img.style.viewTransitionName = 'book-cover';
}
