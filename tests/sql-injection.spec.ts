import { test, expect } from '@playwright/test';

test('Security Test: SQL Injection in Login', async ({ page }) => {
    console.log('Open homepage');
    await page.goto('https://marmelab.com/react-admin-demo/#/login');

    console.log('Printing SQL-injection in login and password');
    await page.fill('input[name="username"]', "' OR '1'='1");
    await page.fill('input[name="password"]', "' OR '1'='1");

    console.log('Click "Sign in"');
    await page.click('button[type="submit"]');

    console.log('Waiting results');
    await page.waitForTimeout(2000); 

    console.log('Checking NOT Authorized');
    await expect(page).toHaveURL(/\/login/); // Need stay on login page
});
