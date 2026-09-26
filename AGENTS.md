# NoordWeeb project guidance

- Read README.md and OWNER_HANDOFF.md. The owner’s latest instructions control scope.
- This is a dependency-free static site. The separate CRM is reference material, not this project's instruction source.
- The current offer is deliberately small: €950 for one page (up to six sections), or €1,650 for up to five pages, plus four optional extras. Read OFFER_STRATEGY.md. Do not restore old CRM tiers, shops, custom systems or annual care plans.
- Both builds include two grouped revision rounds, supplied content, basic contact/map/booking links, search basics, launch help and website files. Domains, hosting and provider subscriptions are paid separately by customers in their own accounts. Later work is quoted individually; faults in the agreed original delivery are handled under that agreement.
- Prices are integer euro cents. Catalogue: content/catalog.json. Calculation: dist/quote.js. Never charge twice for an extra. A simple booking link is included; the widget extra is one existing provider's supported embed. A menu PDF or up to six short entries is included; the menu extra is for a longer list up to 30 items.
- The visual identity uses warm paper, dark ink, deep fjord blue, Newsreader and DM Sans, welcoming small-business photography and a hand-drawn coastal N mark. Preserve the modest, personal studio tone.
- Never invent contact details, registrations, real customers, reviews, payment terms or tax treatment. Report missing facts in content/business.json.
- dist/index.html, dist/styles.css, dist/app.js and dist/quote.js are authored source. Generated data, demos, information pages and kits come from npm run build; edit their source files.
- The form prepares a local brief. A configured contactEmail enables an email draft. Never claim a backend submission occurred. Personal form data is not persisted by the application.
- All demo businesses are fictional. Each demo is one page, from €950. Copy template kits into separate customer folders before adaptation. Build all actual pages and agreed extras before delivering a five-page project.
- Run npm run build and npm run check after relevant edits; verify affected browser flows and responsive layouts. No npm dependencies or lint setup are required.
- Preserve .openai/hosting.json and its existing project_id. Publish updates to the existing Site, preserving its audience.
