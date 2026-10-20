// Site-wide copy and links, transcribed from portfolio-content/site.md.

export interface NavItem {
	label: string;
	href: string;
	/** Opens in a new tab with rel="noopener" (the CV PDF). */
	newTab?: boolean;
	/** Overrides the visible label, e.g. to say the link opens a PDF. */
	ariaLabel?: string;
}

/** The CV links' accessible name: starts with the visible "CV" and says what opens. */
export const cvLabel = 'CV, opens PDF in a new tab';

export const site = {
	name: 'Ismail Azry',
	title: 'Ismail Azry | Product Designer, Web & E-commerce | Shopify Design & Build',
	description:
		'Ismail Azry is a product designer in Malaysia who designs and builds e-commerce storefronts, from information architecture to custom Shopify code.',
	cv: '/ismail-azry-cv.pdf',
} as const;

export interface OgImage {
	/** Root-relative or absolute; the layout resolves it against `site`. */
	src: string;
	width: number;
	height: number;
	alt: string;
}

/** The social preview for every page without its own (case studies and other works use their cover). */
export const ogDefault: OgImage = {
	src: '/og.png',
	width: 1200,
	height: 630,
	alt: 'Ismail Azry, Product Designer (Web & E-commerce), with the IA glyph on a deep red gradient',
};

export const nav: NavItem[] = [
	{ label: 'Work', href: '/#work' },
	{ label: 'CV', href: site.cv, newTab: true, ariaLabel: cvLabel },
];

export const contact = {
	heading: 'Let’s brew something together.',
	email: 'ismailazry14@gmail.com',
	linkedin: 'https://www.linkedin.com/in/ismail-azry',
	location: 'Selangor, Malaysia',
} as const;

export const footerLine = 'Designed and built by Ismail Azry with Astro. © 2026';

export const work = {
	heading: 'See the Work',
	cv: 'Download CV',
	more: [
		{ label: 'Other Works', href: '/other-works' },
		{ label: 'Fun', href: '/fun' },
	],
} as const;

export const intro = {
	greeting: 'Hello, I’m Azry.',
	title: 'Product Designer, Web & E-commerce',
	about:
		'Product designer who designs and builds e-commerce storefronts end to end, from information architecture and product search to custom Shopify code. Interface Design graduate, formerly a medical student.',
} as const;
