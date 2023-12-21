import { test, expect, chromium } from '@playwright/test';

test('Intercept tags from realword.io', async ({ page }) => {

    const responsePromise = page.waitForResponse('**/api/tags');
    await page.goto('https://demo.realworld.io/');
    const response = await responsePromise;
    let responseBody
    
    // Sprawdź, czy odpowiedź jest przekierowaniem
    if (response.status() >= 300 && response.status() <= 399 && response.headers()['location']) {
      // Read redirected response body
      const redirectedResponse = await page.waitForResponse(response.headers()['location']);
      responseBody = await redirectedResponse.json();
    } else {
      // Read non redirected response body
      responseBody = await response.json();
      
    }
      console.log('responseBody: ',responseBody);
      const responseBodyTags = await responseBody.tags;
      console.log('responseBodyTags: ', responseBodyTags);
      
    })

test('Intercept articles from realword.io', async ({ page }) => {

    const responsePromise = page.waitForResponse('**/api/articles*');
    await page.goto('https://demo.realworld.io/');
    const response = await responsePromise;
    let responseBody
    
    // Sprawdź, czy odpowiedź jest przekierowaniem
    if (response.status() >= 300 && response.status() <= 399 && response.headers()['location']) {
      // Read redirected response body
      const redirectedResponse = await page.waitForResponse(response.headers()['location']);
      responseBody = await redirectedResponse.json();
    } else {
      // Read non redirected response body
      responseBody = await response.json();
    }
      console.log('responseBody: ',responseBody);
    //   const responseBodyTags = await responseBody.tags;
    //   console.log('responseBodyTags: ', responseBodyTags);
      
    })

test('Intercept articles from GAD', async ({ page }) => {

    const responsePromise = page.waitForResponse('**/api/articles?_limit=6&_page=1&_sort=date&_order=DESC');
    // await page.goto('http://localhost:3000/');
    await page.goto('https://likeable-subdued-onion.glitch.me/articles.html');
    const response = await responsePromise;
    let responseBody
    
    // Sprawdź, czy odpowiedź jest przekierowaniem
    if (response.status() >= 300 && response.status() <= 399 && response.headers()['location']) {
      // Read redirected response body
      const redirectedResponse = await page.waitForResponse(response.headers()['location']);
      responseBody = await redirectedResponse.json();
    } else {
      // Read non redirected response body
      responseBody = await response.json();
    }
      console.log('responseBody: ',responseBody);
    //   const responseBodyTags = await responseBody.tags;
    //   console.log('responseBodyTags: ', responseBodyTags);
      
    })

    test('Intercept articles from PW mock', async ({ page }) => {

    const responsePromise = page.waitForResponse('**/api-mocking/api/v1/fruits');
    
    await page.goto('https://demo.playwright.dev/api-mocking/');
    const response = await responsePromise;
    let responseBody
    
    // Sprawdź, czy odpowiedź jest przekierowaniem
    if (response.status() >= 300 && response.status() <= 399 && response.headers()['location']) {
      // Read redirected response body
      const redirectedResponse = await page.waitForResponse(response.headers()['location']);
      responseBody = await redirectedResponse.json();
    } else {
      // Read non redirected response body
      responseBody = await response.json();
    }
      console.log('responseBody: ',responseBody);
    //   const responseBodyTags = await responseBody.tags;
    //   console.log('responseBodyTags: ', responseBodyTags);
      
    })
    
    test('Template for documentation', async ({ page }) => {

      const responsePromise = page.waitForResponse('**/api-mocking/api/v1/fruits');
      await page.goto('https://demo.playwright.dev/api-mocking/');
      const response = await responsePromise;
      
      // Response status
      const responseStatus = await response.status();
      // Response body in JSON format:
      const  responseBodyJson = await response.json();
      // Response body in text format:
      const  responseBodyString = await response.text();
      const responseBodyParseJson = JSON.parse(responseBodyString);

      console.log('responseStatus: ', responseStatus);
      
      // Log field name from first element in array response
      console.log('responseBodyJson: ',responseBodyJson[0].name);
    })


    test('Template for documentation 3xx', async ({ page }) => {

    const responsePromise = page.waitForResponse('**/api-mocking/api/v1/fruits');
    await page.goto('https://demo.playwright.dev/api-mocking/');
    const response = await responsePromise;
    let responseBodyJson
    
    // Check if response is redirected
    if (response.status() >= 300 && response.status() <= 399 && response.headers()['location']) {
      // Read redirected response body
      const redirectedResponse = await page.waitForResponse(response.headers()['location']);
      responseBodyJson = await redirectedResponse.json();
    } else {
      // Read non redirected response body
      responseBodyJson = await response.json();
    }
      console.log('responseBodyJson: ',responseBodyJson);
    })

    