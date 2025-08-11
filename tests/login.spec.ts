import { test, expect } from '@playwright/test';

test('회원 로그인', async ({ page }) => {
  await page.goto('https://www.musinsa.com');
  await page.click('text=로그인'); // 버튼 텍스트 기반 클릭
  await page.fill('#id', 'your_id');
  await page.fill('#pw', 'your_password');
  await page.click('button[type=submit]');
  await expect(page).toHaveURL(/musinsa\.com/);
});
