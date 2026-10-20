// The images referenced in projects' index.md, keyed by their /portfolio-content/...
// path. Provided by images-plugin.mjs.
declare module 'virtual:project-images' {
	const images: Record<string, import('astro').ImageMetadata>;
	export default images;
}
