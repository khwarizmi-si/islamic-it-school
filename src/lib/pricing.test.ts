import { describe, expect, it } from 'vitest';
import { discounted, parsePrice } from './pricing';

describe('discounted', () => {
	it('takes the rate off and rounds to whole rupiah', () => {
		expect(discounted(181000, 0.05)).toBe(171950);
		expect(discounted(250000, 0.1)).toBe(225000);
		expect(discounted(93333, 0.05)).toBe(88666);
	});
	it('leaves the price alone at rate 0', () => {
		expect(discounted(117000, 0)).toBe(117000);
	});
});

describe('parsePrice', () => {
	it('accepts positive numbers only', () => {
		expect(parsePrice('117000')).toBe(117000);
		expect(parsePrice(null)).toBeNull();
		expect(parsePrice('')).toBeNull();
		expect(parsePrice('0')).toBeNull();
		expect(parsePrice('-5')).toBeNull();
		expect(parsePrice('abc')).toBeNull();
		expect(parsePrice('Infinity')).toBeNull();
	});
});
