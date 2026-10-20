// One 1200×630 social preview per case study and other work, cropped from its cover at build.
import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from 'astro';
import { getCollection } from 'astro:content';
import { coverPath, cropToOg } from '../../lib/og-crop';

export const getStaticPaths = (async () => {
	const entries = [...(await getCollection('caseStudies')), ...(await getCollection('otherWorks'))];
	const slugs = entries.map((entry) => entry.id);
	const duplicate = slugs.find((slug, i) => slugs.indexOf(slug) !== i);
	if (duplicate) throw new Error(`og/${duplicate}.jpg: the slug is used in both collections`);

	return entries.map((entry) => {
		if (!entry.filePath) throw new Error(`${entry.id}: the loader gave no file path`);
		return {
			params: { slug: entry.id },
			props: { markdownPath: entry.filePath, focus: entry.data.og_focus },
		};
	});
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = async ({ props }) => {
	const image = await cropToOg(await coverPath(props.markdownPath), props.focus);
	return new Response(image, { headers: { 'Content-Type': 'image/jpeg' } });
};
