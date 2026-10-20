// How each Other Works page lays out its sections. These pages are composed in code
// rather than from their <!-- layout: ... --> notes: each section id from the Markdown
// maps to one layout here, and a section without one stops the build.
import type { Frame } from '../case-study/layouts';

export type SectionLayout =
	/** Copy only, at reading width. */
	| { kind: 'text' }
	/** Each ### subsection becomes a column of text. */
	| { kind: 'columns' }
	/** One run of screens stacked at full width, each with its label beside it. */
	| { kind: 'labelled'; frame: Frame; labels: string[] }
	/** One captioned image at full width; the caption reads as a tagline beside the body. `bleed` runs it to the screen edges. */
	| { kind: 'sheet'; frame: Frame; bleed?: boolean }
	/** Figures in one column, copy and subsections in the other. `lead` keeps only the first figure there and sets the rest under the copy. */
	| { kind: 'aside'; frames: Frame[]; span: number; lead?: boolean }
	/** One row of figures in the given frames, sized by column span (of 12). */
	| { kind: 'row'; frames: Frame[]; spans: number[] }
	/** Four figures as a bento: the second tall on the left, the first wide on top, the last two under it. */
	| { kind: 'bento' };

export interface Composition {
	/** `inverse` sets the whole article on the dark surface. */
	theme: 'light' | 'inverse';
	/** How the overview's visual is shown: the cover photo as it is, or the cover in a browser frame over a black band. */
	hero: 'photo' | 'browser';
	sections: Record<string, SectionLayout>;
}

const sheet: SectionLayout = { kind: 'sheet', frame: 'display' };

export const compositions: Record<string, Composition> = {
	'atlas-ihu': {
		theme: 'inverse',
		hero: 'photo',
		sections: {
			// The stock image is a photo of the car's screen, so neither side gets a frame.
			'before-and-after': { kind: 'labelled', frame: 'none', labels: ['Before', 'After'] },
			'the-brief': { kind: 'columns' },
			'lock-screen': sheet,
			'app-list': sheet,
			dialer: sheet,
			'theme-store': sheet,
			wallpaper: { kind: 'sheet', frame: 'none', bleed: true },
			'icon-set': { kind: 'sheet', frame: 'none' },
			'best-theme': { kind: 'aside', frames: ['none'], span: 6 },
			reflection: { kind: 'text' },
		},
	},
};

/** The layout for one section, or an error naming the section to add. */
export function layoutFor(composition: Composition, slug: string, id: string): SectionLayout {
	const layout = composition.sections[id];
	if (!layout) throw new Error(`other-works/${slug}: no layout for section "${id}" in compositions.ts`);
	return layout;
}
