import { localizeHtml, languageSwitch } from './i18n.mjs';
import { templateCopy } from './template-copy.mjs';

const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const lines = value => esc(value).replaceAll('&lt;br&gt;', '<br>');
const safeUrl = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; } catch { return ''; } };

// Five independent visual systems; shared code only handles content and demo behaviour.
// Customer content and the demo/contact boundaries remain shared.
export function renderTemplate(config) {
  const { id, business: b, demo = true } = config;
  if (!['kade','crumb','still','stem','rove'].includes(id)) throw new Error('Unknown template layout.');
  if (!b?.name || !b.headline || !Array.isArray(b.menu) || !Array.isArray(b.hours)) throw new Error('Business name, headline, menu and hours are required.');
  const booking = safeUrl(b.bookingUrl);
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.contactEmail || '') ? b.contactEmail : '';
  const phone = (b.phone || '').replace(/[^+\d]/g, '');
  if (!demo && (!b.address?.trim() || (!email && !/^\+?\d{6,15}$/.test(phone)))) throw new Error('A customer launch needs an address and a valid email address or phone number.');
  const labels = { kade:'Find your seat', crumb:'Come by for coffee', still:'Enquire about a stay', stem:'Let’s talk flowers', rove:'Book a repair' };
  const subjects = { kade:'restaurant', crumb:'bakery', still:'hotel', stem:'flower studio', rove:'bike workshop' };
  const alts = { kade:'Warmly lit restaurant tables with timber chairs and pendant lamps', crumb:'Golden, flaky croissants fresh from the oven', still:'A sunlit hotel bedroom with white linen and natural textures', stem:'Buckets of colourful seasonal flowers in a bright flower shop', rove:'A mechanic working carefully on a bicycle in a workshop' };
  const action = (className, label = labels[id]) => demo
    ? `<button type="button" class="${className}" data-demo-action>${esc(label)}</button>`
    : booking ? `<a class="${className}" href="${esc(booking)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`
    : `<a class="${className}" href="#visit">Get in touch</a>`;
  const photo = (className = '', lazy = false) => `<img class="${className}" src="./hero.jpg" alt="${alts[id]}" width="1400" height="${['rove','stem'].includes(id)?'1800':'933'}" ${lazy?'loading="lazy"':'fetchpriority="high"'}>`;
  const hours = b.hours.map(line=>`<p>${esc(line)}</p>`).join('');
  const location = `<p>${esc(b.address || b.location)}</p>${demo?'<p class="fine-print">Illustrative location · fictional business</p>':`<a class="text-link" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(b.address)}" target="_blank" rel="noopener noreferrer">Get directions</a>`}`;
  const contact = `${email?`<a href="mailto:${esc(email)}">${esc(email)}</a>`:''}${phone?`<a href="tel:${phone}">${esc(b.phone)}</a>`:''}`;
  const menuNote = noun => `<p class="fine-print">${demo?`Example ${noun} for this fictional business.`:esc(b.menuNote || 'Please ask us for the latest details.')}</p>`;
  const footer = `<footer class="business-footer"><a href="./" class="footer-name">${esc(b.name)}</a><p>${demo?'A fictional concept by NoordWeeb.':`© ${new Date().getFullYear()} ${esc(b.name)}. ${esc(b.footerNote || '')}`}</p>${demo?`<a href="/?template=${id}#configure">Make this yours ↗</a>`:''}</footer>`;
  const flower = index => `<svg class="stem-drawing flower-${index}" viewBox="0 0 90 120" aria-hidden="true"><path d="M45 113V53M45 85Q15 62 17 87Q35 103 45 99M45 72Q74 53 73 78Q60 91 45 88"/><path d="M45 51C10 46 11 17 32 22C19 2 49 0 51 18C67 2 85 24 64 34C86 45 65 68 48 52C35 73 15 55 29 42"/><circle cx="46" cy="35" r="9"/></svg>`;
  let body;
  if (id === 'kade') {
    body = `<header class="kade-sidebar"><a class="kade-logo" href="./" aria-label="${esc(b.name)} home"><span>BAR & BISTRO</span>${esc(b.name)}</a><nav aria-label="Main navigation"><a href="#menu">The menu</a><a href="#story">Our table</a><a href="#visit">Find us</a></nav>${action('kade-reserve')}<div class="kade-sidebar-details"><p>${esc(b.location)}</p><span>A LITTLE SLOWER.<br>A LITTLE CLOSER.</span></div></header>
    <main id="main" class="kade-main"><section class="kade-hero">${photo()}<div class="kade-hero-copy"><p>YOUR NEIGHBOURHOOD TABLE</p><h1>${lines(b.headline)}</h1><a href="#menu">Discover tonight’s menu <span aria-hidden="true">↓</span></a></div></section>
    <section id="menu" class="kade-menu"><div class="kade-menu-masthead"><span>AMSTERDAM</span><span>À LA CARTE</span></div><h2>At the table.</h2><p class="kade-menu-intro">${esc(b.intro)}</p><div class="kade-menu-list">${b.menu.map(item=>`<article><h3>${esc(item.name)}</h3><p>${esc(item.description)}</p><strong>${esc(item.price)}</strong></article>`).join('')}</div>${menuNote('menu and prices')}<p class="kade-menu-end" aria-hidden="true">✳</p></section>
    <section id="story" class="kade-table"><p>GOOD FOOD. GOOD COMPANY.</p><h2>${lines(b.storyTitle)}</h2><div>${esc(b.story)}</div>${action('kade-table-action')}</section>
    <section id="visit" class="kade-visit"><h2>The door is open.</h2><div class="kade-hours">${hours}</div><div class="kade-address">${location}${contact}</div></section></main>`;
  } else if (id === 'crumb') {
    body = `<header class="crumb-header"><a class="crumb-logo" href="./" aria-label="${esc(b.name)} home">${esc(b.name)}</a><span>BAKERY. COFFEE. GOOD MORNINGS.</span><nav aria-label="Main navigation"><a href="#counter">The good stuff</a><a href="#story">Our story</a><a href="#visit">Come by ↗</a></nav></header>
    <main id="main"><section class="crumb-poster"><div class="crumb-poster-copy"><p>${esc(b.eyebrow)}</p><h1>${lines(b.headline)}</h1><a class="crumb-pill" href="#counter">See what’s baking <span aria-hidden="true">↘</span></a></div><figure>${photo()}<figcaption>FRESH.<br>EVERY DAY.</figcaption></figure><span class="crumb-asterisk" aria-hidden="true">✳</span></section><div class="crumb-ribbon" aria-hidden="true"><span>SLOW DOUGH</span><span>PROPER COFFEE</span><span>JUST ONE MORE</span></div>
    <section id="counter" class="crumb-counter"><div><p>THE COUNTER</p><h2>The good<br>stuff.</h2><p>${esc(b.intro)}</p></div><div class="crumb-receipt"><header><span>${esc(b.name)}</span><p>BAKED TODAY / ENJOY RIGHT AWAY</p></header><ol>${b.menu.map(item=>`<li><div><h3>${esc(item.name)}</h3><p>${esc(item.description)}</p></div><strong>${esc(item.price)}</strong></li>`).join('')}</ol>${menuNote('bakes and prices')}<p class="crumb-receipt-end">THANK YOU. COME HUNGRY.</p></div></section>
    <section id="story" class="crumb-story"><span aria-hidden="true">↗</span><h2>${lines(b.storyTitle)}</h2><p>${esc(b.story)}</p></section>
    <section id="visit" class="crumb-visit"><h2>Come by.</h2><div><div>${hours}</div><div>${location}${contact}</div>${action('crumb-pill','Visit the bakery')}</div></section></main>`;
  } else if (id === 'still') {
    body = `<header class="still-header"><a class="still-logo" href="./" aria-label="${esc(b.name)} home">${esc(b.name)}<span>A SMALL CITY STAY</span></a><div class="still-header-actions">${action('still-book','Book a stay')}<button class="still-menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="still-navigation" aria-label="Open navigation"><span></span><span></span></button></div><nav id="still-navigation" aria-label="Main navigation" hidden><a href="#rooms">The rooms</a><a href="#story">Our philosophy</a><a href="#visit">Plan your stay</a></nav></header>
    <main id="main"><section class="still-arrival"><div><p class="still-index">01 — ARRIVAL</p><h1>${lines(b.headline)}</h1><p class="still-intro">${esc(b.intro)}</p><a href="#rooms">Find your room <span aria-hidden="true">↗</span></a></div><figure>${photo()}<figcaption>A little calm, in ${esc(b.location)}.</figcaption></figure></section>
    <section id="story" class="still-philosophy"><p class="still-index">02 — A WAY OF STAYING</p><h2>${lines(b.storyTitle)}</h2><p>${esc(b.story)}</p></section>
    <section id="rooms" class="still-rooms"><header><p class="still-index">03 — THE ROOMS</p><h2>Make yourself at home.</h2></header><div class="still-room-switch" role="tablist" aria-label="Choose a room">${b.menu.map((item,i)=>`<button type="button" role="tab" id="room-tab-${i}" data-room-tab aria-controls="room-panel-${i}" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}"><span>0${i+1}</span>${esc(item.name)}</button>`).join('')}</div>${b.menu.map((item,i)=>`<div class="still-room-pane" role="tabpanel" id="room-panel-${i}" aria-labelledby="room-tab-${i}" ${i?'hidden':''}><figure>${photo(`room-photo-${i+1}`,true)}</figure><div><p class="still-index">YOUR OWN LITTLE CORNER · ${esc(item.price)}</p><h3>${esc(item.name)}</h3><p>${esc(item.description)}</p>${action('still-room-action','Enquire about this room')}</div></div>`).join('')}${menuNote('room types and amenities')}</section>
    <section id="visit" class="still-visit"><p class="still-index">04 — THE SMALL DETAILS</p><div><h2>A soft landing.</h2>${action('still-book')}</div><dl><dt>Arrival & departure</dt><dd>${hours}</dd><dt>Find us</dt><dd>${location}${contact}</dd></dl></section></main>`;
  } else if (id === 'stem') {
    body = `<header class="stem-header"><a class="stem-logo" href="./" aria-label="${esc(b.name)} home">${esc(b.name)}</a><nav aria-label="Main navigation"><a href="#collection">the flowers</a><a href="#story">a little about us</a><a href="#visit">say hello ↗</a></nav></header>
    <main id="main"><section class="stem-scrapbook"><figure>${photo()}<figcaption>gathered with a little love.</figcaption></figure><div><p>${esc(b.eyebrow)}</p><h1>${lines(b.headline)}</h1><p class="stem-intro">${esc(b.intro)}</p><a class="stem-link" href="#collection">Find your flowers <span aria-hidden="true">↘</span></a></div>${flower(0)}</section>
    <section id="collection" class="stem-collection"><header><span>FIELD NOTES / THE COLLECTION</span><h2>For someone.<br>For no reason.</h2></header><div class="stem-flower-list">${b.menu.map((item,i)=>`<article>${flower(i+1)}<div><span class="stem-number">0${i+1}</span><h3>${esc(item.name)}</h3><p>${esc(item.description)}</p></div><div class="stem-price"><strong>${esc(item.price)}</strong>${action('stem-link','Ask about these ↗')}</div></article>`).join('')}</div>${menuNote('flowers and prices')}</section>
    <section id="story" class="stem-note"><p>A NOTE FROM THE STUDIO</p><h2>${lines(b.storyTitle)}</h2><div>${esc(b.story)}</div><span class="stem-note-signature">with love, ${esc(b.name)}</span></section>
    <section id="visit" class="stem-hello"><div><span>COME AS YOU ARE</span><h2>Let’s make<br>someone’s day.</h2>${action('stem-contact','Let’s talk flowers')}</div><aside><h3>The studio</h3>${location}${contact}<h3>When we’re here</h3>${hours}</aside></section></main>`;
  } else {
    body = `<header class="rove-header"><a class="rove-logo" href="./" aria-label="${esc(b.name)} home">${esc(b.name.replace(/\.$/, ''))}</a><nav aria-label="Main navigation"><a href="#services">[ Services ]</a><a href="#story">[ The workshop ]</a><a href="#visit">[ Find us ↗ ]</a></nav></header>
    <main id="main"><section class="rove-board"><div><p>${esc(b.eyebrow)}</p><h1>${lines(b.headline)}</h1><p class="rove-intro">${esc(b.intro)}</p>${action('rove-button','Book a repair ↗')}</div><figure>${photo()}<figcaption>AMSTERDAM / BICYCLE CARE</figcaption></figure></section>
    <section id="services" class="rove-services"><header><h2>What needs fixing?</h2><span>01 / SERVICE BOARD</span></header>${b.menu.map((item,i)=>`<details class="rove-service" ${i===0?'open':''}><summary><span class="rove-service-number">0${i+1}</span><h3>${esc(item.name)}</h3><strong>${esc(item.price)}</strong><span class="rove-service-expand" aria-hidden="true">+</span></summary><div><p>${esc(item.description)}</p>${action('rove-service-action','Ask about this service ↗')}</div></details>`).join('')}${menuNote('services and prices')}</section>
    <section id="story" class="rove-manifesto"><p>02 / THE WORKSHOP</p><h2>${lines(b.storyTitle)}</h2><div><span>FIX.<br>RIDE.<br>REPEAT.</span><p>${esc(b.story)}</p></div></section>
    <section id="visit" class="rove-visit"><header><p>03 / DROP BY</p><h2>Bring your bike.</h2></header><div class="rove-visit-data"><div><h3>WORKSHOP HOURS</h3>${hours}</div><div><h3>LOCATION</h3>${location}${contact}${action('rove-button','Get in touch ↗')}</div></div></section></main>`;
  }
  const bilingual = Boolean(config.translations?.nl);
  const showroom = demo?`<div class="showroom-bar"><a href="/#showroom">← Back to NoordWeeb</a><span>${esc(config.name)} · Fictional demo</span>${bilingual ? languageSwitch() : ''}<a class="choose-design" href="/?template=${id}#configure">Choose this design ↗</a></div>`:bilingual ? `<div class="customer-language">${languageSwitch()}</div>` : '';
  const dialog = demo?`<dialog class="demo-dialog" aria-labelledby="demo-dialog-title"><button type="button" class="close-demo" aria-label="Close demo message">×</button><p class="dialog-label">NOORDWEEB / DESIGN PREVIEW</p><h2 id="demo-dialog-title">Picture your business here.</h2><p>This is a fictional ${subjects[id]} demo. No booking, order or enquiry is made. For your website, we connect the real contact or booking route agreed in your quote.</p><a class="dialog-action" href="/?template=${id}#configure">Choose the ${esc(config.name)} design</a></dialog>`:'';
  const interactions = `<script>
