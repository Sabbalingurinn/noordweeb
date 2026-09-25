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
