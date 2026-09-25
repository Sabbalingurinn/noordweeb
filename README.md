# NoordWeeb

A website showroom for a two-person studio: choose a website, add individually priced extras, pay once for the build, and request a separate quote for later work. Hosting, domains and third-party subscriptions are explicitly separate.

## Open and edit

Requires Node 22+ and Python 3. There are no npm dependencies to install.

```sh
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4173. The distributable static site is `dist/`.

| What | Location |
| --- | --- |
| Business identity and contact destination | `content/business.json` |
| Five website packages and fourteen one-time extras | `content/catalog.json` |
| Three demo businesses and their content | `content/templates.json` |
| Main page and visual design | `dist/index.html`, `dist/styles.css` |
| Configurator, mobile navigation and brief flow | `dist/app.js`, `dist/quote.js` |
| Generated browser data (do not edit) | `dist/data.js` |
| Demo renderer and shared theme stylesheet | `scripts/render-template.mjs`, `scripts/template-styles.css` |
| Generated demo pages | `dist/templates/kade/`, `dist/templates/crumb/`, `dist/templates/still/` |
| Standalone AI kits and their ZIP archives | `template-kits/` |
| Legal-page generation | `scripts/build.mjs` |
| Missing inputs and prompt for the next model | `OWNER_HANDOFF.md` |
| Sales-to-delivery template workflow | `TEMPLATE_PLAYBOOK.md` |

Run `npm run build` after changing content or demo sources. It refreshes generated data, all demos, all standalone kits, ZIP archives and information pages. Main `dist/index.html`, `styles.css`, `app.js` and `quote.js` are authored source and are not replaced by the build. Adapt individual customer kits in a separate folder so regeneration never overwrites customer work.

## What works

- Responsive landing page, mobile menu, showroom, pricing, process, studio section and FAQs.
- Three complete single-page fictional demos with working section navigation and honest demo action dialogs.
- Package and extra selection, duplicate prevention, mutually exclusive copywriting options and booking integration included in the booking package.
- Brief form validation, text preview, clipboard copying and text download. If `contactEmail` is configured, the dialog includes an email draft link. **No form submission backend and no automatic email sending.**
- An optional browser WebMCP catalogue reader and estimate configurator, using the same pricing and visible state.
- Local fonts and stock photographs, included licence files, no application analytics or tracking scripts.
- Draft privacy and working-together pages that state what still needs confirmation.

## Commercial assumptions

The CRM was used only as reference; it was not modified or connected to this public-facing site. Package IDs, limits, prices, timing estimates and one-time extras come from `CRM/src/lib/quote-catalog.ts`. The CRM’s annual hosting and Care Plus plans were deliberately left out in accordance with the owner’s requested business model. Its fixed 21% VAT calculation was also left out: the page shows prices excluding applicable VAT and leaves the actual tax treatment to the final quote.

The English copy, EUR prices and initial hospitality focus reflect the owner’s request and CRM context. They are editable assumptions, not independently verified commercial commitments. The showroom is a sales reference, not a portfolio of real clients. Kade, Crumb and Still are fictional. Demo booking actions never create reservations. A multi-page or commerce package still requires its agreed pages and integrations when sold to a real customer.

## Hosting

`.openai/hosting.json` identifies the private Sites project and points to `dist`. Preserve its project ID; do not create a duplicate Site. Publishing does not make the Site public. Set the final business details, enquiry destination, domain and sharing audience before customer launch. The same `dist/` output can be served by another static host if the owner requests it. No credentials or environment variables are required by the site itself.

## Asset credits

- Restaurant photo: [Glenov Brankovic / Unsplash](https://unsplash.com/photos/a-room-with-tables-and-chairs-e4B5AvA7Jqo).
- Bakery photo: [Conor Brown / Unsplash](https://unsplash.com/photos/a-bunch-of-croissants-that-are-on-a-table-sqkXyyj4WdE).
- Hotel photo: [Point3D Commercial Imaging / Unsplash](https://unsplash.com/photos/white-bed-linen-on-bed-oxeCZrodz78).

Downloaded under the standard [Unsplash License](https://unsplash.com/license). Images show stock scenes, not the fictional venues. DM Sans and Manrope are locally served under their included SIL Open Font License files.
