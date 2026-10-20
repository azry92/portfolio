// Vite plugin behind `virtual:case-study-videos`: imports only the videos a case
// study's index.md names in a <!-- video: ... --> note, so unreferenced files in
// a videos/ folder never reach the build. parse.ts still validates each note.
// Plain JS: it runs in the Astro config, outside the site's type-checked code.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const id = 'virtual:case-study-videos';
const resolvedId = `\0${id}`;
const base = 'portfolio-content/case-studies';

/** @returns {import('vite').Plugin} */
export function caseStudyVideos() {
	let root = process.cwd();
	return {
		name: 'case-study-videos',
		configResolved(config) {
			root = config.root;
		},
		resolveId(source) {
			return source === id ? resolvedId : undefined;
		},
		load(source) {
			if (source !== resolvedId) return;
			/** @type {string[]} */
			const imports = [];
			/** @type {string[]} */
			const entries = [];
			for (const slug of readdirSync(join(root, base))) {
				const markdown = join(root, base, slug, 'index.md');
				if (!existsSync(markdown)) continue;
				this.addWatchFile(markdown);
				for (const [, path] of readFileSync(markdown, 'utf8').matchAll(/<!--\s*video:\s*(\S+?\.mp4)/g)) {
					const key = `/${base}/${slug}/${path.replace(/^\.\//, '')}`;
					imports.push(`import video${entries.length} from ${JSON.stringify(`${key}?url`)};`);
					entries.push(`${JSON.stringify(key)}: video${entries.length}`);
				}
			}
			return `${imports.join('\n')}\nexport default { ${entries.join(', ')} };`;
		},
	};
}
