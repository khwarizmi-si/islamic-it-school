<script lang="ts">
	import { books } from '$lib/books';

	let active = $state(books.length - 1);
	const mid = (books.length - 1) / 2;
</script>

<div class="stack-wrap">
	<ul class="stack" style:--n={books.length}>
		{#each books as book, i (book.slug)}
			<li style:--i={i - mid} style:--z={i} class:is-active={active === i}>
				<a
					href="/{book.slug}"
					aria-label="{book.name} — lihat detail"
					onpointerenter={() => (active = i)}
					onfocus={() => (active = i)}
				>
					<img src="{book.img}/cover.jpg" alt="Sampul {book.name}" width="420" height="600" fetchpriority={i === books.length - 1 ? 'high' : undefined} />
				</a>
			</li>
		{/each}
	</ul>
	<p class="caption">
		<span class="icon-[lucide--mouse-pointer-click] size-3.5"></span>
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
		height: clamp(17rem, 40vw, 27rem);
		margin: 0;
		padding: 0;
		list-style: none;
		perspective: 1600px;
	}
	.stack li {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: var(--z);
		width: clamp(8.5rem, 19vw, 13rem);
		translate: -50% -50%;
		transform: translateX(calc(var(--i) * 2.6rem)) translateY(calc(var(--i) * var(--i) * 0.28rem))
			rotate(calc(var(--i) * 3deg));
		transition: transform 0.7s var(--ease-out-quart);
	}
	.stack li a {
		display: block;
		border-radius: 3px;
		overflow: hidden;
		box-shadow:
			0 0.5rem 1rem oklch(0.05 0.02 300 / 0.45),
			0 2rem 4rem oklch(0.05 0.02 300 / 0.55);
		transition:
			transform 0.7s var(--ease-out-quart),
			box-shadow 0.7s var(--ease-out-quart);
	}
	.stack li img {
		display: block;
		width: 100%;
		height: auto;
	}
	/* Fan out on hover of the whole stack, and lift whichever cover is active. */
	.stack:hover li,
	.stack:focus-within li {
		transform: translateX(calc(var(--i) * 3.4rem)) translateY(calc(var(--i) * var(--i) * 0.2rem))
			rotate(calc(var(--i) * 3.8deg));
	}
	.stack li.is-active a {
		transform: translateY(-1.25rem) scale(1.05);
		box-shadow:
			0 1rem 1.5rem oklch(0.05 0.02 300 / 0.5),
			0 3rem 5rem oklch(0.05 0.02 300 / 0.65);
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
