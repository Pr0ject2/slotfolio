import { test, expect } from "@playwright/test";

const widths = [320, 390, 768, 1024, 1440];

test("catalog-only passport values have usable width and follow their labels", async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  for (const path of ["/slots/catalog/playn-go-reactoonz-100", "/slots/catalog/playn-go-rich-wilde-and-the-book-of-dead"]) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(path);
      const facts = page.locator(".catalog-record-facts");
      await expect(facts).toBeVisible();
      const values = await facts.locator(":scope > div:not(.facts-wide)").evaluateAll((rows) => rows.map((row) => {
        const label = row.querySelector("dt")!.getBoundingClientRect();
        const value = row.querySelector("dd")!.getBoundingClientRect();
        return { width: value.width, top: value.top, labelBottom: label.bottom, right: value.right, rowRight: row.getBoundingClientRect().right };
      }));
      expect(values.length).toBeGreaterThanOrEqual(5);
      for (const value of values) {
        expect(value.width, `${path} at ${width}px: no letter-by-letter columns`).toBeGreaterThanOrEqual(125);
        expect(value.top).toBeGreaterThanOrEqual(value.labelBottom);
        expect(value.right).toBeLessThanOrEqual(value.rowRight + 1);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await facts.screenshot({ path: testInfo.outputPath(`passport-${path.split("/").pop()}-${width}.png`) });
    }
  }
});

test("mobile navigation supports keyboard dismissal, visible focus, and touch targets", async ({ page }, testInfo) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const toggle = page.locator(".menu-toggle");
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const provider = page.locator(".secondary-nav").getByRole("link", { name: "Провайдеры" });
    // Reach the last menu group using the actual tab order.
    for (let i = 0; i < 5; i++) await page.keyboard.press("Tab");
    await expect(provider).toBeFocused();
    for (const selector of [".header-search", ".menu-toggle", ".secondary-nav a"]) {
      for (const target of await page.locator(selector).all()) {
        const box = await target.boundingBox();
        expect(box!.height).toBeGreaterThanOrEqual(44);
        expect(box!.width).toBeGreaterThanOrEqual(44);
      }
    }
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveCSS("outline-style", "solid");
    await expect(provider).toBeHidden();
    await page.screenshot({ path: testInfo.outputPath(`menu-focus-${width}.png`) });
    await page.keyboard.press("Enter");
    await provider.click();
    await expect(page).toHaveURL(/\/providers\/?$/);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await page.setViewportSize({ width: 1024, height: 1000 });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await page.setViewportSize({ width, height: 1000 });
    await expect(provider).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
  for (const width of [768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await expect(page.locator(".menu-toggle")).toBeHidden();
    await expect(page.locator(".secondary-nav a").first()).toBeVisible();
  }
});

test("comparison explains narrow-screen scrolling and keeps both games keyboard reachable", async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/compare");
    await page.getByRole("button", { name: /Два каскадных подхода/ }).click();
    const region = page.getByRole("region", { name: /Таблица сравнения/ });
    await expect(region.locator("thead th")).toHaveCount(3);
    await expect(page.locator(".comparison-selection")).toBeFocused();
    await page.keyboard.press("Tab");
    // Both selected cards contain two links and one remove button.
    for (let i = 0; i < 6; i++) await page.keyboard.press("Tab");
    await expect(region).toBeFocused();
    await expect(region).toHaveCSS("outline-style", "solid");
    await expect(region).toHaveCSS("outline-width", "2px");
    if (width <= 600) {
      await expect(page.locator("#comparison-scroll-hint")).toBeVisible();
      await page.keyboard.press("ArrowRight");
      await expect.poll(() => region.evaluate((e) => e.scrollLeft)).toBeGreaterThan(0);
      await region.locator("thead th").last().getByRole("link").focus();
      const bounds = await region.evaluate((e) => {
        const link = e.querySelector("thead th:last-child a")!.getBoundingClientRect();
        const box = e.getBoundingClientRect();
        return { left: link.left, right: link.right, regionLeft: box.left, regionRight: box.right };
      });
      expect(bounds.left).toBeGreaterThanOrEqual(bounds.regionLeft);
      expect(bounds.right).toBeLessThanOrEqual(bounds.regionRight + 1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await region.screenshot({ path: testInfo.outputPath(`comparison-${width}.png`) });
    await page.getByRole("button", { name: "Удалить Sweet Bonanza из сравнения" }).click();
    await expect(region.locator("thead th")).toHaveCount(2);
    await page.getByRole("button", { name: "Очистить сравнение" }).click();
    await expect(region).toBeHidden();
  }
});
