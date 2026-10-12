import { expect, test } from "@playwright/test";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

async function expectReadable(page: import("@playwright/test").Page, selector: string, minPx: number) {
  const loc = page.locator(selector);
  await expect(loc.first()).toBeVisible();
  const sizes = await loc.evaluateAll((elements) =>
    elements.filter((el) => el.getBoundingClientRect().width > 0)
      .map((el) => parseFloat(getComputedStyle(el).fontSize)),
  );
  expect(sizes.length, selector + " must contain visible text").toBeGreaterThan(0);
  expect(Math.min(...sizes), selector + " should be >= " + minPx + "px").toBeGreaterThanOrEqual(minPx);
}

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page, width: number) {
  const size = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(size, "document overflow at " + width + "px").toBeLessThanOrEqual(width + 1);
}

test("catalog UI keeps labels, verified facts and controls readable at phone and desktop widths", async ({ page }) => {
  test.setTimeout(90_000);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/slots?view=list");
    await expect(page.locator(".catalog-results .catalog-game").first()).toBeVisible();

    await expectReadable(page, ".catalog-results .catalog-game .eyebrow", 12);
    await expectReadable(page, ".catalog-results .catalog-game dl[aria-label='Характеристики'] dt", 12);
    await expectReadable(page, ".catalog-results .catalog-game dl[aria-label='Характеристики'] dd", 14);
    await expectReadable(page, ".results-toolbar", 13);
    await expectReadable(page, ".catalog-results .catalog-game .catalog-game-data a", 13);
    await expectNoHorizontalOverflow(page, width);
  }
});

test("catalog-only record does not render technical passport in tiny text", async ({ page }) => {
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/slots/catalog/playn-go-reactoonz-100");
    await expectReadable(page, ".catalog-record-facts dt", 12);
    await expectReadable(page, ".catalog-record-facts dd", 14);
    await expectReadable(page, ".catalog-record-facts .slot-tag-list a", 12);
    await expectReadable(page, ".data-note", 13);
    await expectNoHorizontalOverflow(page, width);
  }
});

test("full dossier keeps summary, source notes and in-page navigation readable", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/slots/wanted-dead-or-a-wild");
    await expectReadable(page, ".slot-summary .facts dt", 12);
    await expectReadable(page, ".slot-summary .facts dd", 14);
    await expectReadable(page, ".slot-figure figcaption", 13);
    await expectReadable(page, ".article-toc > a", 13);
    await expectReadable(page, ".breadcrumbs", 13);
    await expectNoHorizontalOverflow(page, width);
  }
});

test("catalog-only cards retain readable mobile fact labels and values", async ({ page }) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/slots?q=Mayan%20Ritual&view=covers");
    const card = page.locator(".catalog-game[data-coverage='catalog']").first();
    await expect(card).toBeVisible();
    await expectReadable(page, ".catalog-game[data-coverage='catalog'] dt", 12);
    await expectReadable(page, ".catalog-game[data-coverage='catalog'] dd", 14);
    await expectReadable(page, ".catalog-game[data-coverage='catalog'] .catalog-game-data a", 13);
    await expectNoHorizontalOverflow(page, width);
  }
});
