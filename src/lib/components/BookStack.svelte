<script lang="ts">
	import { books } from '$lib/books';
	import { openBook } from '$lib/bookOpen';

	let active = $state(books.length - 1);
	let opening = $state(false);
	const mid = (books.length - 1) / 2;

	/** How far a cover sits from the one being looked at — drives the "make room" shift. */
	const shift = (i: number) => Math.sign(i - active);

	async function open(e: MouseEvent, i: number, href: string) {
		// let modified clicks (new tab, etc.) behave normally
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
		e.preventDefault();
		if (opening) return;
		opening = true;
		const cover = (e.currentTarget as HTMLElement).querySelector('img') as HTMLImageElement;
		active = i;
		await openBook(cover, href);
		opening = false;
	}
</script>

<div class="stack-wrap">
	<ul class="stack" class:is-opening={opening}>
		{#each books as book, i (book.slug)}
			<li style:--i={i - mid} style:--shift={shift(i)} style:--z={i} class:is-active={active === i}>
				<a
					href="/{book.slug}"
					aria-label="{book.name} — lihat detail"
					onpointerenter={() => (active = i)}
					onfocus={() => (active = i)}
					onclick={(e) => open(e, i, `/${book.slug}`)}
				>
					<img
						src="{book.img}/cover.jpg"
						alt="Sampul {book.name}"
						width="420"
						height="600"
						fetchpriority={i === books.length - 1 ? 'high' : undefined}
					/>
				</a>
			</li>
		{/each}
	</ul>

	<p class="caption">
		<span class="icon-[lucide--book-open] size-3.5"></span>
		{books[active].name}
	</p>
</div>

<style>
	.stack-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}
	.stack {
		position: relative;
		width: 100%;
		height: clamp(18rem, 42vw, 29rem);
		margin: 0;
		padding: 0;
		list-style: none;
		perspective: 1800px;
	}
	.stack li {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: var(--z);
		width: clamp(8.5rem, 19vw, 13rem);
		translate: -50% -50%;
		/* fanned out, plus a nudge away from whichever cover is being looked at */
		transform: translateX(calc(var(--i) * 2.6rem + var(--shift) * 1.15rem))
			translateY(calc(var(--i) * var(--i) * 0.26rem)) rotate(calc(var(--i) * 3deg));
		transition:
			transform 0.65s var(--ease-out-quart),
			filter 0.45s var(--ease-out-quart),
			opacity 0.45s var(--ease-out-quart);
		filter: brightness(0.62) saturate(0.85);
	}
	.stack li a {
		display: block;
		border-radius: 3px;
		overflow: hidden;
		box-shadow:
			0 0.5rem 1rem oklch(0.05 0.02 300 / 0.45),
			0 1.5rem 3rem oklch(0.05 0.02 300 / 0.5);
		transition:
			transform 0.65s var(--ease-out-quart),
			box-shadow 0.65s var(--ease-out-quart);
	}
	.stack li img {
		display: block;
		width: 100%;
		height: auto;
	}

	/* The cover under the pointer steps out of the fan: straightened, lifted, full colour. */
	.stack li.is-active {
		z-index: 20;
		filter: none;
		transform: translateX(calc(var(--i) * 2.6rem)) translateY(-1.5rem) rotate(0deg);
	}
	.stack li.is-active a {
		transform: scale(1.14) translateY(-0.5rem);
		box-shadow:
			0 1rem 1.5rem oklch(0.05 0.02 300 / 0.5),
			0 3.5rem 5.5rem oklch(0.05 0.02 300 / 0.7);
	}

	/* While a cover opens, the rest of the stack gets out of the way. */
	.stack.is-opening li:not(.is-active) {
		opacity: 0;
		transform: translateX(calc(var(--shift) * 6rem)) scale(0.9);
	}
	.stack.is-opening li.is-active a {
		opacity: 0;
	}

	.caption {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.85rem;
		color: var(--color-muted);
		text-align: center;
	}

	@media (prefers-reduced-motion: reduce) {
		.stack li,
		.stack li a {
			transition: none;
		}
	}
</style>
