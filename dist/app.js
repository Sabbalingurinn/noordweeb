import { business, catalog as englishCatalog, templates as englishTemplates, dutch, ui } from './data.js?v=20261001languages';
import { calculateQuote, formatMoney } from './quote.js';
import { getLanguage, onLanguageChange } from './language.js';

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const t = (key, values = {}) => ui[getLanguage()][key].replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
const money = cents => formatMoney(cents, getLanguage());
let catalog;
let templates;
const params = new URLSearchParams(location.search);
let chosenTemplate = englishTemplates.find(item => item.id === params.get('template')) || null;
let selectedPackage = chosenTemplate?.packageId || (englishCatalog.packages.some(item => item.id === params.get('package')) ? params.get('package') : 'one-page');
let selectedExtras = [];
let currentQuote;
let briefText = '';
let briefFileName = '';
let briefTrigger;
let preparedRequest;
const emailConfigured = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.contactEmail);
const menu = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const packageOptions = document.querySelector('#package-options');
const addonsElement = document.querySelector('#addon-groups');
const showroom = document.querySelector('#showroom-grid');
const dialog = document.querySelector('#brief-dialog');
const form = document.querySelector('#custom-quote-form');
function closeMenu() { mobileNav.hidden = true; menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', t('openMenu')); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', t(open ? 'closeMenu' : 'openMenu'));
  mobileNav.hidden = !open;
});
mobileNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menu.focus(); } });
document.querySelector('#year').textContent = new Date().getFullYear();

function renderPage() {
  const chosenId = chosenTemplate?.id;
  catalog = getLanguage() === 'nl' ? dutch.catalog : englishCatalog;
  templates = getLanguage() === 'nl' ? dutch.templates : englishTemplates;
  chosenTemplate = templates.find(item => item.id === chosenId) || null;
  document.querySelector('#hero-starting-price').textContent = money(catalog.packages.find(item => item.id === 'one-page').price);
  document.querySelectorAll('[data-company-line]').forEach(element => { element.textContent = t('company', { company: business.legalName }); });
  const founders = business.founders.filter(name => typeof name === 'string' && name.trim()).map(name => name.trim());
  if (founders.length === 2) {
    document.querySelector('#founder-intro').textContent = t('founders', { first: founders[0], second: founders[1] });
    document.querySelector('#founder-signature').textContent = founders.join(' & ');
  }
  showroom.innerHTML = templates.map((template, index) => {
    const title = escapeHtml(template.name);
    const href = `/templates/${template.id}/?lang=${getLanguage()}`;
    return `<article class="showcase-item showcase-${template.id}"><div class="showcase-title-line"><p>${String(index + 1).padStart(2, '0')} / ${escapeHtml(template.type)}</p><h3>${title}</h3></div><a class="showcase-visual" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(t('demoLabel', { name: template.name, type: template.type.toLowerCase() }))}"><img class="demo-preview" src="/assets/${template.id}-showcase${getLanguage() === 'nl' ? '-nl.jpg?v=20261001languages' : '.webp?v=20261001distinct2'}" alt="${escapeHtml(t('previewAlt', { name: template.name }))}" loading="lazy" width="980" height="620"></a><div class="showcase-meta"><p>${escapeHtml(template.description)}</p><div class="showcase-features">${template.features.map(feature => `<span>${escapeHtml(feature)}</span>`).join('')}</div><a class="showcase-demo-link" href="${href}" target="_blank" rel="noopener noreferrer">${t('liveDemo')}</a><button class="showcase-choose" data-template="${template.id}" aria-label="${escapeHtml(t('chooseLabel', { name: template.name }))}">${t('choose', { name: title })}</button></div></article>`;
  }).join('');
  packageOptions.innerHTML = catalog.packages.map(item => `<label class="package-option"><input type="radio" name="package" value="${item.id}"><span><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.scope)}</span></span><b>${money(item.price)}</b></label>`).join('');
  addonsElement.innerHTML = catalog.addons.map(item => `<label class="addon-item"><input type="checkbox" name="addon" value="${item.id}"><span><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.description)}</span></span><span class="addon-price">+${money(item.price)}</span></label>`).join('');
  document.querySelector('#custom-price-mode').textContent = t(emailConfigured ? 'emailMode' : 'localMode');
  form.querySelectorAll('input, textarea').forEach(field => field.setCustomValidity(''));
  updateQuote();
  if (preparedRequest) renderPreparedRequest();
}

