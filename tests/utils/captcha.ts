import { Page } from "playwright-core";

export async function CAPTCHAIfVisible(page: Page): Promise<void> {
  const captchaFrame = page.frameLocator('iframe[src*="captcha"]');
  if (await captchaFrame.locator('text=보안문자를 입력하세요').isVisible({ timeout: 3000 })) {
    console.log('CAPTCHA 감지됨. 수동 입력 필요!');
    throw new Error('CAPTCHA가 감지되어 테스트를 중단합니다.');
  }
}
