import { test, expect } from "@playwright/test";
import { englishDossierBatch25 } from "../src/lib/english-dossier-batch25-20261016";
import { getSlot } from "../src/lib/data-v128";
import { englishCatalogFact } from "../src/lib/english-catalog-facts";

const slugs = Object.keys(englishDossierBatch25);
test("first 25-dossier batch has source-backed records", () => {
  expect(slugs).toHaveLength(25);
  for (const slug of slugs) {
    const game = getSlot(slug);
    expect(game, `Missing original dossier: ${slug}`).toBeDefined();
    expect(game?.source).toMatch(/^https:\/\//);
  }
});

for (const slug of slugs) {
  test(`English dossier: ${slug}`, async ({ page }) => {
    const game = getSlot(slug);
    expect(game).toBeDefined();
    await page.goto(`/en/slots/${slug}/`);
    await expect(page.getByRole("heading", { name: game!.name, exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "How wins work" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Editorial perspective" })).toBeVisible();
    await expect(page.locator(".slot-summary dl")).toContainText(englishCatalogFact(game!.rtp));
    await expect(page.locator(".slot-summary dl")).toContainText(englishCatalogFact(game!.field));
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/en/slots/${slug}/?$`));
  });
}
test("English catalogue keeps the original 1000-game selection", async ({ page }) => {
  await page.goto("/en/slots/");
  await expect(page.getByRole("status").first()).toContainText("1000 games");
});
