import { expect, test } from "@playwright/test";

test("catalog cards expose stable sequential numbers", async ({ page }) => {
  await page.goto("/slots");
  const cards = page.locator("[data-coverage]");
  const total = await cards.count();
  expect(total).toBeGreaterThan(0);
  await expect(cards.first().locator('[aria-label^="Номер карточки"]')).toHaveText("№ 1");
});
