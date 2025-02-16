import { test, expect } from '@playwright/test';

test('Login Form: Validation and Submission', async ({ page }) => {
    await page.goto('https://marmelab.com/react-admin-demo/#/login');

    // Filling data
    await page.fill('input[name="username"]', 'wrong');
    await page.fill('input[name="password"]', 'wrong');
    await page.click('button[type="submit"]');

    // Checking, NOT redirect to principal page
    await expect(page).toHaveURL(/\/login$/);

    // Checking, if have error
    const errorMessage = page.locator('.error-message'); 
    await expect(errorMessage).toBeVisible();

    // Fiiling correct data
    await page.fill('input[name="username"]', 'demo');
    await page.fill('input[name="password"]', 'demo');
    await page.click('button[type="submit"]');

    // Checking, we are on principal page
    await expect(page).toHaveURL(/\/$/); 
});
