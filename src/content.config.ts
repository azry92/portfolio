// Content loads straight from portfolio-content/, the source of truth for copy.
// Each project is a folder with index.md and its images; the folder name is the slug.
import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectLoader = (base: string) =>
	glob({
		base,
		pattern: '*/index.md',
		generateId: ({ entry }) => entry.split('/')[0],
	});

// Fields every case study and other work shares.
const workBase = ({ image }: SchemaContext) =>
	z.object({
		title: z.string(),
		summary: z.string(),
		team: z.string(),
		timeline: z.string(),
		platform: z.string(),
		tools: z.array(z.string()),
		live_url: z.url().optional(),
		order: z.number().int(),
		cover: image(),
		cover_alt: z.string().min(1),
		/** Where the 1200×630 social preview crop centres on the cover, as fractions of its width and height. */
		og_focus: z
			.object({
				x: z.number().min(0).max(1).default(0.5),
				y: z.number().min(0).max(1).default(0.5),
			})
			.default({ x: 0.5, y: 0.5 }),
	});

const caseStudies = defineCollection({
	loader: projectLoader('./portfolio-content/case-studies'),
	schema: (context) =>
		workBase(context).extend({
			role: z.string(),
			/** Who the work was for, when that isn't the project itself. */
			client: z.string().optional(),
			/** Brand colour for the hero, stage band and pager. The site palette is used without it. */
			accent: z
				.string()
				.regex(/^#[0-9a-f]{6}$/i)
				.optional(),
			/** One line each, shown under the title for a reader skimming to the outcome. */
		glance: z
			.object({
				problem: z.string().min(1),
				did: z.string().min(1),
				outcome: z.string().min(1),
			})
			.optional(),
		/** One short line under the name on the home card, on touch screens. Without it the card shows the name only. */
		card_line: z.string().min(1).optional(),
		/** Draw the hero image in a device frame instead of the unframed cover mockup. */
			hero: z
				.object({
					frame: z.enum(['browser', 'phone']),
					image: context.image(),
					alt: z.string().min(1),
				})
				.optional(),
		}),
});

const otherWorks = defineCollection({
	loader: projectLoader('./portfolio-content/other-works'),
	schema: (context) =>
		workBase(context).extend({
			role: z.string().optional(),
			project: z.string().optional(),
			client: z.string().optional(),
			type: z.string().optional(),
		}),
});

// The Fun page: its own copy and one list of artwork, shuffled on the page, in the frontmatter of fun/index.md.
const fun = defineCollection({
	loader: glob({ base: './portfolio-content/fun', pattern: 'index.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			/** The meta description. */
			summary: z.string(),
			/** The paragraph under the h1. */
			intro: z.string(),
			items: z
				.array(
					z.object({
						image: image(),
						title: z.string(),
						/** Where the piece comes from, e.g. "Concept · Baskbear". */
						group: z.string(),
						alt: z.string().min(1),
					}),
				)
				.min(1),
		}),
});

// The About section on home: the bio is the Markdown body, the lists come from the frontmatter.
const about = defineCollection({
	loader: glob({ base: './portfolio-content/about', pattern: 'index.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			/** Not shown on home. */
			headline: z.string().optional(),
			headshot: image(),
			headshot_alt: z.string().min(1),
			/** Not shown on home. */
			skills: z.array(z.string()).optional(),
			/** Not shown on home. */
			tools: z.array(z.string()).optional(),
			/** Newest first. */
			experience: z
				.array(
					z.object({
						role: z.string(),
						org: z.string(),
						dates: z.string(),
						line: z.string().optional(),
						/** The case study for this role; the company name links to it. */
						href: z.string().startsWith('/').optional(),
					}),
				)
				.min(1),
			/** Newest first. */
			education: z
				.array(
					z.object({
						qualification: z.string().min(1),
						institution: z.string().min(1),
						/** With "(did not complete)" where it applies. */
						years: z.string().min(1),
					}),
				)
				.min(1),
		}),
});

export const collections = { caseStudies, otherWorks, fun, about };
