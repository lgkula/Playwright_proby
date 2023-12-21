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

    await page.route('**/api/tags', async route => {
        console.log('url ' + route.request().url());
        // Fetch original response.
        const response = await page.request.fetch(route.request());
        // Add a prefix to the title.
        let status = await response.status();
        // First solution
        let responseBodyText = await response.text();
        let responseBodyParseJson = JSON.parse(responseBodyText);
        let tagsFromParse = responseBodyParseJson.tags;
        // Second solution
        let responseBodyJson2 = await response.json();
        let tagsFromJson2 = await responseBodyJson2.tags;
        
        // Logs
        console.log('status = ' + status);
        console.log('body text = ' + responseBodyText);
        console.log({responseBodyParseJson: responseBodyParseJson});
        console.log({tagsFromParse: tagsFromParse});
        console.log({responseBodyJson2: responseBodyJson2});
        console.log({tagsFromJson2: tagsFromJson2});
        routeCallback();
    });

    await page.goto('https://demo.realworld.io/');

    // Wait before /created response is received.
    await routePromise;

    await browser.close();
});

test('Intercept response - copy', async () => {
    const browser = await chromium.launch({
        headless: true
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    
    let routeCallback;
    const routePromise = new Promise(r => routeCallback = r);

    await page.route('**/api/tags', async route => {
        console.log('url ' + route.request().url());
        // Fetch original response.
        const response = await page.request.fetch(route.request());
        // Add a prefix to the title.
        let status = await response.status();
        let responseBodyJson = await response.json();
        let tagsFromJson = await responseBodyJson.tags;
        
        // Logs
        console.log('status = ' + status);
        console.log({responseBodyJson: responseBodyJson});
        console.log({tagsFromJson: tagsFromJson});
        routeCallback();
    });

    await page.goto('https://demo.realworld.io/');

    // Wait before /created response is received.
    await routePromise;

    await browser.close();
});

    // const response = await page.waitForResponse('**/api/tags');


test('Intercept response with wait', async () => {
    const browser = await chromium.launch({
        headless: true
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    let routeCallback;
    const routePromise = new Promise(r => routeCallback = r);

    await page.route('**/api/tags', async route => {
        console.log('url ' + route.request().url());
        // Fetch original response.
        const response = await page.request.fetch(route.request());
        // const response = await page.waitForResponse('**/api/tags');
        let status = await response.status();
        let responseBodyJson = await response.json();
        let tagsFromJson = await responseBodyJson.tags;
        
        // Logs
        console.log('status = ' + status);
        console.log({responseBodyJson2: responseBodyJson});
        console.log({tagsFromJson2: tagsFromJson});
        routeCallback();
    });

    await page.goto('https://demo.realworld.io/');

    // Wait before /created response is received.
    await routePromise;

    await browser.close();
});

test('wait for response from documentation', async ({ page }) => {
    // Start waiting for response before clicking. Note no await.
    const responsePromise = page.waitForResponse('**/api/tags');
    await page.goto('https://demo.realworld.io/');
    const response = await responsePromise;
    const responseBody = await response.text();
    console.log(responseBody);
    

    // // Alternative way with a predicate. Note no await.
    // const responsePromise = page.waitForResponse(response =>
    // response.url() === 'https://example.com' && response.status() === 200
    // );
    // await page.getByText('trigger response').click();
    // const response = await responsePromise;
})

test('asia test - wait for response from documentation', async ({ page }) => {

const responsePromise = page.waitForResponse('**/api/tags');
await page.goto('https://demo.realworld.io/');
const response = await responsePromise;

// Sprawdź, czy odpowiedź jest przekierowaniem
if (response.status() >= 300 && response.status() <= 399 && response.headers()['location']) {
  // Obsłuż przekierowanie
  const redirectedResponse = await page.waitForResponse(response.headers()['location']);
  const responseBody = await redirectedResponse.json();
  console.log(responseBody);
} else {
  // Odczytaj treść (body) odpowiedzi
  const responseBody = await response.json();
  console.log(responseBody);
}
})

test('Intercept', async () => {
    const browser = await chromium.launch({
        headless: true
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    
    await page.route('**/api/tags', async route => {
        console.log('url ' + route.request().url());
        const response = await page.request.fetch(route.request());
        let status = await response.status();
        let responseBodyJson = await response.json();
        let tagsFromJson = await responseBodyJson.tags;
        
        // Logs
        console.log('status = ' + status);
        console.log({responseBodyJson: responseBodyJson});
        console.log({tagsFromJson: tagsFromJson});
    });
        await page.goto('https://demo.realworld.io/');
     page.waitForResponse('**/api/tags');
        // await responsePromise
})

