import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import copy from "../src/lib/english-catalog-complete-batch01.json" with { type: "json" };
import hashes from "../src/lib/english-catalog-complete-source-hashes.json" with { type: "json" };
import { englishCatalogComplete, type EnglishCatalogContent } from "../src/lib/english-catalog-complete";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import originalModule from "./catalog-original-editorial.cjs";

const original = originalModule as {
  catalogEditorial: Record<string, EnglishCatalogContent>;
  expandedEditorialFeatures: (entry: EnglishCatalogContent, research: unknown) => EnglishCatalogContent["features"];
};
const entries = Object.entries(copy);
const numbers = (text: string) => text.replace(/(\d)[ ,\u00a0](?=\d{3}(?:\D|$))/g, "$1").match(/\d+(?:[.,]\d+)?/g)?.map(n => n.replace(",", ".")) ?? [];
const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");

test("complete English batch retains every original paragraph, feature and numerical value", () => {
  expect(entries.map(([slug]) => slug)).toEqual(catalogSeeds.slice(0, 100).map(seed => seed.slug));
  for (const [slug, translated] of entries) {
    const seed = catalogSeeds.find(seed => seed.slug === slug)!;
    const editorial = original.catalogEditorial[slug];
    const research = getVerifiedCatalogResearch(slug);
    const details = getVerifiedCatalogDetails(slug);
    const gameType = getVerifiedCatalogGameType(slug);
    const features = original.expandedEditorialFeatures(editorial, research);
    const fingerprint = createHash("sha256").update(JSON.stringify({ seed, editorial, features, research, details, gameType })).digest("hex");
    expect(fingerprint, `${slug}: original changed; review translation`).toBe(hashes[slug as keyof typeof hashes]);
    expect(englishCatalogComplete[slug]).toEqual(translated);
    expect(translated.intro.length, slug).toBe(editorial.intro?.length);
    expect(translated.features.length, slug).toBe(features.length);
    const pairs = [
      ...translated.intro.map((text, i) => [editorial.intro![i], text]),
      [editorial.editorial!, translated.editorial],
      ...translated.features.flatMap((feature, i) => [[features[i].title, feature.title], [features[i].description, feature.description]]),
    ];
    const html = readFileSync(join(process.cwd(), "out/en/slots/catalog", slug, "index.html"), "utf8");
    for (const [ru, en] of pairs) {
      expect(en.trim().length, slug).toBeGreaterThan(0);
      expect(en, slug).not.toMatch(/[А-Яа-яЁё]/);
      expect(numbers(en), `${slug}: ${en}`).toEqual(numbers(ru));
      expect(html, `${slug}: missing translated block`).toContain(escapeHtml(en));
    }
    const urls = new Set([seed.source, research?.source, details?.source,
      details?.releaseDateSource ?? (details?.releaseDate ? details.source : undefined),
      gameType?.source, details?.volatilitySource ?? (details?.volatility ? details.source : undefined)].filter(Boolean));
    for (const url of urls) expect(html, `${slug}: missing original source`).toContain(`href="${escapeHtml(url!)}"`);
  }
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`complete catalogue profile remains usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/en/slots/catalog/${entries[0][0]}/`);
    await page.evaluate(() => document.fonts.ready);
    const main = page.locator("main");
    await expect(main).not.toContainText(/[А-Яа-яЁё]/);
    await expect(page.locator("#functions .dossier-feature-card")).toHaveCount(entries[0][1].features.length);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    const prose = await page.locator(".prose").boundingBox();
    expect(prose!.width).toBeGreaterThanOrEqual(Math.min(700, width - 48));
    expect(prose!.width).toBeLessThanOrEqual(700);
    const toc = page.getByRole("navigation", { name: "On this page" });
    const link = toc.getByRole("link", { name: "Facts and sources", exact: true });
    await link.focus();
    await expect(link).toBeFocused();
    const target = await link.boundingBox();
    expect(target!.height).toBeGreaterThanOrEqual(44);
    const focus = await link.evaluate(el => {
      const style = getComputedStyle(el);
      return style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0;
    });
    expect(focus).toBe(true);
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#facts$/);
    await expect(page.locator("#facts h2")).toBeInViewport();
    await page.locator("#faq summary").first().click();
    await expect(page.locator("#faq details").first()).toHaveAttribute("open", "");
  });
}

for (const slug of [entries[49][0], entries[99][0]]) {
  test(`complete content and sources: ${slug}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(`/en/slots/catalog/${slug}/`);
    const translated = englishCatalogComplete[slug];
    await expect(page.locator("#how-it-works p")).toHaveText(translated.intro!);
    await expect(page.locator("#functions .dossier-feature-card p")).toHaveText(translated.features.map(feature => feature.description));
    await expect(page.locator("#editorial blockquote")).toHaveText(translated.editorial!);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });
}
