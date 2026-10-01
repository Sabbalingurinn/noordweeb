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

## Editorial opening and demo differentiation — 26 September 2026

- Replaced the former headline-left/photo-right opening with a full-width editorial headline, framed café photograph and short note from the studio. Removed the redundant strip below the hero. The price and showroom links remain visible in the new layout.
- Reworked Kade as a dinner invitation over its restaurant photograph and a dark story section. Reworked Crumb as a type-led bakery poster with a wide photograph and a shelf-like menu. Still retains its quieter photographic layout. The showroom preview for Kade reflects its new design.
- Reviewed the main opening at desktop, 768px, 390px and 360px; there was no horizontal overflow at 768px or 360px. Reviewed Kade and Crumb at desktop, tablet and phone widths, and Still at phone width. Updated the phone headline break so “walking in.” stays together.


## Independent demo designs and personal studio page — 26 September 2026

- Replaced the shared demo page scaffold with five independent compositions in `scripts/render-template.mjs`. Only the showroom toolbar, customer-contact safeguards, and accessible fictional-demo dialog are shared. Each layout, plus local Newsreader fonts and licences, is regenerated into the standalone kits and ZIP archives.
- The main page now introduces the two-person studio directly, presents the existing café photograph as a keepsake, and shows an asymmetric portfolio with design-specific previews and short notes. Pricing, package scope, the owner email, and enquiry behaviour are unchanged.
- Reviewed full desktop and phone screenshots of all five demos. Reviewed the homepage opening and complete showroom with all images loaded. Adjusted word spacing in the workshop headings after visual review.
- All six routes have no horizontal overflow at 360, 390, 768 and 1440 CSS pixels. No outside-viewport headings, paragraphs, navigation, buttons or figures were found at those widths. No page errors occurred; the main page's six photographs loaded successfully after scrolling.
- Verified mobile navigation opens and closes on selection. A showroom selection carries into the estimate. A small site with copy help and the booking widget totals €2,050; the prepared brief includes the selected design and this total. The email draft points to `noordweeb@noordweeb.nl`. No message was sent.
- Verified the custom price request remains separate from the standard estimate. The brief closes with Escape and restores focus. Every demo action opens its fictional-business explanation, restores focus on Escape, and returns its selected design to a €950 starting estimate. Still's additional room details expand correctly.
- `npm run build` and `npm run check` pass, including pricing, escaping, contact safeguards, and 97 local references across 74 published files. Browser inspection artifacts are kept under ignored `output/playwright/`.

## Rendering repairs — 1 October 2026

- Restored a light hero heading on the navy background and reserved responsive space for the absolutely positioned desktop/mobile previews and their caption.
- Replaced five missing `*-preview.jpg` references with the existing local `*-showcase.webp` assets. Screenshot cards now keep their natural proportions below a styled concept toolbar, without old decorative clipping.
- Verified the homepage at 320px, 390px, 768px and 1440px without horizontal overflow; visually reviewed the hero and mobile showroom. Choosing and clearing Kade updates the estimator correctly. No console errors or warnings appeared during the checked flow.
- `npm run build`, `npm run check` and `git diff --check` pass. Opened the local preview in Codex for owner review.

## Owner review edits — 1 October 2026

- Added a geometric N logo and matching favicon; unified studio and information-page typography under upright Manrope. Navy surfaces and blue accents replace the studio’s green and peach colors. The footer now has a direct email link.
- Corrected Emil Daniel Welling in business data, visible text, the privacy source and owner handoff. Versioned browser data imports avoid retaining the old spelling from cache.
- Removed the selected project-brief section, process-step grid and FAQ. Repointed project and estimate links to the remaining price-request form and removed JavaScript that depended on the deleted form.
- Verified no broken hash links, no italic studio text, and no horizontal overflow at 320px, 390px, 768px and 1384px. The mobile menu closes after navigation. The remaining form prepares the request dialog and correct email recipient; no email was sent. No console errors or warnings were recorded.
- Build, static checks, JavaScript syntax and whitespace checks pass. The updated local preview remains open for review.

## Minimal logo and demo navigation — 1 October 2026

- Reduced the logo to a bare monochrome N and quieter wordmark, using Attio’s simple symbol/wordmark composition as a visual reference. Updated header, footer, generated information pages and light/dark favicon.
- The existing in-app review tabs timed out during browser control. The local demo server returned HTTP 200 in about 3 ms and Kade opened normally in a fresh tab. Changed hero and gallery demo links to open separate tabs, with accessible labels and `noopener noreferrer`, to keep the showroom available and avoid navigating the stalled review tab.
- Clicked all five actual gallery links. Every demo reached `document.readyState === 'complete'` with a loaded hero image in roughly 280–335 ms during the checks. Left the refreshed homepage and Kade demo open for the owner.
- Build, existing static checks, JavaScript syntax and whitespace checks pass. No Kade console errors or warnings appeared.

