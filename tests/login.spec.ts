import { test, expect } from '@playwright/test';
import { MUSINSA_ID, MUSINSA_PW } from '../utils/env';

test('회원 로그인', async ({ page }) => {
  //로그인 페이지로 이동
  await page.goto('https://www.musinsa.com/auth/login');

  //로그인 정보 입력
  await page.waitForSelector('input[title="아이디 입력"]');
  await page.fill('input[title="아이디 입력"]', MUSINSA_ID);
  await page.fill('input[title="비밀번호 입력"]', MUSINSA_PW);
  await page.click('button[type="submit"]');
  
   // CAPTCHA 감지
  const captcha = page.locator('iframe[src*="captcha"]');
  if (await captcha.isVisible()) {
    console.log('CAPTCHA가 감지 수동 클릭');
  await page.pause(); 
}

  //로그인 성공 확인
  await expect(page).toHaveURL(/recommend/);

});


