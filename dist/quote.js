export function calculateQuote(catalog, packageId, addonIds = []) {
  const base = catalog.packages.find(item => item.id === packageId);
  if (!base) throw new Error('Choose a valid website package.');
  if (!Array.isArray(addonIds) || addonIds.some(id => !catalog.addons.some(item => item.id === id))) throw new Error('Choose valid extras.');
  const unique = [...new Set(addonIds)];
  const selected = catalog.addons.filter(item => unique.includes(item.id));
  return { packageId, base, addons: selected, addonIds: selected.map(item => item.id), totalCents: base.price + selected.reduce((sum, item) => sum + item.price, 0) };
}
export function formatMoney(cents) { return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(cents / 100); }
