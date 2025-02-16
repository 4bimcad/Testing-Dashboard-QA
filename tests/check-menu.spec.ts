import { test, expect } from '@playwright/test';

test('Admin Panel: Navigation Test', async ({ page }) => {
    // Homepage
    await page.goto('https://marmelab.com/react-admin-demo/#/login');

    // Enter login
    await page.fill('input[name="username"]', 'demo');
    await page.fill('input[name="password"]', 'demo');
    await page.click('button[type="submit"]');

    // Waiting download
    await page.waitForURL('https://marmelab.com/react-admin-demo/#/');
    await expect(page).toHaveURL('https://marmelab.com/react-admin-demo/#/');

    // Check Menu
    const sidebar = page.locator('.MuiDrawer-root'); 
    await expect(sidebar).toBeVisible();

    // Testing Customers"
    await page.click('a[href="#/customers"]'); 
    await page.waitForURL('https://marmelab.com/react-admin-demo/#/customers');
    await expect(page).toHaveURL('https://marmelab.com/react-admin-demo/#/customers');

    // Check Table
    const customersTable = page.locator('.MuiTable-root.RaDatagrid-table');
    await expect(customersTable).toBeVisible();

    // Checking Logout
    // Open Profile
    await page.click('button[aria-label="Profile"]');

    // Waiting button Logout
    await page.waitForSelector('li.logout');

    // Click on Logout
    await page.click('li.logout');

});
