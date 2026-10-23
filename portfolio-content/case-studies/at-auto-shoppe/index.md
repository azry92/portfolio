---
title: "AT Auto Shoppe"
subtitle: "A 4×4 parts store rebuilt around one question: does it fit my truck?"
summary: "A Shopify store for a 4x4 parts dealer, built around vehicle-first search so customers find parts that fit their make and model, and the sales team updates products without a developer."
glance:
  problem: "No way to search by vehicle."
  did: "Built a Shopify store around a vehicle finder."
  outcome: "1,200+ non-branded Google clicks since launch."
role: "Product design + Shopify development"
card_line: "Shopify webstore for a 4×4 parts dealer"
team: "Solo, with the sales team"
timeline: "Feb 2026 – Present"
platform: "Shopify"
tools: ["Figma", "Shopify CLI", "Liquid", "Adobe Photoshop"]
live_url: "https://atautoshoppe.com/"
order: 1
accent: "#2A72BA"
cover: ./images/page-hero.png
cover_alt: "AT Auto Shoppe homepage with a before-and-after slider showing a modified 4X4"
og_focus: { y: 0.55 }
hero:
  frame: browser
  image: ./images/hero.png
  alt: "AT Auto Shoppe homepage with the make, model and year vehicle finder above a before-and-after slider of a red 4×4"
---
## Customers shop by truck, not by category
<!-- layout: hero, title and overview left, browser mockup right -->
> Make, model and year come before anything else.
 4×4 customers shop by vehicle first (make, model, year) and only then by category, so the store had to work the same way.
