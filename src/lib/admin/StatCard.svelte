<script lang="ts">
	let { label, value, icon, tone }: { label: string; value: string | number; icon: string; tone: string } = $props();
</script>

<div class="flex items-center gap-4 rounded-lg bg-white p-6 shadow">
	<span class="flex size-12 shrink-0 items-center justify-center rounded-full {tone}"><span class="{icon} size-5"></span></span>
	<div class="min-w-0">
		<p class="text-gray-500">{label}</p>
		<p class="truncate text-2xl font-bold">{value}</p>
	</div>
</div>
