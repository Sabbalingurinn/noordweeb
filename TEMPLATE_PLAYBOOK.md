# The NoordWeeb template workflow

Show the customer a working design, agree the website package and extras, then adapt a known implementation to their actual business.

| Design | Good fit | Customer preview | AI kit |
| --- | --- | --- | --- |
| Kade | Restaurants, bistros, wine bars | `/templates/kade/` | `template-kits/noordweeb-kade.zip` |
| Crumb | Cafés, bakeries, small neighbourhood businesses | `/templates/crumb/` | `template-kits/noordweeb-crumb.zip` |
| Still | Boutique stays, guesthouses, small hotels | `/templates/still/` | `template-kits/noordweeb-still.zip` |

The preview has real navigation, a menu/room section, a story, practical information and a selection link back to the configurator. It is labelled as a fictional demo. In-person sales can use the local preview. Remote customers need an appropriately shared/public deployment; the initial Sites preview is owner-private.

## 1. During a sales conversation

Open a demo. Show desktop and mobile layouts. Explain that it is a starting point and that branding, copy, photography and practical details will be theirs. Select “Choose this design” to carry the design into the website configurator. Agree the base package and optional extras. Generate a brief to keep the choices.

Do not describe the fictional venues as past customers. The stock photographs are visual references, not photos of their business. Scope, time, tax, provider costs and payment schedule are confirmed in a written quote.

## 2. Collect the customer content

Get the business name, approved logo/brand colours, desired language, audience, real address and opening hours, email/phone, approved copy, images and permission to use them, menu/products/room information, and an existing booking provider if included. Ask who owns the domain and hosting accounts. Identify any extra pages, integrations or content work before production.

## 3. Hand a kit to another AI

Unzip the selected kit into a new customer folder. Give the AI `BUILD_BRIEF.md` plus the customer’s answers. The kit includes the actual responsive HTML and CSS, local fonts/licences, photo/credits, editable `business.json`, a renderer, and a dependency-free generation command. It can reproduce the preview from the supplied files instead of guessing from a screenshot.

```text
Adapt this NoordWeeb template for the customer described below. Read
BUILD_BRIEF.md and CREDITS.md. Keep the established layout and mobile
behaviour. Edit business.json, replace authorised imagery, and run
node generate.mjs. Add only the pages and integrations in the agreed scope.
Preserve demo mode until real content and working contact routes are ready.
Verify the resulting website in a browser. Never invent business facts,
reviews or working integrations. Report unresolved inputs before handover.

Customer facts:
Agreed website package:
Agreed extras:
Approved assets and copy:
Brand changes:
Booking/contact destination:
Hosting/domain arrangement:
```

## 4. Build what was actually sold

Each kit starts as one page. The One-page package can use that structure. A Hospitality, Business, Booking or Shop agreement may require additional pages, forms, real provider connections or commerce that the visual kit alone does not implement. Complete those before delivery. Menu entry and copywriting must follow the agreed content allowances; extra pages and language work are separately priced.

For a production adaptation, set `demo` to `false` after replacing fictional details. The generator requires a real address and a contact route. Use an approved HTTPS booking URL, or show a genuine contact route. Remove demo/noindex treatment for the real business as appropriate, add approved legal information and ensure any third-party service is actually configured.

## 5. Review and hand over

Check the complete customer journey at 360px, 390px, 768px and 1440px. Check keyboard operation, headings, focus, image descriptions and mobile readability. Exercise every contact/booking action and any agreed form/payment integration. Check the approved content, opening hours, location, prices and metadata. Deliver the agreed files, accounts, documentation and scope of support.

Future work starts with a new request and an agreed quote. No ongoing content changes or care subscription are silently included.
