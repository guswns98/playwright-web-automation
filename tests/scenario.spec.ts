import { test, expect } from '@playwright/test';
import { MUSINSA_ID, MUSINSA_PW } from './utils/env';
import { randomDelay } from './utils/delay';
import { checkCartItems } from './utils/checkCartItems';
import { closePopupIfVisible } from './utils/popup';
import { CAPTCHAIfVisible } from './utils/captcha';
import { verifyProductInCart } from './utils/api-test';



test('로그인 후 상품 장바구니 담기 및 결제 흐름', async ({ page, request, context }) => {
    //로그인 페이지로 이동
    await page.goto('https://www.musinsa.com/auth/login');
    
    //로그인 정보 입력
    await page.waitForSelector('input[title="아이디 입력"]');
    await page.fill('input[title="아이디 입력"]', MUSINSA_ID,);
    await page.waitForTimeout(randomDelay());
    await page.fill('input[title="비밀번호 입력"]', MUSINSA_PW);
    await page.waitForTimeout(randomDelay());
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');

    // CAPTCHA 감지 시 
    // await CAPTCHAIfVisible(page);

    // CI 환경 로그인 후 글로벌 페이지로 리디렉션되면 한국 사이트로 다시 이동
    if (page.url().includes('global.musinsa.com/choose-location')) {
    await page.goto('https://www.musinsa.com');
    }

    //로그인 성공 확인
    await expect(page).toHaveURL(/recommend/);
    await page.waitForTimeout(2000);  

    // 상품 검색
    await page.waitForSelector('[data-button-id="search_window"]');
    await page.click('[data-button-id="search"]');
    await page.keyboard.type('나이키');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');



    //상품 상세 페이지로 이동
    await page.goto('https://www.musinsa.com/products/3976290');


    // 드롭다운 선택 버튼 클릭
    await page.waitForSelector('[data-button-id="option_type"]');
    await page.click('[data-button-id="option_type"]');

    // 항목 선택 후 클릭 
    await page.waitForSelector('[data-button-id="select_optionvalue"] >> text=240');
    await page.click('[data-button-id="select_optionvalue"] >> text=240');


    // 장바구니 담기 
    await page.click('button[data-button-id="basket_btn"]');
    await page.waitForTimeout(2000);  


    //장바구니 페이지 이동 새로고침
    await page.goto('https://www.musinsa.com/orders/cart');
    await page.reload({ waitUntil: 'networkidle' });


    // 조건부 팝업 닫기  
    await closePopupIfVisible(page);

    // //API 장바구니 데이터 검증
    // await verifyProductInCart(request, context, '3976290');


    //장바구니에 상품이 담겼는지 확인
    await checkCartItems(page);

    // 장바구니 항목 체크
    await page.click('.cart-all-check__checkbox');

    //결제 버튼 클릭
    await page.click('button.cart-float__button.is-active');

    //결제 페이지로 이동 확인
    await expect(page).toHaveURL(/order/);
    await page.waitForTimeout(3000);  

    //메인 홈 이동
    await page.waitForSelector('[data-button-id="musinsa_store"]');
    await page.click('[data-button-id="musinsa_store"]');

    
    });
    

    