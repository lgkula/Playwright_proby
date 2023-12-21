import { test, expect, chromium } from '@playwright/test';

test("mocks a fruit and doesn't call api", async ({ page }) => {
  // Mock the api call before navigating
  await page.route('*/**/api/v1/fruits', async route => {
    const json = [{ name: 'Kiwi', id: 21 }];
    await route.fulfill({ json });
  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');
  // Assert that the Kiwi fruit is visible
  await expect(page.getByText('Kiwi')).toBeVisible();
});

test("Template for documentation", async ({ page }) => {
  // Mock the api call before navigating
  await page.route('*/**/api/v1/fruits', async route => {
    const mockedBody = [{ name: 'Kiwi', id: 21 }];
    await route.fulfill({ json: mockedBody });
  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');
  // Assert that the Kiwi fruit is visible
  await expect(page.getByText('Kiwi')).toBeVisible();
});

test.only("playwright docs example @mock-ex11", async ({ page }) => {
  const expectedTitle = "How to write effective test cases";

  // 1. Example form official Playwright docs: https://playwright.dev/docs/mock
  // 2. API path to const apiPath
  // 3. Full response body object const articleJSON 
  // 4. Changed value of title '💪 Mocked title value 😎'
  // 5. Use expectedTitle as reference

  const articleTitle = '💪 Mocked title value 😎'
  const requestBodyJson = {
    "id": 1,
    "title": articleTitle,
    "body": "Test cases are the backbone of any testing process. They define what to test, how to test, and what to expect. Writing effective test cases can save time, effort, and resources. Here are some tips for writing effective test cases:\n- Use clear and concise language\n- Follow a consistent format and structure\n- Include preconditions, steps, expected results, and postconditions\n- Cover positive, negative, and boundary scenarios\n- Prioritize test cases based on risk and importance\n- Review and update test cases regularly",
    "user_id": 1,
    "date": "2021-07-13T16:35:00Z",
    "image": ".\\data\\images\\256\\chuttersnap-9cCeS9Sg6nU-unsplash.jpg"
  }

  // Mock the api call before navigating
  await page.route('**/api/articles/1', async route => {
    await route.fulfill({
      status: 404,
      json: requestBodyJson});
  });

  await page.goto("https://likeable-subdued-onion.glitch.me/article.html?id=1");
  const observedTitle = page.getByTestId("article-title");
  // await page.waitForTimeout(50000)
  await expect(observedTitle).toHaveText(articleTitle);
});