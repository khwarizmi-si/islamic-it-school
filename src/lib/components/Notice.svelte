<script lang="ts" module>
	export type NoticeKind = 'success' | 'warning' | 'error' | 'info';
</script>

<script lang="ts">
	let { kind = 'info', text }: { kind?: NoticeKind; text: string } = $props();

	const styles: Record<NoticeKind, { cls: string; icon: string }> = {
		success: { cls: 'border-emerald-600/30 bg-emerald-600/10 text-emerald-800', icon: 'icon-[lucide--check-circle-2]' },
		warning: { cls: 'border-amber-600/30 bg-amber-500/10 text-amber-800', icon: 'icon-[lucide--triangle-alert]' },
		error: { cls: 'border-red-600/30 bg-red-600/10 text-red-800', icon: 'icon-[lucide--circle-x]' },
		info: { cls: 'border-line bg-surface-2 text-fg', icon: 'icon-[lucide--info]' }
	};
</script>

<p
	class="mt-4 flex items-start gap-2.5 rounded-lg border p-3.5 text-sm {styles[kind].cls}"
	role={kind === 'error' ? 'alert' : 'status'}
>
	<span class="{styles[kind].icon} mt-0.5 size-4 shrink-0"></span>
	<span>{text}</span>
</p>
