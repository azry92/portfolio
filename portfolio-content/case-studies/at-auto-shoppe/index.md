---
title: "AT Auto Shoppe: catalogue and webstore design"
summary: "A Shopify store for a 4x4 parts dealer, built around vehicle-first search so customers find parts that fit their make and model, and the sales team updates products without a developer."
role: "Product Designer & Shopify Developer"
team: "Solo, with the sales team"
timeline: "Apr 2026 – Present"
platform: "Shopify"
tools: ["Figma", "Shopify CLI", "Liquid", "Adobe Photoshop"]
live_url: "https://atautoshoppe.com/"
order: 1
accent: "#2A72BA"
cover: ./images/page-hero.png
cover_alt: "AT Auto Shoppe homepage with a before-and-after slider showing a modified 4x4"
---
## Overview
<!-- layout: hero, title and overview left, browser mockup right -->
The old site was a template catalogue with no way to search by vehicle. 4×4 customers shop by vehicle first (make, model, year) and only then by category, so the store had to work the same way.
## Requirements and process
<!-- layout: requirements list, then palette swatches, then reference images in a row -->
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
## Fitment logic
<!-- layout: full-width diagram -->
"Shop by vehicle" in the main navigation opens a make, model and year finder. Each product carries the vehicles it fits in a metafield (`custom.compatible_vehicles`), so the finder returns only parts that fit. Wheels follow a second rule: selecting a diameter refreshes the width, PCD, offset and colour options, disables impossible combinations and keeps valid selections.
![Diagram: main navigation expands Shop by vehicle into make, model and year, which filters products by their compatible-vehicle metafield](./images/fitment-logic-diagram.svg)
*Every product is tagged with the vehicles it fits, so search results contain only compatible parts.*
## The build
<!-- layout: diagram full width -->
I mapped every path from vehicle selection to checkout before building. The flow covers the vehicle finder, category and brand entry points, the wheel and tyre finders, product pages with fitment notes, and the WhatsApp hand-off when a customer is unsure a part fits.
![Flow diagram of every customer path from vehicle selection to checkout, including the WhatsApp hand-off](./images/initial-flow-customer-experience.png)
*Every route into a product, and the WhatsApp exit when fitment is uncertain.*
## Vehicle to checkout
<!-- layout: rows of phones, one labelled row per stage -->
### Find parts for your vehicle
![Vehicle finder with make, model and year selected](./images/product-finder-vehicle-select.png)
![Category selection after choosing a vehicle](./images/product-finder-collection-select.png)
![Part type selection within the chosen category](./images/product-finder-part-select.png)
![Product list showing only parts compatible with the selected vehicle](./images/product-finder-product-list.png)
![Product page with description and fitment notes](./images/product-finder-page-product-description.png)
*Vehicle first, then category, then only the parts that fit.*
### Our Builds
![Our Builds page header introducing customer vehicle builds](./images/our-builds-header.png)
![Gallery of a modified 4x4 from several angles](./images/our-builds-explore-vehicle.png)
![List of every part used in the build, each linked to its product](./images/our-builds-build-components.png)
![Build page call to action with the WhatsApp enquiry button](./images/our-builds-page-cta.png)
*Each build lists its parts, so a customer can buy the whole look.*
### Checkout
![Cart with the selected product](./images/checkout-page-select-product.png)
![Checkout step choosing delivery and payment method](./images/checkout-page-finalize-method.png)
![Payment step](./images/checkout-page-payment.png)
*Standard Shopify checkout, unchanged so buyers see a flow they trust.*
## The Solution
<!-- layout: one headline, body below, row of phones -->
### Rebuilt to ease customers' search for 4x4 parts.
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
## Feedback and iteration
| Feedback | Source | Response |
|---|---|---|
| "Wheel Finder is hard to read; J-width is shown first." | Sales Manager, several rounds | Removed J-width as the first step and narrowed the Wheel and Tyre Finders to 4 main branches. |
| "Can we make our own custom YMM search?" | Sales Manager, several rounds | Built a custom Make/Model/Year finder in place of a paid YMM app, saving RM 80/month. |
| Product filters from the old site were generic and not tuned to customer needs. | Owner, Sales Manager | Each collection has its own filters: tyres by width, aspect ratio and diameter; suspension by front or rear placement. |
| "It's important to make a sign-up page for our customers for promotions and retention." | Owner | Enabled account sign-up with a promotions opt-in. |
| Old URLs and product descriptions had broken links. | Owner, Sales Manager | Rebuilt product listings with proper tags, metaobject labels, and cleaned-up URLs and SKUs. 301 redirects are in progress. |
<!-- layout: table, then row of phones, then full-width browser screenshot -->
![Collection page with filters tuned per category, such as tyre width, aspect ratio and diameter](./images/product-page-filter-category.png)
![Custom make, model and year search on the home page, replacing a paid YMM app](./images/home-make-model-year-search.png)
![Interior accessories collection page with its own filter set](./images/collection-page-interior-accessories.png)
![Product finder page with the vehicle selected and matching parts listed](./images/product-finder-page.png)
*Each change answers a row in the table above.*
## Building on a live store safely
<!-- layout: copy left, terminal screenshot and code screenshot right -->
The store runs on Shopify's Dawn 16 theme, extended with custom sections. Before changing the live store I pulled the theme locally with Shopify CLI and kept it under version control, so every edit can be reviewed and rolled back.
The code was written with AI assistance. I specified the metaobject schema and the selection rules, then reviewed and debugged every section.
![Shopify CLI pulling the live theme into a local folder before any edits](./images/cli-theme-pull-success.png)
*Live theme pulled locally before any change.*
![at-brand-related-builds.liquid open in VS Code, lines 1 to 47](./images/vscode-brand-related-builds-liquid.png)
*Custom Liquid section linking brands to the builds that use them.*
## Status
Launched in 2026. Finder usage, conversion and WhatsApp enquiries are being tracked from launch; results will be added here.
## Reflection
Building the store myself showed how much the structure decisions drive everything downstream, from navigation to sales. Using AI to write code taught me to specify behaviour precisely and to review what I ship. Next, I would track how often customers use the finder and whether its compatibility results lead to purchases or WhatsApp enquiries.