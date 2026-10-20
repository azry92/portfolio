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

// One ordered list of illustrations and concepts, in the frontmatter of fun/index.md.
const fun = defineCollection({
	loader: glob({ base: './portfolio-content/fun', pattern: 'index.md' }),
	schema: ({ image }) =>
		z.object({
			items: z
				.array(
					z.object({
						image: image(),
						alt: z.string().min(1),
						title: z.string(),
						kind: z.enum(['illustration', 'concept']),
						year: z.number().int().optional(),
					}),
				)
				.default([]),
		}),
});

export const collections = { caseStudies, otherWorks, fun };
