import { test, expect } from "@playwright/test";
import { createCatalogModel } from "../src/lib/catalog-index";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

const representative = createCatalogModel().items
  .filter((item) => item.coverage === "catalog" &&
    item.mechanics.length >= 4 &&
    item.releaseDate &&
    item.provider.toLowerCase().includes("play"))
  .sort((a, b) => b.mechanics.length - a.mechanics.length)[0];

test("multi-mechanic catalog passports get a full-width row with readable, unbroken chips", async ({ page }) => {
  if (!representative) throw new Error("No source-backed multi-mechanic PlaynGO example");
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/slots/catalog/" + representative.slug);
    const facts = page.locator(".catalog-record-facts");
    const row = facts.locator(":scope > .facts-wide");
    const list = row.locator("dd.slot-tag-list");
    await expect(list).toBeVisible();
    await expect(list.locator("a")).toHaveCount(representative.mechanics.length);

    const layout = await facts.evaluate((dl) => {
      const row = dl.querySelector<HTMLElement>(":scope > .facts-wide")!;
      const list = row.querySelector<HTMLElement>("dd.slot-tag-list")!;
      const previousRow = row.previousElementSibling?.getBoundingClientRect();
      const outer = dl.getBoundingClientRect();
      const block = row.getBoundingClientRect();
      const content = list.getBoundingClientRect();
      const chips = [...list.querySelectorAll<HTMLAnchorElement>("a")].map((tag) => {
        const box = tag.getBoundingClientRect();
        return { width: box.width, height: box.height,
          fontSize: parseFloat(getComputedStyle(tag).fontSize),
          left: box.left, right: box.right, text: tag.innerText };
      });
      return {
        documentWidth: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
        outerWidth: outer.width,
        rowWidth: block.width,
        rowTop: block.top,
        previousBottom: previousRow?.bottom ?? -1,
        listWidth: content.width,
        chips,
      };
    });

    expect(layout.documentWidth, width + "px document overflow").toBeLessThanOrEqual(width + 1);
    expect(layout.rowWidth, width + "px mechanics should span the passport").toBeGreaterThanOrEqual(layout.outerWidth - 4);
    expect(layout.listWidth, width + "px tags should use the whole row").toBeGreaterThan(layout.rowWidth * 0.8);
    expect(layout.rowTop, width + "px mechanics must be below the previous fact").toBeGreaterThanOrEqual(layout.previousBottom - 2);
    for (const chip of layout.chips) {
      expect(chip.fontSize, chip.text).toBeGreaterThanOrEqual(12);
      expect(chip.height, chip.text + ": suspicious word-by-word wrapping").toBeLessThanOrEqual(68);
      expect(chip.width, chip.text).toBeGreaterThanOrEqual(55);
    }
  }
});

test("linked full-dossier mechanics do not inherit a narrow 70-percent chip column", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/slots/wanted-dead-or-a-wild");
    const row = page.locator(".slot-summary .facts > div").filter({ has: page.locator("dd.fact-link-list") });
    const links = row.locator("dd.fact-link-list a");
    await expect(links.first()).toBeVisible();
    const sizes = await row.evaluate((el) => {
      const list = el.querySelector<HTMLElement>("dd.fact-link-list")!;
      return {
        row: el.getBoundingClientRect().width,
        list: list.getBoundingClientRect().width,
        chipSizes: [...list.querySelectorAll("a")].map((a) => parseFloat(getComputedStyle(a).fontSize)),
        documentWidth: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      };
    });
    expect(sizes.list).toBeGreaterThan(sizes.row * 0.8);
    expect(Math.min(...sizes.chipSizes)).toBeGreaterThanOrEqual(12);
    expect(sizes.documentWidth).toBeLessThanOrEqual(sizes.viewport + 1);
  }
});
