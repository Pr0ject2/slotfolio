import { test, expect } from "@playwright/test";

test("catalog list and cover cards remain readable and contained from 320px to desktop", async ({ page }) => {
  test.setTimeout(120_000);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const view of ["list", "covers"]) {
      await page.goto("/slots/?view=" + view);
      const first = page.locator(".catalog-results [data-slot]").first();
      await expect(first).toBeVisible();
      await expect.poll(async () => first.locator("img").first().evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      const result = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll<HTMLElement>(".catalog-results [data-slot]")).slice(0, 6);
        return {
          scrollWidth: document.documentElement.scrollWidth,
          viewport: window.innerWidth,
          cards: cards.map((card) => {
            const box = card.getBoundingClientRect();
            const art = card.querySelector<HTMLElement>(".catalog-game-art");
            const picture = art?.querySelector("img");
            const labels = Array.from(card.querySelectorAll<HTMLElement>('dl[aria-label="Характеристики"] dt'));
            const values = Array.from(card.querySelectorAll<HTMLElement>('dl[aria-label="Характеристики"] dd'));
            return {
              width: box.width,
              right: box.right,
              labelFonts: labels.map((el) => parseFloat(getComputedStyle(el).fontSize)),
              valueFonts: values.map((el) => parseFloat(getComputedStyle(el).fontSize)),
              valueRight: values.map((el) => el.getBoundingClientRect().right),
              artworkHeight: art?.getBoundingClientRect().height ?? 0,
              pictureHeight: picture?.getBoundingClientRect().height ?? 0,
              actionHeights: Array.from(card.querySelectorAll<HTMLElement>(".catalog-game-data a, .catalog-game-data button")).map((el) => el.getBoundingClientRect().height),
            };
          }),
        };
      });
      expect(result.scrollWidth, width + "px " + view + ": horizontal scrolling").toBeLessThanOrEqual(width + 1);
      expect(result.cards.length).toBeGreaterThanOrEqual(3);
      for (const card of result.cards) {
        expect(card.width).toBeGreaterThan(120);
        expect(Math.min(...card.labelFonts)).toBeGreaterThanOrEqual(10);
        expect(Math.min(...card.valueFonts)).toBeGreaterThanOrEqual(12);
        for (const valueRight of card.valueRight) expect(valueRight).toBeLessThanOrEqual(card.right + 2);
        for (const height of card.actionHeights) expect(height).toBeGreaterThanOrEqual(40);
        if (view === "list") expect(card.artworkHeight).toBeLessThanOrEqual(card.pictureHeight + 6);
        if (view === "covers" && width <= 420) expect(card.width).toBeGreaterThan(width * 0.7);
      }
    }
  }
});
