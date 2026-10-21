import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { englishCatalogComplete } from "../src/lib/english-catalog-complete";
import { spanishCatalogComplete, type SpanishCatalogContent } from "../src/lib/spanish-catalog-complete";
import hashes from "../src/lib/spanish-catalog-complete-source-hashes.json" with { type: "json" };
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { hasTranslation, languageAlternates } from "../src/lib/locales";
import { spanishCatalogFact } from "../src/lib/spanish-catalog-facts";

const numbers = (text: string) => text.replace(/(\d)[ ,\u00a0](?=\d{3}(?:\D|$))/g, "$1").match(/\d+(?:[.,]\d+)?/g)?.map(n => n.replace(",", ".")) ?? [];
const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");

export function completeSpanishCatalogBatchTests(batch: number, copy: Record<string, SpanishCatalogContent>) {
  const entries = Object.entries(copy);
  test(`complete ES batch ${batch}: every paragraph, feature, number and source survives the translation`, () => {
    expect(entries.map(([slug]) => slug)).toEqual(catalogSeeds.slice((batch - 1) * 100, batch * 100).map(seed => seed.slug));
    for (const [slug, translated] of entries) {
      const original = englishCatalogComplete[slug];
      const fingerprint = createHash("sha256").update(JSON.stringify(original)).digest("hex");
      expect(fingerprint, `${slug}: source changed; review translation`).toBe((hashes as Record<string, string>)[slug]);
      expect(spanishCatalogComplete[slug]).toEqual(translated);
      expect(translated.intro?.length, slug).toBe(original.intro?.length);
      expect(translated.features.length, slug).toBe(original.features.length);
      const pairs = [
        ...(translated.intro ?? []).map((text, index) => [original.intro![index], text]),
        [original.editorial!, translated.editorial!],
        ...translated.features.flatMap((feature, index) => [[original.features[index].title, feature.title], [original.features[index].description, feature.description]]),
      ];
      const html = readFileSync(join(process.cwd(), "out/es/slots/catalog", slug, "index.html"), "utf8");
      for (const [en, es] of pairs) {
        expect(es.trim().length, slug).toBeGreaterThan(0);
        expect(es, slug).not.toMatch(/[А-Яа-яЁё]/);
        expect(numbers(es), `${slug}: ${es}`).toEqual(numbers(en));
        expect(es.length / en.length, slug).toBeGreaterThan(0.55);
        expect(es.length / en.length, slug).toBeLessThan(2.1);
        if (en.length > 60) expect(es, slug).not.toBe(en);
        expect(html, `${slug}: missing complete translated block`).toContain(escapeHtml(es));
      }
      const seed = catalogSeeds.find(seed => seed.slug === slug)!;
      const research = getVerifiedCatalogResearch(slug), details = getVerifiedCatalogDetails(slug), gameType = getVerifiedCatalogGameType(slug);
      if (gameType?.gameType) expect(html, `${slug}: untranslated game type`).toContain(`<dt>Tipo de juego</dt><dd>${escapeHtml(spanishCatalogFact(gameType.gameType))}</dd>`);
      const urls = new Set([seed.source, research?.source, details?.source,
        details?.releaseDateSource ?? (details?.releaseDate ? details.source : undefined),
        gameType?.source, details?.volatilitySource ?? (details?.volatility ? details.source : undefined)].filter(Boolean));
      for (const url of urls) expect(html, `${slug}: missing original source`).toContain(`href="${escapeHtml(url!)}"`);
      expect(hasTranslation(`/slots/catalog/${slug}`, "es")).toBe(true);
      expect(languageAlternates(`/slots/catalog/${slug}`)).toEqual({ ru: `/slots/catalog/${slug}`, en: `/en/slots/catalog/${slug}`, es: `/es/slots/catalog/${slug}` });
      expect(html.match(/data-slot-casino-link="es"/g), slug).toHaveLength(1);
    }
  });

  for (const [index, width] of [[0, 320], [0, 375], [0, 390], [0, 768], [0, 1024], [0, 1440], [49, 320], [99, 320]]) {
    test(`complete ES batch ${batch} browser: record ${index + 1} at ${width}px`, async ({ page }, testInfo) => {
      const [slug, translated] = entries[index];
      await page.setViewportSize({ width, height: 1000 });
      expect((await page.goto(`/es/slots/catalog/${slug}/`))?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("html")).toHaveAttribute("lang", "es");
      await expect(page.locator("#how-it-works p")).toHaveText(translated.intro!);
      await expect(page.locator("#functions .dossier-feature-card p")).toHaveText(translated.features.map(feature => feature.description));
      await expect(page.locator("#editorial blockquote")).toHaveText(translated.editorial!);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);
      const casino = page.locator('[data-slot-casino-link="es"]');
      await expect(casino).toHaveCount(1);
      expect(await casino.evaluate(element => element.nextElementSibling?.matches("dl.facts"))).toBe(true);
      await expect(casino.getByRole("link")).toHaveAttribute("href", "https://viazento.link/slotfolio");
      await expect(casino.getByRole("link")).toHaveAttribute("rel", "sponsored nofollow noopener noreferrer");
      expect(await casino.evaluate(element => element.scrollWidth)).toBeLessThanOrEqual(await casino.evaluate(element => element.clientWidth));
      await expect.poll(() => page.locator(".slot-figure img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      const leaks = await page.locator('main a[href^="/en/"], main a[href^="/slotfolio/en/"]').evaluateAll(links => links.filter(link => !/en inglés/i.test(`${link.textContent} ${link.getAttribute("aria-label") ?? ""}`)).map(link => link.getAttribute("href")));
      expect(leaks).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
      await page.screenshot({ path: testInfo.outputPath(`${slug}-${width}.png`), fullPage: width <= 390 });
    });
  }
}
