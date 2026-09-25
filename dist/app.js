import { business, catalog, templates } from './data.js';
import { calculateQuote, formatMoney as money } from './quote.js';

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const menu = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !open;
});
mobileNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) { mobileNav.hidden = true; menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
});
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#hero-starting-price').textContent = money(catalog.packages.find(item => item.id === 'one-page').price);
document.querySelectorAll('[data-company-line]').forEach(element => { element.textContent = `A project of ${business.legalName} · ${business.country}`; });
const founders = business.founders.filter(name => typeof name === 'string' && name.trim()).map(name => name.trim());
if (founders.length === 2) {
  document.querySelector('#founder-intro').textContent = `We’re ${founders.join(' and ')}. Two friends who like good design, clear conversations, and knowing exactly what we’re paying for. We think you probably do too.`;
  document.querySelector('#founder-signature').textContent = founders.join(' & ');
}

document.querySelector('#showroom-grid').innerHTML = templates.map((template, index) => {
  const base = catalog.packages.find(item => item.id === template.packageId);
  return `<article class="template-card"><a class="template-preview ${template.id}-preview" href="/templates/${template.id}/" aria-label="View the ${template.name} ${template.type.toLowerCase()} demo"><div class="card-preview-content" aria-hidden="true"><div class="card-preview-nav"><span>${escapeHtml(template.business.name)}</span><span>${template.id === 'still' ? 'ROOMS & STORIES' : template.id === 'crumb' ? 'COFFEE. BREAD. GOOD COMPANY.' : 'OUR TABLE · OUR STORY'}</span></div><div class="card-preview-hero"><img src="/assets/${template.id}.jpg" alt="" loading="lazy" width="1400" height="933"><div><span>${escapeHtml(template.tag)}</span><p>${template.business.headline}</p><span class="card-preview-cta">${template.id === 'still' ? 'Find your room' : template.id === 'crumb' ? 'Come on in' : 'Find your seat'} ↗</span></div></div></div><span class="preview-open">Explore demo <span aria-hidden="true">↗</span></span></a><div class="template-title"><h3>${template.name}<span class="model-index"> / 0${index + 1}</span></h3><span>${template.type}</span></div><p>${template.description}</p><div class="template-features">${template.features.map(feature => `<span>${feature}</span>`).join('')}</div><div class="template-bottom"><div><span>BUILD FROM</span><strong>${money(base.price)} <small>one time</small></strong></div><button class="choose-template" data-template="${template.id}" aria-label="Choose the ${template.name} design">Make it yours <span aria-hidden="true">↗</span></button></div></article>`;
}).join('');

const packageOptions = document.querySelector('#package-options');
packageOptions.innerHTML = catalog.packages.map(item => `<label class="package-option"><input type="radio" name="package" value="${item.id}"><span><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.scope)}</span></span><b>${money(item.price)}</b></label>`).join('');
const params = new URLSearchParams(location.search);
let chosenTemplate = templates.find(item => item.id === params.get('template')) || null;
let selectedPackage = chosenTemplate?.packageId || (catalog.packages.some(item => item.id === params.get('package')) ? params.get('package') : 'one-page');
let selectedExtras = [];
let currentQuote;
let briefText = '';
let briefTrigger;
document.querySelector('#addon-groups').innerHTML = catalog.addons.map(item => `<label class="addon-item"><input type="checkbox" name="addon" value="${item.id}"><span><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.description)}</span></span><span class="addon-price">+${money(item.price)}</span></label>`).join('');

function updateQuote() {
  currentQuote = calculateQuote(catalog, selectedPackage, selectedExtras);
  selectedExtras = currentQuote.addonIds;
  packageOptions.querySelectorAll('input').forEach(input => { input.checked = input.value === selectedPackage; });
  const { base, addons, totalCents } = currentQuote;
  document.querySelector('#package-detail').innerHTML = `<p>${base.description}</p><div class="scope-tags"><span>${base.scope}</span><span>Typical build: ${base.delivery}*</span></div><ul>${base.includes.map(item => `<li><span aria-hidden="true">✓</span>${item}</li>`).join('')}</ul><p class="delivery-note">*An estimate once content is ready. Your quote confirms timing.</p>`;
  document.querySelector('#quote-name').textContent = base.name;
  document.querySelector('#quote-scope').textContent = base.scope;
  document.querySelector('#quote-lines').innerHTML = `<div><span>Website build</span><strong>${money(base.price)}</strong></div>${addons.map(item => `<div><span>${item.name}</span><strong>${money(item.price)}</strong></div>`).join('')}${addons.length === 0 ? '<p>No extras selected. Keep it simple, or add a little more.</p>' : ''}`;
  document.querySelector('#quote-total').textContent = money(totalCents);
  const templateNote = document.querySelector('#chosen-template');
  templateNote.hidden = !chosenTemplate;
  templateNote.innerHTML = chosenTemplate ? `Design direction: <strong>${chosenTemplate.name}</strong><button type="button" id="clear-template" aria-label="Remove ${chosenTemplate.name} design selection">×</button>` : '';
  document.querySelector('#clear-template')?.addEventListener('click', () => { chosenTemplate = null; updateQuote(); });
  document.querySelectorAll('input[name="addon"]').forEach(input => {
    input.checked = selectedExtras.includes(input.value);
  });
}

