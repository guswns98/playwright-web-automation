import { test, expect } from '@playwright/test';

test('상품 검색 및 필터 적용', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[name="searchQuery"]', '셔츠');
  await page.keyboard.press('Enter');

  // 필터 예시: 브랜드 필터
  await page.click('text=브랜드');
  await page.check('input[value="musinsa_standard"]');

  await expect(page.locator('.list-box')).toContainText('셔츠');
});
