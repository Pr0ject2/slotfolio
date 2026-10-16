import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { createCatalogModel } from "../src/lib/catalog-index";
import { englishCatalogFact } from "../src/lib/english-catalog-facts";
import { englishCatalogRecordSlugs } from "../src/lib/english-catalog-record-routes";
import { translatedCounterpart } from "../src/lib/locales";

function numbers(value: string) {
  return value.replace(/(\d)[ \u00a0](?=\d{3}(?:\D|$))/g, "$1").match(/\d+(?:[.,]\d+)?/g)?.map(number => number.replace(",", ".")) ?? [];
}

export function testEnglishCatalogBatch(number: number, slugs: readonly string[]) {
  const start = (number - 1) * 100;
  const records = createCatalogModel().items.filter(item => item.coverage === "catalog");
  const batch = records.slice(start, start + 100);
  test(`batch ${number}: exact source selection, reviewed routes and unchanged numeric values`, () => {
    expect(records).toHaveLength(900);
    expect(slugs).toHaveLength(100);
    expect(slugs).toEqual(catalogSeeds.slice(start, start + 100).map(item => item.slug));
    expect(englishCatalogRecordSlugs.slice(0, start + 100)).toEqual(catalogSeeds.slice(0, start + 100).map(item => item.slug));
    expect(new Set(englishCatalogRecordSlugs).size).toBe(englishCatalogRecordSlugs.length);
    for (const item of batch) {
      expect(item.source).toMatch(/^https:\/\//);
      expect(translatedCounterpart(`/slots/catalog/${item.slug}`)).toBe(`/en/slots/catalog/${item.slug}`);
      for (const source of [item.field, item.verifiedRtp, item.maxWin, item.verifiedVolatility, item.releaseDate, ...item.mechanics]) {
        const english = englishCatalogFact(source);
        expect(english, `${item.slug}: ${source}`).not.toMatch(/[А-Яа-яЁё]/);
        expect(numbers(english), `${item.slug}: ${source}`).toEqual(numbers(source));
      }
    }
  });
  test(`batch ${number}: all 100 technical pages exist in static output`, () => {
    for (const slug of slugs) expect(existsSync(join(process.cwd(), "out/en/slots/catalog", slug, "index.html")), slug).toBe(true);
  });
  for (const item of [batch[0], batch[49], batch[99]]) {
    test(`batch ${number}: source-linked English page ${item.slug}`, async ({page}) => {
      expect((await page.goto(`/en/slots/catalog/${item.slug}/`))?.status()).toBe(200);
      await expect(page.getByRole("heading", {name:item.name, exact:true})).toBeVisible();
      await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      await expect(page.getByRole("link", {name:/recorded publisher source/})).toHaveAttribute("href", item.source!);
      for (const value of [item.field, item.verifiedRtp, item.maxWin, item.verifiedVolatility].filter(Boolean)) await expect(page.locator(".facts")).toContainText(englishCatalogFact(value));
      const canonical = new URL((await page.locator('link[rel="canonical"]').getAttribute("href"))!);
      expect(canonical.pathname).toMatch(new RegExp(`/en/slots/catalog/${item.slug}/?$`));
      const alternate = new URL((await page.locator('link[rel="alternate"][hreflang="ru"]').getAttribute("href"))!);
      expect(alternate.pathname).toMatch(new RegExp(`/slots/catalog/${item.slug}/?$`));
    });
  }
}
