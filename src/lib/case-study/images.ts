// Resolves the image paths written in a case study's Markdown (./images/x.png)
// to imported ImageMetadata, so they go through astro:assets like any other image.
// Videos (./videos/x.mp4) resolve to the URL of the bundled file; only videos a note
// references are bundled (see videos-plugin.mjs).
import type { ImageMetadata } from 'astro';
import videos from 'virtual:case-study-videos';

const modules = import.meta.glob<{ default: ImageMetadata }>(
	'/portfolio-content/case-studies/*/images/*.{png,jpg,jpeg,webp,svg}',
	{ eager: true },
);

export function resolveImage(slug: string, path: string): ImageMetadata {
	const key = `/portfolio-content/case-studies/${slug}/${path.replace(/^\.\//, '')}`;
	const image = modules[key]?.default;
	if (!image) throw new Error(`case-studies/${slug}/index.md: image not found: ${path}`);
	return image;
}

export function resolveVideo(slug: string, path: string): string {
	const url = videos[`/portfolio-content/case-studies/${slug}/${path.replace(/^\.\//, '')}`];
	if (!url) throw new Error(`case-studies/${slug}/index.md: video not found: ${path}`);
	return url;
}
