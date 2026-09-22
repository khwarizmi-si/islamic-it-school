// Midtrans client keys are public by design (they ship in the page); set yours here.
export const MIDTRANS_CLIENT_KEY = 'PROD-Mid-client-XXXXX';
const SNAP_URL = 'https://app.midtrans.com/snap/snap.js';

export type SnapOutcome = 'success' | 'pending' | 'error' | 'close';

type Snap = {
	pay: (token: string, callbacks: Record<`on${Capitalize<SnapOutcome>}`, (result?: unknown) => void>) => void;
};

let loading: Promise<Snap> | null = null;

/** Injects Snap.js once and resolves with `window.snap`. */
export function loadSnap(): Promise<Snap> {
	loading ??= new Promise<Snap>((resolve, reject) => {
		const script = document.createElement('script');
		script.src = SNAP_URL;
		script.dataset.clientKey = MIDTRANS_CLIENT_KEY;
		script.onload = () => resolve((window as unknown as { snap: Snap }).snap);
		script.onerror = () => {
			loading = null;
			reject(new Error('Gagal memuat sistem pembayaran. Silakan refresh halaman.'));
		};
		document.head.append(script);
	});
	return loading;
}

/** Opens the Snap popup and resolves with how it ended. */
export async function payWithSnap(token: string): Promise<SnapOutcome> {
	const snap = await loadSnap();
	return new Promise((resolve) =>
		snap.pay(token, {
			onSuccess: () => resolve('success'),
			onPending: () => resolve('pending'),
			onError: () => resolve('error'),
			onClose: () => resolve('close')
		})
	);
}
