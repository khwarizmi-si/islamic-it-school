type Log = { created_at: string; payment_status: string; referral_code: { code: string } | null };

const monthLabel = (d: Date) => d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Purchases made with a referral code in each of the last `months` calendar months (UTC), oldest first. */
export function referralsPerMonth(logs: Log[], months: number, now = new Date()) {
	const buckets = Array.from({ length: months }, (_, i) => {
		const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (months - 1 - i), 1));
		return { key: `${d.getUTCFullYear()}-${d.getUTCMonth()}`, label: monthLabel(d), value: 0 };
	});
	for (const log of logs) {
		if (!log.referral_code) continue;
		const d = new Date(log.created_at);
		const bucket = buckets.find((b) => b.key === `${d.getUTCFullYear()}-${d.getUTCMonth()}`);
		if (bucket) bucket.value++;
	}
	return buckets.map(({ label, value }) => ({ label, value }));
}

export function countByStatus(logs: Pick<Log, 'payment_status'>[]) {
	const counts = { success: 0, pending: 0, failed: 0 };
	for (const { payment_status } of logs) if (payment_status in counts) counts[payment_status as keyof typeof counts]++;
	return counts;
}