function updateQuote() {
  currentQuote = calculateQuote(catalog, selectedPackage, selectedExtras);
  selectedExtras = currentQuote.addonIds;
  packageOptions.querySelectorAll('input').forEach(input => { input.checked = input.value === selectedPackage; });
  const { base, addons, totalCents } = currentQuote;
  document.querySelector('#package-detail').innerHTML = `<p>${escapeHtml(base.description)}</p><div class="scope-tags"><span>${escapeHtml(base.scope)}</span><span>${t('buildTime', { time: base.delivery })}</span></div><ul>${base.includes.map(item => `<li><span aria-hidden="true">✓</span>${escapeHtml(item)}</li>`).join('')}</ul><p class="delivery-note">${t('deliveryNote')}</p>`;
  document.querySelector('#quote-name').textContent = base.name;
  document.querySelector('#quote-scope').textContent = base.scope;
  document.querySelector('#quote-lines').innerHTML = `<div><span>${t('websiteBuild')}</span><strong>${money(base.price)}</strong></div>${addons.map(item => `<div><span>${escapeHtml(item.name)}</span><strong>${money(item.price)}</strong></div>`).join('')}${addons.length === 0 ? `<p>${t('noExtras')}</p>` : ''}`;
  document.querySelector('#quote-total').textContent = money(totalCents);
  const templateNote = document.querySelector('#chosen-template');
  templateNote.hidden = !chosenTemplate;
  templateNote.innerHTML = chosenTemplate ? `${t('direction')} <strong>${escapeHtml(chosenTemplate.name)}</strong><button type="button" id="clear-template" aria-label="${escapeHtml(t('removeDesign', { name: chosenTemplate.name }))}">×</button>` : '';
  document.querySelectorAll('[data-template]').forEach(button => {
    const name = templates.find(item => item.id === button.dataset.template).name;
    const selected = button.dataset.template === chosenTemplate?.id;
    button.setAttribute('aria-pressed', String(selected));
    button.textContent = t(selected ? 'selected' : 'choose', { name });
  });
  document.querySelector('#clear-template')?.addEventListener('click', () => { chosenTemplate = null; updateQuote(); packageOptions.querySelector('input:checked').focus({ preventScroll: true }); });
  addonsElement.querySelectorAll('input').forEach(input => { input.checked = selectedExtras.includes(input.value); });
}
packageOptions.addEventListener('change', event => {
  if (event.target.name !== 'package') return;
  selectedPackage = event.target.value;
  updateQuote();
});
addonsElement.addEventListener('change', event => {
  if (event.target.name !== 'addon') return;
  const { value, checked } = event.target;
  selectedExtras = selectedExtras.filter(id => id !== value);
  if (checked) selectedExtras.push(value);
  updateQuote();
});
showroom.addEventListener('click', event => {
  const button = event.target.closest('[data-template]');
  if (!button) return;
  chosenTemplate = templates.find(item => item.id === button.dataset.template);
  updateQuote();
  document.querySelector('#configure').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  packageOptions.querySelector('input:checked').focus({ preventScroll: true });
});

