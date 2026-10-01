import { expect, test } from "@playwright/test";

test("catalog cards expose a visible number", async ({ page }) => {
  await page.goto("/slots");
  const numberedCard = page.locator('[aria-label^="Номер карточки"]').first();
  await expect(numberedCard).toBeVisible();
  await expect(numberedCard).toContainText("№");
});
