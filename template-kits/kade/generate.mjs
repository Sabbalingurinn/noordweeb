import { readFileSync, writeFileSync } from 'node:fs';
import { renderTemplate } from './render-template.mjs';
const config = JSON.parse(readFileSync(new URL('./business.json', import.meta.url), 'utf8'));
writeFileSync(new URL('./index.html', import.meta.url), renderTemplate(config));
console.log('Generated index.html from business.json');
