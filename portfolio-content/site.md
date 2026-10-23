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
<!-- layout: home page. Reference: portfolio-content/references/hero-olsson.png (hero structure only), portfolio-content/brand/glyph-ia.svg -->
### 1. Hero (fills the first screen under the sticky header)
- An editorial, asymmetric hero on the page cream: a very large name overlapping the top of a tall image panel, small muted labels bottom left, a narrow right column bottom right. Lots of empty ground, no texture.
- Title, the h1 (first in the markup), in two parts:
  - The name, "Ismail Azry", on two lines (ISMAIL / AZRY), Sora bold, uppercase through CSS (the source keeps normal case), `--text-name`: the largest text on the site, sized so ISMAIL fits at 360px (about 92px) and capped at 180px. The comma after the name stays for screen readers only.
  - The claim, "designing stores, then building them.", as a smaller line under AZRY in the accent red: the headline's one red element.
- Panel: a tall block in pattern grey (#D9D9D9), 3:4 below 1200px and 4:5 from 1200px, holding the IA glyph (portfolio-content/brand/glyph-ia.svg, paths id="I" and id="A", inline SVG), solid accent red, the settled state of the glyph band, about 80% of the panel's width and sitting on its bottom. Under it, a copy of both paths with a thin accent stroke (0.5 units) covers the hairline where I meets A; it fades with the fill on hover. Decorative: aria-hidden, nothing focusable.
  - Contrast: the name (black, 14.9:1) and the claim (red, 4.73:1) may cross the panel's grey but never the glyph (black on red is 3.15:1). The glyph starts 1.75em of the name's size below the top of the name, so it always clears AZRY.
  - Hover (pointer over the hero, `(hover: hover)` and no reduced motion only): the fill fades and the outline draws in with stroke-dasharray, I first and A a beat later; it runs back when the pointer leaves. CSS only. Touch, no hover and reduced motion keep the solid glyph.
  - Entrance, the only one: the panel opens upward from its bottom edge on load (clip-path, no JS, only without reduced motion). The h1 never animates.
- Labels (Inter 600, 14px, uppercase, wide tracking, muted): "Product Designer, Web & E-commerce" (on a phone it wraps after the comma, never inside "Web & E-commerce"), then "Open to roles, Kuala Lumpur" with a small green dot (the status token) before it.
- Intro: the about paragraph (Inter 400, 18px), then two calls to action, then the current line.
  - "See the work" (accent-red pill, the only pill on the site, links to #work) and "CV" (text link, downloads the PDF). Each has a decorative ↓ after the label, hidden from screen readers.
  - Current line (14px, muted): "Currently designing and building the AT Auto Shoppe store.", with "AT Auto Shoppe store" linking to its case study.
- Below 600px: name, claim, then a row with the labels bottom left beside the panel (the right half), which rises under the claim's last line; then the intro, with "See the work" as a full-width pill. The name and the role show on the first screen at 360x640.
- 600px to 1199px: the name across the top; the claim, the intro and the labels run down the left (columns 1 to 2 of 4; 1 to 5 of 12 from 900px); the panel takes the right (columns 3 to 4; 7 to 11 from 900px) and only AZRY crosses its top.
- From 1200px, three zones: labels in columns 1 to 3 at the bottom, the claim above them under AZRY; the panel in columns 4 to 8, starting under the middle of ISMAIL so both lines cross it, as tall as the first screen allows; the intro in columns 10 to 12, bottom-aligned with the panel. Column 9 stays empty.
### 2. Work (id="work")
- A hairline across the content width, then the label "01 / Selected work" (SectionLabel) over the h2 "See the Work" (Sora, 32px rising to 48px).
- Case study cards in frontmatter `order`: AT Auto Shoppe, PLANETSTEWARDS, Precious Wedding. Each comes from WorkCover: a square tile on the page cream with a 1px hairline border, the hero screenshot's frame rising from the bottom edge, no colour fill and no shadow.
  - Below 600px: one row per case study, cover about 40% on the left, name and card line on the right, hairlines between rows.
  - 600px to 899px: the three cards in one row.
  - From 900px: four of the twelve columns each.
- Under the cards, Other Works (/other-works) and Fun (/fun) as text links with an arrow, one per row, each with a hairline above. From 900px they sit in columns 5 to 12.
### 3. Lab (id="lab")
- A full-bleed field of the accent red (#B51C1C), the one coloured section on the site, after 48px (64px from 600px) of cream under Work. On it, everything is cream (5.75:1): a cream hairline across the content width, then the label "02 / Lab" as the h2 (SectionLabel, no separate heading), names, build times, lines, tool pills and links. Black on the red would be 3.15:1, so there is none. Focus rings are cream on the red; the clips sit in cream browser frames. About after it becomes "03 / About"; the GlyphBand still divides Lab from About.
- Four build clips from `portfolio-content/lab/`, in frontmatter `order`: Make, model and year finder; Product finder; Brand slider; This portfolio. Each card, adapted from references/lab-card.png (its anatomy, not its theme): the clip in a BrowserFrame at the clip's own ratio (about 2.15:1) with a short label in the bar ("AT Auto Shoppe · Shopify", "ismailazry.com · Astro"); the name; the build time as a large number and a small uppercase unit ("2 WEEKS"); one line of copy; the tools as outline pills; and a text link with an arrow (the AT Auto Shoppe case study, or the GitHub repo). What the clip shows is the video's accessible name, not a visible caption.
- Clips are muted and loop, load nothing until near the viewport and play only while in view. With reduced motion nothing plays: the poster shows with a Play button. The Play/Pause control is a small round icon pill in the frame's bottom-right corner.
  - Below 600px: one card per row, hairlines between.
  - 600px to 899px: two cards per row.
  - From 900px: six of the twelve columns each, two per row; names, lines and links line up across the row.
### 4. Footer
- A hairline, then "Let's brew something together." with the contact links as 48px square outline buttons (red fill on hover and focus), then the credit line. From 900px the credit line sits in columns 7 to 12, level with the bottom of the contact squares. No footer nav and no Back to top on home: the sticky header carries the nav and the page is short.
### Breakpoints
- Below 600px: everything stacks; work cards as rows; Lab cards one per row.
- 600px to 899px: a 4-column grid; the hero's text runs down the left beside the panel; the three cards share a row; Lab cards two per row.
- 900px and up: the 12-column grid. From 1200px the hero takes its three zones (labels 1 to 3, panel 4 to 8, intro 10 to 12). Home runs full width with no cap.
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