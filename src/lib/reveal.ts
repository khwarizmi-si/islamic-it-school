import type { Attachment } from 'svelte/attachments';

/** `{@attach reveal}` fades an element in the first time it scrolls into view (see `.reveal` in layout.css). */
export const reveal: Attachment<HTMLElement> = (node) => {
	node.classList.add('reveal');
	const io = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.classList.add('is-visible');
			io.disconnect();
		},
		{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
	);
	io.observe(node);
	return () => io.disconnect();
};
