export async function closePopupIfVisible(page: any) {
  const closeBtn = page.locator('.bottom-sheet-musinsa-money__button');
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
    await page.waitForSelector('.bottom-sheet-musinsa-money__button', { state: 'hidden' });
  }
}