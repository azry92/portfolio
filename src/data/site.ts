// Site-wide copy and links, transcribed from portfolio-content/site.md.

export interface NavItem {
	label: string;
	href: string;
	download?: boolean;
}

export const site = {
	name: 'Ismail Azry',
	title: 'Ismail Azry | Product Designer, Web & E-commerce | Shopify Design & Build',
	description:
		'Ismail Azry is a product designer in Malaysia who designs and builds e-commerce storefronts, from information architecture to custom Shopify code.',
	cv: '/cv/ismail-azry-cv.pdf',
} as const;

export const nav: NavItem[] = [
	{ label: 'Work', href: '/#work' },
	{ label: 'About', href: '/about' },
	{ label: 'CV', href: site.cv, download: true },
];

export const contact = {
	heading: 'Let’s brew something together.',
	email: 'ismailazry14@gmail.com',
	linkedin: 'https://www.linkedin.com/in/ismail-azry',
	location: 'Selangor, Malaysia',
} as const;

export const footerLine = 'Designed and built by Ismail Azry with Astro. © 2026';
