## SEO
- title: "Ismail Azry | Product Designer, Web & E-commerce | Shopify Design & Build"
- description: "Ismail Azry is a product designer in Malaysia who designs and builds e-commerce storefronts, from information architecture to custom Shopify code."
- url: "https://ismailazry.com"
- og_image: /og.png
## Header
- name: Ismail Azry
nav:
  - Work: /#work
  - Other Works: /other-works
  - Fun: /fun
  - Contact: #contact
  - CV: /ismail-azry-cv.pdf
## Home layout
<!-- layout: home page. Reference: references/brand/glyph-ia.svg and references/brand/logo.svg -->
### 1. Pattern band (full width, top of page)
- Full-bleed band built from references/glyph-ia.svg (two paths, id="I" and id="A"), repeated in rows as inline SVG. Not a raster image.
- Height: about one third of the viewport on desktop (≈360px at 1080 tall), about 165px on mobile. The pattern runs edge to edge and may crop at the sides.
- Colours: glyphs in accent red on a #D9D9D9 band; the page below is the bg token.
- Motion:
  - On load, play once through the states in references/home-state-01.png to -06.png (outline on red, solid red on grey, layered red/grey/cream, sheared and extruded), then settle on the solid red on grey state.
  - After that, page scroll scrubs through the same states while the band is in view.
  - On hover, a glyph under the cursor flips from fill to outline (fill: none; stroke: currentColor) and back.
  - prefers-reduced-motion: no animation, show the solid red on grey state only.
- Decorative: aria-hidden="true", no focusable elements inside.
### 2. Intro (desktop: left column, about one third width; mobile: full width, stacked)
- Logo mark (portfolio-content/brand/logo.svg), about 80px desktop, 60px mobile.
- "Hello, I'm Azry." (Sora, light weight, same size as the title line below on desktop; smaller on mobile)
- Title, the h1: "Product Designer, Web & E-commerce" (Sora, about 48px desktop, at least 32px mobile). This is the largest text on the page.
- About paragraph from site.md, Inter 400, max width about 36ch, left-aligned at every breakpoint.
- Desktop only: the contact block ("Let's brew something together.", three labelled icon links: Email, LinkedIn, CV) and the footer line sit at the bottom of this left column.
### 3. Work (desktop: right two thirds; mobile: full width below the intro)
- Heading "See the Work" (Sora, right-aligned on desktop, left on mobile), an h2, smaller than the h1.
- Directly under it: "Download CV" link, styled as an accent-red highlight, linking to /cv/ismail-azry-cv.pdf with the download attribute.
- Case study cards, in frontmatter `order`: AT Auto Shoppe, PLANETSTEWARDS, Precious Wedding.
  - Desktop: three equal cards in one row.
  - Mobile: two-column grid. The "See the Work" heading and CV link take the first cell, AT Auto Shoppe the second, then PLANETSTEWARDS and Precious Wedding.
  - Each card is one link to /work/[slug], showing the frontmatter `cover` image (with cover_alt), the title, and on hover or focus the one-line `summary`. Visible focus ring in the accent colour.
- Below the cards, two shorter cards: Other Works (links to /other-works) and Fun (links to /fun).
  - Desktop: aligned under the second and third case study cards, about 40% of a case card's height.
  - Mobile: one row of two, same short height.
### 4. Footer
- Mobile: centred at the bottom, "Let's brew something together.", the three labelled icon links, then "Designed and built by Ismail Azry with Astro. © 2026".
- Desktop: lives in the left column, see section 2.
### Breakpoints
- Below 768px: mobile layout above.
- 768px to 1199px: intro stacks above the work section; case cards in a row of three; Other Works and Fun in a row of two.
- 1200px and up: the two-column desktop layout, content capped at the max content width from tokens.md, with the pattern band staying full bleed.
## About
<!-- layout: portrait left, copy right, then experience list -->
Product designer who designs and builds e-commerce storefronts end to end, from information architecture and product search to custom Shopify code. Interface Design graduate, formerly a medical student.
## Contact
- email: ismailazry14@gmail.com
- linkedin: https://www.linkedin.com/in/ismail-azry
- github: https://github.com/azry92/portfolio
- location: Kuala Lumpur, Malaysia
## Footer
- line: "Designed and built by Ismail Azry with Astro. © 2026"
- links: Email, LinkedIn, CV, GitHub