<script lang="ts" module>
	export type NoticeKind = 'success' | 'warning' | 'error' | 'info';
</script>

<script lang="ts">
	let { kind = 'info', text }: { kind?: NoticeKind; text: string } = $props();

	const styles: Record<NoticeKind, string> = {
		success: 'border-green-300 bg-green-100 text-green-700',
		warning: 'border-yellow-300 bg-yellow-100 text-yellow-700',
		error: 'border-red-300 bg-red-100 text-red-700',
		info: 'border-blue-300 bg-blue-100 text-blue-700'
	};
</script>

<p class="mt-4 rounded-lg border p-3 text-center text-sm {styles[kind]}" role={kind === 'error' ? 'alert' : 'status'}>{text}</p>
