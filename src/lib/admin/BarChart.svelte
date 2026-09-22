<script lang="ts">
	/** Horizontal bars — enough for a handful of counts without a chart library. */
	let { rows, empty = 'Belum ada data' }: { rows: { label: string; value: number; color: string }[]; empty?: string } = $props();

	const max = $derived(Math.max(1, ...rows.map((r) => r.value)));
</script>

{#if rows.some((r) => r.value > 0)}
	<dl class="space-y-3">
		{#each rows as r (r.label)}
			<div class="grid grid-cols-[6rem_1fr_2.5rem] items-center gap-3 text-sm">
				<dt class="truncate text-gray-600">{r.label}</dt>
				<dd class="h-4 overflow-hidden rounded bg-gray-100">
					<div class="h-full rounded {r.color}" style:width="{(r.value / max) * 100}%"></div>
				</dd>
				<dd class="text-right font-semibold tabular-nums">{r.value}</dd>
			</div>
		{/each}
	</dl>
{:else}
	<p class="text-center text-gray-500">{empty}</p>
{/if}
