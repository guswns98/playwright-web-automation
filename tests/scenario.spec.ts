import { test, expect } from '@playwright/test';
import { MUSINSA_ID, MUSINSA_PW } from '../utils/env';
import { randomDelay } from '../utils/login';

test('로그인 후 상품 장바구니 담기 및 결제 흐름', async ({ page, request }) => {
  //로그인 페이지로 이동
  await page.goto('https://www.musinsa.com/auth/login');

  //로그인 정보 입력
  await page.waitForSelector('input[title="아이디 입력"]');
  await page.fill('input[title="아이디 입력"]', MUSINSA_ID,);
  await page.waitForTimeout(randomDelay());
  await page.fill('input[title="비밀번호 입력"]', MUSINSA_PW);
  await page.waitForTimeout(randomDelay());
  await page.click('button[type="submit"]');

 // CAPTCHA 감지 시 
  const captcha = page.locator('iframe[src*="captcha"]');
  if (await captcha.isVisible()) {
    console.log('CAPTCHA가 감지 수동 클릭');
  await page.pause();
}

  //로그인 성공 확인
  await expect(page).toHaveURL(/recommend/);


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


  //API로 장바구니 데이터 검증
  const cookies = await page.context().cookies();
  const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

  const cartRes = await request.get('https://www.musinsa.com/api/orders/cart', {
    headers: {
      cookie: cookieHeader,
      accept: 'application/json'
    }
  });

  expect(cartRes.status()).toBe(200);
  const cartData = await cartRes.json();
  console.log('장바구니 API 응답:', cartData);
  expect(cartData.items.some((item: any) => item.product_no === '3976350')).toBeTruthy();

  // 팝업 닫기 버튼 클릭 
  await page.click('button:has-text("닫기")');

  //장바구니에 상품이 담겼는지 확인
  const cartItem = page.locator('div.cart-goods[data-cart-id="1320505753"]');
  await expect(cartItem).toBeVisible();


  //결제 버튼 클릭
  await page.click('button.cart-float__button.is-active');

//   //결제 페이지로 이동 확인
//   await expect(page).toHaveURL(/order/);
});