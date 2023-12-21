import { test, expect } from '@playwright/test';

test('log the network apis', async ({ page }) => {

    // Intercept network requests
    await page.route('**/api/tags', async (route, request) => {
      console.log('Request URL:', request.url());
    //   console.log('Response:', request.response());
      await route.continue();
        
    });
    await page.goto('https://demo.realworld.io/#/');
  
  })