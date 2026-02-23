import { expect, test } from '@playwright/test';

test('has title and h1 with required class', async ({ page }) => {
  await page.goto('/');

  const heading = page.locator('h1.text-mosquito');
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText('Discovery Instance');
});
