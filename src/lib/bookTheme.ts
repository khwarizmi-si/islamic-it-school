import type { Book } from './books';

/**
 * A landing page's palette, built from the hues sampled off its own cover, so the seven
 * pages don't share one colour. Cool accents need more lightness than warm ones to clear
 * 4.5:1 on the dark field.
 */
export function bookPalette({ ink, inkC, accent }: Pick<Book, 'ink' | 'inkC' | 'accent'>) {
	const cool = accent > 150 && accent < 330;
	const signalL = cool ? 0.82 : 0.76;
	const signalC = cool ? 0.13 : 0.17;

	return [
		`--color-bg: oklch(0.17 ${inkC} ${ink})`,
		`--color-surface: oklch(0.225 ${inkC * 1.1} ${ink})`,
		`--color-surface-2: oklch(0.28 ${inkC * 1.2} ${ink})`,
		`--color-fg: oklch(0.97 0.012 ${ink})`,
		`--color-muted: oklch(0.8 ${Math.min(inkC, 0.03)} ${ink})`,
		`--color-line: oklch(0.97 0.012 ${ink} / 0.18)`,
		`--color-signal: oklch(${signalL} ${signalC} ${accent})`,
		`--color-on-signal: oklch(0.2 0.05 ${ink})`,
		`--color-support: oklch(0.8 0.1 ${(ink + 180) % 360})`
	].join('; ');
}
