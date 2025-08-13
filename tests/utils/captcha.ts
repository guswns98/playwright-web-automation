import { Page } from "playwright-core";

export async function CAPTCHAIfVisible(page: Page): Promise<void> {
  const captchaFrame = page.frameLocator('iframe[name^="c-"]'); // challenge iframe
  const captchaTextarea = await captchaFrame.locator('#g-recaptcha-response').elementHandle();

  if (captchaTextarea) {
    console.log('CAPTCHA 감지됨. 수동 입력 필요!');
    throw new Error('CAPTCHA가 감지되어 테스트를 중단합니다.');
  }


}
