import { test, expect } from '@playwright/test';

test('상품 장바구니 담기 및 결제 흐름', async ({ page }) => {
  // 상품 상세 페이지로 이동
  await page.goto('https://www.musinsa.com/products/3976350');

  // 사이즈 선택 (필요한 경우)
  await page.click('.option-box'); // 또는 select[name="size"]로 조정
  await page.click('text=100'); // 원하는 사이즈 텍스트

  // 장바구니 담기
  await page.click('button.btn-cart'); // 또는 text=장바구니

  // 장바구니 페이지로 이동
  await page.goto('https://www.musinsa.com/cart');

  // 장바구니에 상품이 담겼는지 확인
  await expect(page.locator('.cart')).toContainText('상품명'); // 실제 상품명으로 변경 필요

  // 결제 버튼 클릭
  await page.click('text=구매하기'); // 또는 button.btn-buy

  // 결제 페이지로 이동 확인
  await expect(page).toHaveURL(/order/);
});