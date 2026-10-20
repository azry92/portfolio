// Turns a case study's Markdown body into sections the template renders with
// real components (frames, swatches, tables) instead of raw Markdown HTML.
//
// The Markdown is written one block per line with no blank lines between them,
// so a paragraph is split back into its lines: a line holding one image is a
// figure, a line holding only *italics* is a caption, any other line is a
// paragraph of its own.
import type { ImageMetadata } from 'astro';
import type { List, ListItem, Nodes, PhrasingContent, RootContent, Table } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';
import { gfm } from 'micromark-extension-gfm';
import { resolveImage, resolveVideo } from './images';
import { layoutNote, parseLayout, type Layout } from './layouts';

export interface Figure {
	image: ImageMetadata;
	alt: string;
	/** Caption HTML (inline only). */
	caption?: string;
}

export interface Swatch {
	name: string;
	hex: string;
	use: string;
}

/** One menu item and the items under it. */
export interface TreeItem {
	/** Label HTML (inline only). */
	label: string;
	children: TreeItem[];
}

export interface Stat {
	/** The figure, from the bold text that opens the list item. */
	value: string;
	/** The rest of the item, as inline HTML. */
	label: string;
}

export type Block =
	| { kind: 'prose'; html: string }
	| { kind: 'table'; head: string[]; rows: string[][] }
	| { kind: 'swatches'; items: Swatch[] }
	/** A run of images; `caption` is set when one caption covers the whole run. */
	| { kind: 'figures'; items: Figure[]; caption?: string }
	| { kind: 'tree'; items: TreeItem[] }
	| { kind: 'stats'; items: Stat[] }
	/** A muted, looping motion piece; the poster stands in for it under reduced motion. */
	| { kind: 'video'; src: string; poster: ImageMetadata; alt: string };

export interface Subsection {
	id: string;
	heading: string;
	layout?: Layout;
	blocks: Block[];
}

export interface Section extends Subsection {
	subsections: Subsection[];
}

const text = (node: Nodes): string =>
	'value' in node ? node.value : 'children' in node ? node.children.map(text).join('') : '';

const inlineHtml = (children: PhrasingContent[]): string =>
	toHtml(toHast({ type: 'root', children }));

/**
 * Straight quotes to typographic ones, in text nodes only (code stays as written).
 * A quote opens after a space, an opening bracket or the start of the text; otherwise
 * it closes, which also makes apostrophes right. `prev` carries across nodes, so a
 * quote just after inline code or emphasis still reads its neighbour.
 */
