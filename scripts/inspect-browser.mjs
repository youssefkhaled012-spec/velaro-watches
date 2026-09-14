import { chromium } from '@playwright/test';
import fs from 'node:fs';
fs.mkdirSync('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'artifacts/home-desktop.png' });
console.log('Home:', await page.title(), 'images', await page.locator('img').evaluateAll(imgs => imgs.filter(i => i.complete && !i.naturalWidth).map(i => i.src)));
for (const route of ['collection', 'brand&brand=patek-philippe', 'product-detail&product=rolex-daytona-126500ln', 'journal', 'certified-preowned', 'bespoke', 'account', 'wishlist', 'story', 'client-care']) {
  await page.goto(`http://127.0.0.1:3000/#page=${route}`);
  await page.locator('h1').first().waitFor();
  console.log(route, await page.locator('h1').first().innerText());
}
await page.setViewportSize({ width: 390, height: 844 });
for (const route of ['home', 'collection', 'product-detail&product=rolex-daytona-126500ln', 'journal', 'account', 'bespoke']) {
  await page.goto(`http://127.0.0.1:3000/#page=${route}`);
  await page.locator('h1').first().waitFor();
  console.log('Mobile overflow', route, await page.evaluate(() => [...document.querySelectorAll('main *')].filter(el => el.getBoundingClientRect().right > innerWidth + 2 && getComputedStyle(el).position !== 'absolute').slice(0, 12).map(el => ({tag:el.tagName,cls:el.className,text:el.textContent.slice(0,70)}))));
  await page.screenshot({ path: `artifacts/${route.split('&')[0]}-mobile.png` });
}
console.log('Runtime errors:', errors);
await browser.close();
