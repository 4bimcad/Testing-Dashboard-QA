import { test, expect } from '@playwright/test';

test('Open Dashboard', async ({ page }) => {
    await page.goto('https://marmelab.com/react-admin-demo/#/');
    await expect(page).toHaveTitle(/Posters Galore Administration/);
});
