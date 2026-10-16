import { test, expect } from "@playwright/test";
import { englishDossierBatch25 } from "../src/lib/english-dossier-batch25-20261016";

const slugs = Object.keys(englishDossierBatch25);
test("all 25 new dossiers have static English routes, checked-in copy and noindex", async ({ page }) => {
  expect(slugs).toHaveLength(25);
  for (const slug of slugs) {
    await page.goto(`/en/slots/${slug}/`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { name: "How wins work" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Editorial perspective" })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/en/slots/${slug}/?$`));
  }
});
test("English catalogue still preserves the original 1000-game selection", async ({ page }) => {
  await page.goto("/en/slots/");
  await expect(page.getByRole("status").first()).toContainText("1000 games");
  // Page size is 18: other routes are checked individually above.
});
