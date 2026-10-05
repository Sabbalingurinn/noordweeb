# Stem template kit

Customer-showable, responsive florists & makers concept. All business content is fictional until replaced.

Preview: run `python3 -m http.server 4190` in this folder, then open http://127.0.0.1:4190.

Adapt: edit `business.json`, then run `node generate.mjs`. Give another AI this folder and `BUILD_BRIEF.md`. No paid dependencies, package installation or framework required.

`index.html`, `styles.css`, `hero.jpg`, the font files and their licences are the deployable customer files. language.js powers the NL/EN switch and must also be published. The renderer uses i18n.mjs and template-copy.mjs. Keep English business content and translations.nl.business in sync when adapting both languages. Source files and build briefs do not need to be published. The draft showroom links point back to the noordclick site when mounted there; set `demo: false` after replacing fictional content for an independent customer launch.
