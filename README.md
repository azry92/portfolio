# Ismail Azry: portfolio

The portfolio of Ismail Azry, a product designer in Malaysia who designs and builds e-commerce storefronts.

Live: https://ismailazry.vercel.app

## Stack

- [Astro](https://astro.build) with TypeScript, static output, deployed on Vercel.
- Plain CSS with custom properties. The design tokens live in `src/styles/tokens.css`, generated from `portfolio-content/tokens.md`. No Tailwind, no UI kit.
- Content collections load the copy and images from `portfolio-content/`. Each project's folder name is its slug.
- Images go through `astro:assets` as AVIF and WebP with a responsive `srcset`. Each project's social preview is cropped from its cover at build time.

## Notable pieces

- **Device frames** (`PhoneFrame`, `BrowserFrame`, `DisplayFrame`): drawn in CSS, never images. The geometry scales with the frame's width, and a screenshot fills the screen width exactly, clipped only at the bottom.
- **WorkCover**: one recipe for every project card. The project's accent colour is the backdrop, with its hero screenshot in a browser or phone frame rising from the bottom edge.
- **Fun shuffler** (`ArtworkShuffler`): one piece of artwork at a time, and Shuffle draws from a bag so nothing repeats until every piece has had its turn. An inline script picks the first piece before first paint. Without JavaScript, the full list shows as a grid.
- **Scoped lightbox** (`Lightbox`, `ZoomLink`): one native `<dialog>` per page. Previous and next step through the images in the same section, or in a `data-zoom-group` when a piece should open on its own. Without JavaScript, each zoom link opens the full image.

## Scores

Lighthouse 12.8, the engine behind PageSpeed Insights, on the live home page. Median of three runs, 21 October 2026.

|         | Performance | Accessibility | Best Practices | SEO |
| ------- | ----------- | ------------- | -------------- | --- |
| Mobile  | 100         | 100           | 100            | 100 |
| Desktop | 100         | 100           | 100            | 100 |

## Run it locally

Needs Node 22.22 or later.

```sh
npm install
npm run dev     # dev server at http://localhost:4321
npm run build   # astro check, then the static build in dist/
```
