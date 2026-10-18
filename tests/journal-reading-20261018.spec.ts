import { test, expect } from "@playwright/test";

for (const route of [
  "/journal/how-cascades-work/",
  "/en/journal/how-cascades-work/",
  "/journal/understanding-rtp/",
  "/en/journal/understanding-rtp/",
]) {
  for (const width of [320, 390, 768, 1024, 1440]) {
    test(`article navigation and supporting text: ${route} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await expect(page.locator("main h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const toc = page.locator(".article-toc");
      await expect(toc).toHaveAccessibleName(/On this page|Оглавление статьи/);
      const links = toc.locator(":scope > a");
      expect(await links.count()).toBeGreaterThanOrEqual(3);
      for (const link of await links.all()) {
        await expect(link).toBeVisible();
        const box = await link.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.height).toBeGreaterThanOrEqual(44);
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
        expect(await link.evaluate(node => parseFloat(getComputedStyle(node).fontSize))).toBeGreaterThanOrEqual(15);
      }
      const first = links.first();
      await first.focus();
      await expect(first).toBeFocused();
      expect(await first.evaluate(node => getComputedStyle(node).outlineStyle)).not.toBe("none");
      await page.keyboard.press("Tab");
      await expect(links.nth(1)).toBeFocused();
      await page.keyboard.press("Enter");
      const anchor = await links.nth(1).getAttribute("href");
      await expect.poll(() => new URL(page.url()).hash).toBe(anchor);
      await expect(page.locator(anchor!)).toBeInViewport();
      for (const caption of await page.locator(".article-figure figcaption").all()) {
        expect(await caption.evaluate(node => parseFloat(getComputedStyle(node).fontSize))).toBeGreaterThanOrEqual(14);
      }
      if (width <= 390) {
        const related = page.locator("main > div .section-title").last();
        if (await related.count()) {
          const heading = related.locator("h2"), link = related.locator(".text-link");
          await expect(heading).toBeVisible();
          await expect(link).toBeVisible();
          const h = (await heading.boundingBox())!, a = (await link.boundingBox())!;
          expect(h.width).toBeGreaterThanOrEqual(200);
          expect(h.y + h.height).toBeLessThanOrEqual(a.y);
          expect(a.height).toBeGreaterThanOrEqual(44);
          expect(a.x + a.width).toBeLessThanOrEqual(width + 1);
        }
        for (const link of await page.locator(".prose .text-link").all()) {
          expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
        }
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
    });
  }
}
