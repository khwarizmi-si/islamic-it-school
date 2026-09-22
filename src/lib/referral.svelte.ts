const KEY = 'referral';

/** Affiliate referral code: first seen in `?ref=`, then remembered across visits. */
export const referral = $state<{ code: string | null }>({ code: null });

/** Call on every navigation: picks up `?ref=`, falls back to the stored code, keeps it in the URL. */
export function syncReferral(url: URL): URL | null {
	const fromUrl = url.searchParams.get('ref');
	let stored: string | null = null;
	try {
		if (fromUrl) localStorage.setItem(KEY, fromUrl);
		stored = localStorage.getItem(KEY);
	} catch {
		// storage blocked (private mode): the URL param alone still works for this page
	}
	referral.code = fromUrl ?? stored;

	if (fromUrl || !referral.code) return null;
	const next = new URL(url);
	next.searchParams.set('ref', referral.code);
	return next;
}
