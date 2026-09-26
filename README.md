# NoordWeeb

A small web studio with Icelandic roots. Two straightforward website sizes, four useful extras, and individually quoted changes after launch. The showroom lets customers explore five working design concepts before choosing.

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
| Configurator, navigation and brief | `dist/app.js`, `dist/quote.js` |
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

- An editorial opening with a short studio note, mobile navigation, a custom coastal N mark and serif wordmark, a welcoming café photograph, showroom, pricing, studio story and FAQ.
- Kade, Crumb, Still, Stem and Rove are fictional single-page demos. Kade uses a printed dinner-invitation layout, Crumb a bakery poster and product shelf, Still an immersive hotel photograph, Stem an editorial florist layout, and Rove an industrial workshop layout. All start at €950; any design can be expanded under the five-page package. Demo actions do not make bookings.
- Native package radios and four extra checkboxes share the same integer-cent calculator. Duplicate extras are never charged twice.
- Form validation, local brief and custom price request previews, copy and text download. The configured `contactEmail` is `noordweeb@noordweeb.nl` and adds a mailto draft. The visitor reviews and sends it in their email app; there is no submission backend or automatic email delivery. Custom work receives a separate human-reviewed price.
- Optional WebMCP tools read the catalogue/service policy and stage estimates without submitting orders.
- No app analytics or tracking scripts; fonts and photos are served locally.
- Privacy and working-together pages still identify the missing launch details.

## Hosting

The existing private preview is https://noordweeb-showroom.expert-ox-1874.chatgpt.site/. `.openai/hosting.json` contains its project identity. Preserve that identity and audience; do not create another Site. The enquiry email is configured; confirmed registration details and approved business policies are still needed before public launch. `dist/` is portable to another static-compatible host.

## Asset credits

- Homepage café table: [Tanya Barrow / Unsplash](https://unsplash.com/photos/table-and-chairs-by-a-sunny-window-with-flowers-dsnC3bnP4Ew).
- Restaurant: [Glenov Brankovic / Unsplash](https://unsplash.com/photos/a-room-with-tables-and-chairs-e4B5AvA7Jqo).
- Bakery: [Conor Brown / Unsplash](https://unsplash.com/photos/a-bunch-of-croissants-that-are-on-a-table-sqkXyyj4WdE).
- Hotel: [Point3D Commercial Imaging / Unsplash](https://unsplash.com/photos/white-bed-linen-on-bed-oxeCZrodz78).
- Florist: [Bohdan Stocek / Unsplash](https://unsplash.com/photos/flowers-on-display-in-a-bright-and-airy-flower-shop-r4f9Nai_ztM).
- Bike workshop: [Bohdan Kadun / Unsplash](https://unsplash.com/photos/a-man-working-on-a-bicycle-in-a-garage-WIsOienEXBM).

Photos were obtained under the [Unsplash License](https://unsplash.com/license). The scenes are stock photography, not actual NoordWeeb customers. Newsreader, DM Sans and Manrope are served locally with their SIL Open Font License files. The hand-drawn N mark keeps a restrained Nordic reference, with a small wave for the Icelandic coast. Its shape is original to NoordWeeb.
