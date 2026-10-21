# Tokens
## Site colours (the portfolio itself, not the client brands)
| Role | Hex | Used for |
|---|---|---|
| bg | #F0EEE9 | page background, footer |
| surface | #FFFFFF | cards, panels |
| surface-inverse | #16171A | dark sections |
| text | #000000 | body text on bg and surface |
| text-inverse | #F0EEE9 | text on surface-inverse |
| text-muted | #424242 | captions, metadata |
| accent | #B51C1C | links, focus ring |
| accent-deep | #640F0F | hover and pressed states |
| pattern-grey | #D9D9D9 | hero band, contact circles, short cards |
| pattern-black | #000000 | hero glyph states |
| pattern-cream | #F7F5F0 | hero glyph states |
| border | #D6D2CA | dividers |
| status | #1A7F37 | "Open to roles" dot |
## Type
- Display: Sora, weights 300 and 700
- Body: Inter, weights 400 and 600
- Scale (px): 14 / 16 / 18 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128
- Display steps: hero 48 to 128 (home name, About headline); page h1 32 to 80; section h2 32 to 48; labels 14. Contrast comes from scale, not colour.
- Line height: body 1.6, headings 1.15
## Spacing (px)
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128
## Shape
- Radius: 0 on cards, frames, covers, figures and controls. Pill (999) only on the primary CTA ("See the work"). Device frames (PhoneFrame, DisplayFrame) keep their own hardware corners; colour swatches stay circles.
- Border width: 1
- Rule: 1px solid border colour, between sections and between list rows (never above and below every row).
## Grid
- 12 columns from 900px, 4 columns from 600px, 1 column below. Column gap = gutter (16px, 24px from 768px).
## Layout
- Content width (`--content-wide`): 1600, the default frame for case studies, Other Works, Fun, the 404 and their footer. Side gutter 24 below 900px, 48 from 900px, 100 (`--gutter-wide`) from 1200px.
- Home (hero, Selected work, footer) and the sticky header: full width, no cap. Side gutter 16 below 600px, 24 from 600px.
- Running text: max 68ch (`--measure`) inside either frame. Only images, figure grids, headings and the hero headline use the full width.
- Text is flush left, ragged right. No centring, no justification.
- Sections open with a hairline and a numbered label ("02 / Process"), numbered per page from 01.
