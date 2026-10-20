// Resolves the image paths written in a case study's Markdown (./images/x.png)
// to imported ImageMetadata, so they go through astro:assets like any other image.
import type { ImageMetadata } from 'astro';

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
