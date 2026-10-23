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
	alt: 'Ismail Azry, Product Designer, Web & E-commerce, with the IA glyph on a red background',
};

export const nav: NavItem[] = [
	{ label: 'Work', href: '/#work' },
	{ label: 'About', href: '/#about' },
	{ label: 'Other Works', href: '/other-works' },
	{ label: 'Fun', href: '/fun' },
	// The footer is on every page, so the fragment works without a path.
	{ label: 'Contact', href: '#contact' },
	{ label: 'CV', href: site.cv, newTab: true, ariaLabel: cvLabel },
];

export const contact = {
	heading: 'Let’s brew something together.',
	email: 'ismailazry14@gmail.com',
	linkedin: 'https://www.linkedin.com/in/ismail-azry',
	/** This site's source. */
	github: 'https://github.com/azry92/portfolio',
	location: 'Kuala Lumpur, Malaysia',
} as const;

export const footerLine = 'Designed and built by Ismail Azry with Astro. © 2026';

export const work = {
	/** SectionLabel numbers it: "01 / Selected work". */
	label: 'Selected work',
	heading: 'See the Work',
	more: [
		{ label: 'Other Works', href: '/other-works' },
		{ label: 'Fun', href: '/fun' },
	],
} as const;

export const lab = {
	/** SectionLabel numbers it and makes it the h2: "02 / Lab". */
	label: 'Lab',
} as const;

export const intro = {
	title: 'Product Designer, Web & E-commerce',
	status: 'Open to roles, Kuala Lumpur',
	/** The h1: name, then the claim in the accent. */
	name: 'Ismail Azry,',
	claim: 'designing stores, then building them.',
	/** The hero adds a decorative ↓ after each, hidden from screen readers. */
	cta: 'See the work',
	cv: 'CV',
	about:
		'Product designer who designs and builds e-commerce storefronts end to end, from information architecture and product search to custom Shopify code. Interface Design graduate, formerly a medical student.',
	/** What I'm doing now; `link` is the words that open the case study. */
	current: {
		before: 'Currently designing and building the ',
		link: 'AT Auto Shoppe store',
		href: '/work/at-auto-shoppe',
		after: '.',
	},
} as const;
