const DEFAULT_TIMEOUT_MS = 15_000;

/** fetch + JSON with a timeout; throws an Error whose message is safe to show the user. */
export async function fetchJson<T>(url: string, init: RequestInit = {}, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<T> {
	let res: Response;
	try {
		res = await fetch(url, {
			...init,
			headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...init.headers },
			signal: AbortSignal.timeout(timeoutMs)
		});
	} catch (e) {
		if (e instanceof DOMException && e.name === 'TimeoutError') throw new Error('Request timeout. Silakan coba lagi.');
		throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
	}
	const body = await res.json().catch(() => null);
	if (!res.ok) throw new Error(body?.message ?? body?.error ?? `Server error (${res.status})`);
	return body as T;
}
