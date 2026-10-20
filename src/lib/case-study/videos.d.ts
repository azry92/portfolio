// URLs of the case study videos referenced in index.md notes, keyed by their
// /portfolio-content/... path. Provided by videos-plugin.mjs.
declare module 'virtual:case-study-videos' {
	const videos: Record<string, string>;
	export default videos;
}
