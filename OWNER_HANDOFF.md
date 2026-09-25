# NoordWeeb — remaining owner information

The new design and commercial offer are implemented: a runic n wordmark, Icelandic coastal imagery, two website sizes (€950 / €1,650) and four optional extras. Pricing has been decided under the owner's instruction; it does not require a return to the old CRM catalogue.

The site remains a private preview. No contact address, phone, registration number, review, payment schedule or confirmed trading-name registration has been invented.

| Input still needed | Where it belongs |
| --- | --- |
| Your public first name; Emil's preferred public name | `content/business.json` → `founders`. The two names appear automatically when both are supplied. |
| Real enquiry email | `contactEmail`. Enables an “Open email” draft after brief generation. |
| Optional public phone / WhatsApp | Matching config fields; add visible contact links if wanted. |
| Confirmed legal company details | Tæknistoð ehf. is the owner-supplied name. Add registered address, company registration number, VAT status/number and trading-name status. |
| Final owned domain | `websiteUrl`; then configure the actual domain and matching metadata. |
| Language and primary customer market | English/EUR is currently used; translating requires updating actual page content, not just a config value. |
| Agreed payment and project terms | Payment schedule, cancellation, correction obligations, handover and usage rights. |
| Approved enquiry/privacy policy | Current page describes local brief generation. Update policies for any actual receiving email or future form service. |

Hosting, domains and booking providers are separate client costs in client-owned accounts. Initial launch help is included. There is no maintenance subscription. The detailed offer is in `OFFER_STRATEGY.md`.

## Ready-to-paste prompt for GPT-6 Luna

```text
Fill in the real business information in this existing NoordWeeb website.
Read README.md, AGENTS.md, OFFER_STRATEGY.md and OWNER_HANDOFF.md. Preserve
the new paper/ink/rust design, runic n, Icelandic coast, three customer demos,
two packages (€950 one page / €1,650 up to five pages), four extras and the
pay-once model. Do not restore the old CRM catalogue or add complicated
services. Keep the existing Site identity and current audience.

Owner's public first name:
Emil's public name:
Enquiry email:
Phone / WhatsApp (optional):
Confirmed legal company name:
Registered address:
Company registration number:
VAT registration/status and confirmed treatment:
Trading-name status:
Domain:
Language(s) and customer market:
Payment and project terms:
Approved privacy policy:

Use only the supplied facts. Update content/business.json and the relevant
page source in scripts/build.mjs. Leave absent facts unresolved. Remove
private-preview/draft notices only when the information is complete. The
email field enables a mailto draft, not automatic enquiry delivery; do not
claim messages are delivered by this website.

Run npm run build and npm run check. Verify names, the actual email draft
recipient, brief flow, mobile layout and information pages. Publish to the
existing Site while preserving its audience. Summarize remaining gaps.
```

Each portable kit is a one-page concept; build any extra pages actually sold. Copy kits outside `template-kits/` before adapting them because the build regenerates that directory. No CRM records, credentials or lead data are in the site.
