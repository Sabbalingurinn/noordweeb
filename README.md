# NoordWeeb

A small web studio with Icelandic roots. Two straightforward website sizes, four useful extras, and individually quoted changes after launch. The showroom lets customers explore five working design concepts in separate tabs before choosing.

## Open and edit

Node 20+ and Python 3. No npm dependencies to install.

```sh
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4173. The distributable website is `dist/`.

| What | Location |
| --- | --- |
| Business details and enquiry destination | `content/business.json` |
| Two packages, four extras and service boundaries | `content/catalog.json` |
| Demo content and design mappings | `content/templates.json` |
| Landing page and styles | `dist/index.html`, `dist/styles.css` |
| Configurator, navigation and price request | `dist/app.js`, `dist/quote.js` |
| Generated browser data | `dist/data.js` — do not edit directly |
| Demo renderer and styles | `scripts/render-template.mjs`, `scripts/template-styles.css` |
| Generated demos | `dist/templates/{kade,crumb,still,stem,rove}/` |
| Portable AI kits and ZIPs | `template-kits/` |
| Information-page and kit generation | `scripts/build.mjs` |
| Pricing decisions and scope | `OFFER_STRATEGY.md` |
| Missing business information | `OWNER_HANDOFF.md` |
| Sales and customer production | `TEMPLATE_PLAYBOOK.md` |

The build refreshes data, demos, information pages, kits and ZIPs. The four main authored files in `dist/` are preserved. Copy customer kits out of `template-kits/` before editing; builds regenerate that directory.

## Offer

- **One good page — €950:** one page, up to six sections.
- **A little more room — €1,650:** up to five pages in one consistent design.
- **Optional extras:** copy shaping €250; longer menu entry €100; one more language €350; an existing booking widget €150.

Prices exclude applicable VAT. Both packages include two grouped revision rounds, contact/directions/existing booking links, search basics, launch help and website files. A supplied menu PDF or up to six short menu/service entries is included. Hosting, domains and third-party services are separate provider costs; accounts belong to the customer. Future changes get a separate quote. There is no compulsory maintenance plan.

No online shops, accounts, custom booking systems, CMS dashboards, apps or complex integrations. The owner delegated these pricing and scope decisions in the redesign request; they replace the older CRM-derived catalogue. Do not ask a follow-up model to restore or reconfirm that old catalogue. The CRM was neither changed nor connected to this site.

## Behaviour

- A navy studio introduction with live demo previews, an asymmetric portfolio and short design notes. The studio uses upright Manrope typography, cool blue accents and a minimal monochrome N symbol and wordmark. Includes mobile navigation, pricing and the studio story. The owner removed the project-brief section, process-step grid and FAQ on 1 October 2026; the remaining price-request form handles enquiries.
- The owner’s latest 1 October review requires five independent visual systems, not a shared content-card scaffold. Kade is a traditional Dutch bistro with Georgia type, a permanent navigation rail and a centered typeset menu. Crumb is a butter-yellow and tomato-red bakery poster, with Dela Gothic One display lettering, a curved pastry photo and one paper receipt. Still is an airy Newsreader hotel journal with an asymmetric arrival and an accessible room selector. Stem is a blush-and-plum botanical scrapbook with Caveat handwriting, a taped photograph, original flower drawings and illustrated collection rows. Rove is a charcoal workshop board with Anton condensed capitals, Courier labels, monochrome photography and native expandable service rows. Every design has its own section composition and content presentation. The earlier real-site references remain recorded in `content/templates.json` as background; the current `designDirection` and working files take precedence. The showroom uses distinct portfolio spreads and actual screenshots. All businesses remain fictional, all start at €950, and demo actions never make bookings.
- Native package radios and four extra checkboxes share the same integer-cent calculator. Duplicate extras are never charged twice.
- Form validation, local custom price request previews, copy and text download. The configured `contactEmail` is `noordweeb@noordweeb.nl` and adds a mailto draft. The visitor reviews and sends it in their email app; there is no submission backend or automatic email delivery. Custom work receives a separate human-reviewed price.
- Optional WebMCP tools read the catalogue/service policy and stage estimates without submitting orders.
- No app analytics or tracking scripts; fonts and photos are served locally.
- Privacy and working-together pages still identify the missing launch details.

## Hosting

The existing private preview is https://noordweeb-showroom.expert-ox-1874.chatgpt.site/. `.openai/hosting.json` contains its project identity. Preserve that identity and audience; do not create another Site. The enquiry email is configured and public privacy/project-terms pages are written. Before public launch, verify the registered company and VAT details, purchase the planned noordweeb.nl domain, test its mailbox, and confirm the production providers and retention arrangements. `dist/` is portable to another static-compatible host.

## Asset credits

- Retained café-table asset (currently unused): [Tanya Barrow / Unsplash](https://unsplash.com/photos/table-and-chairs-by-a-sunny-window-with-flowers-dsnC3bnP4Ew).
- Restaurant: [Glenov Brankovic / Unsplash](https://unsplash.com/photos/a-room-with-tables-and-chairs-e4B5AvA7Jqo).
- Bakery: [Conor Brown / Unsplash](https://unsplash.com/photos/a-bunch-of-croissants-that-are-on-a-table-sqkXyyj4WdE).
- Hotel: [Point3D Commercial Imaging / Unsplash](https://unsplash.com/photos/white-bed-linen-on-bed-oxeCZrodz78).
- Florist: [Bohdan Stocek / Unsplash](https://unsplash.com/photos/flowers-on-display-in-a-bright-and-airy-flower-shop-r4f9Nai_ztM).
- Bike workshop: [Bohdan Kadun / Unsplash](https://unsplash.com/photos/a-man-working-on-a-bicycle-in-a-garage-WIsOienEXBM).

Photos were obtained under the [Unsplash License](https://unsplash.com/license). The scenes are stock photography, not actual NoordWeeb customers. Newsreader, DM Sans, Manrope, Dela Gothic One, Caveat and Anton are served locally with their SIL Open Font License files. The minimal monochrome N mark is original to NoordWeeb. The studio uses Manrope; the five fictional demos use distinct type systems. New fonts come from the official [Google Fonts repository](https://github.com/google/fonts); optimized Latin WOFF2 files are served locally.
# noordweeb
