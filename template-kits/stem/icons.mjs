// SVG paths keep UI symbols independent of the platform's text/emoji fonts.
const paths = {
  'arrow-up-right': 'M5 19 19 5M5 5h14v14',
  'arrow-down-right': 'M5 5 19 19M5 19h14V5',
  'arrow-down': 'M12 4v16M5 13l7 7 7-7',
  'arrow-left': 'M20 12H4M11 5l-7 7 7 7',
  asterisk: 'M12 2v20M2 12h20M5 5l14 14M5 19 19 5',
  check: 'm4 12 5 5L20 6',
  close: 'm6 6 12 12M6 18 18 6'
};

export function icon(name) {
  if (!Object.hasOwn(paths, name)) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="ui-icon ui-icon-${name}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${paths[name]}"/></svg>`;
}

// Only use with trusted, authored interface copy; escape customer content first.
export function iconText(copy) {
  const symbols = { '\u2197': 'arrow-up-right', '\u2198': 'arrow-down-right', '\u2193': 'arrow-down', '\u2190': 'arrow-left' };
  return copy.replace(/[\u2197\u2198\u2193\u2190]/g, symbol => icon(symbols[symbol]));
}

export const iconPairs = pairs => Object.fromEntries(Object.entries(pairs).map(([en, nl]) => [iconText(en), iconText(nl)]));
