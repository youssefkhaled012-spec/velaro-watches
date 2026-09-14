import { chromium } from '@playwright/test';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(`Runtime: ${error.message}`));
page.on('console', message => { if (message.type() === 'error') errors.push(`Console: ${message.text()}`); });
page.on('response', response => { if (response.url().startsWith('http://127.0.0.1:3000') && response.status() >= 400) errors.push(`HTTP ${response.status()}: ${response.url()}`); });
const routes = ['home', 'collection', 'product-detail&product=rolex-daytona-126500ln', 'product-detail&product=longines-dolcevita-diamond-women', 'brand&brand=rolex', 'brand&brand=grand-seiko', 'certified-preowned', 'sell-trade', 'watch-sourcing', 'bespoke', 'journal', 'account', 'luxury-suite', 'pre-owned', 'story', 'wishlist', 'client-care', 'product-detail&product=unknown', 'brand&brand=unknown'];
try {
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:3000/#page=${route}`, { waitUntil: 'networkidle' });
    await page.locator('main').waitFor();
    if (!(await page.locator('main').innerText()).trim()) errors.push(`Empty page: ${route}`);
  }
  await page.goto('http://127.0.0.1:3000/#page=bespoke');
  await page.getByRole('button', { name: /Request Portfolio Valuation/ }).click();
  const form = page.getByRole('dialog', { name: 'Sell or trade your watch' });
  await form.getByLabel('FULL NAME *', { exact: true }).fill('Test Collector');
  if (await form.getByLabel('Watch photographs').getAttribute('type') !== 'file') errors.push('Photo label does not target the file input');
  await page.keyboard.press('Escape');
  console.log(JSON.stringify({ routesChecked: routes.length, errors }, null, 2));
  if (errors.length) process.exitCode = 1;
} finally { await browser.close(); }
