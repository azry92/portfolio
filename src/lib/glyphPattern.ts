// Geometry for the home glyph band, in glyph units (the viewBox of glyph-ia.svg).
// Rows are measured from references/home-state-01.png, rows 4 and 5, with the tighter
// pitch and row spacing of references/home-01-hero-desktop.png.
import glyphSvg from '../../portfolio-content/brand/glyph-ia.svg?raw';

function pathData(id: string): string {
	const match = glyphSvg.match(new RegExp(`<path[^>]*id="${id}"[^>]*\\sd="([^"]+)"`));
	if (!match) throw new Error(`glyph-ia.svg is missing path id="${id}"`);
	return match[1];
}

export const glyph = { I: pathData('I'), A: pathData('A') };

const GLYPH_WIDTH = 40.54;
const GLYPH_HEIGHT = 34.3;
const PITCH = 41;
const COLUMNS = 23;
// Space above row 4 and below row 5.
const MARGIN = 4;

interface Copy {
	dx: number;
	dy: number;
	mirror?: 'x' | 'y';
}

interface Row {
	y: number;
	copies: Copy[];
}

const rows: Row[] = [
	// Two upright copies, the lower one nudged left so it bridges into the next tile.
	{ y: MARGIN, copies: [{ dx: 0, dy: 0 }, { dx: -3.3, dy: 24 }] },
	// A mirrored copy over a vertically flipped one. Overlaps row 4 slightly to hide the seam.
	{ y: MARGIN + 58, copies: [{ dx: 0, dy: 0, mirror: 'x' }, { dx: 0, dy: 14.6, mirror: 'y' }] },
];

function transform(x: number, y: number, { dx, dy, mirror }: Copy): string {
	if (mirror === 'x') return `translate(${x + dx + GLYPH_WIDTH} ${y + dy}) scale(-1 1)`;
	if (mirror === 'y') return `translate(${x + dx} ${y + dy + GLYPH_HEIGHT}) scale(1 -1)`;
	return `translate(${x + dx} ${y + dy})`;
}

/** Row, then tile, then the transforms of the glyph copies that make that tile. */
export const tileRows: string[][][] = rows.map((row) =>
	Array.from({ length: COLUMNS }, (_, i) => {
		const x = i * PITCH;
		return row.copies.map((copy) => transform(x, row.y, copy));
	}),
);

/**
 * Starts at 0,0: browsers disagree on where CSS transform-origin counts from when a
 * viewBox is offset. With an odd column count the middle tile sits on width / 2.
 */
export const viewBox = { width: COLUMNS * PITCH, height: MARGIN + 58 + 48.9 + MARGIN };
