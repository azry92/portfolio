// Social preview crops for case studies and other works: each cover cut to 1200×630
// (1.91:1) around its focal point, so the device frame or main subject stays whole.
// Build-time only (the /og/[slug].jpg endpoint); the page images are untouched.
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';
import { OG_HEIGHT, OG_WIDTH } from './og';

/** The cover's file on disk, read from the entry's own frontmatter; the collection only hands over the processed image. */
export async function coverPath(markdownPath: string): Promise<string> {
	const markdown = await readFile(markdownPath, 'utf8');
	const cover = /^cover:\s*["']?([^"'\n]+?)["']?\s*$/m.exec(markdown)?.[1];
	if (!cover) throw new Error(`${markdownPath}: no cover in the frontmatter`);
	return resolve(dirname(markdownPath), cover);
}

/**
 * The largest 1.91:1 window that fits the image, centred on the focal point (fractions of
 * width and height) and clamped to the edges, scaled to 1200×630.
 */
export async function cropToOg(path: string, focus: { x: number; y: number }): Promise<Uint8Array<ArrayBuffer>> {
	const image = sharp(path);
	const { width, height } = await image.metadata();
	const cropWidth = Math.min(width, Math.round((height * OG_WIDTH) / OG_HEIGHT));
	const cropHeight = Math.min(height, Math.round((width * OG_HEIGHT) / OG_WIDTH));
	const place = (centre: number, size: number, room: number) =>
		Math.min(Math.max(Math.round(centre - size / 2), 0), room);

	const buffer = await image
		.extract({
			left: place(focus.x * width, cropWidth, width - cropWidth),
			top: place(focus.y * height, cropHeight, height - cropHeight),
			width: cropWidth,
			height: cropHeight,
		})
		.resize(OG_WIDTH, OG_HEIGHT)
		.jpeg({ quality: 85, mozjpeg: true })
		.toBuffer();
	return new Uint8Array(buffer);
}
