// Resolves the image paths written in a project's Markdown (./images/x.png) to
// imported ImageMetadata, so they go through astro:assets like any other image.
// Only images the Markdown references are bundled (see images-plugin.mjs).
// Videos (./videos/x.mp4) resolve to the URL of the bundled file; only videos a note
// references are bundled (see videos-plugin.mjs), and only case studies have them.
import type { ImageMetadata } from 'astro';
import images from 'virtual:project-images';
import videos from 'virtual:case-study-videos';

/** The content folders that hold projects, each project a folder with index.md and images/. */
export type Collection = 'case-studies' | 'other-works';

export function resolveImage(collection: Collection, slug: string, path: string): ImageMetadata {
	const key = `/portfolio-content/${collection}/${slug}/${path.replace(/^\.\//, '')}`;
	const image = images[key];
	if (!image) throw new Error(`${collection}/${slug}/index.md: image not found: ${path}`);
	return image;
}

export function resolveVideo(slug: string, path: string): string {
	const url = videos[`/portfolio-content/case-studies/${slug}/${path.replace(/^\.\//, '')}`];
	if (!url) throw new Error(`case-studies/${slug}/index.md: video not found: ${path}`);
	return url;
}
