import { test, expect } from '@playwright/test';

test('Open GAD', async ({ page }) => {
    await page.goto('https://likeable-subdued-onion.glitch.me/articles.html');
    await expect(page).toHaveTitle(/GAD/);
})


test('Intercept for GAD', async () => {
    const { chromium } = require('playwright');

    const browser = await chromium.launch();
    const context = await browser.newContext();

    // Przechwytywanie żądań i odczytywanie odpowiedzi
    // await context.route('https://likeable-subdued-onion.glitch.me/api/articles**', async route => {
        await context.route('https://likeable-subdued-onion.glitch.me/api/articles?_limit=6&_page=1&_sort=date&_order=DESC', async route => {
        const response = await route.continue();
        console.log(response);
        // const responseBody = await response.text();
        
        // const response = await route.fetch();
        // const json = await response.json();
        // console.log('Odpowiedź:', responseBody);

        if (response) {
            console.log(response);
            const responseBody = await response.text();
            console.log('Odpowiedź:', responseBody);
          } else {
            console.log('Brak responsa');
            
          }
    });

    const page = await context.newPage();
    await page.goto('https://likeable-subdued-onion.glitch.me/articles.html');
    await expect(page).toHaveTitle(/GAD/);

    // Wykonaj inne operacje na stronie

    await browser.close();

})
