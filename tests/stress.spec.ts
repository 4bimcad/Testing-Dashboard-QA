import { test, expect } from '@playwright/test';

test.describe('Stress Test', () => {
  for (let i = 1; i <= 100; i++) {
    test(`User ${i} logs in and navigates`, async ({ page }) => {
      console.log(`User ${i} starts test`);
      
      await page.goto('https://marmelab.com/react-admin-demo/#/login');

      await page.fill('input[name="username"]', 'demo');
      await page.fill('input[name="password"]', 'demo');
      await page.click('button[type="submit"]');

      await page.waitForURL(/\/$/);

      const pageTitle = await page.title();
      expect(pageTitle).toContain('Posters Galore Administration');

      console.log(`User ${i} finished test`);
    });
  }
});
