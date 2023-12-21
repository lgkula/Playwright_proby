// @ts-check
import { test, expect, chromium } from '@playwright/test';

test('Intercept response', async () => {
    const browser = await chromium.launch({
        headless: true
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    
    let routeCallback;
    const routePromise = new Promise(r => routeCallback = r);

    await page.route('https://likeable-subdued-onion.glitch.me/api/articles**', async route => {
        console.log('url ' + route.request().url());
        // Fetch original response.
        const response = await page.request.fetch(route.request());
        // Add a prefix to the title.
        let status = await response.status();
        let responseBody = await response.text();
        let responseBody1 = await response.json();
        console.log('status = ' + status);
        console.log('body = ' + responseBody);
        routeCallback();
    });

    await page.goto('https://likeable-subdued-onion.glitch.me/articles.html');
    // await page.click("//a[@id='created']");

    // Wait before /created response is received.
    await routePromise;

    await browser.close();
});