packageOptions.addEventListener('change', event => {
  if (event.target.name !== 'package') return;
  selectedPackage = event.target.value;
  updateQuote();
});
document.querySelector('#addon-groups').addEventListener('change', event => {
  if (event.target.name !== 'addon') return;
  const { value, checked } = event.target;
  selectedExtras = selectedExtras.filter(id => id !== value);
  if (checked) selectedExtras.push(value);
  updateQuote();
});
document.querySelectorAll('[data-template]').forEach(button => button.addEventListener('click', () => {
  chosenTemplate = templates.find(item => item.id === button.dataset.template);
  selectedPackage = chosenTemplate.packageId;
  updateQuote();
  document.querySelector('#configure').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  packageOptions.querySelector('input:checked').focus({ preventScroll: true });
}));
updateQuote();

const dialog = document.querySelector('#brief-dialog');
const emailConfigured = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.contactEmail);
if (emailConfigured) document.querySelector('#brief-mode').textContent = 'Create your brief, then open it in your email app to send to ' + business.contactEmail + '. Nothing is sent automatically.';
document.querySelector('#brief-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const data = new FormData(event.currentTarget);
  const { base, addons, totalCents } = currentQuote;
  briefText = ['NOORDWEEB — PROJECT BRIEF', new Date().toISOString().slice(0,10), '', `Name: ${data.get('name').trim()}`, `Business: ${data.get('business').trim()}`, `Email: ${data.get('email').trim()}`, '', `Design direction: ${chosenTemplate?.name || 'Let’s decide together'}`, `Website: ${base.name} (${base.scope}) — ${money(base.price)}`, ...addons.map(item => `Extra: ${item.name} — ${money(item.price)}\n  ${item.description}`), '', `ESTIMATED ONE-TIME BUILD: ${money(totalCents)}`, 'Excluding applicable VAT. Final scope, taxes, delivery and payment schedule to be agreed in a written quote.', 'Includes two grouped revision rounds, launch help and website files. Client supplies approved content unless the relevant extra is selected.', 'Hosting, domain and third-party subscriptions are separate, in your own accounts. No maintenance subscription required. Later changes are quoted separately.', 'Simple business websites only: no shop, customer accounts, custom booking system, CMS or custom integrations.', '', 'ABOUT THE PROJECT', data.get('message').trim() || 'To discuss.', '', 'This brief is not an order and has not been submitted to NoordWeeb.'].join('\n');
  document.querySelector('#brief-output').textContent = briefText;
  document.querySelector('#copy-status').textContent = '';
  const emailLink = document.querySelector('#email-brief');
  emailLink.hidden = !emailConfigured;
  if (emailConfigured) {
    emailLink.href = `mailto:${business.contactEmail}?subject=${encodeURIComponent('Website brief — ' + data.get('business'))}&body=${encodeURIComponent(briefText)}`;
    document.querySelector('#brief-result-note').textContent = 'Download or copy your brief, or open your email app to send it to ' + business.contactEmail + '. Nothing has been sent yet.';
  }
  briefTrigger = document.activeElement;
  dialog.showModal();
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => briefTrigger?.focus());
document.querySelector('#download-brief').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([briefText], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'noordweeb-project-brief.txt'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#copy-status').textContent = 'Download requested. If your browser blocks it, use Copy brief.';
});
document.querySelector('#copy-brief').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(briefText); document.querySelector('#copy-status').textContent = 'Brief copied. Ready to paste wherever you need it.'; }
  catch { const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(document.querySelector('#brief-output')); selection.removeAllRanges(); selection.addRange(range); document.querySelector('#copy-status').textContent = 'Automatic copying isn’t available. The brief is selected; use your copy shortcut, or download it.'; }
});

// Optional WebMCP enhancement. The visible controls remain the primary interface.
if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  const options = { signal: lifecycle.signal };
  const registration = [
    { name: 'read_website_catalogue', description: 'Read NoordWeeb website models, one-time extras, and the current estimate. Does not submit or place an order.', inputSchema: { type:'object', properties:{}, additionalProperties:false }, annotations:{readOnlyHint:true}, execute: input => { if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length) throw new Error('The catalogue reader takes an empty object.'); return { packages:catalog.packages, addons:catalog.addons, servicePolicy:catalog.servicePolicy, estimate:{packageId:selectedPackage,addonIds:selectedExtras,totalCents:currentQuote.totalCents,currency:'EUR',vat:'excluded',recurringCosts:'separate'} }; } },
    { name:'configure_website_estimate', description:'Stage a website package and extras in the visible configurator. This only changes the estimate; no enquiry or order is sent.', inputSchema:{type:'object',properties:{packageId:{type:'string',enum:catalog.packages.map(item=>item.id)},addonIds:{type:'array',items:{type:'string',enum:catalog.addons.map(item=>item.id)},uniqueItems:true}},required:['packageId','addonIds'],additionalProperties:false}, annotations:{readOnlyHint:false}, execute: input => { if(!input || typeof input !== 'object' || !Array.isArray(input.addonIds) || Object.keys(input).some(key => !['packageId','addonIds'].includes(key))) throw new Error('Provide packageId and addonIds only.'); const quote=calculateQuote(catalog,input.packageId,input.addonIds); selectedPackage=quote.packageId;selectedExtras=quote.addonIds;updateQuote();return {packageId:selectedPackage,addonIds:selectedExtras,totalCents:quote.totalCents,currency:'EUR',submitted:false}; } }
  ];
  registration.forEach(tool => { try { Promise.resolve(document.modelContext.registerTool(tool, options)).catch(() => {}); } catch {} });
  window.addEventListener('pagehide', () => lifecycle.abort(), { once:true });
}
