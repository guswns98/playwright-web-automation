import { Page, expect } from '@playwright/test';

export async function checkCartItems(page: Page): Promise<void> {
  // 새로고침으로 상태 반영
  await page.reload({ waitUntil: 'networkidle' });

  // 장바구니 상품 확인
  const cartItemList = page.locator('div.cart-goods');
  const itemCount = await cartItemList.count();

  if (itemCount > 0) {
    console.log(`✅ 장바구니에 ${itemCount}개의 상품이 있습니다.`);
    await expect(cartItemList.first()).toBeVisible({ timeout: 10000 });
  } else {
    console.log('❌ 장바구니에 상품이 없습니다. HTML 출력');
    const cartHtml = await page.innerHTML('div.cart-goods-list');
    console.log(cartHtml);
  }
}
