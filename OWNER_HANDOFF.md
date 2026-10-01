# NoordWeeb — remaining owner information

The design and commercial offer are implemented: a minimal monochrome N symbol and wordmark, upright Manrope typography and a navy-and-blue homepage with previews of the work, five showroom demos with independent typography, layout, shapes and content presentation, two website sizes (€950 / €1,650) and four optional extras. Pricing has been decided under the owner's instruction; it does not require a return to the old CRM catalogue. A custom price request opens a prepared email addressed to `noordweeb@noordweeb.nl`; the visitor sends it from their email app.

The site remains a private preview. The owner supplied the enquiry email. The owner supplied both public founder names and chose the payment and project terms now shown on the site. No phone, registration number, VAT treatment or confirmed trading-name registration has been invented. The planned noordweeb.nl domain is not marked as owned or active; its mailbox must be tested after purchase.

| Input still needed | Where it belongs |
| --- | --- |
| Optional public phone / WhatsApp | Matching config fields; add visible contact links if wanted. |
| Confirmed legal company details | Tæknistoð ehf. is the owner-supplied name. Add registered address, company registration number, VAT status/number and trading-name status. |
| Purchase and verify noordweeb.nl | Once owned and connected, set `websiteUrl`, configure matching metadata, and test receipt from the published email address. |
| Public language | Amsterdam hospitality and similar independent businesses are the initial market. Confirm English, Dutch or bilingual; translation requires updating actual page content. |
| Production processor facts | The privacy page and retention policy are written. Confirm hosting, mail, database, backup expiry and any transfer terms before public launch; update the notice if services change. |

Hosting, domains and booking providers are separate client costs in client-owned accounts. Initial launch help is included. There is no maintenance subscription. The detailed offer is in `OFFER_STRATEGY.md`.

## Ready-to-paste prompt for GPT-6 Luna

```text
Fill in the real business information in this existing NoordWeeb website.
Read README.md, AGENTS.md, OFFER_STRATEGY.md and OWNER_HANDOFF.md. Preserve
the navy/blue design, minimal monochrome N symbol and wordmark, upright Manrope, homepage demo previews, five customer demos,
two packages (€950 one page / €1,650 up to five pages), four extras and the
pay-once model. Do not restore the old CRM catalogue or add complicated
services. Keep the existing Site identity and current audience.

Owner public names: Sævar Breki Snorrason and Emil Daniel Welling
Enquiry email: noordweeb@noordweeb.nl (owner supplied; keep unless changed)
Phone / WhatsApp (optional):
Confirmed legal company name:
Registered address:
Company registration number:
VAT registration/status and confirmed treatment:
Trading-name status:
Planned domain: noordweeb.nl (purchase and verify before using as live URL)
Language(s):
Customer market: Amsterdam restaurants and other independent businesses
Project terms: content/project-terms.html
Privacy policy: content/privacy.html

Use only the supplied facts. Update content/business.json and the relevant
page source in dist/index.html and content/*.html, with scripts/build.mjs generating information pages. Leave absent facts unresolved. Remove
private-preview/draft notices only when the information is complete. The
email field enables a mailto draft, not automatic enquiry delivery; do not
claim messages are delivered by this website.

Run npm run build and npm run check. Verify names, the actual email draft
recipient, price-request flow, mobile layout and information pages. Publish to the
existing Site while preserving its audience. Summarize remaining gaps.
```

Each portable kit is a one-page concept; build any extra pages actually sold. Copy kits outside `template-kits/` before adapting them because the build regenerates that directory. No CRM records, credentials or lead data are in the site.
