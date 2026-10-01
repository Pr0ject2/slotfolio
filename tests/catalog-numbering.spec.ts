import { expect, test } from "@playwright/test";

test("a slot keeps the same catalog number when sorting changes", async ({ page }) => {
  await page.goto("/slots");
  const firstCard = page.locator("[data-slot]").first();
  const slug = await firstCard.getAttribute("data-slot");
  const number = await firstCard.getAttribute("data-card-number");
  expect(slug).toBeTruthy();
  expect(number).toMatch(/^\d+$/);

  await page.locator('select[aria-label="Сортировка"]').selectOption("name");
  const sameCard = page.locator(`[data-slot="${slug}"]`);
  await expect(sameCard).toHaveAttribute("data-card-number", number || "");
});
