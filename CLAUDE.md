# Portfolio: Ismail Azry

Personal portfolio for "Product Designer, Web & E-commerce | Shopify Design & Build". Audience: hiring managers for Product Designer, Design Technologist and Frontend UI Engineer roles in Malaysia. The code is part of the portfolio and will be read.

## Stack
- Astro + TypeScript, static output.
- Plain CSS with custom properties. Tokens live in `src/styles/tokens.css`, generated from `portfolio-content/tokens.md`. No Tailwind, no UI kits.
- Content collections for case studies, other works and fun. Loaded from `portfolio-content/` via glob loaders in `src/content.config.ts`; the folder name is the slug.
- Images through `astro:assets` (`<Image>`/`<Picture>`), AVIF/WebP with responsive `srcset`.
- Deploy: Vercel, auto-deploy from `main`.

## Source of truth
- Copy and frontmatter: `portfolio-content/**/index.md`. Do not rewrite copy; flag issues instead.
- Visual intent: `<!-- layout: ... -->` notes in the Markdown, plus `portfolio-content/references/*.png`.
- `references/` images are layout reference only. Never import or ship them. The folder is git-ignored.
- Brand assets that do ship: `portfolio-content/brand/` (`logo.svg`, `glyph-ia.svg` with paths `id="I"` and `id="A"`).
- Home page layout and hero motion: the Home layout section of `portfolio-content/site.md`.
- `tokens.md` and `references/` override any design skill's defaults. Use skills for craft, not brand choices.

## Pages
- `/` home: animated glyph band, intro, three case study cards, Other Works and Fun cards, contact.
- `/work/[slug]` case studies: AT Auto Shoppe, PlanetStewards, Precious Wedding.
- `/other-works`: short index listing Atlas IHU and MBFW as cards. Built in the Other Works session.
- `/other-works/[slug]`: MBFW, Atlas IHU Theme.
- `/fun`: illustrations and concepts, grid with lightbox.
- `/about`, CV PDF download, 404.

## Rules
- Semantic HTML: one `h1` per page, landmarks, real lists, `figure`/`figcaption` for images.
- WCAG 2.2 AA: contrast, visible focus states, full keyboard access, `prefers-reduced-motion` respected.
- Responsive from 360 px. Mobile first. No horizontal scroll.
- No text baked into images except genuine UI screenshots. Every image has meaningful alt text.
- JS only where it earns it (hero glyph animation, lightbox, video play). Islands, not a SPA.
- Lighthouse 95+ on Performance, Accessibility, Best Practices, SEO.
- British/Malaysian spelling.
- Small components with one job. Name them by what they are (`CaseStudyMeta`, `PhoneFrame`, `FigureGrid`).
- Device frames are components, never images. PhoneFrame models the iPhone 17 Pro: screen ratio 1206:2622, outer corner radius about 13% of frame width, thin even black bezel (about 2.5% of width), aluminium edge as a 1–2px outer ring in a neutral grey, Dynamic Island as a black pill centred near the top (about 30% of screen width, 3% of screen height). A top safe-area strip (solid, empty band behind the Dynamic Island, default 6% of screen height, set by the `safeArea` prop, 0 to remove) keeps screenshot content below the island. No status bar, no side buttons, no shadow beyond one soft drop shadow. BrowserFrame: thin top bar with three dots, no URL text. Screenshots fill the screen width exactly (width 100%, height auto), aligned top, clipped only at the bottom. Never crop the sides.
- Phone rows: from 600px, phones at their max width with a 48px gap, centred; in a narrow column they shrink evenly so the gap holds. Rows in one group (e.g. stage rows) can share a column count so phones match in size. Below 600px, a row of 2 sits 2 per row; a row of 3 or more becomes a snap row.
- Below 600px, rows of 2 images stack to one column and rows of 3 or more become a snap row, unless a layout note says otherwise. Uniform rows (logos) and single-column runs stay as they are.
- Snap rows (below 600px, the `.snap-row` utility in `global.css`): CSS only, one horizontal row with scroll snap. Two phones plus a peek, or one image (or one labelled group) plus about 16% of the next. The row runs out to the screen edges. Its affordance is the peek and a thin scrollbar; no "swipe" labels, counters or dots. Captions stay with their own figure, step numbers stay in step captions. Keyboard access comes through each slide's zoom link, so no extra tab stops. Applies to FigureGrid (and through it StageRows), StepRow and LabelledStack.
- Case study hero: an optional `glance` (problem, did, outcome; one line each) sits directly under the h1 at every width, so a phone reader sees the outcome in the first screen. The outcome links to Results when the case study has one. `summary` stays the home card and meta description line.
- Buttons: every button and button-styled link is a pill (`--radius-pill`), round icon buttons included. Text links (nav, inline, "Previous") stay text; cards (work cards, Other Works, Fun) keep their square shape.
## Workflow
- Plan before building any new page or component; wait for approval.
- Build one case study fully before templating the rest.
- Run `npm run build` and fix all errors and warnings before saying a step is done.
- One commit per finished step, imperative message.
