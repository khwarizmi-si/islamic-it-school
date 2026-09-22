import { goto } from '$app/navigation';
import { API_BASE } from '$lib/site';

const TOKEN_KEY = 'authToken';

export type Role = 'super_admin' | 'admin';
export type User = { id: number; name: string; email: string; role: Role };
export type ReferralCode = { id: number; code: string; usage_count: number; is_active?: boolean };
export type Admin = { id: number; name: string; email: string; referral_code: ReferralCode | null };
export type PurchaseLog = {
	order_id: string;
	book_title: string;
	buyer_name: string;
	email?: string;
	user_email?: string;
	phone?: string;
	final_price: number;
	payment_status: 'success' | 'pending' | 'failed' | string;
	referral_code: { code: string } | null;
	created_at: string;
};
export type Paged<T> = { data: T[]; total?: number };

export const homeFor = (role: Role) => (role === 'super_admin' ? '/admin/super-admin' : '/admin/admin');

function readToken() {
	try {
		return localStorage.getItem(TOKEN_KEY);
	} catch {
		return null;
	}
}

export const session = $state<{ token: string | null; user: User | null }>({ token: readToken(), user: null });

export function signIn(token: string, user: User) {
	localStorage.setItem(TOKEN_KEY, token);
	session.token = token;
	session.user = user;
}

export function signOut() {
	if (session.token) api('/logout', { method: 'POST' }).catch(() => {}); // best-effort server-side revoke
	try {
		localStorage.removeItem(TOKEN_KEY);
	} catch {
		// already gone
	}
	session.token = null;
	session.user = null;
	goto('/admin');
}

export class ApiError extends Error {
	constructor(
		message: string,
		readonly status: number,
		readonly data?: { errors?: Record<string, string[]> }
	) {
		super(message);
	}
}

/** Authenticated JSON request against the admin API; a 401 ends the session. */
export async function api<T = unknown>(endpoint: string, init: RequestInit = {}): Promise<T> {
	const res = await fetch(`${API_BASE}${endpoint}`, {
		...init,
		credentials: 'include',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
			...(session.token ? { Authorization: `Bearer ${session.token}` } : {}),
			...init.headers
		}
	});
	const body = await res.json().catch(() => null);
	if (res.status === 401 && endpoint !== '/login' && endpoint !== '/logout') {
		toast('Sesi telah berakhir, silakan login kembali', 'error');
		signOut();
	}
	if (!res.ok) throw new ApiError(body?.message ?? `Server error: ${res.status}`, res.status, body);
	return body as T;
}

/** Laravel-style validation errors flattened into one line. */
export const errorText = (e: unknown, fallback: string) =>
	e instanceof ApiError && e.data?.errors ? Object.values(e.data.errors).flat().join(', ') : (e as Error)?.message || fallback;

export type ToastKind = 'success' | 'error' | 'info';
export const toasts = $state<{ id: number; text: string; kind: ToastKind }[]>([]);
const TOAST_MS = 3000;
let nextToast = 0;

export function toast(text: string, kind: ToastKind = 'info') {
	const id = nextToast++;
	toasts.push({ id, text, kind });
	setTimeout(() => {
		const i = toasts.findIndex((t) => t.id === id);
		if (i >= 0) toasts.splice(i, 1);
	}, TOAST_MS);
}

export const rupiah = (n: number) => `Rp ${Number(n ?? 0).toLocaleString('id-ID')}`;
export const formatDate = (iso: string, withTime = false) =>
	new Date(iso).toLocaleString('id-ID', {
		day: '2-digit',
		month: withTime ? 'short' : '2-digit',
		year: 'numeric',
		...(withTime ? { hour: '2-digit', minute: '2-digit' } : {})
	});
export const statusClass = (s: string) =>
	({ success: 'bg-green-100 text-green-800', failed: 'bg-red-100 text-red-800', pending: 'bg-yellow-100 text-yellow-800' })[s] ??
	'bg-gray-100 text-gray-800';
