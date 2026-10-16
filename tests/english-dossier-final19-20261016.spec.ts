import { test, expect } from "@playwright/test";
import { slots, getSlot } from "../src/lib/data-v128";
import { englishDossierSlugs, hasEnglishDossier } from "../src/lib/english-dossier-routes";
import { englishDossierBatchFinal19 } from "../src/lib/english-dossier-final19-20261016";
import { languageHref, translatedCounterpart } from "../src/lib/locales";

const newSlugs = Object.keys(englishDossierBatchFinal19);
test("the final batch covers exactly the 19 remaining full dossiers", () => {
  expect(slots).toHaveLength(100);
  expect(newSlugs).toHaveLength(19);
  expect(englishDossierSlugs).toHaveLength(100);
  expect(new Set(englishDossierSlugs).size).toBe(100);
  expect([...englishDossierSlugs].sort()).toEqual(slots.map(x => x.slug).sort());
  for (const slug of newSlugs) {
    expect(hasEnglishDossier(slug)).toBe(true);
    expect(getSlot(slug)?.source).toMatch(/^https:\/\//);
    expect(languageHref(`/slots/${slug}`, "en")).toBe(`/en/slots/${slug}`);
    expect(translatedCounterpart(`/en/slots/${slug}`)).toBe(`/slots/${slug}`);
  }
});

for (const slug of newSlugs) {
  test(`Final English dossier: ${slug}`, async ({ page }) => {
    const game = getSlot(slug)!;
    await page.goto(`/en/slots/${slug}/`);
    await expect(page.getByRole("heading", { name: game.name, exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "How wins work" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Key feature" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Editorial perspective" })).toBeVisible();
    await expect(page.locator(".slot-summary dl")).toContainText(game.field);
    await expect(page.locator(".slot-summary dl")).toContainText(game.rtp);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/en/slots/${slug}/?$`));
    await expect(page.getByRole("link", { name: "Publisher information / primary reference" })).toHaveAttribute("href", game.source);
  });
}
