import { test, expect } from "@playwright/test";

const cases = [
  { name: "catalog-only", path: "/slots/catalog/playn-go-reactoonz-100" },
  { name: "full dossier", path: "/slots/wanted-dead-or-a-wild" },
];

test("technical comparison and metric headings stay readable at desktop, tablet and phone sizes", async ({ page }) => {
  test.setTimeout(90_000);
  for (const sample of cases) {
    for (const width of [390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(sample.path);
      const metrics = page.locator(".dossier-metric-grid > div > span");
      const headings = page.locator(".dossier-context-grid > div > span");
      await expect(headings.first(), sample.name + ": context heading").toBeVisible();
      await expect(metrics.first(), sample.name + ": metric heading").toBeVisible();

      const result = await page.evaluate(() => {
        const contextRows = [...document.querySelectorAll<HTMLElement>(".dossier-context-grid > div")];
        const metricRows = [...document.querySelectorAll<HTMLElement>(".dossier-metric-grid > div")];
        const entries = [...contextRows, ...metricRows];
        const texts = entries.flatMap((row) => [
          row.querySelector<HTMLElement>(":scope > span"),
          row.querySelector<HTMLElement>(":scope > small"),
        ].filter((node): node is HTMLElement => Boolean(node)));
        return {
          docWidth: document.documentElement.scrollWidth,
          viewport: innerWidth,
          sizes: texts.map((node) => ({
            name: node.innerText,
            px: parseFloat(getComputedStyle(node).fontSize),
            right: node.getBoundingClientRect().right,
            parentRight: node.parentElement!.getBoundingClientRect().right,
          })),
          firstColumnWidths: contextRows.map((row) => row.querySelector<HTMLElement>(":scope > span")!.getBoundingClientRect().width),
          contextRowCount: contextRows.length,
          metricRowCount: metricRows.length,
        };
      });
      expect(result.contextRowCount).toBeGreaterThanOrEqual(3);
      expect(result.metricRowCount).toBeGreaterThanOrEqual(2);
      expect(result.docWidth, sample.name + " " + width + "px overflow").toBeLessThanOrEqual(width + 1);
      for (const entry of result.sizes) {
        expect(entry.px, sample.name + " / " + entry.name).toBeGreaterThanOrEqual(14);
        expect(entry.right, sample.name + " / " + entry.name).toBeLessThanOrEqual(entry.parentRight + 2);
      }
      if (width >= 601) {
        expect(Math.min(...result.firstColumnWidths), "comparison label column must have usable width")
          .toBeGreaterThanOrEqual(width <= 800 ? 155 : 170);
      }
    }
  }
});
