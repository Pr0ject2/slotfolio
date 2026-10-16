import { test, expect } from "@playwright/test";

test("English catalogue cards keep original game data and identify Russian dossiers", async ({ page }) => {
  await page.goto("/en/slots/");
  const first = page.locator(".catalog-game").first();
  await expect(first).toBeVisible();
  await expect(first.getByText("Detailed review in Russian")).toBeVisible();
  await expect(first.locator("dl")).toHaveAttribute("aria-label", "Game details");
  await expect(first.locator("a[aria-label$='(Russian)']").first()).toBeVisible();
  await expect(page.getByText("The game descriptions and detailed reviews are currently available in Russian.")).toBeVisible();
});
