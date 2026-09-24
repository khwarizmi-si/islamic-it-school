<script lang="ts" module>
	export type FaqItem = { q: string; a: string };
</script>

<script lang="ts">
	/** `a` is trusted, author-written HTML (links, lists, line breaks). */
	let { items, name = 'faq' }: { items: FaqItem[]; name?: string } = $props();
</script>

<div class="faq">
	{#each items as item (item.q)}
		<details {name}>
			<summary>
				<span>{item.q}</span>
				<span class="icon-[lucide--plus] chev size-5 shrink-0 text-muted"></span>
			</summary>
			<div class="answer">{@html item.a}</div>
		</details>
	{/each}
</div>

<style>
	.faq {
		border-top: 1px solid var(--color-line);
	}
	details {
		border-bottom: 1px solid var(--color-line);
	}
	summary {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.4rem 0;
		font-family: var(--font-display);
		font-size: 1.05rem;
		font-weight: 600;
		line-height: 1.45;
		cursor: pointer;
		list-style: none;
		transition: color 0.25s var(--ease-out-quart);
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary:hover {
		color: var(--color-signal);
	}
	.chev {
		margin-top: 0.15rem;
		transition: rotate 0.35s var(--ease-out-quart);
	}
	details[open] .chev {
		rotate: 45deg;
		color: var(--color-signal);
	}
	.answer {
		padding-bottom: 1.5rem;
		max-width: 70ch;
		line-height: 1.7;
		color: var(--color-muted);
	}
	.answer :global(a) {
		color: var(--color-fg);
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-color: var(--color-signal);
	}
	.answer :global(ol) {
		margin: 1rem 0;
		padding-left: 1.2rem;
		list-style: decimal;
	}
	.answer :global(li) {
		margin-block: 0.4rem;
	}
	.answer :global(p) {
		margin-top: 1rem;
	}

	/* Animate the disclosure where the browser supports it; a plain toggle elsewhere. */
	@supports (interpolate-size: allow-keywords) {
		details::details-content {
			block-size: 0;
			overflow: hidden;
			opacity: 0;
			transition:
				block-size 0.45s var(--ease-out-quart),
				content-visibility 0.45s allow-discrete,
				opacity 0.3s var(--ease-out-quart);
		}
		details[open]::details-content {
			block-size: auto;
			opacity: 1;
		}
	}
</style>
