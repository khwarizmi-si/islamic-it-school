import { goto } from '$app/navigation';

const SWING_MS = 760;
const SETTLE_MS = 220;
/** Navigate slightly before the cover finishes swinging, so the new page is ready behind it. */
const NAVIGATE_AT = 0.62;
const EASE = 'cubic-bezier(0.25, 1, 0.5, 1)';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Lifts the clicked cover out of the page, swings it open on its spine like a real book,
 * then hands over to the destination route. Falls back to a plain navigation when the
 * visitor asked for reduced motion.
 */
export async function openBook(cover: HTMLImageElement, href: string) {
	if (reducedMotion()) return goto(href);

	const rect = cover.getBoundingClientRect();
	const scale = Math.min(1.5, (window.innerHeight * 0.62) / rect.height);
	const toX = window.innerWidth / 2 - (rect.left + rect.width / 2);
	const toY = window.innerHeight / 2 - (rect.top + rect.height / 2);

	const stage = document.createElement('div');
	stage.className = 'book-open-stage';
	stage.setAttribute('aria-hidden', 'true');
	stage.innerHTML = `
		<div class="book-open-veil"></div>
		<div class="book-open" style="left:${rect.left}px; top:${rect.top}px; width:${rect.width}px; height:${rect.height}px">
			<div class="book-open-pages"></div>
			<div class="book-open-cover">
				<img class="book-open-face" src="${cover.currentSrc || cover.src}" alt="">
				<div class="book-open-face book-open-inside"></div>
			</div>
		</div>`;
	document.body.append(stage);

	const book = stage.querySelector('.book-open') as HTMLElement;
	const face = stage.querySelector('.book-open-cover') as HTMLElement;
	const pages = stage.querySelector('.book-open-pages') as HTMLElement;
	const veil = stage.querySelector('.book-open-veil') as HTMLElement;

	const opts = { duration: SWING_MS, easing: EASE, fill: 'forwards' as const };
	book.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${toX}px, ${toY}px) scale(${scale})` }], opts);
	face.animate([{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-148deg)' }], opts);
	pages.animate([{ opacity: 0 }, { opacity: 1 }], { ...opts, duration: SWING_MS * 0.55 });
	veil.animate([{ opacity: 0 }, { opacity: 1 }], { duration: SWING_MS, easing: 'ease-in', fill: 'forwards' });

	await new Promise((resolve) => setTimeout(resolve, SWING_MS * NAVIGATE_AT));
	await goto(href);

	// Hold the veil for a beat so the new page paints behind it, then dissolve.
	await new Promise((resolve) => setTimeout(resolve, SWING_MS * (1 - NAVIGATE_AT)));
	stage.animate([{ opacity: 1 }, { opacity: 0 }], { duration: SETTLE_MS, easing: 'ease-out', fill: 'forwards' }).finished.then(
		() => stage.remove(),
		() => stage.remove()
	);
}
