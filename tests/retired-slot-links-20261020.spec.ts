import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createCatalogModel } from "../src/lib/catalog-index";
import { getSlot, slots } from "../src/lib/data";
import { retiredSlotLinks } from "../src/lib/retired-slot-links";
import { languageHref, translatedCounterpart } from "../src/lib/locales";

test("legacy links do not add games or restore SVG covers; cache rules cover only four retired routes", () => {
  expect(slots).toHaveLength(100);
  expect(createCatalogModel().items).toHaveLength(1000);
  for (const [slug, entry] of Object.entries(retiredSlotLinks)) {
    expect(getSlot(slug)).toBeUndefined();
    expect(languageHref(`/en/slots/${slug}`, "en")).toBe(`/en/slots/${slug}`);
    expect(translatedCounterpart(`/slots/${slug}`)).toBe(`/en/slots/${slug}`);
    for (const game of entry.games) expect(getSlot(game)?.image).toMatch(/\.webp$/);
  }
  const headers = readFileSync("public/_headers", "utf8").trim().split(/\r?\n/);
  // A route may set security headers without changing its cache policy.
  // Track every Cache-Control directive, preserving the exact four-path gate.
  const cachePaths: string[] = [];
  let path = "";
  for (const line of headers) {
    if (line && !/^\s|#/.test(line)) path = line;
    if (/^\s+Cache-Control:/i.test(line)) cachePaths.push(path);
  }
  expect(cachePaths).toEqual([
    "/slots/gates-of-1win/*", "/slots/1win-bonanza/*", "/en/slots/gates-of-1win/*", "/en/slots/1win-bonanza/*",
  ]);
  expect(headers.filter(line => line.trim() === "Cache-Control: no-store")).toHaveLength(4);
});

for (const locale of ["ru", "en"] as const) for (const slug of Object.keys(retiredSlotLinks) as (keyof typeof retiredSlotLinks)[]) for (const width of [320, 390, 1440]) {
  test(`old ${locale} ${slug} link remains usable at ${width}px`, async ({ page }, testInfo) => {
    const root = locale === "en" ? "/en" : "";
    const entry = retiredSlotLinks[slug];
    await page.setViewportSize({ width, height: 1000 });
    expect((await page.goto(`${root}/slots/${slug}/`))?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(locale === "en" ? "Choose a game edition" : "Выберите версию игры");
    await expect(page.locator(".game-row")).toHaveCount(entry.games.length);
    await expect(page.locator('main img[src$=".svg"]')).toHaveCount(0);
    for (const gameSlug of entry.games) {
      const game = getSlot(gameSlug)!;
      const link = page.getByRole("heading", { level: 3, name: game.name, exact: true }).getByRole("link");
      await expect(link).toHaveAttribute("href", new RegExp(`${root}/slots/${gameSlug}/?$`));
      const image = page.locator(`.game-row img[src$="/${gameSlug}.webp"]`);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(100);
    }
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
    if (locale === "en") await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const sitemap = await (await page.request.get("/sitemap.xml")).text();
    expect(sitemap).not.toContain(`/slots/${slug}/`);
    await page.screenshot({ path: testInfo.outputPath(`${slug}-${locale}-${width}.png`), fullPage: true });
    const firstLink = page.locator(".game-row h3 a").first();
    await firstLink.focus();
    await expect(firstLink).toBeFocused();
    expect(await firstLink.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe("none");
    await firstLink.press("Enter");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(getSlot(entry.games[0])!.name);
    await expect.poll(() => page.locator(".slot-figure img").first().evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(100);
  });
}
