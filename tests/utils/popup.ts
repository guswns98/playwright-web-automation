export async function closePopupIfVisible(page: any) {
  // 조건부 팝업 닫기
  const popupCloseButton = page.locator('.popup-close');

  if (await popupCloseButton.count() > 0 && await popupCloseButton.isVisible()) {
  await popupCloseButton.click();
  }
}