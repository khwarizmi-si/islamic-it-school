import { describe, expect, it } from 'vitest';
import { countByStatus, referralsPerMonth } from './stats';

const log = (created_at: string, payment_status: string, code: string | null) => ({ created_at, payment_status, referral_code: code ? { code } : null });

describe('referralsPerMonth', () => {
	it('counts referral purchases in each of the last N months, oldest first', () => {
		const now = new Date('2026-03-15T00:00:00Z');
		const logs = [log('2026-03-01T10:00:00Z', 'success', 'A'), log('2026-03-09T10:00:00Z', 'pending', 'B'), log('2026-01-20T10:00:00Z', 'success', 'A'), log('2026-02-02T10:00:00Z', 'success', null), log('2025-06-01T10:00:00Z', 'success', 'A')];
		expect(referralsPerMonth(logs, 3, now)).toEqual([
			{ label: 'Jan 2026', value: 1 },
			{ label: 'Feb 2026', value: 0 },
			{ label: 'Mar 2026', value: 2 }
		]);
	});
});

describe('countByStatus', () => {
	it('buckets success, pending and failed; ignores others', () => {
		expect(countByStatus([log('x', 'success', null), log('x', 'success', null), log('x', 'failed', null), log('x', 'weird', null)])).toEqual({ success: 2, pending: 0, failed: 1 });
	});
});
