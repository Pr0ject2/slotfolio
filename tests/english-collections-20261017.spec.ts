import { test, expect } from "@playwright/test";
import { gameCollections } from "../src/lib/collections";
import { englishGameCollections } from "../src/lib/english-game-collections";
import { languageHref, translatedCounterpart } from "../src/lib/locales";
import { getSlot } from "../src/lib/data";

test("four English collections retain the exact source-backed game selection", () => {
  expect(englishGameCollections).toHaveLength(4);
  expect(englishGameCollections.map(item => item.slug)).toEqual(gameCollections.map(item => item.slug));
  for (const collection of englishGameCollections) {
    const original = gameCollections.find(item => item.slug === collection.slug)!;
    expect(collection.games.map(game => game.slug)).toEqual(original.games.map(game => game.slug));
    expect(collection.games).toHaveLength(3);
    expect(collection.checklist).toHaveLength(3);
    expect(collection.introduction.length).toBeGreaterThan(45);
    expect(collection.selection.length).toBeGreaterThan(45);
    for (const game of collection.games) {
      expect(getSlot(game.slug), `Missing source-backed game: ${game.slug}`).toBeDefined();
      expect(game.note.length).toBeGreaterThan(40);
      expect(game.check.length).toBeGreaterThan(30);
    }
    expect(languageHref(`/collections/${collection.slug}`, "en")).toBe(`/en/collections/${collection.slug}`);
    expect(translatedCounterpart(`/en/collections/${collection.slug}`)).toBe(`/collections/${collection.slug}`);
  }
  expect(languageHref("/collections/no-such-topic", "en")).toBe("/en");
});

test("English collection index links every reviewed topic", async ({ page }) => {
  await page.goto("/en/collections/");
  await expect(page.getByRole("heading", { name: "Understand the rules by comparing games" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  for (const collection of englishGameCollections) {
    await expect(page.locator(`article#${collection.slug} h2 a`)).toHaveAttribute("href", `/en/collections/${collection.slug}/`);
  }
  await expect(page.locator('link[rel="alternate"][hreflang="ru"]')).toHaveAttribute("href", /\/collections\/?$/);
  await expect(page.locator("main")).not.toContainText("Тематические подборки");
});

for (const collection of englishGameCollections) {
  test(`English collection: ${collection.slug}`, async ({ page }) => {
    await page.goto(`/en/collections/${collection.slug}/`);
    await expect(page.getByRole("heading", { name: collection.title, exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Why these games?" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Questions worth comparing" })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/en/collections/${collection.slug}/?$`));
    await expect(page.locator('link[rel="alternate"][hreflang="ru"]')).toHaveAttribute("href", new RegExp(`/collections/${collection.slug}/?$`));
    for (const game of collection.games) {
      await expect(page.getByRole("heading", { name: getSlot(game.slug)!.name, exact: true }).locator("a"))
        .toHaveAttribute("href", `/en/slots/${game.slug}/`);
    }
    await expect(page.getByRole("link", { name: "side-by-side table" })).toHaveAttribute("href", "/en/compare/");
    await expect(page.locator(".compare-button")).toHaveCount(3);
  });
}

test("English collections have no horizontal overflow at mobile and desktop widths", async ({ page }) => {
  test.setTimeout(120_000);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/en/collections/", "/en/collections/beyond-lines/"]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const contentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(contentWidth, `${path} at ${width}px`).toBeLessThanOrEqual(width + 1);
      await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]{3,}/);
    }
  }
});
