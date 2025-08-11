import { test, expect } from '@playwright/test';

test('마이페이지 접근', async ({ page }) => {
  await page.goto('/');
  await page.click('text=마이페이지');
  await expect(page).toHaveURL(/mypage/);
});
