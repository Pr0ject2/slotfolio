import { test, expect } from "@playwright/test";
import { englishCatalogFact } from "../src/lib/english-catalog-facts";
import { getSlot } from "../src/lib/data-v128";
import { englishDossierSlugs, hasEnglishDossier } from "../src/lib/english-dossier-routes";
import { englishDossierBatch25C } from "../src/lib/english-dossier-batch25c-20261016";

const slugs = Object.keys(englishDossierBatch25C);
test("third dossier batch has 25 distinct, source-backed records and 81 EN routes", () => {
  expect(slugs).toHaveLength(25);
  expect(englishDossierSlugs.length).toBeGreaterThanOrEqual(81);
  expect(new Set(englishDossierSlugs).size).toBe(englishDossierSlugs.length);
  for (const slug of slugs) {
    expect(hasEnglishDossier(slug)).toBe(true);
    const game = getSlot(slug);
    expect(game, `Missing original game: ${slug}`).toBeDefined();
    expect(game?.source).toMatch(/^https:\/\//);
  }
});

for (const slug of slugs) {
  test(`English source-backed dossier: ${slug}`, async ({ page }) => {
    const game = getSlot(slug)!;
    await page.goto(`/en/slots/${slug}/`);
    await expect(page.getByRole("heading", { name: game.name, exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "How wins work" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Key feature" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Editorial perspective" })).toBeVisible();
    const facts = page.locator(".slot-summary dl");
    await expect(facts).toContainText(englishCatalogFact(game.field));
    await expect(facts).toContainText(englishCatalogFact(game.rtp));
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/en/slots/${slug}/?$`));
    await expect(page.getByRole("link", { name: "Publisher information / primary reference" })).toHaveAttribute("href", game.source);
  });
}

test("Max Win Machine does not invent a bonus feature unsupported by its publisher", async ({ page }) => {
  await page.goto("/en/slots/max-win-machine/");
  await expect(page.getByText(/does not substantiate extra FeatureSpins/)).toBeVisible();
});
