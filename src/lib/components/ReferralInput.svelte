<script lang="ts"module>
	export type ReferralCheck = (code: string) => Promise<{ valid: boolean; message: string }>;
	export type ReferralState = 'idle' | 'checking' | 'valid' | 'invalid';
</script>

<script lang="ts">
	let {
		check,
		code = $bindable(''),
		checkedCode = $bindable(''),
		state = $bindable<ReferralState>('idle'),
		message = $bindable(''),
		placeholder = 'Masukkan kode referral'
	}: {
		check: ReferralCheck;
		code?: string;
		/** The code the current `state`belongs to; differs from `code`once the user edits the field. */
		checkedCode?: string;
		state?: ReferralState;
		message?: string;
		placeholder?: string;
	} = $props();

	export async function run() {
		const value = code.trim();
		if (!value) {
			message = 'Masukkan kode referral terlebih dahulu!';
			return;
		}
		state = 'checking';
		try {
			const result = await check(value);
			state = result.valid ? 'valid' : 'invalid';
			message = result.message;
		} catch (e) {
			state = 'invalid';
			message = ` ${(e as Error).message}`;
		}
		checkedCode = value;
	}
</script>

<div class="rounded-lg border border-line bg-surface-2 p-4">
	<label for="referral" class="mb-2 flex items-center gap-2 text-sm font-semibold">
		<span class="icon-[lucide--ticket-percent] size-4 text-signal"></span>Kode referral (opsional)
	</label>
	<div class="flex gap-2">
		<input
			id="referral" bind:value={code}
			oninput={() => (code = code.replace(/[^A-Za-z0-9_-]/g, '').toUpperCase())}
			onkeydown={(e) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					run();
				}
			}}
			{placeholder}
			maxlength="50" autocomplete="off" class="flex-1 rounded-md border border-line bg-bg px-3.5 py-2.5 text-sm transition-shadow focus:border-transparent focus:ring-2 focus:ring-signal focus:outline-none"
		/>
		<button
			type="button" class="btn btn-outline !px-4 !py-2.5 text-sm" disabled={state === 'checking'}
			onclick={run}
		>
			{state === 'checking' ? 'Mengecek...' : 'Cek'}
		</button>
	</div>
</div>
