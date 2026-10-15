import { test, expect } from "@playwright/test";
import { gameCollections } from "../src/lib/collections";
import { getSlot } from "../src/lib/data";
import sitemap from "../src/app/sitemap";
import { absoluteUrl } from "../src/lib/seo";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

test("collections connect distinct learning questions with existing games and sitemap routes", () => {
  expect(gameCollections).toHaveLength(4);
  expect(new Set(gameCollections.map(item => item.question)).size).toBe(4);
  const urls = sitemap().map(item => item.url);
  for (const collection of gameCollections) {
    expect(new Set(collection.games.map(game => game.slug)).size).toBe(3);
    expect(urls.filter(url => url === absoluteUrl(`/collections/${collection.slug}`))).toHaveLength(1);
    for (const game of collection.games) {
      expect(getSlot(game.slug)?.source).toMatch(/^https:\/\//);
      expect(game.check.length).toBeGreaterThan(30);
    }
  }
});

test("readers can open every collection, follow dossiers and compare its games", async ({ page }) => {
  test.setTimeout(120_000);
  for (const collection of gameCollections) {
    await page.goto("/collections");
    await page.locator(`#${collection.slug}`).getByRole("link", { name: "Открыть подборку ↗", exact: true }).click();
    await expect(page.locator("main h1")).toHaveText(collection.title);
    await expect(page.getByRole("heading", { name: "Почему эти игры" })).toBeVisible();
    await expect(page.locator(".collection-entry")).toHaveCount(3);
    for (const [index, game] of collection.games.entries()) {
      const entry = page.locator(".collection-entry").nth(index);
      await expect(entry).toContainText(game.check);
      await expect(entry.getByRole("link", { name: "Досье игры ↗" })).toHaveAttribute("href", new RegExp(`/slots/${game.slug}/?$`));
    }
    await page.evaluate(() => localStorage.removeItem("slotfolio-compare"));
    await page.reload();
    for (const game of collection.games.slice(0, 2)) await page.getByRole("button", { name: `Добавить ${getSlot(game.slug)!.name} в сравнение`, exact: true }).click();
    await page.getByRole("link", { name: "таблицу характеристик", exact: true }).click();
    const table = page.getByRole("region", { name: /Таблица сравнения/ });
    await expect(table).toBeVisible();
    for (const game of collection.games.slice(0, 2)) await expect(table).toContainText(getSlot(game.slug)!.name);
  }
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`collections remain readable and navigable at ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/collections", ...gameCollections.map(item => `/collections/${item.slug}`)]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
      const heading = page.locator("main h1");
      expect((await heading.boundingBox())!.height).toBeLessThan(210);
      expect(await page.locator("main p").evaluateAll(nodes => Math.min(...nodes.map(node => parseFloat(getComputedStyle(node).fontSize))))).toBeGreaterThanOrEqual(14);
      for (const image of await page.locator("main img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0)).toBe(true);
      }
      await heading.click();
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await page.screenshot({ path: testInfo.outputPath(`${route.replaceAll("/", "_")}-${width}.png`), fullPage: true });
    }
    await page.goto("/collections");
    const firstTopic = page.getByRole("navigation", { name: "Темы подборок" }).getByRole("link").first();
    await firstTopic.focus();
    expect(await firstTopic.evaluate(node => getComputedStyle(node).outlineStyle)).not.toBe("none");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#beyond-lines$/);
  });
}



