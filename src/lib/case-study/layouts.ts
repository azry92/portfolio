// Maps the <!-- layout: ... --> notes in a case study's Markdown to layouts the
// template knows how to draw. The patterns are deliberately narrow: a note that
// matches none of them stops the build instead of falling back to a guess.

export type Frame = 'phone' | 'browser' | 'none';

export type Layout =
	/** Title, overview and project facts beside the cover. */
	| { kind: 'hero' }
	/** Blocks in document order; images in a run share a row. */
	| { kind: 'stack' }
	/** A colour list drawn as swatches. */
	| { kind: 'swatches' }
	/** One row of images, each in the given frame. */
	| { kind: 'row'; frame: Frame }
	/** Copy, then one figure at full content width. */
	| { kind: 'full' }
	/** Copy in one column, figures stacked in the other. */
	| { kind: 'split' }
	/** Each subsection is a labelled row of phones, on the accent band. */
	| { kind: 'stages' }
	/** A large subsection headline, body, then a row of phones. */
	| { kind: 'headline-row' }
	/** Copy and tables, then one image run: phones in a row, its last image in a full-width browser. */
	| { kind: 'phones-then-browser' };

const rowNouns: Record<string, Frame> = {
	images: 'none',
	photos: 'none',
	logos: 'none',
	posters: 'none',
	phones: 'phone',
};

const patterns: [RegExp, (match: RegExpMatchArray) => Layout][] = [
	[/^hero, title and overview left, browser mockup right$/, () => ({ kind: 'hero' })],
	[/^requirements list, then palette swatches, then reference images in a row$/, () => ({ kind: 'stack' })],
	[/^table, then row of phones, then full-width browser screenshot$/, () => ({ kind: 'phones-then-browser' })],
	[/^swatch row$/, () => ({ kind: 'swatches' })],
	[/^(?:two|three|four|five) (images|photos|logos|posters|phones) in a row$/, (m) => ({ kind: 'row', frame: rowNouns[m[1]] })],
	[/^(?:full-width diagram|diagram full width)$/, () => ({ kind: 'full' })],
	[/^copy left, [a-z ]+ right$/, () => ({ kind: 'split' })],
	[/^rows of phones, one labelled row per stage$/, () => ({ kind: 'stages' })],
	[/^one headline, body below, row of phones$/, () => ({ kind: 'headline-row' })],
];

/** Returns the layout for a note, or throws naming the note so it can be added or reworded. */
export function parseLayout(note: string, source: string): Layout {
	const text = note.trim();
	for (const [pattern, toLayout] of patterns) {
		const match = text.match(pattern);
		if (match) return toLayout(match);
	}
	throw new Error(`${source}: the case study template has no layout for "<!-- layout: ${text} -->"`);
}

/** Reads the note out of an HTML comment, or returns undefined for any other comment. */
export function layoutNote(html: string): string | undefined {
	return html.match(/^<!--\s*layout:\s*([\s\S]*?)\s*-->$/)?.[1];
}
