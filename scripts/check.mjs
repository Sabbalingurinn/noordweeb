import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { calculateQuote } from '../dist/quote.js';
import { renderTemplate } from './render-template.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const catalog=JSON.parse(readFileSync(resolve(root,'content/catalog.json'),'utf8'));
const templates=JSON.parse(readFileSync(resolve(root,'content/templates.json'),'utf8'));
const translations=JSON.parse(readFileSync(resolve(root,'content/templates.nl.json'),'utf8'));
assert.equal(calculateQuote(catalog,'one-page',[]).totalCents,95000);
assert.equal(calculateQuote(catalog,'small-site',['copy','booking-widget']).totalCents,205000);
assert.equal(calculateQuote(catalog,'one-page',['copy','menu','language','booking-widget']).totalCents,180000);
assert.equal(calculateQuote(catalog,'one-page',['copy','copy']).totalCents,120000,'Duplicate extras must be deduplicated');
assert.throws(()=>calculateQuote(catalog,'made-up',[]));
assert.throws(()=>calculateQuote(catalog,'webshop',[]),'Removed complex offers must not remain available');
assert.throws(()=>calculateQuote(catalog,'booking',[]));
assert.throws(()=>calculateQuote(catalog,'one-page',['made-up']));
assert.throws(()=>calculateQuote(catalog,'one-page',['reservations']));
assert.throws(()=>calculateQuote(catalog,'one-page',null));
for(const template of templates){
  assert(catalog.packages.some(item=>item.id===template.packageId),'Each demo must map to an available package');
  const malicious=structuredClone(template); malicious.business.name='<script>alert(1)</script>';
  assert(!renderTemplate(malicious).includes('<script>alert(1)</script>'),'Customer content must be escaped');
  const localized=renderTemplate({...malicious,translations:{nl:translations[template.id]}});
  assert(!localized.includes('<script>alert(1)</script>'),'Localization must keep customer content escaped');
  assert.throws(()=>renderTemplate({...template,demo:false}),'Do not silently launch with no contact route');
  const output=readFileSync(resolve(root,`dist/templates/${template.id}/index.html`),'utf8');
  assert(output.includes('Fictional demo'));
  assert(output.includes('<html lang="nl">') && output.includes('Fictieve demo'),'Demos must have a Dutch static default');
  assert(output.includes('data-language="en"'),'Every demo needs the English switch');
}
for (const page of ['index.html','privacy/index.html','project-terms/index.html','404.html']) {
  const output=readFileSync(resolve(root,'dist',page),'utf8');
  assert(output.includes('<html lang="nl">') && output.includes('data-language="en"'),`${page} needs a Dutch default and an English switch`);
}
const files=[];const walk=path=>{for(const entry of readdirSync(path,{withFileTypes:true})){const full=join(path,entry.name);entry.isDirectory()?walk(full):files.push(full)}};walk(resolve(root,'dist'));
let references=0;
for(const file of files.filter(file=>/\.(html|css|js)$/.test(file))){
  const source=readFileSync(file,'utf8');
  const refs=[...source.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(match=>match[1]);
  if(file.endsWith('.css')) refs.push(...[...source.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map(match=>match[1]));
  if(file.endsWith('.js')) refs.push(...[...source.matchAll(/from ['"](\.\.?\/[^'"]+)['"]/g)].map(match=>match[1]));
  for(const ref of refs){
    if(/^(https?:|mailto:|tel:|data:|#)/.test(ref)||ref.includes('${'))continue;
    const clean=ref.split(/[?#]/)[0];if(!clean)continue;
    let target=clean.startsWith('/')?resolve(root,'dist',clean.slice(1)):resolve(dirname(file),clean);
    if(clean.endsWith('/'))target=join(target,'index.html');
    assert(existsSync(target),`Broken local reference ${ref} in ${file}`);references++;
  }
}
console.log(`Passed quote totals, duplicate prevention, invalid inputs, template escaping and demo safeguards. Checked ${references} local references across ${files.length} files.`);
