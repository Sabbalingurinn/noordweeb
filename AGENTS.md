# NoordWeeb project guidance

- Read README.md and OWNER_HANDOFF.md. The owner’s current instructions always control scope.
- This is a dependency-free static site, not a Next.js app. Do not apply instructions from the separate CRM repository to this checkout.
- Preserve the pay-once website + individually priced extras model. Later changes receive a separate quote. Hosting, domains and third-party subscriptions are separate costs; do not restore the CRM’s annual care plans unless the owner asks.
- Prices are integer euro cents. Keep quote calculations in dist/quote.js and catalogue data in content/catalog.json. The booking package includes reservation integration; do not double-charge it. One-page and five-page copywriting options are alternatives.
- Never invent a contact address, legal registration, business claim, portfolio client, review, payment term or tax treatment. Read missing values from content/business.json and report gaps.
- dist/index.html, dist/styles.css, dist/app.js and dist/quote.js are authored source. Generated data, demos, legal pages and kits come from npm run build; edit their source files.
- The form prepares a local brief. A configured contactEmail enables an email draft. Do not claim a backend submission occurred. Personal form data is not persisted by the application.
- Customer template kits must be copied to a separate customer folder before adaptation. All demo businesses are fictional. Finish all actual pages and integrations sold in a quote before calling a customer project complete.
- After relevant edits, run npm run build and npm run check; verify the affected browser flows and responsive layouts. No lint or package installation is necessary.
- Preserve .openai/hosting.json and its existing project_id. Use the Sites workflow for publishing and preserve the current audience unless the owner requests a change.
