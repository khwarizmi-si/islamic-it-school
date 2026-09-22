<script lang="ts" module>
	export type FaqItem = { q: string; a: string; icon: string; accent: string };
</script>

<script lang="ts">
	import { reveal } from '$lib/reveal';

	/** `a` is trusted, author-written HTML (links, line breaks). */
	let { items }: { items: FaqItem[] } = $props();

	let openIndex = $state<number | null>(null);
</script>

<div class="space-y-6">
	{#each items as item, i (item.q)}
		{@const open = openIndex === i}
		<div
			class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-transform hover:-translate-y-0.5"
			style:transition-delay="{i * 0.1}s"
			{@attach reveal}
		>
			<button
				class="flex w-full items-center justify-between gap-4 p-6 text-left focus:ring-4 focus:ring-purple-100 focus:outline-none"
				aria-expanded={open}
				aria-controls="faq-{i}"
				onclick={() => (openIndex = open ? null : i)}
			>
				<span class="flex items-center gap-4">
					<span
						class="flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-r text-white {item.accent}"
					>
						<span class="size-5 {item.icon}"></span>
					</span>
					<h3 class="text-lg font-bold text-gray-800">{item.q}</h3>
				</span>
				<span
					class={['icon-[bx--chevron-down] size-6 shrink-0 text-gray-400 transition-transform duration-300', open && 'rotate-180']}
				></span>
			</button>
			<div id="faq-{i}" class="grid transition-all duration-300 {open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}">
				<div class="overflow-hidden px-6">
					<div class="mb-6 rounded-lg border-l-4 border-teal-400 bg-linear-to-r from-orange-50 to-teal-50 p-4 leading-relaxed text-gray-700 [&_a]:text-blue-600 [&_a:hover]:underline">
						{@html item.a}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
