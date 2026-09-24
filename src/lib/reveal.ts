import type { Attachment } from 'svelte/attachments';

/**
 * `{@attach reveal}` fades an element in the first time it scrolls into view.
 * The element ships visible; JS opts it into the animation, so no-JS renders and
 * headless screenshots never end up blank.
 */
export const reveal: Attachment<HTMLElement> = (node) => {
	node.classList.add('reveal');
	node.dataset.reveal = '';
	const io = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.classList.add('is-visible');
			io.disconnect();
		},
		{ threshold: 0.08, rootMargin: '0px 0px -10% 0px' }
	);
	io.observe(node);
	return () => io.disconnect();
};
