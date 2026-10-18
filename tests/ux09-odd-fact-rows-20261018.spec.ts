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
        const last = tiles[tiles.length - 1].getBoundingClientRect();
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

test("two- and three-track passports have no empty last-row cell", async ({ page }, testInfo) => {
  // Work with the real page's DOM and CSS. Duplicating an existing fact only
  // inside the browser yields deterministic cardinalities; repo facts stay intact.
  for (const width of [390, 1024, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/slots/catalog/playn-go-reactoonz-100/");
    const grid = page.locator(".catalog-record-facts");
    await expect(grid).toBeVisible();
    for (const count of [4, 5, 6, 7]) {
      for (const mechanics of [false, true]) {
        await grid.evaluate((root, { count, mechanics }) => {
          const model = Array.from(root.children).find((x) => !x.classList.contains("facts-wide"))!;
          const elements = Array.from({ length: count }, () => model.cloneNode(true));
          if (mechanics) {
            const wide = model.cloneNode(true) as HTMLElement;
            wide.classList.add("facts-wide");
            elements.push(wide);
          }
          root.replaceChildren(...elements);
        }, { count, mechanics });
        const positions = await grid.evaluate((root) => {
          const region = root.getBoundingClientRect();
          const tracks = getComputedStyle(root).gridTemplateColumns.split(" ").filter(Boolean).length;
          const cells = Array.from(root.children).map((node) => {
            const rect = node.getBoundingClientRect();
            return { top: Math.round(rect.top), left: rect.left, right: rect.right };
          });
          const groups = new Map<number, { left: number, right: number }[]>();
          for (const cell of cells) {
            const row = groups.get(cell.top) ?? [];
            row.push(cell);
            groups.set(cell.top, row);
          }
          return { tracks, left: region.left, right: region.right, rows: Array.from(groups.values()) };
        });
        expect(positions.tracks, `expected responsive track count at ${width}px`).toBeGreaterThanOrEqual(1);
        expect(positions.tracks).toBeLessThanOrEqual(3);
        for (const [index, row] of positions.rows.entries()) {
          row.sort((a, b) => a.left - b.left);
          expect(row[0].left, `row ${index} at ${width}px`).toBeLessThanOrEqual(positions.left + 3);
          expect(row[row.length - 1].right, `no blank grid cell in row ${index}, count ${count}, mechanics ${mechanics}, width ${width}`).toBeGreaterThanOrEqual(positions.right - 3);
          for (let i = 1; i < row.length; i++) {
            expect(row[i].left - row[i - 1].right).toBeLessThanOrEqual(3);
          }
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
        if (count === 5 && mechanics && width === 1440) {
          await grid.screenshot({ path: testInfo.outputPath("ux09-odd-fact-plus-mechanics-1440.png") });
        }
      }
    }
  }
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