## Four requirements set the brief
<!-- layout: requirements list, then palette swatches, then reference images in a row -->
> From a template catalogue to a store the sales team runs.
- Move the brand from a template catalogue to its own Shopify store.
- Customers must find parts that fit their vehicle across 10+ makes.
- The sales team must be able to update products and builds without a developer.
- Fitment questions must reach sales directly over WhatsApp.
### Colour palette
<!-- layout: swatch row -->
- Brand Blue #2A72BA: brand and every primary action
- Soft Blue #BDD3EA: vehicle finder (make, model, year) background
- White #FFFFFF: section backgrounds, Our Builds cards
- WhatsApp green #25D366: enquiry button
- Sale red #D71920: sale badges
### Typography
- Inter: Heading, body text
### References
<!-- layout: three images in a row -->
![RAYS Wheels collection page with a sliding transition between wheel ranges](./images/requirements-reference-01-rays-wheels.png)
*Reference: RAYS Wheels, slider transition between collections.*
![ARB Iconic Builds page showcasing complete vehicle builds](./images/requirements-reference-02-arb.png)
*Reference: ARB, Iconic Builds. The model for Our Builds.*
![Alpinestars collection page with image-led category tiles](./images/requirements-reference-03-alpinestars.png)
*Reference: Alpinestars, image-led category navigation.*
## Four rules every screen was checked against
<!-- layout: numbered rules -->
- Vehicle before category: every entry point asks for the truck first.
- A fitment doubt is one tap from WhatsApp.
- Colour means action: brand blue for primary actions, green only for WhatsApp, red only for sale.
- Checkout stays standard Shopify, so buyers see a flow they already trust.
## A part only shows if it fits your truck
<!-- layout: full-width diagram -->
> One metafield decides what each customer sees.
"Shop by vehicle" in the main navigation opens a make, model and year finder. Each product carries the vehicles it fits in a metafield (`custom.compatible_vehicles`), so the finder returns only parts that fit. Wheels follow a second rule: selecting a diameter refreshes the width, PCD, offset and colour options, disables impossible combinations and keeps valid selections.
![Diagram: main navigation expands Shop by vehicle into make, model and year, which filters products by their compatible-vehicle metafield](./images/fitment-logic-diagram.svg)
*Every product is tagged with the vehicles it fits, so search results contain only compatible parts.*
## Every route mapped before the build
<!-- layout: diagram full width -->
> Finder, categories, brands and the WhatsApp exit.
I mapped every path from vehicle selection to checkout before building. The flow covers the vehicle finder, category and brand entry points, the wheel and tyre finders, product pages with fitment notes, and the WhatsApp hand-off when a customer is unsure a part fits.
![Flow diagram of every customer path from vehicle selection to checkout, including the WhatsApp hand-off](./images/initial-flow-customer-experience.png)
*Every route into a product, and the WhatsApp exit when fitment is uncertain.*
## Five steps from truck to part
<!-- layout: rows of phones, one labelled row per stage -->
### Find parts for your vehicle
<!-- layout: scrolling steps, sticky phone left -->
![Vehicle finder with make, model and year selected](./images/product-finder-vehicle-select.png)
*Pick the truck. Make, model and year, before anything else.*
![Category selection after choosing a vehicle](./images/product-finder-collection-select.png)
*Choose a category. Only categories with parts for that vehicle.*
![Part type selection within the chosen category](./images/product-finder-part-select.png)
*Narrow to a part type. Within the chosen category.*
![Product list showing only parts compatible with the selected vehicle](./images/product-finder-product-list.png)
*See only what fits. The list is filtered by each product's compatible vehicles.*
![Product page with description and fitment notes](./images/product-finder-page-product-description.png)
*Check the fitment notes. The product page repeats the fit, with WhatsApp one tap away.*
*Vehicle first, then category, then only the parts that fit.*
### Our Builds
![Our Builds page header introducing customer vehicle builds](./images/our-builds-header.png)
![Gallery of a modified 4x4 from several angles](./images/our-builds-explore-vehicle.png)
![List of every part used in the build, each linked to its product](./images/our-builds-build-components.png)
![Build page call to action with the WhatsApp enquiry button](./images/our-builds-page-cta.png)
*Each build lists its parts, so a customer can buy the whole look.*
### Checkout
![Cart with the selected product](./images/checkout-page-select-product.png "Cart with the selected product.")
![Checkout step choosing delivery and payment method](./images/checkout-page-finalize-method.png "Checkout step choosing delivery and payment method.")
![Payment step](./images/checkout-page-payment.png "Payment step.")
*The payment gateway is still being finalised; these screens show the current setup.*
## One store, three finders
<!-- layout: one headline, body below, row of phones -->
> Parts, wheels and tyres, each from the vehicle.
I designed and built the store on Shopify: a Make, Model and Generation/Year finder, navigation by product, vehicle and brand, dedicated wheel and tyre finders, an Our Builds showcase, and WhatsApp enquiry for fitment questions.
![Homepage hero with a before-and-after transformation slider](./images/home-hero-slider.png)
*Transformation slider on entry.*
![Homepage category tiles linking to each product collection](./images/home-category-collection.png)
*Category collections on the homepage.*
![Collection page filter tuned to the product type](./images/product-page-filter-category.png)
*Filters tuned to each collection.*
![Quick add to cart from a homepage product card](./images/home-quick-add-product.png)
*Quick add to cart.*
![Mobile menu with parts, wheel and tyre finders](./images/menu-mobile-parts-wheel-tyre-finder.png)
*All three finders reachable from the mobile menu.*
## Sales feedback reshaped the finders
> Five issues raised, four shipped, one in progress.
| Feedback | Source | Response |
|---|---|---|
| "Wheel Finder is hard to read; J-width is shown first." | Sales Manager, several rounds | Removed J-width as the first step and narrowed the Wheel and Tyre Finders to 4 main branches. |
| "Can we make our own custom YMM search?" | Sales Manager, several rounds | Built a custom Make/Model/Year finder in place of a paid YMM app, saving RM&nbsp;80/month. |
| Product filters from the old site were generic and not tuned to customer needs. | Owner, Sales Manager | Each collection has its own filters: tyres by width, aspect ratio and diameter; suspension by front or rear placement. |
| "It's important to make a sign-up page for our customers for promotions and retention." | Owner | Enabled account sign-up with a promotions opt-in. |
| Old URLs and product descriptions had broken links. | Owner, Sales Manager | Rebuilt product listings with proper tags, metaobject labels, and cleaned-up URLs and SKUs. 301 redirects are in progress. |
<!-- layout: table, then row of phones, then full-width browser screenshot -->
![Collection page with filters tuned per category, such as tyre width, aspect ratio and diameter](./images/product-page-filter-category.png "Collection filters, down to exhaust type and compatible vehicles.")
![Custom make, model and year search on the home page, replacing a paid YMM app](./images/home-make-model-year-search.png "Custom make, model and year search, in place of a paid app.")
![Interior accessories collection page with its own filter set](./images/collection-page-interior-accessories.png "Interior accessories collection with its own filters.")
![Product finder page with the vehicle selected and matching parts listed](./images/product-finder-page.png "Product finder on desktop, starting from the vehicle.")
*Each change answers a row in the table above.*
## Every change reviewed before it reaches the live store
<!-- layout: copy left, terminal screenshot and code screenshot right -->
> Theme under version control, AI code reviewed and debugged.
The store runs on Shopify's Dawn 16 theme, extended with custom sections. Before changing the live store I pulled the theme locally with Shopify CLI and kept it under version control, so every edit can be reviewed and rolled back.
The code was written with AI assistance. I specified the metaobject schema and the selection rules, then reviewed and debugged every section.

The brand pages built on metaobjects now lead search: six of the ten pages with the most non-branded Google clicks are brand pages, led by RAYS Wheels with 73 clicks (Sept–Oct 2026, Google Search Console).
![Shopify CLI pulling the live theme into a local folder before any edits](./images/cli-theme-pull-success.png)
*Live theme pulled locally before any change.*
![at-brand-related-builds.liquid open in VS Code, lines 1 to 47](./images/vscode-brand-related-builds-liquid.png)
*Custom Liquid section linking brands to the builds that use them.*
## Measured since launch
<!-- layout: stat cards, first card largest -->
> Search reach and savings now; finder use and enquiries next.
Sept–Oct 2026 · Google Search Console; non-branded as classified by Google
- RM 80/month: paid YMM app replaced by a custom finder
- 1,200+: clicks from non-branded Google searches since the September 2026 launch
- 60,000+: search impressions, average position 7.6
- 10+ makes: covered by the vehicle finder
- 3 finders: parts, wheels, tyres
- 5: sales and owner requests answered, 4 shipped

Next: tracking finder use and WhatsApp enquiries to measure fit-led sales.

Orders currently close over WhatsApp; online checkout opens once the payment gateway is finalised.
## Reflection
Building the store myself showed how much the structure decisions drive everything downstream, from navigation to sales. Using AI to write code taught me to specify behaviour precisely and to review what I ship. Next, I would track how often customers use the finder and whether its compatibility results lead to purchases or WhatsApp enquiries.