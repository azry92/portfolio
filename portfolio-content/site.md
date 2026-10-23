## SEO
- title: "Ismail Azry | Product Designer, Web & E-commerce | Shopify Design & Build"
- description: "Ismail Azry is a product designer in Malaysia who designs and builds e-commerce storefronts, from information architecture to custom Shopify code."
- url: "https://ismailazry.com"
- og_image: /og.png
## Header
- name: Ismail Azry
nav:
  - Work: /#work
  - About: /#about
  - Other Works: /other-works
  - Fun: /fun
  - Contact: #contact
  - CV: /ismail-azry-cv.pdf
## Home layout
<!-- layout: home page. Reference: portfolio-content/brand/glyph-ia.svg -->
### 1. Hero (fills the first screen under the sticky header)
- Full-width section, at least the viewport height minus the header (100svh). Three rows: labels at the top, the intro in the middle, the h1 along the bottom edge.
- Labels (Inter 600, 14px, uppercase, wide tracking), stacked below 900px; from 900px the first in columns 1 to 6, the second from column 7:
  - Left: "Product Designer, Web & E-commerce". On a phone it wraps after the comma, never inside "Web & E-commerce".
  - Right: "Open to roles, Kuala Lumpur", with a small green dot (the status token) before it.
- Intro: the about paragraph (Inter 400, 18px), then two calls to action, then the current line.
  - "See the work" (accent-red pill, the only pill on the site, links to #work) and "CV" (text link, downloads the PDF). Each has a decorative ↓ after the label, hidden from screen readers.
  - Current line (14px, muted): "Currently designing and building the AT Auto Shoppe store.", with "AT Auto Shoppe store" linking to its case study.
  - Below 900px it sits full width under the labels; from 900px it takes the right half, beside empty ground.
- Title, the h1, in two parts (Sora bold, the largest text on the site):
  - "Ismail Azry," in black, 48px on a phone rising to 128px (--text-hero).
  - "designing stores, then building them." in the accent red, 32px rising to 80px, balanced so it breaks after "stores,".
- Glyph texture behind the hero: the IA glyph (portfolio-content/brand/glyph-ia.svg, paths id="I" and id="A") as faint outlines in the border colour, tiled with a brick offset in inline SVG. Static, decorative, aria-hidden. It is clear under the labels and fades out before the headline; from 900px it also fades out before the intro's right half, so no text sits on it.
- The animated glyph band (load sequence, scroll scrub, hover flip) is not in the hero; it sits after Selected work as the divider before About.
### 2. Work (id="work")
- A hairline across the content width, then the label "01 / Selected work" (SectionLabel) over the h2 "See the Work" (Sora, 32px rising to 48px).
- Case study cards in frontmatter `order`: AT Auto Shoppe, PLANETSTEWARDS, Precious Wedding. Each comes from WorkCover: a square tile on the page cream with a 1px hairline border, the hero screenshot's frame rising from the bottom edge, no colour fill and no shadow.
  - Below 600px: one row per case study, cover about 40% on the left, name and card line on the right, hairlines between rows.
  - 600px to 899px: the three cards in one row.
  - From 900px: four of the twelve columns each.
- Under the cards, Other Works (/other-works) and Fun (/fun) as text links with an arrow, one per row, each with a hairline above. From 900px they sit in columns 5 to 12.
### 3. Footer
- A hairline, then "Let's brew something together." with the contact links as 48px square outline buttons (red fill on hover and focus), then the credit line. From 900px the credit line sits in columns 7 to 12, level with the bottom of the contact squares. No footer nav and no Back to top on home: the sticky header carries the nav and the page is short.
### Breakpoints
- Below 600px: everything stacks; work cards as rows.
- 600px to 899px: a 4-column grid; the hero stacks; the three cards share a row.
- 900px and up: the 12-column grid. Hero labels split at column 7, the intro takes columns 7 to 12. Content is capped at the max content width from tokens.md; the hero texture runs full bleed.
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
- links: Email, LinkedIn, CV, Source code