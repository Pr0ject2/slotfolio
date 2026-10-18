import { test, expect } from "@playwright/test";
import { slots } from "../src/lib/data";
import { getVerifiedSlotMetrics } from "../src/lib/dossier";

// UX-09 regression: the source-backed facts, not CSS placeholder tiles,
// determine the number of cards in both language versions.
test("odd final metric fills a desktop row without changing the data", async ({ page }) => {
  const game = slots.find((slot) => {
    const metrics = getVerifiedSlotMetrics(slot.slug);
    const count = 3
      + Number(Boolean(metrics?.rtpVariants && metrics.rtpVariants.length > 1))
      + Number(Boolean(metrics?.maxWin))
      + Number(Boolean(metrics?.observedWin));
    return count % 2 === 1;
  });
  expect(game, "At least one of the 100 sourced dossiers has an odd metric count").toBeDefined();
  if (!game) return;
  for (const route of [`/slots/${game.slug}/`, `/en/slots/${game.slug}/`]) {
    for (const width of [390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const metric = page.locator(".dossier-metric-grid");
      await expect(metric).toBeVisible();
      const values = await metric.evaluate((grid) => {
        const tiles = Array.from(grid.children) as HTMLElement[];
        const last = tiles.at(-1)!.getBoundingClientRect();
        const region = grid.getBoundingClientRect();
        const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length;
        return { count: tiles.length, columns, lastWidth: last.width, regionWidth: region.width, lastRight: last.right, regionRight: region.right };
      });
      expect(values.count % 2, `${route} should exercise the odd metric layout`).toBe(1);
      expect(values.lastWidth, `${route} at ${width}px`).toBeGreaterThanOrEqual(values.regionWidth - 2);
      expect(values.lastRight).toBeLessThanOrEqual(values.regionRight + 1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
    }
  }
});

test("technical passport fills both desktop columns when the last fact is unpaired", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.goto("/slots/catalog/playn-go-reactoonz-100/");
  const grid = page.locator(".catalog-record-facts");
  await expect(grid).toBeVisible();

  async function measure() {
    return grid.evaluate((root) => {
      const tiles = Array.from(root.children) as HTMLElement[];
      const lastNormal = tiles.findLast((node) => !node.classList.contains("facts-wide"))!;
      const rect = lastNormal.getBoundingClientRect();
      const parent = root.getBoundingClientRect();
      const tracks = getComputedStyle(root).gridTemplateColumns.split(" ").filter(Boolean).length;
      return { count: tiles.length, tracks, width: rect.width, parentWidth: parent.width, right: rect.right, parentRight: parent.right };
    });
  }

  // Use real DOM and computed production styles; only vary the test fixture's
  // cardinality. No game data or published HTML is modified by this test.
  await grid.evaluate((root) => {
    const model = Array.from(root.children).find((x) => !x.classList.contains("facts-wide"))!;
    root.replaceChildren(...Array.from({ length: 5 }, () => model.cloneNode(true)));
  });
  let result = await measure();
  expect(result.tracks).toBe(2);
  expect(result.count).toBe(5);
  expect(result.width).toBeGreaterThanOrEqual(result.parentWidth - 4);
  expect(result.right).toBeLessThanOrEqual(result.parentRight + 1);
  await grid.screenshot({ path: testInfo.outputPath("ux09-last-odd-fact.png") });

  // A full-width mechanics row must not leave a grey hole in the row before it.
  await grid.evaluate((root) => {
    const model = root.firstElementChild!;
    const wide = model.cloneNode(true) as HTMLElement;
    wide.classList.add("facts-wide");
    root.appendChild(wide);
  });
  result = await measure();
  expect(result.count).toBe(6);
  expect(result.tracks).toBe(2);
  expect(result.width).toBeGreaterThanOrEqual(result.parentWidth - 4);
  await grid.screenshot({ path: testInfo.outputPath("ux09-odd-fact-plus-mechanics.png") });
});

test("actual technical passport remains readable on narrow screens", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/slots/catalog/playn-go-reactoonz-100/");
    const grid = page.locator(".catalog-record-facts");
    await expect(grid).toBeVisible();
    await expect(grid.locator("dt").first()).toBeVisible();
    await expect(grid.locator("dd").first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `width ${width}`).toBeLessThanOrEqual(width + 1);
  }
});
