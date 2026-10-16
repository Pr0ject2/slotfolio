import { englishCatalogBatch09Slugs } from "../src/lib/english-catalog-batch09";
import { testEnglishCatalogBatch } from "./english-catalog-batch-helpers";
testEnglishCatalogBatch(9, englishCatalogBatch09Slugs);

import { test, expect } from "@playwright/test";
import { createCatalogModel } from "../src/lib/catalog-index";
import { englishCatalogRecordSlugs } from "../src/lib/english-catalog-record-routes";
import { englishDossierSlugs } from "../src/lib/english-dossier-routes";
import { englishCatalogFact } from "../src/lib/english-catalog-facts";
import { translatedCounterpart } from "../src/lib/locales";

test("all 1000 original games have distinct English counterparts without changing coverage", () => {
  const items = createCatalogModel().items;
  expect(items).toHaveLength(1000);
  expect(items.filter(item => item.coverage === "catalog")).toHaveLength(900);
  expect(items.filter(item => item.coverage === "dossier")).toHaveLength(100);
  expect(englishCatalogRecordSlugs).toHaveLength(900);
  expect(englishDossierSlugs).toHaveLength(100);
  expect(new Set([...englishCatalogRecordSlugs, ...englishDossierSlugs]).size).toBe(1000);
  for (const item of items) {
    const route = item.coverage === "dossier" ? `/slots/${item.slug}` : `/slots/catalog/${item.slug}`;
    expect(translatedCounterpart(route), item.slug).toBe(`/en${route}`);
    expect(translatedCounterpart(`/en${route}`), item.slug).toBe(route);
    for (const value of [item.field, item.verifiedVolatility, ...item.mechanics, ...item.tags]) {
      expect(englishCatalogFact(value), `${item.slug}: ${value}`).not.toMatch(/[А-Яа-яЁё]/);
    }
  }
});

test("English catalogue cards explain technical coverage and translate feature labels", async ({ page }) => {
  const items = createCatalogModel().items;
  for (const slug of ["mental", "life-and-death", englishCatalogBatch09Slugs[99]]) {
    const item = items.find(entry => entry.slug === slug)!;
    await page.goto(`/en/slots/?q=${encodeURIComponent(item.name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    await expect(card).not.toContainText(/[А-Яа-яЁё]/);
    await expect(card.locator(".catalog-open")).toHaveAttribute("aria-label", `Open ${item.name}`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  }
});
