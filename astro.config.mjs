// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { projectImages } from './src/lib/case-study/images-plugin.mjs';
import { caseStudyVideos } from './src/lib/case-study/videos-plugin.mjs';

// Self-hosted: the woff2 files come from the installed @fontsource-variable
// packages (latin subset). One variable file per family covers every weight we use.
const fallbacks = ['system-ui', 'sans-serif'];

// https://astro.build/config
export default defineConfig({
	site: 'https://ismailazry.vercel.app',
	vite: {
		plugins: [projectImages(), caseStudyVideos()],
	},
	fonts: [
		{
			name: 'Sora',
			cssVariable: '--font-sora',
			provider: fontProviders.local(),
			options: {
				variants: [
					{
						src: ['@fontsource-variable/sora/files/sora-latin-wght-normal.woff2'],
						weight: '300 700',
						style: 'normal',
					},
				],
			},
			fallbacks,
			display: 'swap',
		},
		{
			name: 'Inter',
			cssVariable: '--font-inter',
			provider: fontProviders.local(),
			options: {
				variants: [
					{
						src: ['@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'],
						weight: '400 600',
						style: 'normal',
					},
				],
			},
			fallbacks,
			display: 'swap',
		},
	],
});