function renderPreparedRequest() {
  const data = preparedRequest;
  briefText = [t('requestHeading'), data.date, '', `${t('name')}: ${data.name}`, `${t('business')}: ${data.business || t('notSupplied')}`, `${t('email')}: ${data.email}`, '', t('requestSection'), data.request, '', `${t('startingDesign')}: ${data.design || t('notChosen')}`, `${t('estimate')}: ${money(data.totalCents)} ${t('vat')}`, t('estimateNote'), '', t('scopeNote'), t('notSent')].join('\n');
  briefFileName = t('fileName');
  document.querySelector('#brief-dialog-title').textContent = t('requestTitle');
  document.querySelector('#brief-output').textContent = briefText;
  document.querySelector('#copy-status').textContent = '';
  document.querySelector('#download-brief').textContent = t('download');
  document.querySelector('#copy-brief').textContent = t('copy');
  document.querySelector('#brief-result-note').textContent = t(emailConfigured ? 'requestNote' : 'localNote', { email: business.contactEmail });
  const emailLink = document.querySelector('#email-brief');
  emailLink.hidden = !emailConfigured;
  if (emailConfigured) emailLink.href = `mailto:${business.contactEmail}?subject=${encodeURIComponent(t('subject', { name: data.business || data.name }))}&body=${encodeURIComponent(briefText)}`;
}
form.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('invalid', () => {
    if (field.validity.valueMissing) field.setCustomValidity(t('required'));
    else if (field.validity.typeMismatch) field.setCustomValidity(t('emailInvalid'));
  });
  field.addEventListener('input', () => field.setCustomValidity(''));
});
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  preparedRequest = { name: data.get('name').trim(), business: data.get('business').trim(), email: data.get('email').trim(), request: data.get('request').trim(), date: new Date().toISOString().slice(0,10), design: chosenTemplate?.name, totalCents: currentQuote.totalCents };
  renderPreparedRequest();
  briefTrigger = document.activeElement;
  dialog.showModal();
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => briefTrigger?.focus());
document.querySelector('#download-brief').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([briefText], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = briefFileName; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#copy-status').textContent = t('downloadStatus');
});
document.querySelector('#copy-brief').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(briefText); document.querySelector('#copy-status').textContent = t('copyStatus'); }
  catch { const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(document.querySelector('#brief-output')); selection.removeAllRanges(); selection.addRange(range); document.querySelector('#copy-status').textContent = t('copyFailed'); }
});
onLanguageChange(renderPage);
renderPage();

// Optional WebMCP enhancement. The visible controls remain the primary interface.
if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  const options = { signal: lifecycle.signal };
  const registration = [
    { name: 'read_website_catalogue', description: 'Read noordclick website models, one-time extras, and the current estimate. Does not submit or place an order.', inputSchema: { type:'object', properties:{}, additionalProperties:false }, annotations:{readOnlyHint:true}, execute: input => { if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length) throw new Error('The catalogue reader takes an empty object.'); return { packages:catalog.packages, addons:catalog.addons, servicePolicy:catalog.servicePolicy, estimate:{packageId:selectedPackage,addonIds:selectedExtras,totalCents:currentQuote.totalCents,currency:'EUR',vat:'excluded',recurringCosts:'separate'} }; } },
    { name:'configure_website_estimate', description:'Stage a website package and extras in the visible configurator. This only changes the estimate; no enquiry or order is sent.', inputSchema:{type:'object',properties:{packageId:{type:'string',enum:catalog.packages.map(item=>item.id)},addonIds:{type:'array',items:{type:'string',enum:catalog.addons.map(item=>item.id)},uniqueItems:true}},required:['packageId','addonIds'],additionalProperties:false}, annotations:{readOnlyHint:false}, execute: input => { if(!input || typeof input !== 'object' || !Array.isArray(input.addonIds) || Object.keys(input).some(key => !['packageId','addonIds'].includes(key))) throw new Error('Provide packageId and addonIds only.'); const quote=calculateQuote(catalog,input.packageId,input.addonIds); selectedPackage=quote.packageId;selectedExtras=quote.addonIds;updateQuote();return {packageId:selectedPackage,addonIds:selectedExtras,totalCents:quote.totalCents,currency:'EUR',submitted:false}; } }
  ];
  registration.forEach(tool => { try { Promise.resolve(document.modelContext.registerTool(tool, options)).catch(() => {}); } catch {} });
  window.addEventListener('pagehide', () => lifecycle.abort(), { once:true });
}
