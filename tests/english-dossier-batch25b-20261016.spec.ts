import { test, expect } from "@playwright/test";
import { getSlot } from "../src/lib/data-v128";
import { englishDossierSlugs } from "../src/lib/english-dossier-routes";
import { englishDossierBatch } from "../src/lib/english-dossier-batch-20261016";
import { englishDossierBatch25 } from "../src/lib/english-dossier-batch25-20261016";
import { englishDossierBatch25B } from "../src/lib/english-dossier-batch25b-20261016";

const newSlugs = Object.keys(englishDossierBatch25B);

test("route registry matches all 56 published-in-draft English dossiers", () => {
  expect(newSlugs).toHaveLength(25);
  const expected = [
    "gates-of-olympus",
    ...Object.keys(englishDossierBatch),
    ...Object.keys(englishDossierBatch25),
    ...Object.keys(englishDossierBatch25B),
  ];
  expect(new Set(expected).size).toBe(56);
  expect([...englishDossierSlugs].sort()).toEqual([...expected].sort());
  for (const slug of expected) {
    const game = getSlot(slug);
    expect(game, `Missing source-backed dossier ${slug}`).toBeDefined();
    expect(game?.source).toMatch(/^https:\/\//);
  }
});

for (const slug of newSlugs) {
  test(`English dossier: ${slug}`, async ({ page }) => {
    const game = getSlot(slug);
    expect(game).toBeDefined();
    await page.goto(`/en/slots/${slug}/`);
    await expect(page.getByRole("heading", { name: game!.name, exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "How wins work" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Editorial perspective" })).toBeVisible();
    await expect(page.locator(".slot-summary dl")).toContainText(game!.field);
    await expect(page.locator(".slot-summary dl")).toContainText(game!.rtp);
    await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/en/slots/${slug}/?$`));
    await expect(page.getByRole("link", { name: "Publisher information / primary reference" })).toHaveAttribute("href", game!.source);
  });
}
