import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { englishCatalogRecordSlugs, hasEnglishCatalogRecord } from "../src/lib/english-catalog-record-routes";
import { languageHref, translatedCounterpart } from "../src/lib/locales";
import { createCatalogModel } from "../src/lib/catalog-index";

const slugs = englishCatalogRecordSlugs.slice(0, 100);

test("English source-linked records use exactly the first 100 published catalog-only games", () => {
  expect(catalogSeeds).toHaveLength(900);
  expect(slugs).toHaveLength(100);
  expect(slugs).toEqual(catalogSeeds.slice(0, 100).map((game) => game.slug));
  expect(new Set(slugs).size).toBe(100);
  const index = createCatalogModel();
  expect(index.items).toHaveLength(1000);
  for (const slug of slugs) {
    const game = index.items.find((item) => item.slug === slug);
    expect(game?.coverage, slug).toBe("catalog");
    expect(game?.source, slug).toMatch(/^https:\/\//);
    expect(hasEnglishCatalogRecord(slug)).toBe(true);
    expect(languageHref(`/slots/catalog/${slug}`, "en")).toBe(`/en/slots/catalog/${slug}`);
    expect(translatedCounterpart(`/en/slots/catalog/${slug}`)).toBe(`/slots/catalog/${slug}`);
  }
});

test("all 100 English catalog-only fact pages are present in static export", () => {
  for (const slug of slugs) {
    const file = join(process.cwd(), "out", "en", "slots", "catalog", slug, "index.html");
    expect(existsSync(file), slug).toBe(true);
  }
});

for (const slug of [slugs[0], slugs[49], slugs[99]]) {
  test(`English catalog technical record ${slug}`, async ({ page }) => {
    const seed = catalogSeeds.find((entry) => entry.slug === slug)!;
    await page.goto(`/en/slots/catalog/${slug}/`);
    await expect(page.getByRole("heading", { name: seed.name, exact: true })).toBeVisible();
    await expect(page.getByText("Documented details only")).toBeVisible();
    await expect(page.getByRole("link", { name: /extended original record/ })).toHaveAttribute("href", new RegExp(`/slots/catalog/${slug}`));
    await expect(page.getByRole("link", { name: /recorded publisher source/ })).toHaveAttribute("href", seed.source);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
}
