import { test, expect } from '@playwright/test';

test('상품 상세 페이지 진입', async ({ page }) => {

   //상품 상세 페이지로 이동
  await page.goto('https://www.musinsa.com/products/3976350');

  // 옵션 선택 버튼 클릭
  await page.waitForSelector('[data-button-id="option_type"]');
  await page.click('[data-button-id="option_type"]');

  // 사이즈 선택
  await page.click('text=100');

  // 장바구니 담기
  await page.click('button:has-text("장바구니")');
});
