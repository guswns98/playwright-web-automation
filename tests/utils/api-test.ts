import { APIRequestContext, BrowserContext, expect } from '@playwright/test';

export async function verifyProductInCart(
  request: APIRequestContext,
  context: BrowserContext,
  productNo: string
): Promise<void> {
  // 쿠키 가져오기
  const cookies = await context.cookies();
  const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

  // API 요청
  const cartRes = await request.get(
    'https://www.musinsa.com/app/cart/cartGoodsList',
    {
      headers: {
        cookie: cookieHeader,
        accept: 'application/json',
      },
    }
  );


  // 디버깅 로그 추가
  console.log('응답 상태 코드:', cartRes.status());
  console.log('응답 본문:', await cartRes.text());

  // 상태 코드 검증
  expect(cartRes.status()).toBe(200);
  const cartData = await cartRes.json();
  console.log('장바구니 API 응답:', cartData);

  // 상품 번호 비교
  const isProductInCart = cartData.data.contents.content.some(
    (item: any) => String(item.goodsNo) === productNo
  );

  if (!isProductInCart) {
    console.error(
      `❌ 상품 ${productNo}이 장바구니에 없습니다. 현재 목록:`,
      cartData.data.contents.content.map((item: any) => item.goodsNo)
    );
  }
  console.log(JSON.stringify(cartData.data.contents.content, null, 2));
  expect(isProductInCart).toBe(true);

}
