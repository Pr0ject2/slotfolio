import { test, expect } from "@playwright/test";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });
const routes = ["/about", "/editorial-policy", "/privacy", "/responsible-gaming"];

test("information pages provide working contents and useful destination links", async ({ page, request }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    const anchors = await page.locator('.article-toc a').evaluateAll(links => links.map(a => a.getAttribute('href')!));
    expect(anchors.length).toBeGreaterThanOrEqual(3);
    for (const anchor of anchors) {
      await expect(page.locator(anchor)).toBeVisible();
    }
    await page.locator('.article-toc a').last().click();
    await expect(page).toHaveURL(new RegExp(anchors[anchors.length - 1] + '$'));
    const links = await page.locator('article a').evaluateAll(nodes => nodes.map(a => a.getAttribute('href')!));
    expect(links.length).toBeGreaterThan(0);
    for (const href of links.filter(href => href.startsWith('/'))) expect((await request.get(href)).status()).toBe(200);
    await expect(page.locator('main')).not.toContainText('будут добавлены перед запуском');
  }
  await page.goto('/responsible-gaming');
  await expect(page.locator('article a[href="https://www.gamcare.org.uk/"]')).toBeVisible();
  await expect(page.locator('article a[href="https://www.gamstop.co.uk/"]')).toBeVisible();
});

test("privacy instructions lead to clearing the saved comparison", async ({ page }) => {
  await page.goto('/compare');
  await page.getByRole('button', { name: /Два каскадных подхода/ }).click();
  await page.goto('/privacy');
  await page.getByRole('link', { name: 'Открыть сравнение', exact: true }).click();
  await expect(page.getByRole('region', { name: /Таблица сравнения/ })).toBeVisible();
  await page.getByRole('button', { name: 'Очистить сравнение', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('region', { name: /Таблица сравнения/ })).toBeHidden();
});

test("information pages have readable text and compact headings at five widths", async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const sizes = await page.locator('article p, article li').evaluateAll(nodes => nodes.map(n => parseFloat(getComputedStyle(n).fontSize)));
      expect(Math.min(...sizes)).toBeGreaterThanOrEqual(14);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
      const heading = await page.locator('main h1').boundingBox();
      expect(heading!.height).toBeLessThan(210);
      expect(heading!.x + heading!.width).toBeLessThanOrEqual(width);
      await page.screenshot({ path: testInfo.outputPath(`${route.slice(1)}-${width}.png`), fullPage: true });
    }
  }
});
