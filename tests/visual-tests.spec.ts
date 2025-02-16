import { test, expect } from '@playwright/test';

test('Visual Testing', async ({ page }) => {
    await page.goto('https://marmelab.com/react-admin-demo/#/');
    await page.waitForLoadState('networkidle'); 
    await page.waitForTimeout(2000);
    expect(await page.screenshot()).toMatchSnapshot('dashboard.png', { threshold: 0.05 });
});