## Business-site design references — 1 October 2026

- Reviewed Bar Parry, Bread Ahead, De Durgerdam, Petalon and tokyobike London as matching references for Kade, Crumb, Still, Stem and Rove. Rebuilt all five layouts in the shared renderer and theme stylesheet while retaining the fictional businesses, existing local stock photographs and demo action boundaries.
- Recorded the reference URLs, review date and observed design patterns in `content/templates.json`, README and every generated kit's replication brief. Regenerated standalone kits and ZIP archives.
- Replaced all five showroom screenshots and the mobile Crumb hero preview with captures of the rebuilt pages. Updated descriptions, dimensions and cache versions. Corrected word spacing when a multiline headline becomes a single line.
- Checked every demo at 320px, 390px, 768px and 1440px with no horizontal overflow or missing section anchors. Reviewed complete phone screenshots and desktop arrivals. All five action dialogs open, close and restore focus; Still's navigation expands, follows its room link and closes correctly. No console warnings or errors appeared in the checked flows.
- Every demo's choose link returns its template query to the €950 estimator. Confirmed Rove's selected design in the visible estimate. All five refreshed gallery previews load. Left a fresh showroom tab and Kade demo open at the normal browser size for owner feedback.
- `npm run build`, `npm run check`, JavaScript syntax and `git diff --check` pass. These changes are local; no hosted publication was performed in this task.

## Independent layouts, typography and content presentation — 1 October 2026

- Rebuilt the complete demo compositions after the owner rejected recurring cards, shapes and fonts. Kade uses a permanent rail, Georgia type and a centered à-la-carte menu; Crumb uses Dela Gothic One, a yellow/red bakery poster and one continuous receipt; Still uses Newsreader, an asymmetric journal spread and a room selector; Stem uses Caveat, a taped photograph, original flower drawings and illustrated collection rows; Rove uses Anton and Courier, a dark workshop board and native service accordions. Repeated product-card grids and alternating photo/copy sections were removed.
- Replaced the shared rounded showroom screenshot frame with independent portfolio spreads. Regenerated all previews, including the mobile bakery preview, and refreshed cache URLs after capture so previously loaded pages cannot retain older previews. Every preview was confirmed loaded in the refreshed showroom.
- Added licensed local Dela Gothic One, Caveat and Anton webfonts from Google Fonts. Used optimized Latin WOFF2 files (approximately 14 KB, 75 KB and 19 KB) rather than the original large TTF downloads. Updated kit assets, licences, replication briefs and current design directions; the earlier business-site references are retained as historical background.
- Reviewed desktop arrivals and full phone pages for all five demos. Checked 320px, 390px, 768px and 1440px with no horizontal overflow or broken section anchors. Every page loads its intended heading family. The main showroom and estimate also fit 320px.
- Verified Still's room selection by click and arrow keys, its navigation menu, and Rove's native service expansion. All five action dialogs close with Escape and restore focus. Every design's choose link returns the correct name to the €950 estimate. Showroom selection and removal work. No console errors or warnings appeared in the checked flows.
- Rebuilt the five portable kits and archives. Build, source syntax, local-reference checks and whitespace checks pass. Left the refreshed showroom visible at the normal browser size for owner feedback. Changes remain local.


## Dutch default and English toggle — 1 October 2026

- Translated the homepage, catalogue, five demos, privacy page, project terms and 404 page. Static HTML defaults to Dutch; visible NL/EN buttons also translate metadata, navigation labels, form placeholders, price formatting and prepared email requests. Refreshed the Dutch showroom images from the actual demos; English retains the existing English previews.
- Tested a fresh English-browser visit: the site still defaults to Dutch. English is remembered on a later visit. Only the language preference enters browser storage. With storage disabled, the toggle and language-bearing links still work. Dutch remains readable without JavaScript.
- Selected Still, the five-page package and two extras, entered a request, and switched in both directions. Design, package, extras, all entered text and the €2,250 total are preserved. Prepared Dutch and English requests have the correct localized subject and recipient noordweeb@noordweeb.nl. No email was sent.
- Verified Still’s selected room, Rove’s expanded service and the open mobile menu survive language switches. The menu’s accessibility label changes to the selected language.
- Checked homepage and all demos at 360px, 390px, 768px and 1440px in both languages, with no horizontal overflow. Checked all information pages in both languages at 360px, 768px and 1440px. Visually reviewed Dutch desktop and mobile arrivals and the English mobile homepage. No page errors occurred during the main flow.
- Build, required checks, localized customer-content escaping and local-reference checks pass. The Kade portable kit regenerates successfully with its copied localization helpers. Screenshot evidence is in ignored output/playwright/.
