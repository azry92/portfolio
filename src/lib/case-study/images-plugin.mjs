// Vite plugin behind `virtual:project-images`: imports only the images a project's
// index.md uses (Markdown images, and the poster beside each video note), so the
// other files in an images/ folder never reach the build. parse.ts still resolves
// and validates each path. Frontmatter images come in through the content collections.
// Plain JS: it runs in the Astro config, outside the site's type-checked code.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const id = 'virtual:project-images';
const resolvedId = `\0${id}`;
const collections = ['case-studies', 'other-works'];

/** @returns {import('vite').Plugin} */
export function projectImages() {
	let root = process.cwd();
	return {
		name: 'project-images',
		configResolved(config) {
			root = config.root;
		},
		resolveId(source) {
			return source === id ? resolvedId : undefined;
		},
		load(source) {
			if (source !== resolvedId) return;
			/** @type {Set<string>} */
			const keys = new Set();
			for (const collection of collections) {
				const base = join(root, 'portfolio-content', collection);
				for (const slug of readdirSync(base)) {
					const markdown = join(base, slug, 'index.md');
					if (!existsSync(markdown)) continue;
					this.addWatchFile(markdown);
					const text = readFileSync(markdown, 'utf8');
					const paths = [
						// An image may carry a title (the viewer caption) after its path: ![alt](./images/x.png "title").
						...[...text.matchAll(/\]\((\.\/images\/[^)\s]+)(?:\s+"[^"]*")?\)/g)].map((m) => m[1]),
						...[...text.matchAll(/<!--\s*video:\s*\S*?([^/\s]+)\.mp4/g)].map((m) => `./images/${m[1]}-poster.png`),
					];
					for (const path of paths) keys.add(`/portfolio-content/${collection}/${slug}/${path.slice(2)}`);
				}
			}
			const list = [...keys];
			const imports = list.map((key, i) => `import image${i} from ${JSON.stringify(key)};`);
			const entries = list.map((key, i) => `${JSON.stringify(key)}: image${i}`);
			return `${imports.join('\n')}\nexport default { ${entries.join(', ')} };`;
		},
	};
}
