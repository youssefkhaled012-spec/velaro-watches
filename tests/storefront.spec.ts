import { test, expect } from '@playwright/test';

test('shopping selections persist and purchase enquiry downloads without a false order', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'EXPLORE WATCHES', exact: true }).click();
  const first = page.getByTestId('product-card').first();
  await first.getByTitle('Save to Wishlist').click();
  await page.getByTitle('Saved Wishlist').click();
  await expect(page.getByTestId('product-card')).toHaveCount(1);
  await page.reload();
  await expect(page.getByTestId('product-card')).toHaveCount(1);
  await page.getByRole('link', { name: 'Cosmograph Daytona', exact: true }).click();
  await page.locator('main').getByRole('button', { name: 'ADD TO BAG', exact: true }).first().click();
  const bag = page.getByRole('dialog', { name: 'Shopping bag' });
  await bag.getByRole('button', { name: /Increase quantity/ }).click();
  await expect(bag.getByText('$69,900').first()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(bag).toBeHidden();
  await page.reload();
  await page.getByRole('button', { name: 'Cart', exact: true }).click();
  await expect(bag.getByText('$69,900').first()).toBeVisible();
  const download = page.waitForEvent('download');
  await bag.getByRole('button', { name: 'DOWNLOAD PURCHASE ENQUIRY' }).click();
  expect((await download).suggestedFilename()).toBe('velaro-purchase-enquiry.json');
  await expect(bag.getByText(/No payment has been taken/)).toBeVisible();
  expect(errors).toEqual([]);
});

test('category, movement, search, price and comparison flows', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('header nav');
  await nav.getByRole('button', { name: 'WATCHES', exact: true }).click();
  await page.getByRole('button', { name: "Women's Watches", exact: true }).first().click();
  await expect(page.getByTestId('product-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'RESET', exact: true }).click();
  await page.getByRole('button', { name: 'Manual', exact: true }).click();
  await expect(page.getByTestId('product-card')).toHaveCount(1);
  await expect(page.getByTestId('product-card').first()).toContainText('Speedmaster');
  await page.getByRole('button', { name: 'RESET', exact: true }).click();
  await page.getByLabel('SEARCH CATALOGUE').fill('126500LN');
  await expect(page.getByTestId('product-card')).toHaveCount(1);
  await page.getByLabel('SEARCH CATALOGUE').fill('no such watch');
  await expect(page.getByText('No matching timepieces found')).toBeVisible();
  await page.getByRole('button', { name: 'RESET FILTERS', exact: true }).click();
  for (let i = 0; i < 4; i++) await page.getByTestId('product-card').nth(i).getByTitle('Add to Compare Matrix').click();
  await expect(page.getByRole('status')).toContainText('COMPARISON LIMIT REACHED');
  await page.locator('.compare-bar').getByRole('button', { name: 'COMPARE', exact: true }).click();
  const comparison = page.getByRole('dialog', { name: 'Compare timepieces' });
  await expect(comparison.locator('thead th')).toHaveCount(4);
  await page.keyboard.press('Escape');
  await nav.getByRole('button', { name: 'COLLECTIONS', exact: true }).click();
  await page.getByRole('button', { name: '$20,000+ Collector Vault' }).click();
  await nav.getByRole('button', { name: 'COLLECTIONS', exact: true }).click();
  await page.getByRole('button', { name: 'Timepieces Under $5,000' }).click();
  await expect(page.getByTestId('product-card').first()).toBeVisible();
  await expect(page.getByText('No matching timepieces found')).toBeHidden();
});

test('forms validate, export drafts, and modal focus stays contained', async ({ page }) => {
  await page.goto('/#page=bespoke');
  await page.getByRole('button', { name: /Submit Sourcing Request/ }).click();
  const dialog = page.getByRole('dialog', { name: 'Watch sourcing' });
  await dialog.getByRole('button', { name: 'DOWNLOAD SOURCING ENQUIRY' }).click();
  await expect(dialog.getByLabel('WATCHMAKER BRAND *')).toBeFocused();
  await dialog.getByLabel('WATCHMAKER BRAND *').fill('Rolex');
  await dialog.getByLabel('MODEL OR REFERENCE *').fill('126500LN');
  await dialog.getByLabel('YOUR FULL NAME *').fill('Test Collector');
  await dialog.getByLabel('EMAIL ADDRESS *').fill('collector@example.com');
  const download = page.waitForEvent('download');
  await dialog.getByRole('button', { name: 'DOWNLOAD SOURCING ENQUIRY' }).click();
  expect((await download).suggestedFilename()).toBe('velaro-sourcing-enquiry.json');
  await page.keyboard.press('Escape');
  await page.getByTitle('Search VELARO Vault').click();
  const search = page.getByRole('dialog', { name: 'Search timepieces' });
  await search.getByLabel('Search watches').fill('  Daytona  ');
  await expect(search.getByText('TIMEPIECES FOUND (1)')).toBeVisible();
  await search.getByLabel('Search watches').focus();
  await page.keyboard.press('Shift+Tab');
  expect(await search.evaluate(el => el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.getByTitle('Search VELARO Vault')).toBeFocused();
});

test('journal categories, brand changes and URL history work', async ({ page }) => {
  await page.goto('/#page=journal');
  await page.getByRole('button', { name: 'HOROLOGY', exact: true }).click();
  await expect(page.locator('main article')).toHaveCount(1);
  await page.locator('main article').click();
  await expect(page.getByRole('dialog', { name: 'Journal article' })).toBeVisible();
  await page.keyboard.press('Escape');
  await page.goto('/#page=brand&brand=rolex');
  await page.getByRole('button', { name: 'Daytona', exact: true }).click();
  await expect(page.getByTestId('product-card')).toHaveCount(1);
  await page.getByTitle('Search VELARO Vault').click();
  await page.getByLabel('Search watches').fill('Cartier');
  await page.getByRole('dialog').getByRole('button', { name: 'Cartier', exact: true }).click();
  await expect(page.locator('h1')).toHaveText('Cartier');
  await expect(page.getByTestId('product-card')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('h1')).toHaveText('Cartier');
  await page.goBack();
  await expect(page.locator('h1')).toHaveText('Rolex');
});

test('mobile navigation, catalogue and dialogs fit a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const menu = page.getByRole('dialog', { name: 'Navigation' });
  await menu.getByLabel('Mobile currency').selectOption('EUR');
  await menu.getByRole('button', { name: 'Women', exact: true }).click();
  await expect(page.getByTestId('product-card')).toHaveCount(2);
  await expect(page.getByTestId('product-card').first()).toContainText('€');
  for (const route of ['collection', 'product-detail&product=rolex-daytona-126500ln', 'journal', 'account', 'bespoke', 'client-care']) {
    await page.goto('/#page=' + route);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
});

test('invalid stored data does not break the storefront', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('velaro-cart', '{invalid');
    localStorage.setItem('velaro-wishlist', '[null, 12]');
    localStorage.setItem('velaro-currency', '"INVALID"');
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Cart', exact: true }).click();
  await expect(page.getByRole('dialog').getByText('Your bag is currently empty')).toBeVisible();
});
