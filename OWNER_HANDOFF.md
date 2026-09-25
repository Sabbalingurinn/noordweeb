# NoordWeeb — owner details to finish

The landing page, live demos, estimate builder and reusable kits are implemented. The site is a private preview until the business details below are supplied. No invented email, phone, company number, review, address or registration claim has been added.

## Essential inputs

| Input | Current state | Where to use it |
| --- | --- | --- |
| Your public first name | Empty; Emil is known | `content/business.json` → `founders[0]`. Both names will appear in the team introduction once supplied. |
| Real enquiry email | Empty | `contactEmail`. This enables the “Open email” action after generating a brief. |
| Phone / WhatsApp, if wanted | Empty | `contactPhone`, `whatsappNumber`. Add visible links only if the owners want these contact routes. |
| Company details | Tæknistoð ehf., Iceland from the owner | Confirm exact legal spelling, registered address, registration number, VAT number/status and NoordWeeb’s trading-name status. Fill the matching fields and update the generated information pages. |
| Final domain | Empty | `websiteUrl`. Configure the actual domain and matching metadata when it is owned and ready. |
| Language / target audience | English; Amsterdam hospitality focus | Confirm English, Dutch, Icelandic, or a multilingual site. A `language` value alone does not translate copy: translate the HTML, data, demo renderer and metadata together if required. |
| Prices and delivery | Copied from the supplied CRM catalogue | Confirm the five package prices, fourteen extras, included scope, revision rounds and delivery estimates. Values are integer euro cents in `content/catalog.json`. |
| Payment schedule and handover | Not invented | Agree deposits/payment timing, deliverables/source rights, third-party licences, cancellation, corrections and any support obligations in the real quote and project terms. |
| Hosting arrangement | Separate provider cost | Decide whether clients own their accounts, whether setup is separately priced, and what launch help is included. There is no required annual care plan. |
| Enquiry handling | Local brief creation; nothing sent | Choose the real email destination. If direct form submission is desired later, choose and implement the delivery service, spam controls and appropriate privacy wording. Filling an email address enables an email draft, not a backend. |

## Ready-to-paste prompt for GPT-6 Luna

```text
Finish the real business information in this existing NoordWeeb website. Read
README.md, OWNER_HANDOFF.md and AGENTS.md first. Preserve the design, customer
showroom, package/extra logic, and the pay-once model. Do not create a new Site
or replace the current project. Use the owner-supplied values below; leave
missing facts explicitly unresolved rather than guessing.

Owner first name:
Emil’s preferred public name:
Enquiry email:
Phone / WhatsApp (optional):
Legal company name:
Registered address:
Company registration number:
VAT registration/status and confirmed treatment:
Trading-name registration status:
Domain:
Site language(s) and target market:
Confirmed prices and delivery estimates (or “keep current CRM catalogue”):
Payment schedule and handover terms:
Hosting/domain arrangement:
Approved privacy and project terms:

Update content/business.json and content/catalog.json as appropriate. The
founder introduction and email-draft action read from that config. Update
the privacy and working-together page source in scripts/build.mjs with the
confirmed legal/contact details and approved policies. Remove draft-preview
notices only when the missing business and policy details are actually
complete. If approved legal terms have not been supplied, report that gap.

Run npm run build and npm run check. Verify the public copy, correct totals,
email recipient, brief flow and mobile layout. Preserve the existing Site
ID and current audience; publish the update through the available Sites
workflow. Do not announce that enquiries are delivered unless an actual
delivery route has been implemented and tested. Summarize remaining inputs.
```

## Important implementation boundaries

- Quotes are estimates excluding applicable VAT. The Icelandic entity / international customer tax treatment was not assumed from the CRM’s fixed Dutch VAT percentage.
- No lead database, CRM access, email credentials or other private business records are copied into this site.
- Each sales demo is a single-page concept. It illustrates a design direction; do not claim that a sold five-page package is delivered by the demo alone.
- The three ZIP kits are portable files. Copy a kit outside `template-kits/` before adapting it for a customer; the project build regenerates that directory.
- External sharing, custom domain and enquiry delivery still depend on the real information and launch choices above.
