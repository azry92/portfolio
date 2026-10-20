// The social preview a case study or other work page points to; the crop itself is og-crop.ts.
import type { OgImage } from '../data/site';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** The cover crop served at /og/[slug].jpg, with the cover's alt text. */
export const ogImageFor = (slug: string, alt: string): OgImage => ({
	src: `/og/${slug}.jpg`,
	width: OG_WIDTH,
	height: OG_HEIGHT,
	alt,
});
