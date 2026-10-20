// WCAG 2.2 contrast, used to pick readable text for a case study's accent band.

function luminance(hex: string): number {
	const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
	const [r, g, b] = channels.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
	const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return (light + 0.05) / (dark + 0.05);
}

/**
 * The first candidate that reaches 4.5:1 (AA for body text) on the background.
 * Candidates are [token name, hex] pairs; the token name is returned for CSS.
 */
export function readableOn(background: string, candidates: [string, string][]): string {
	const pick = candidates.find(([, hex]) => contrastRatio(hex, background) >= 4.5);
	if (!pick) {
		throw new Error(`No text colour reaches 4.5:1 on accent ${background}; choose a darker accent.`);
	}
	return pick[0];
}
