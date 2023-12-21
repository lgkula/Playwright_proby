// @ts-check
import { test, expect, chromium } from '@playwright/test';

test('Intercept response', async () => {
    const browser = await chromium.launch({
        headless: true
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://demoqa.com/links");
    
    let routeCallback;
    const routePromise = new Promise(r => routeCallback = r);

    await page.route('**/created', async route => {
        console.log('url ' + route.request().url());
        // Fetch original response.
        const response = await page.request.fetch(route.request());
        // Add a prefix to the title.
        let status = await response.status();
        console.log('status = ' + status);
        routeCallback();
    });

    await page.click("//a[@id='created']");

    // Wait before /created response is received.
    await routePromise;

    await browser.close();
});