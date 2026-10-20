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
	/** Figures side by side in one column, copy and subsections in the other. `fitPhones` sizes each phone screen to its screenshot. */
	| { kind: 'aside'; frames: Frame[]; span: number; fitPhones?: boolean }
	/** One row of figures in the given frames, sized by column span (of 12). */
	| { kind: 'row'; frames: Frame[]; spans: number[] }
	/** Four figures as a bento: the second tall on the left, the first wide on top, the last two under it. */
	| { kind: 'bento' };

export interface Composition {
	/** `inverse` sets the whole article on the dark surface. */
	theme: 'light' | 'inverse';
	/** How the overview's visual is shown: the cover photo beside the copy, or the cover mockup under it on a black band. */
	hero: 'photo' | 'stage';
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
	mbfw: {
		theme: 'light',
		hero: 'stage',
		sections: {
			'one-identity-across-every-touchpoint': { kind: 'bento' },
			// Wireframes stay side by side on phones: stacked, the two tall pages would run four screens.
			'wireframes-and-visual-system': { kind: 'aside', frames: ['none', 'none'], span: 7 },
			'answering-the-questions-before-they-re-asked': { kind: 'row', frames: ['phone', 'phone', 'browser'], spans: [3, 3, 6] },
			'registration-that-matched-capacity': { kind: 'row', frames: ['browser', 'browser'], spans: [8, 4] },
			// A designer page, and the invited brands list on a phone beside it.
			'23-designer-pages-one-template': { kind: 'aside', frames: ['browser', 'phone'], span: 7 },
			// These screenshots carry their own browser chrome.
			'built-to-be-reused-mbfw-2-0': { kind: 'row', frames: ['none', 'none'], spans: [6, 6] },
			// Two Bridepay emails side by side, each phone as tall as its email, tops aligned.
			'reaching-brides-where-they-already-shop': { kind: 'aside', frames: ['phone', 'phone'], span: 6, fitPhones: true },
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
