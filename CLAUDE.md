# Portfolio: Ismail Azry

Personal portfolio for "Product Designer, Web & E-commerce | Shopify Design & Build". Audience: hiring managers for Product Designer, Design Technologist and Frontend UI Engineer roles in Malaysia. The code is part of the portfolio and will be read.

## Stack
- Astro + TypeScript, static output.
- Plain CSS with custom properties. Tokens live in `src/styles/tokens.css`, generated from `portfolio-content/tokens.md`. No Tailwind, no UI kits.
- Content collections for case studies, other works and fun. Markdown/MDX in `src/content/`.
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
- Device frames are components, never images. PhoneFrame models the iPhone 17 Pro: screen ratio 1206:2622, outer corner radius about 13% of frame width, thin even black bezel (about 2.5% of width), aluminium edge as a 1–2px outer ring in a neutral grey, Dynamic Island as a black pill centred near the top (about 30% of screen width, 3% of screen height). A top safe-area strip (solid, empty band behind the Dynamic Island, default 6% of screen height, set by the `safeArea` prop, 0 to remove) keeps screenshot content below the island. No status bar, no side buttons, no shadow beyond one soft drop shadow. BrowserFrame: thin top bar with three dots, no URL text. Screenshots sit inside at native size, object-fit cover, aligned top.
- Rows of 2–3 phones or images stack to one column below 600px, unless a layout note says otherwise.
## Workflow
- Plan before building any new page or component; wait for approval.
- Build one case study fully before templating the rest.
- Run `npm run build` and fix all errors and warnings before saying a step is done.
- One commit per finished step, imperative message.
