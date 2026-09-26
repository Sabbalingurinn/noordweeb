# Redesign verification — 25 September 2026

Story: a visitor explores a design, selects a simple website package and optional extras, then prepares a matching local brief.

- Build and automated checks pass: exact package/extra totals, deduplication, rejection of obsolete/invalid offers, content escaping, production contact safeguards, and 64 local references across 43 published files.
- Browser: home page and local assets load; no initial console errors. Reviewed the new typography, runic wordmark and coast image on desktop and phone. No horizontal page overflow at 360, 390, 768, 1280 or 1440 CSS pixels.
- Package selection: small site + copy + widget displays €2,050. One page + all four extras displays €1,800. Each demo starts at €950.
- Mobile navigation opens and closes correctly after following a link.
- Brief: required fields validate; generated text includes selected design, exact prices and scope limits. Copy action puts the expected €1,800 brief on the browser clipboard. Download action requests the text file; local file saving is controlled by the browser and was not independently inspected. Escape closes the dialog and returns focus to its trigger.
- WebMCP: small site + language returns €2,000 and updates visible controls. Removed webshop selection is rejected without changing the visible quote.
- Demo: Kade action clearly says no table is booked. Choosing that design returns to the estimator with Kade and €950 selected. Shared refreshed demo toolbar fits a 360px viewport.
- Project information page: new prices, included work, exclusions and client-owned provider accounts render correctly at 360px; no horizontal overflow.
- Brief generation runs only in the browser. There is no backend/API/database boundary or automatic email delivery to test. A real contact email and confirmed launch details remain owner inputs.

One browser navigation temporarily stalled during inspection, then loaded successfully. Local server requests showed successful asset responses. The issue did not reproduce on the demo's return navigation.

## Logo and accent refresh — 26 September 2026

- Replaced the previous rune favicon and wordmark with an original coastal N mark and a full lowercase serif wordmark. The mark appears consistently on the home and generated information pages.
- Changed the primary accent to deep fjord blue while keeping the warm paper, muted sage and pale yellow surfaces.
- `npm run build` and `npm run check` pass. Reviewed the updated home page at desktop and 365px phone width; the logo fits beside the mobile menu without horizontal overflow.

## Welcoming photography, custom requests and new demos — 26 September 2026

- Replaced the stark coast hero with a sunlit café table photograph, credited to Tanya Barrow. Added two fictional one-page demos: Stem, a florist with a soft editorial design, and Rove, a bike workshop with a bold industrial design. Both have locally hosted photographs and standalone template kits.
- Kept the standard package estimate separate from custom work. The new request box prepares a scoped message; its email link targets the owner-supplied `noordweeb@noordweeb.nl`. The visitor must review and send it in their email app. A custom price is not calculated by the site.
- Reviewed the homepage and showroom on desktop and at 768px and 390px, plus the Stem and Rove demos at 390px. Corrected the Rove hero image crop and showroom card lettering so the workshop scene and headline remain visible. At 390px, the custom request form and result dialog fit the viewport without horizontal overflow.
- Entered a sample request in the browser and verified that the result contains the visitor's details and requested work, that it does not state a custom price, and that the mailto link contains the correct recipient, subject and body. No email was sent during testing.
- `npm run build`, `npm run check` and `git diff --check` pass. Both new ZIP archives pass `unzip -t`. No browser console errors appeared on the homepage.
