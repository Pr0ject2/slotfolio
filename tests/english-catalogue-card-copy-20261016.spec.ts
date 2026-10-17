import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { englishCatalogRecordSlugs, hasEnglishCatalogRecord } from "../src/lib/english-catalog-record-routes";

test("English catalogue links reviewed dossiers and all 900 technical records in English", async ({ page }) => {
  await page.goto("/en/slots/");
  const translated = page.locator('[data-slot="gates-of-olympus"]');
  await expect(translated).toBeVisible();
  await expect(translated.locator('h2 a')).toHaveAttribute("href", /\/en\/slots\/gates-of-olympus/);
  expect(englishCatalogRecordSlugs).toHaveLength(900);
  expect(englishCatalogRecordSlugs).toEqual(catalogSeeds.map(game => game.slug));
  expect(catalogSeeds.every(game => hasEnglishCatalogRecord(game.slug))).toBe(true);
  const record = catalogSeeds[899];
  await page.goto(`/en/slots/?q=${encodeURIComponent(record.name)}`);
  const technical = page.locator(`[data-slot="${record.slug}"]`);
  await expect(technical).toBeVisible();
  await expect(technical).toContainText("Technical record in English");
  await expect(technical.locator("dl")).toHaveAttribute("aria-label", "Game details");
  await expect(technical.locator("h2 a")).toHaveAttribute("href", new RegExp(`/en/slots/catalog/${record.slug}/?$`));
  await expect(technical.locator(".catalog-open")).toHaveAttribute("aria-label", `Open ${record.name}`);
  await expect(page.locator("main")).not.toContainText("Game record in Russian");
  await expect(page.getByText("All 1,000 games have English pages: 900 technical records and 100 game guides. Technical records list sourced facts; game guides explain rules, features and source qualifications.")).toBeVisible();
});

test("Gates of Olympus has a source-backed English game guide", async ({ page }) => {
  await page.goto("/en/slots/gates-of-olympus/");
  await expect(page.getByRole("heading", { name: "Gates of Olympus", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "How wins are formed" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sources and limitations" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});
