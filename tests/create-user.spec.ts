import { test, expect } from '@playwright/test';

test('Admin Panel: Add new customer', async ({ page }) => {
    console.log('Open homepae');
    await page.goto('https://marmelab.com/react-admin-demo/#/login');

    console.log('Enter login and password');
    await page.fill('input[name="username"]', 'demo');
    await page.fill('input[name="password"]', 'demo');

    console.log('Click on "Sign in"');
    await page.click('button[type="submit"]');

    console.log('Waiting redirect on Principal page');
    await page.waitForURL(/\/$/);

    console.log('Go on Customers');
    await page.goto('https://marmelab.com/react-admin-demo/#/customers');

    console.log('Waiting download of Customers');
    await page.waitForSelector('.RaDatagrid-table');

    console.log('Click on"Create"');
    const createButton = page.locator('[aria-label="Create"]');
    await createButton.waitFor({ state: 'visible' });
    await createButton.click();

    // Фиксированные данные
    const firstName = 'Saul';
    const lastName = 'Goodman';
    const fullName = `${firstName} ${lastName}`;
    const email = 'saul_goodman@gmail.com';

    console.log('Fillng inputs');
    await page.waitForSelector('input[name="first_name"]');
    await page.fill('input[name="first_name"]', firstName);
    await page.fill('input[name="last_name"]', lastName);
    await page.fill('input[name="email"]', email);

    console.log('Click on Save');
    const saveButton = page.locator('[aria-label="Save"]');
    await saveButton.waitFor({ state: 'visible' });
    await saveButton.click();

    console.log('Waiting redirect or Error...');
    await page.waitForTimeout(3000); // Даем время на редирект или показ ошибки

    const currentUrl = page.url();
    console.log(`CurrentURL: ${currentUrl}`);
    if (currentUrl.includes('/create')) {
        console.log('Atention: Client not Saved!');
        await page.screenshot({ path: 'error_after_save.png' });
        throw new Error('Client not saved!');
    }

    console.log('Back to Customers page');
    await page.goto('https://marmelab.com/react-admin-demo/#/customers');

    console.log('Waiting Table');
    await page.waitForSelector('.RaDatagrid-table');

    console.log('Waiting Search');
    const searchInput = page.locator('[placeholder="Search"]');
    await searchInput.waitFor({ state: 'visible' });

    console.log(`Filling Search: ${fullName}`);
    await searchInput.fill(fullName);
    await searchInput.press('Enter');

    console.log('Waiting Client');
    const customerRow = page.locator('div.RaList-main').locator(`text=${fullName}`);
    await expect(customerRow).toBeVisible({ timeout: 10000 });

    console.log('Here is Client!');
});
