# Playwright 기반 WEB 자동화 프로젝트
본 프로젝트는 무신사 WEB 주요 기능에 대해 E2E 시나리오로 자동화하여 QA 효율성을 높이기 위해 설계하였습니다.


## 사용 기술
- TypeScript
- Playwright
- Node.js


## 프로젝트 구조
```
- Projects
- ├── scenario.spec.ts  — 전체 테스트 시나리오 실행 스크립트
- └── utils
-     ├── env.ts              — 실행 단계별 스크린샷 저장 모듈
-     ├── captcha.ts          — captcha 감지 시 수동 입력 처리
-     ├── delay.ts            — 딜레이 처리
-     ├── checkCartItems.ts   — 장바구니에 담긴 상품 확인 처리
-     ├── popup.ts            — 조건부 팝업 시 처리
-     └── api-test.ts         — 장바구니 api 응답 상태코드 데이터 확인
```

## TEST 시나리오
- 로그인
    - id/pw 입력
    - captcha 감지 시 수동 입력
- 상품 검색
    - 검색창에 키워드 입력 후 검색
    - 상품 상세 페이지 이동
- 상품 상세 페이지 진입
    - 드롭다운 선택 후 상품 사이즈 선택
- 장바구니 담기 및 결제 흐름
    - 장바구니 담기 > 장바구니 데이터 검증 > 결제 > 결제 페이지 이동 확인
  


[데모 영상 보기](https://www.youtube.com/watch?v=hWxF9gyGtIc&feature=youtu.be)