const roomTabs=[...document.querySelectorAll('[data-room-tab]')];
const selectRoom=tab=>{roomTabs.forEach(item=>{const selected=item===tab;item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!selected})};
roomTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectRoom(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%roomTabs.length;if(event.key==='ArrowLeft')next=(index+roomTabs.length-1)%roomTabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=roomTabs.length-1;if(next!==undefined){event.preventDefault();selectRoom(roomTabs[next]);roomTabs[next].focus()}})});
const toggle=document.querySelector('[data-menu-toggle]');
if(toggle){const nav=document.getElementById(toggle.getAttribute('aria-controls'));const close=()=>{nav.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label',document.documentElement.lang==='nl'?'Navigatie openen':'Open navigation')};toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',document.documentElement.lang==='nl'?(open?'Navigatie sluiten':'Navigatie openen'):(open?'Close navigation':'Open navigation'))});nav.addEventListener('click',event=>{if(event.target.closest('a'))close()});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!nav.hidden){close();toggle.focus()}})}
const dialog=document.querySelector('.demo-dialog');
if(dialog){let opener;document.querySelectorAll('[data-demo-action]').forEach(button=>button.addEventListener('click',()=>{opener=button;dialog.showModal()}));document.querySelector('.close-demo').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>opener?.focus());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}})}
</script>`;
  const colors={kade:'#f4f0e6',crumb:'#f8db55',still:'#ecece6',stem:'#f4e4e6',rove:'#171a18'};
  const html = `<!doctype html><html lang="${esc(b.language || 'en')}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(b.name)} — ${esc(config.type)}${demo?' | NoordWeeb demo':''}</title><meta name="description" content="${esc(b.intro)}">${demo?'<meta name="robots" content="noindex,follow">':''}<meta name="theme-color" content="${colors[id]}"><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23${colors[id].slice(1)}'/%3E%3Ctext x='20' y='29' text-anchor='middle' font-family='Georgia' font-size='28' fill='%23${id==='rove'?'e2f75b':'252b26'}'%3E${id[0]}%3C/text%3E%3C/svg%3E"><link rel="stylesheet" href="./styles.css?v=20261001languages"></head><body class="theme-${id}${demo?' is-demo':''}"><a class="skip-link" href="#main">Skip to content</a>${showroom}${body}${footer}${dialog}${interactions}${bilingual ? '<script type="module" src="./language.js"></script>' : ''}</body></html>`;
  if (!bilingual) return html;
  const nl = config.translations.nl;
  const pairs = { ...templateCopy };
  const collect = (en, translated) => {
    if (typeof en === 'string' && typeof translated === 'string') pairs[lines(en)] = lines(translated);
    else if (en && translated && typeof translated === 'object') for (const key of Object.keys(translated)) collect(en[key], translated[key]);
  };
  collect(config, nl);
  pairs[`${esc(b.name)} home`] = `${esc(b.name)} startpagina`;
  pairs[`${esc(config.name)} · Fictional demo`] = `${esc(config.name)} · Fictieve demo`;
  pairs[`Choose the ${esc(config.name)} design`] = `Kies het ${esc(config.name)}-ontwerp`;
  pairs[`${esc(b.name)} — ${esc(config.type)}${demo ? ' | NoordWeeb demo' : ''}`] = `${esc(b.name)} — ${esc(nl.type || config.type)}${demo ? ' | NoordWeeb demo' : ''}`;
  const dutchSubjects = {kade:'restaurant',crumb:'bakkerij',still:'hotel',stem:'bloemenatelier',rove:'fietswerkplaats'};
  pairs[`This is a fictional ${subjects[id]} demo. No booking, order or enquiry is made. For your website, we connect the real contact or booking route agreed in your quote.`] = `Dit is een fictieve demo van een ${dutchSubjects[id]}. Er wordt geen boeking, bestelling of aanvraag gedaan. Voor jouw website sluiten we de echte contact- of boekingsroute aan die we in je offerte afspreken.`;
  pairs[`A little calm, in ${esc(b.location)}.`] = `Een beetje rust, in ${esc(b.location)}.`;
  pairs[`with love, ${esc(b.name)}`] = `liefs, ${esc(b.name)}`;
  b.menu.forEach((item, i) => {
    pairs[`<span>0${i + 1}</span>${esc(item.name)}`] = `<span>0${i + 1}</span>${esc(nl.business.menu[i].name)}`;
    pairs[`YOUR OWN LITTLE CORNER · ${esc(item.price)}`] = `JE EIGEN PLEKJE · ${esc(nl.business.menu[i].price)}`;
  });
  return localizeHtml(html, pairs, config.defaultLanguage || 'nl');
}
