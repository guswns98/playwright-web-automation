import { test, expect } from '@playwright/test';


test('로그인 후 상품 장바구니 담기 및 결제 흐름', async ({ page }) => {
  //로그인 페이지로 이동
  await page.goto('https://www.musinsa.com/member/login');

  //로그인 정보 입력
  await page.fill('#id', process.env.MUSINSA_ID!);
  await page.fill('#pw', process.env.MUSINSA_PW!);
  await page.click('button[type="submit"]');

  //로그인 성공 확인
  await expect(page).toHaveURL(/member\/my/);

  //상품 상세 페이지로 이동
  await page.goto('https://www.musinsa.com/products/3976350');

  //사이즈 선택 (필요한 경우)
  await page.click('.option-box'); 
  await page.click('text=100'); 

  //장바구니 담기
  await page.click('button.btn-cart');

  //장바구니 페이지로 이동
  await page.goto('https://www.musinsa.com/cart');

  //장바구니에 상품이 담겼는지 확인
  await expect(page.locator('.cart')).toContainText('상품명'); 

  //결제 버튼 클릭
  await page.click('text=구매하기');

  //결제 페이지로 이동 확인
  await expect(page).toHaveURL(/order/);
});