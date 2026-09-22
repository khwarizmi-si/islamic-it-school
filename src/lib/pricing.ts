/** Price after a referral discount, rounded to whole rupiah. `rate` is the fraction taken off (0.05 = 5%). */
export const discounted = (price: number, rate: number) => Math.round(price * (1 - rate));

/** A positive, finite price from a query-string value, or null. */
export function parsePrice(raw: string | null): number | null {
	const n = Number(raw);
	return Number.isFinite(n) && n > 0 ? n : null;
}
