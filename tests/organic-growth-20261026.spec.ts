import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { gameReadingNotes } from "../src/lib/game-reading-notes";
import { editorialComparisons } from "../src/lib/editorial-comparisons";
import { getSlot, slots } from "../src/lib/data";
import { languageAlternates } from "../src/lib/locales";
import sitemap from "../src/app/sitemap";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });
const escape = (s: string) => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const locales = ["ru", "en", "es"] as const;
test("twenty sourced guides gain complete localized reading notes without changing the published guide set", () => {
  expect(Object.keys(gameReadingNotes)).toHaveLength(20);
  expect(slots).toHaveLength(100);
  for (const [slug, note] of Object.entries(gameReadingNotes)) {
    const game = getSlot(slug)!; expect(game, slug).toBeTruthy();
    expect(game.source).toMatch(/^https:\/\//);
    for (const locale of locales) {
      const copy = note.copy[locale], prefix = locale === "ru" ? "" : `/${locale}`;
      expect(copy.answer.length, slug).toBeGreaterThan(100);
      expect(copy.check.length, slug).toBeGreaterThan(35);
      if (locale !== "ru") expect(JSON.stringify(copy)).not.toMatch(/[А-Яа-яЁё]/);
      const html = readFileSync(join("out", prefix, "slots", slug, "index.html"), "utf8");
      expect(html, `${locale}/${slug}`).toContain(escape(copy.answer));
      expect(html).toContain(escape(copy.check));
      expect(html).toContain(escape(copy.question));
      expect(html).toContain(`${prefix}/journal/${note.guide}`);
      expect(html.match(/data-reading-note=/g)).toHaveLength(1);
      expect(html.match(/<title>(.*?)<\/title>/)?.[1]).toContain(escape(copy.topic));
    }
  }
});
test("all editorial comparisons have reciprocal language routes and distinct sitemap entries", () => {
  const entries = sitemap(); expect(editorialComparisons).toHaveLength(3);
  for (const item of editorialComparisons) {
    expect(new Set(item.games).size).toBe(2);
    expect(item.games.every(slug => Boolean(getSlot(slug)))).toBe(true);
    expect(item.sources).toHaveLength(2);
    const alternatives = languageAlternates(`/comparisons/${item.slug}`);
    expect(Object.keys(alternatives)).toEqual(locales);
    expect(entries.filter(e => new URL(e.url).pathname.endsWith(`/comparisons/${item.slug}/`) || new URL(e.url).pathname.endsWith(`/comparisons/${item.slug}`))).toHaveLength(3);
  }
});
for (const locale of locales) for (const width of [320, 375, 390, 768, 1024, 1440]) {
  test(`editorial comparisons remain readable and navigable in ${locale} at ${width}px`, async ({ page, request }) => {
    await page.setViewportSize({ width, height: 900 });
    const prefix = locale === "ru" ? "" : `/${locale}`, errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));
    const indexResponse = await request.get(`${prefix}/comparisons/`); expect(indexResponse.status()).toBe(200);
    const indexHtml = await indexResponse.text();
    expect(indexHtml.match(/<h2>/g)).toHaveLength(3);
    for (const item of editorialComparisons) {
      const response = await page.goto(`${prefix}/comparisons/${item.slug}/`); expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("main h1")).toHaveText(item.copy[locale].title);
      await expect(page.locator("main tbody tr")).toHaveCount(3);
      await expect(page.locator("main table caption")).toHaveText(item.copy[locale].title);
      expect(await page.locator("main table th[scope=col]").count()).toBe(3);
      if (width <= 600) {
        const table = await page.locator("main table").boundingBox();
        const label = await page.locator("main tbody tr").first().locator("th").boundingBox();
        expect(table).toBeTruthy(); expect(label).toBeTruthy();
        expect(label!.width).toBeGreaterThan(table!.width * 0.9);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      await expect.poll(() => page.locator("main img").evaluateAll(images => images.every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
      for (const source of await page.locator("#sources a").all()) await expect(source).toHaveAttribute("rel", "noopener noreferrer");
    }
    const guide = page.locator('main a[href$="/journal/comparing-games/"]').first();
    await guide.focus(); await expect(guide).toBeFocused(); await guide.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${prefix}/journal/comparing-games/?$`));
    expect(errors).toEqual([]);
  });
}
for (const locale of locales) test(`reading notes lead to the correct localized comparison in ${locale}`, async ({ page }) => {
  const prefix = locale === "ru" ? "" : `/${locale}`;
  await page.goto(`${prefix}/slots/gates-of-olympus/`);
  const note = page.locator('[data-reading-note="gates-of-olympus"]'); await expect(note).toHaveCount(1);
  const link = note.locator('a[href$="/comparisons/gates-of-olympus-vs-sweet-bonanza/"]'); await link.click();
  await expect(page.locator("main h1")).toHaveText(editorialComparisons[0].copy[locale].title);
  await expect(page.locator('footer a[href$="/comparisons/"]')).toHaveCount(1);
});
