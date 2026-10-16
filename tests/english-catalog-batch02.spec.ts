import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { createCatalogModel } from "../src/lib/catalog-index";
import { englishCatalogBatch02Slugs } from "../src/lib/english-catalog-batch02";
import { englishCatalogRecordSlugs } from "../src/lib/english-catalog-record-routes";
import { englishCatalogFact } from "../src/lib/english-catalog-facts";
import { translatedCounterpart } from "../src/lib/locales";

const records = createCatalogModel().items.filter(item => item.coverage === "catalog");
const batch = records.slice(100, 200);

function numbers(value: string) {
  return value.replace(/(\d)[ \u00a0](?=\d{3}(?:\D|$))/g, "$1").match(/\d+(?:[.,]\d+)?/g)?.map(number => number.replace(",", ".")) ?? [];
}

test("batch 02 preserves the exact published records 101–200 and reviewed route prefix", () => {
  expect(records).toHaveLength(900);
  expect(englishCatalogBatch02Slugs).toHaveLength(100);
  expect(englishCatalogBatch02Slugs).toEqual(catalogSeeds.slice(100, 200).map(item => item.slug));
  expect(englishCatalogRecordSlugs.slice(0, 200)).toEqual(catalogSeeds.slice(0, 200).map(item => item.slug));
  expect(new Set(englishCatalogRecordSlugs).size).toBe(englishCatalogRecordSlugs.length);
  for (const item of batch) {
    expect(item.source).toMatch(/^https:\/\//);
    expect(translatedCounterpart(`/slots/catalog/${item.slug}`)).toBe(`/en/slots/catalog/${item.slug}`);
  }
});

test("English fact labels preserve every number and remove Russian technical wording in 200 records", () => {
  for (const item of records.slice(0, 200)) {
    for (const source of [item.field, item.verifiedRtp, item.maxWin, item.verifiedVolatility, item.releaseDate, ...item.mechanics]) {
      const translated = englishCatalogFact(source);
      expect(translated, `${item.slug}: ${source}`).not.toMatch(/[А-Яа-яЁё]/);
      expect(numbers(translated), `${item.slug}: ${source}`).toEqual(numbers(source));
    }
  }
  expect(englishCatalogFact("1 000–5 000x (источники расходятся)")).toBe("1 000–5 000x (sources disagree)");
  expect(englishCatalogFact("94–96% (зависит от версии)")).toBe("94–96% (varies by version)");
  expect(englishCatalogFact("")).toBe("");
  expect(englishCatalogFact("сетка +1 ряд в Free Spins")).toBe("Grid +1 row in Free Spins");
});

test("all 100 batch 02 records are exported", () => {
  for (const {slug} of batch) expect(existsSync(join(process.cwd(), "out/en/slots/catalog", slug, "index.html")), slug).toBe(true);
});

for (const item of [batch[0], batch[49], batch[99]]) {
  test(`English technical page ${item.slug} keeps its source and factual values`, async ({page}) => {
    const response = await page.goto(`/en/slots/catalog/${item.slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", {name:item.name, exact:true})).toBeVisible();
    await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("link", {name:/recorded publisher source/})).toHaveAttribute("href", item.source!);
    for (const value of [item.field, item.verifiedRtp, item.maxWin, item.verifiedVolatility].filter(Boolean)) await expect(page.locator(".facts")).toContainText(englishCatalogFact(value));
  });
}

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`English technical records and shared shell remain usable at ${width}px`, async ({page}, testInfo) => {
    await page.setViewportSize({width, height:1000});
    for (const item of [batch[0], batch[49], batch[99]]) {
      await page.goto(`/en/slots/catalog/${item.slug}/`);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
      expect((await page.locator("main h1").boundingBox())!.height).toBeLessThan(210);
      expect((await page.locator(".prose").boundingBox())!.width).toBeGreaterThanOrEqual(Math.min(700, width - 48));
      await page.screenshot({path:testInfo.outputPath(`${item.slug}-${width}.png`), fullPage:true});
    }
    if (width <= 600) {
      const header = page.locator("header").first();
      const about = header.getByRole("link", {name:"About", exact:true});
      await expect(about).toBeHidden();
      const menu = header.getByRole("button", {name:/^Menu/});
      await menu.click();
      await expect(about).toBeVisible();
      await about.focus();
      await page.keyboard.press("Escape");
      await expect(menu).toBeFocused();
      await expect(about).toBeHidden();
      expect((await page.locator("footer .footer-responsibility p").boundingBox())!.width).toBeGreaterThanOrEqual(180);
    }
  });
}
