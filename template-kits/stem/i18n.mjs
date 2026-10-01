const escapeAttribute = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const escapePattern = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Both copies live in the HTML so Dutch is readable before JavaScript runs.
// These pairs are trusted authored markup; customer strings must be escaped first.
export function localizeHtml(html, pairs, defaultLanguage = 'nl') {
  const entries = Object.entries(pairs).filter(([en, nl]) => en !== nl).sort((a, b) => b[0].length - a[0].length);
  for (const [en, nl] of entries) {
    const pattern = new RegExp(`(<[a-z][^<>]*)(>)(\\s*)${escapePattern(en)}(\\s*)(<\\/[a-z][^>]*>)`, 'g');
    html = html.replace(pattern, (match, tag, end, before, after, close) => {
      if (/\sdata-(?:en|nl)=/.test(tag)) return match;
      return `${tag} data-en="${escapeAttribute(en)}" data-nl="${escapeAttribute(nl)}">${before}${defaultLanguage === 'nl' ? nl : en}${after}${close}`;
    });
  }
  const attributes = new Map(entries.map(([en, nl]) => [escapeAttribute(en), escapeAttribute(nl)]));
  html = html.replace(/<[a-z][^<>]*>/g, tag => {
    let extra = '';
    tag = tag.replace(/\b(aria-label|alt|placeholder|content)="([^"]*)"/g, (match, name, en) => {
      if (!attributes.has(en) || tag.includes(`data-en-${name}=`)) return match;
      const nl = attributes.get(en);
      extra += ` data-en-${name}="${en}" data-nl-${name}="${nl}"`;
      return `${name}="${defaultLanguage === 'nl' ? nl : en}"`;
    });
    return tag.replace(/>$/, `${extra}>`);
  });
  return html.replace(/<html lang="[^"]*"/, `<html lang="${defaultLanguage}"`);
}

export function languageSwitch() {
  return '<div class="language-switch" role="group" aria-label="Taal kiezen" data-en-aria-label="Choose language" data-nl-aria-label="Taal kiezen" hidden><button type="button" data-language="nl" lang="nl" aria-label="Nederlands" aria-pressed="true">NL</button><button type="button" data-language="en" lang="en" aria-label="English" aria-pressed="false">EN</button></div>';
}