function smartQuotes(node: Nodes, state = { prev: '' }): void {
	// Each block starts fresh: a quote at its start opens.
	if (['paragraph', 'heading', 'listItem', 'tableCell'].includes(node.type)) state.prev = '';
	if (node.type === 'html') return;
	if (node.type === 'text') {
		node.value = node.value.replace(/["']/g, (quote, i: number, value: string) => {
			const before = i > 0 ? value[i - 1] : state.prev;
			const opens = before === '' || /[\s([{—–-]/.test(before);
			return quote === '"' ? (opens ? '“' : '”') : opens ? '‘' : '’';
		});
	}
	if ('value' in node && node.value) state.prev = node.value[node.value.length - 1];
	if ('children' in node) for (const child of node.children) smartQuotes(child, state);
}

const slugify = (value: string) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

/** Splits a paragraph's inline content at its soft line breaks. */
function lines(children: PhrasingContent[]): PhrasingContent[][] {
	const result: PhrasingContent[][] = [[]];
	for (const child of children) {
		if (child.type !== 'text') {
			result[result.length - 1].push(child);
			continue;
		}
		child.value.split('\n').forEach((part, i) => {
			if (i > 0) result.push([]);
			if (part.trim()) result[result.length - 1].push({ type: 'text', value: part });
		});
	}
	// Trim the spaces left at either end of a line by the split.
	return result
		.filter((line) => line.length)
		.map((line) => {
			const first = line[0];
			const last = line[line.length - 1];
			if (first.type === 'text') first.value = first.value.trimStart();
			if (last.type === 'text') last.value = last.value.trimEnd();
			return line;
		});
}

function swatches(list: List, source: string): Swatch[] {
	return list.children.map((item: ListItem) => {
		const line = text(item).trim();
		const match = line.match(/^(.+?) (#[0-9a-f]{6}): (.+)$/i);
		if (!match) throw new Error(`${source}: swatch must read "Name #RRGGBB: use", got "${line}"`);
		return { name: match[1], hex: match[2].toUpperCase(), use: match[3] };
	});
}

function menuItems(list: List): TreeItem[] {
	return list.children.map((item: ListItem) => {
		const [label, nested] = item.children;
		return {
			label: label?.type === 'paragraph' ? inlineHtml(label.children) : '',
			children: nested?.type === 'list' ? menuItems(nested) : [],
		};
	});
}

function stats(list: List, source: string): Stat[] {
	return list.children.map((item: ListItem) => {
		const [paragraph] = item.children;
		const [first, ...rest] = paragraph?.type === 'paragraph' ? paragraph.children : [];
		if (first?.type !== 'strong') {
			throw new Error(`${source}: a stat card must open with its figure in bold, got "${text(item).trim()}"`);
		}
		if (rest[0]?.type === 'text') rest[0].value = rest[0].value.trimStart();
		return { value: text(first), label: inlineHtml(rest) };
	});
}

// The only behaviour the template draws: muted, autoplaying, looping, inline, with the poster under reduced motion.
const videoFlags = 'autoplay, muted, loop, playsinline, show a still frame when reduced motion is on';

/** Reads a <!-- video: path | flags | alt: text --> note, or returns undefined for any other comment. */
function videoNote(html: string, slug: string, source: string): Extract<Block, { kind: 'video' }> | undefined {
	const note = html.match(/^<!--\s*video:\s*([\s\S]*?)\s*-->$/)?.[1];
	if (note === undefined) return undefined;
	const match = note.match(/^(\S+\.mp4) \| (.+) \| alt: (.+)$/);
	if (!match) throw new Error(`${source}: video note must read "path.mp4 | flags | alt: text", got "${note}"`);
	const [, path, flags, alt] = match;
	if (flags !== videoFlags) throw new Error(`${source}: video flags must read "${videoFlags}", got "${flags}"`);
	// The poster sits with the images, named after the video.
	const name = path.match(/([^/]+)\.mp4$/)![1];
	return { kind: 'video', src: resolveVideo(slug, path), poster: resolveImage(slug, `./images/${name}-poster.png`), alt };
}

function table(node: Table): Block {
	const [head, ...rows] = node.children.map((row) => row.children.map((cell) => inlineHtml(cell.children)));
	return { kind: 'table', head, rows };
}

export function parseCaseStudy(slug: string, body: string): Section[] {
	const source = `case-studies/${slug}/index.md`;
	const tree = fromMarkdown(body, { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] });
	smartQuotes(tree);
	const sections: Section[] = [];
	const ids = new Set<string>();

	let current: Subsection | undefined;
	let run: Figure[] = [];
	let runCaption: string | undefined;

	const uniqueId = (heading: string) => {
		const base = slugify(heading);
		let id = base;
		for (let n = 2; ids.has(id); n++) id = `${base}-${n}`;
		ids.add(id);
		return id;
	};

	const target = () => {
		if (!current) throw new Error(`${source}: content before the first ## heading`);
		return current;
	};

	const push = (block: Block) => {
		const blocks = target().blocks;
		const last = blocks[blocks.length - 1];
		// Neighbouring prose (a paragraph then a list) reads as one flow.
		if (block.kind === 'prose' && last?.kind === 'prose') last.html += block.html;
		else blocks.push(block);
	};

	const flush = () => {
		if (run.length) push({ kind: 'figures', items: run, caption: runCaption });
		run = [];
		runCaption = undefined;
	};

	const caption = (html: string) => {
		const uncaptioned = run.filter((figure) => !figure.caption).length;
		if (uncaptioned > 1 && uncaptioned === run.length) {
			runCaption = html;
			flush();
		} else if (run.length && !run[run.length - 1].caption && uncaptioned === 1) {
			run[run.length - 1].caption = html;
		} else {
			throw new Error(`${source}: caption "${html}" does not follow an uncaptioned image or image row`);
		}
	};

	const handle = (node: RootContent) => {
		switch (node.type) {
			case 'heading': {
				flush();
				const heading = text(node).trim();
				if (node.depth === 2) {
					const section: Section = { id: uniqueId(heading), heading, blocks: [], subsections: [] };
					sections.push(section);
					current = section;
				} else if (node.depth === 3) {
					const parent = sections[sections.length - 1];
					if (!parent) throw new Error(`${source}: ### "${heading}" before any ## heading`);
					current = { id: uniqueId(heading), heading, blocks: [] };
					parent.subsections.push(current);
				} else {
					throw new Error(`${source}: heading level ${node.depth} is not supported`);
				}
				return;
			}
			case 'html': {
				const video = videoNote(node.value.trim(), slug, source);
				if (video) {
					flush();
					push(video);
					return;
				}
				const note = layoutNote(node.value.trim());
				if (note === undefined) return;
				const section = target();
				if (section.layout) throw new Error(`${source}: two layout notes under "${section.heading}"`);
				section.layout = parseLayout(note, source);
				return;
			}
			case 'paragraph':
				for (const line of lines(node.children)) {
					const [only] = line;
					if (line.length === 1 && only.type === 'image') {
						run.push({ image: resolveImage(slug, only.url), alt: only.alt ?? '' });
					} else if (line.length === 1 && only.type === 'emphasis') {
						caption(inlineHtml(only.children));
					} else {
						flush();
						push({ kind: 'prose', html: toHtml(toHast({ type: 'paragraph', children: line })) });
					}
				}
				return;
			case 'list':
				flush();
				if (target().layout?.kind === 'swatches') push({ kind: 'swatches', items: swatches(node, source) });
				else if (target().layout?.kind === 'stats') push({ kind: 'stats', items: stats(node, source) });
				// Under "shipped navigation", a subsection's list is the menu itself.
				else if (current !== sections[sections.length - 1] && sections[sections.length - 1].layout?.kind === 'sitemap-nav')
					push({ kind: 'tree', items: menuItems(node) });
				else push({ kind: 'prose', html: toHtml(toHast(node)) });
				return;
			case 'table': {
				flush();
				// With no blank line after a table, GFM reads the lines under it as rows. A row
				// whose source line has no pipe is one of those: hand it and the rest back as blocks.
				const spill = node.children.findIndex(
					(row, i) => i > 0 && !body.slice(row.position!.start.offset, row.position!.end.offset).includes('|'),
				);
				if (spill === -1) {
					push(table(node));
					return;
				}
				const rest = body.slice(node.children[spill].position!.start.offset, node.position!.end.offset);
				push(table({ ...node, children: node.children.slice(0, spill) }));
				const after = fromMarkdown(rest, { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] });
				smartQuotes(after);
				after.children.forEach(handle);
				return;
			}
			default:
				throw new Error(`${source}: unsupported Markdown block "${node.type}"`);
		}
	};

	tree.children.forEach(handle);
	flush();

	for (const figure of sections.flatMap((s) => [s, ...s.subsections]).flatMap((s) => s.blocks)) {
		if (figure.kind === 'figures') {
			for (const item of figure.items) {
				if (!item.alt) throw new Error(`${source}: every image needs alt text`);
			}
		}
	}

	return sections;
}
