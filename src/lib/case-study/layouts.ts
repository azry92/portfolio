// Maps the <!-- layout: ... --> notes in a case study's Markdown to layouts the
// template knows how to draw. The patterns are deliberately narrow: a note that
// matches none of them stops the build instead of falling back to a guess.

/** `display` is a car head unit (other works). */
export type Frame = 'phone' | 'browser' | 'display' | 'none';

export type Layout =
	/** Title, overview and project facts beside the cover. */
	| { kind: 'hero' }
	/** Blocks in document order; images in a run share a row. */
	| { kind: 'stack' }
	/** A colour list drawn as swatches. */
	| { kind: 'swatches' }
	/** One row of images, each in the given frame; `uniform` boxes them at one size. */
	| { kind: 'row'; frame: Frame; uniform: boolean }
	/** Several captioned rows of images, one after another, each holding the given number. */
	| { kind: 'rows'; counts: number[] }
	/** One run of figures as numbered steps with arrows between them, the body below. */
	| { kind: 'steps'; frame: Frame }
	/** Copy, then one figure at full content width. */
	| { kind: 'full' }
	/** Copy in one column, figures in the other: stacked, or a row of phones. */
	| { kind: 'split'; frame: Frame }
	/** Each subsection is a labelled row of phones, on the accent band. */
	| { kind: 'stages' }
	/** A large subsection headline, body, then a row of phones. */
	| { kind: 'headline-row' }
	/** Copy and tables, then one image run: phones in a row, its last image in a full-width browser. */
	| { kind: 'phones-then-browser' }
	/** The initial sitemap figure beside the shipped navigation, drawn from a list subsection. */
	| { kind: 'sitemap-nav' }
	/** The section heading as headline; body beside a desktop browser view, phones under both. */
	| { kind: 'headline-desktop-phones' }
	/** One run of screenshots split evenly, in order, under the given labels. */
	| { kind: 'labelled-stack'; labels: string[] }
	/** A video at its own width, aligned left, with the body below. */
	| { kind: 'video-then-body' }
	/** Copy and the first image on the left; the other images on the right. */
	| { kind: 'two-column' }
	/** A list of figures drawn as cards, the first one largest. */
	| { kind: 'stats' };

const numbers: Record<string, number> = { two: 2, three: 3, four: 4, five: 5 };

const rowNouns: Record<string, Frame> = {
	images: 'none',
	photos: 'none',
	logos: 'none',
	posters: 'none',
	phones: 'phone',
};

const patterns: [RegExp, (match: RegExpMatchArray) => Layout][] = [
	[/^hero, title and overview left, browser mockup right$/, () => ({ kind: 'hero' })],
	[
		/^requirements list, then palette swatches, then (?:reference images in a row|reference and wireframe side by side)$/,
		() => ({ kind: 'stack' }),
	],
	[/^table, then row of phones, then full-width browser screenshot$/, () => ({ kind: 'phones-then-browser' })],
	[/^swatch row$/, () => ({ kind: 'swatches' })],
	[
		/^(?:(?:body|table), then )?(?:two|three|four|five) (images|photos|logos|posters|phones) in a row(, same size)?$/,
		(m) => ({ kind: 'row', frame: rowNouns[m[1]], uniform: Boolean(m[2]) }),
	],
	[/^(?:full-width diagram|diagram full width)$/, () => ({ kind: 'full' })],
	[
		/^(?:copy|body) left, ([a-z ]+) right$/,
		(m) => ({ kind: 'split', frame: /\bphones\b/.test(m[1]) ? 'phone' : 'none' }),
	],
	[/^rows of phones, one labelled row per stage$/, () => ({ kind: 'stages' })],
	[/^one headline, body below, row of phones$/, () => ({ kind: 'headline-row' })],
	[
		/^initial sitemap diagram left, shipped navigation \(rendered as live HTML from the list below\) right$/,
		() => ({ kind: 'sitemap-nav' }),
	],
	[
		/^one headline, body below, desktop view next to body and a row of phones under$/,
		() => ({ kind: 'headline-desktop-phones' }),
	],
	[/^table, then logo revisions row, then Earth-Moon-Mars sequence$/, () => ({ kind: 'stack' })],
	[
		/^vertical stack of homepage sections, labelled ([A-Za-z]+(?: \/ [A-Za-z]+)+)$/,
		(m) => ({ kind: 'labelled-stack', labels: m[1].split(' / ') }),
	],
	[
		/^(?:two|three|four|five) [a-z ]+ in a row(?:, then (?:two|three|four|five) [a-z ]+ in a row)+$/i,
		(m) => ({ kind: 'rows', counts: [...m[0].matchAll(/\b(two|three|four|five) /g)].map((n) => numbers[n[1]]) }),
	],
	[
		/^(?:two|three|four|five) (images|phones) in a row with numbered step labels and arrows, body under$/,
		(m) => ({ kind: 'steps', frame: rowNouns[m[1]] }),
	],
	[/^full-width video, body below$/, () => ({ kind: 'video-then-body' })],
	[
		/^two columns; left: copy then publications screenshot; right: news screenshots$/,
		() => ({ kind: 'two-column' }),
	],
	[/^stat cards, (?:first card largest|[A-Za-z]+ card first)$/, () => ({ kind: 'stats' })],
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
