import { expect, test } from "@playwright/test";

test("a slot keeps the same catalog number when sorting changes", async ({ page }) => {
  await page.goto("/slots");
  const firstCard = page.locator("[data-coverage]").first();
  const name = await firstCard.locator("h2").innerText();
  const number = await firstCard.locator('[aria-label^="Номер карточки"]').innerText();
  expect(number).toMatch(/^№ \d+$/);

  await page.getByLabel("Сортировка").selectOption("name");
  const sameCard = page.locator("[data-coverage]").filter({ hasText: name }).first();
  await expect(sameCard.locator('[aria-label^="Номер карточки"]')).toHaveText(number);
});
