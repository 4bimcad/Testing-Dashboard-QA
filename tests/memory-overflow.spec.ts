import { test, expect } from '@playwright/test';

test('Field length limit test (1MB input)', async ({ page }) => {
    await page.goto('https://marmelab.com/react-admin-demo/#/login');

    console.log('🔹 Входим в систему...');
    await page.fill('input[type="text"]', 'demo');
    await page.fill('input[type="password"]', 'demo');
    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000); // waiting redirect

    console.log('Go to create form...');
    await page.goto('https://marmelab.com/react-admin-demo/#/customers/create');

    const largeInput = 'A'.repeat(1024 * 1024); // 1MB of string

    console.log('Filling long string...');
    await page.fill('input[name="firstName"]', largeInput);
    await page.fill('input[name="lastName"]', largeInput);
    await page.fill('input[name="email"]', `${largeInput}@test.com`);

    console.log('Click "Save"');
    await page.click('button[aria-label="Save"]');

    console.log('Checking errors...');
    const errorMessage = page.locator('text=Error: too long string');
    if (await errorMessage.isVisible()) {
        console.error('Find maximum:  too long string');
    } else {
        console.log('Inputs get 1mb of info...');
    }

    await expect(page).not.toHaveURL(/\/login/); // checking redirect on login
});
