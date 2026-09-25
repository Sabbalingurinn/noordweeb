# The NoordWeeb template workflow

Show a working design, choose one page or up to five pages, agree any of the four extras, and adapt the known implementation to the customer's real business.

| Design | Good fit | Preview | Portable AI kit |
| --- | --- | --- | --- |
| Kade | Restaurants, bistros, wine bars | `/templates/kade/` | `template-kits/noordweeb-kade.zip` |
| Crumb | Cafés, bakeries, neighbourhood businesses | `/templates/crumb/` | `template-kits/noordweeb-crumb.zip` |
| Still | Guesthouses, boutique stays, small hotels | `/templates/still/` | `template-kits/noordweeb-still.zip` |

All previews are fictional single-page designs, starting at €950. They have working section navigation, story, menu/rooms and practical information. Booking buttons explain demo mode; they never make reservations. The existing deployed preview is owner-private; remote customer access needs an owner-approved audience change.

## Sell a small, specific result

Open a demo on desktop and phone. Explain what changes: business name, branding, text, photographs, menu/rooms and practical details. Choose the design to carry it into the estimator. One page costs €950 with up to six sections. Up to five pages costs €1,650. Both include two grouped revision rounds, search basics, basic contact/map/booking links, a menu PDF or up to six short entries, launch help and files. State the actual page list in the quote.

Offer only relevant extras: copy shaping €250 (up to 1,000 words and one edit round), longer menu entry €100 (up to 30 supplied items), one mirrored language €350 (customer translations), or an existing supported booking widget €150. Recurring provider costs stay separate and in customer-owned accounts. All figures exclude applicable VAT.

Decline shops, accounts, custom booking systems, apps, CMS dashboards and custom integrations. A request that requires one of those does not fit this offer. Future content updates are separately quoted.

## Collect the customer content

Get approved name/logo/colours, audience/language, address/hours, email/phone, final copy, authorised photography, menu/room/service information, and an existing booking link if relevant. Confirm client-owned domain and hosting access. Identify the exact pages and extras before production. Do not invent missing facts, reviews or registrations.

## Give another AI the actual implementation

Unzip the kit into a separate customer project. It includes HTML/CSS, editable business.json, a renderer, a local stock image, local fonts/licences, credits and BUILD_BRIEF.md. This makes the design reproducible without guessing from screenshots.

```text
Adapt this NoordWeeb template for the customer below. Read BUILD_BRIEF.md
and CREDITS.md. Preserve the established layout and mobile behaviour. Edit
business.json, replace authorised imagery and run node generate.mjs. Add
only the actual pages and four permitted extras included in the quote.
Stay within the static-site offer: no shops, accounts, CMS, custom booking
or custom integrations. Keep demo mode until real content and contact
routes are ready. Verify the site in a browser. Do not invent facts,
reviews or working integrations. Report missing inputs before handover.

Customer facts:
Package and exact page/section list:
Selected extras:
Approved assets and copy:
Brand changes:
Booking/contact destination:
Client-owned hosting/domain arrangement:
```

## Build and verify what was sold

Each kit starts as one page. A five-page agreement requires the actual additional pages, consistent navigation and page metadata. The language extra mirrors the agreed page set. The supplied generator handles the single-page reference; additional pages, translations or widgets must be implemented and tested by the adapting model when sold.

Set `demo: false` only after replacing fictional details. The renderer requires a real address and valid email or phone. A booking URL must use HTTPS. Simple links are included; embedding a supported widget is the €150 extra. Do not charge for a widget when only a link is provided.

Check 360px, 390px, 768px and 1440px widths, keyboard operation, focus, readable contrast, image descriptions, contact routes, booking links/widget, page navigation, metadata and approved legal information. Remove demo messages and any fictional claims before launch. Deliver the agreed files and handover notes. Assess faults under the original agreement; new work gets an agreed quote.
