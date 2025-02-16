import { test, expect } from '@playwright/test';

test('Check max input length in form fields', async ({ page }) => {
    await page.goto('https://marmelab.com/react-admin-demo/#/login');

    console.log('Enter on website...');
    await page.fill('input[type="text"]', 'demo');
    await page.fill('input[type="password"]', 'demo');
    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000); // Waiting redirect

    console.log('Go to create form...');
    await page.goto('https://marmelab.com/react-admin-demo/#/customers/create');

    const fieldSelectors = [
        { name: 'first_name', selector: 'input[name="first_name"]' },
        { name: 'last_name', selector: 'input[name="last_name"]' },
        { name: 'email', selector: 'input[name="email"]' }
    ];

    const testLengths = [100, 1000, 5000, 10000];

    for (const field of fieldSelectors) {
        console.log(`Checking inputs: ${field.name}`);

        try {
            await page.waitForSelector(field.selector, { timeout: 5000 }); 
        } catch (error) {
            console.error(`Error "${field.name}" not find!`);
            continue; 
        }

        let maxLength = 0;

        for (const length of testLengths) {
            const testString = 'A'.repeat(length);
            console.log(`Printing  ${length} symbols in "${field.name}"...`);

            await page.fill(field.selector, testString);
            const inputValue = await page.inputValue(field.selector);

            if (inputValue.length === length) {
                console.log(`Input "${field.name}" can have ${length} symbols`);
                maxLength = length;
            } else {
                console.warn(`Maximum! Input"${field.name}" cut for ${inputValue.length} symbols`);
                break;
            }
        }

        console.log(`Maximum length in input "${field.name}": ${maxLength} symbols\n`);
    }
});
