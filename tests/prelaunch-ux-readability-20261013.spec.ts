import { expect, test, type Page } from "@playwright/test";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

async function expectFontAtLeast(page: Page, selector: string, minSize: number) {
  const targets = page.locator(selector);
  await expect(targets.first()).toBeVisible();
  const actual = await targets.evaluateAll((nodes) =>
    nodes.filter((node) => node.getBoundingClientRect().width > 0)
      .map((node) => Number.parseFloat(getComputedStyle(node).fontSize)),
  );
  expect(actual.length, selector + " must have visible elements").toBeGreaterThan(0);
  expect(Math.min(...actual), selector).toBeGreaterThanOrEqual(minSize);
}

async function expectNoPageOverflow(page: Page, width: number) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth), `overflow at ${width}px`).toBeLessThanOrEqual(width + 1);
}

test("collection heading keeps the Russian word 'пределами' on one line at narrow widths", async ({ page }, testInfo) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/collections/beyond-lines/");
    await expect(page.locator(".collection-heading h1")).toBeVisible();
    const word = await page.locator(".collection-heading h1").evaluate((heading) => {
      const node = Array.from(heading.childNodes)
        .find((child) => child.nodeType === Node.TEXT_NODE && child.textContent?.includes("пределами"));
      if (!node || !node.textContent) return { rows: -1, right: Infinity, containerRight: 0 };
      const begin = node.textContent.indexOf("пределами");
      const positions: DOMRect[] = [];
      for (let offset = begin; offset < begin + "пределами".length; offset++) {
        const range = document.createRange();
        range.setStart(node, offset);
        range.setEnd(node, offset + 1);
        positions.push(range.getBoundingClientRect());
      }
      return {
        rows: new Set(positions.map((r) => Math.round(r.top))).size,
        right: Math.max(...positions.map((r) => r.right)),
        containerRight: heading.getBoundingClientRect().right,
      };
    });
    if (width <= 390) {
      expect(word.rows, `word split at ${width}px`).toBe(1);
      expect(word.right, `word escapes heading at ${width}px`).toBeLessThanOrEqual(word.containerRight + 1);
    }
    await expectNoPageOverflow(page, width);
    await page.locator(".collection-heading").screenshot({ path: testInfo.outputPath(`collection-heading-${width}.png`) });
  }
});

test("home mechanics description and diagram caption stay readable", async ({ page }, testInfo) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expectFontAtLeast(page, ".mechanic-list p", 14);
    await expectFontAtLeast(page, ".feature-band .cascade-art small", 12);
    await expectNoPageOverflow(page, width);
    await page.locator(".feature-band").screenshot({ path: testInfo.outputPath(`home-motif-${width}.png`) });
  }
});

test("provider and mechanic statistical captions are readable", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/providers/pragmatic-play/");
    await expectFontAtLeast(page, ".provider-facts small", 13);
    await expectFontAtLeast(page, ".provider-mechanic-row p", 13);
    await expectFontAtLeast(page, ".provider-mechanic-count", 13);
    await expectNoPageOverflow(page, width);
    await page.goto("/mechanics/cascades/");
    await expectFontAtLeast(page, ".entity-frequency small", 13);
    await expectFontAtLeast(page, ".entity-rtp dt", 13);
    await expectNoPageOverflow(page, width);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/providers/");
  await expectFontAtLeast(page, ".provider-index-stats", 13);
});
