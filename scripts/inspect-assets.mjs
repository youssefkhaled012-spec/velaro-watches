import { chromium } from '@playwright/test';
import fs from 'node:fs';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 1100 } });
const ids = ['1533139502658-0198f920d8e8','1526045612212-70caf35c14df','1547996160-81dfa63595aa','1508685096489-7aacd43bd3b1','1548036328-c9fa89d128fa','1614164185128-e4ec99c436d7','1524805444758-089113d48a6d','1587836374828-4dbafa94cf0e','1523275335684-37898b6baf30','1522335789203-aabd1fc54bc9'];
await page.setContent(`<body style="margin:0;background:#111;color:white;display:grid;grid-template-columns:repeat(5,1fr);gap:12px;font:12px monospace">${ids.map(id => `<div><img style="width:100%;height:390px;object-fit:cover" src="https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=70"><p>${id}</p></div>`).join('')}</body>`);
await page.waitForLoadState('networkidle');
await page.screenshot({ path: 'artifacts/asset-review.png' });
await browser.close();
