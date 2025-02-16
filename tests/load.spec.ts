import { test, expect } from '@playwright/test';

test.describe.parallel('Load Test', () => {
  for (let i = 1; i <= 10; i++) {
    test(`User ${i} logs in and navigates`, async ({ page }) => {
      console.log(`User ${i} enter on page`);
      await page.goto('https://marmelab.com/react-admin-demo/#/login');

      console.log(`User ${i} filling login and password`);
      await page.fill('input[name="username"]', 'demo');
      await page.fill('input[name="password"]', 'demo');
      await page.click('button[type="submit"]');

      console.log(`User ${i} waiting principal page`);
      await page.waitForLoadState('networkidle');

      console.log(`User ${i} go to customers page`);
      await page.goto('https://marmelab.com/react-admin-demo/#/customers');

      console.log(`User ${i} checking, he is on /customers`);
      await expect(page).toHaveURL(/.*\/customers$/);

      console.log(`User ${i} waiting download of customers`);
      await page.waitForSelector('.RaDatagrid-table', { timeout: 5000 });

      console.log(`User ${i} succesfully checking customers page`);
    });
  }
});
