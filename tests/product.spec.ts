import { test, expect } from '@playwright/test';

test('상품 상세 페이지 진입', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[name="searchQuery"]', '셔츠');
  await page.keyboard.press('Enter');

  await page.click('.list-box .img-block >> nth=0');
  await expect(page).toHaveURL(/goods/);
});
