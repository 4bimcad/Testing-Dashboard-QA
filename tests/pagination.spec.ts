import { test, expect } from '@playwright/test';

test('Admin Panel: Pagination works', async ({ page }) => {

    await page.goto('https://marmelab.com/react-admin-demo/#/login');


    await page.fill('input[name="username"]', 'demo');
    await page.fill('input[name="password"]', 'demo');

 
    await page.click('button[type="submit"]');


    await page.waitForURL(/\/$/);


    await page.goto('https://marmelab.com/react-admin-demo/#/customers');


    await page.waitForSelector('.RaDatagrid-table');

    // Getting firs customer
    const firstCustomerPage1 = await page.locator('.RaDatagrid-table tbody tr').first().innerText();
    console.log('Page 1 first customer:', firstCustomerPage1);

    // Click on "Next Page"
    const nextPageButton = page.locator('[aria-label="Go to next page"]');
    await nextPageButton.waitFor({ state: 'visible' });
    await nextPageButton.click();

    // Waiting download of table
    await page.waitForTimeout(2000);
    await page.waitForSelector('.RaDatagrid-table');

    // Getting first client on second page
    const firstCustomerPage2 = await page.locator('.RaDatagrid-table tbody tr').first().innerText();
    console.log('Page 2 first customer:', firstCustomerPage2);

    // Checking difference of clients
    expect(firstCustomerPage1).not.toBe(firstCustomerPage2);
});
