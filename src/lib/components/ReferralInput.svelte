<script lang="ts" module>
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
		/** The code the current `state` belongs to; differs from `code` once the user edits the field. */
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
			message = `⚠️ ${(e as Error).message}`;
		}
		checkedCode = value;
	}
</script>

<div class="rounded-lg border border-green-200 bg-green-50 p-4">
	<label for="referral" class="mb-2 block text-sm font-semibold text-green-800">🎁 Kode Referral (Opsional)</label>
	<div class="flex gap-2">
		<input
			id="referral"
			bind:value={code}
			oninput={() => (code = code.replace(/[^A-Za-z0-9_-]/g, '').toUpperCase())}
			onkeydown={(e) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					run();
				}
			}}
			{placeholder}
			maxlength="50"
			autocomplete="off"
			class="flex-1 rounded-lg border border-green-300 px-4 py-2 text-sm transition focus:border-transparent focus:ring-2 focus:ring-green-500 focus:outline-none"
		/>
		<button
			type="button"
			class="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
			disabled={state === 'checking'}
			onclick={run}
		>
			{state === 'checking' ? '...' : 'Cek'}
		</button>
	</div>
</div>
