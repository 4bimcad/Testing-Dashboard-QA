import { test } from '@playwright/test';

test('Performance: Download time', async ({ page }) => {
    const start = performance.now();
    await page.goto('https://marmelab.com/react-admin-demo/#/');
    const end = performance.now();
    const timeInSeconds = (end - start) / 1000; // In Seconds
    console.log(`Download time is: ${timeInSeconds.toFixed(2)} seconds`);
});
