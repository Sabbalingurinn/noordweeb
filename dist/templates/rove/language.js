const supported = ['nl', 'en'];
const preferenceKey = 'noordclick-language';
const params = new URLSearchParams(location.search);
let saved;
try { saved = localStorage.getItem(preferenceKey); } catch {}
let language = supported.includes(params.get('lang')) ? params.get('lang') : supported.includes(saved) ? saved : document.documentElement.lang === 'en' ? 'en' : 'nl';
const listeners = new Set();

export const getLanguage = () => language;
export const onLanguageChange = callback => { listeners.add(callback); return () => listeners.delete(callback); };

function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-nl][data-en]').forEach(element => {
    const content = element.dataset[language];
    if (element.innerHTML !== content) element.innerHTML = content;
  });
  for (const attribute of ['aria-label', 'alt', 'placeholder', 'content', 'src']) {
    document.querySelectorAll(`[data-nl-${attribute}][data-en-${attribute}]`).forEach(element => {
      element.setAttribute(attribute, element.getAttribute(`data-${language}-${attribute}`));
    });
  }
  document.querySelectorAll('.language-switch').forEach(group => { group.hidden = false; });
  document.querySelectorAll('[data-language]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.language === language)); });
  document.querySelectorAll('.menu-toggle, [data-menu-toggle]').forEach(button => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-label', language === 'nl' ? (open ? 'Navigatie sluiten' : 'Navigatie openen') : (open ? 'Close navigation' : 'Open navigation'));
  });
  // Carry the choice through links, including when browser storage is unavailable.
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || /^(mailto:|tel:|data:|javascript:)/i.test(href) || link.hasAttribute('download')) return;
    const url = new URL(href, location.href);
    if (url.origin !== location.origin || !/^(https?:)$/.test(url.protocol)) return;
    if (!url.pathname.endsWith('/') && !url.pathname.endsWith('.html')) return;
    url.searchParams.set('lang', language);
    link.href = `${url.pathname}${url.search}${url.hash}`;
  });
}

export function setLanguage(next, persist = true) {
  if (!supported.includes(next)) return;
  language = next;
  if (persist) {
    try { localStorage.setItem(preferenceKey, language); } catch {}
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }
  applyLanguage();
  listeners.forEach(callback => callback(language));
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-language]');
  if (button) setLanguage(button.dataset.language);
});
setLanguage(language, false);
