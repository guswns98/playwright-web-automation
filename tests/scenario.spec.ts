import { test, expect } from '@playwright/test';
import { MUSINSA_ID, MUSINSA_PW } from '../utils/env';


test('로그인 후 상품 장바구니 담기 및 결제 흐름', async ({ page }) => {
  //로그인 페이지로 이동
  await page.goto('https://www.musinsa.com/auth/login');

  //로그인 정보 입력
  await page.waitForSelector('input[title="아이디 입력"]');
  await page.fill('input[title="아이디 입력"]', MUSINSA_ID);
  await page.fill('input[title="비밀번호 입력"]', MUSINSA_PW);
  await page.click('button[type="submit"]');


  //로그인 성공 확인
  await expect(page).toHaveURL(/recommend/);
  //await expect(page.locator('aria-label="로그아웃"')).toBeVisible();

  //상품 상세 페이지로 이동
  await page.goto('https://www.musinsa.com/products/3976350');

  // 옵션 선택 버튼 클릭
  await page.waitForSelector('[data-button-id="option_type"]');
  await page.click('[data-button-id="option_type"]');

  // 사이즈 선택
  await page.click('text=100');

  // 장바구니 담기
  await page.click('button:has-text("장바구니")');


  //장바구니 페이지로 이동
  await page.goto('https://www.musinsa.com/orders/cart');

//   //장바구니에 상품이 담겼는지 확인
//   await expect(page.locator('.cart')).toContainText('상품명'); 

//   //결제 버튼 클릭
//   await page.click('text=구매하기');

//   //결제 페이지로 이동 확인
//   await expect(page).toHaveURL(/order/);
});