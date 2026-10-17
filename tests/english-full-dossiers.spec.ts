import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { slots, relatedSlots } from "../src/lib/data";
import { getVerifiedSlotMetrics, slotFeatureCards } from "../src/lib/dossier";
import { getVerifiedSlotPassport } from "../src/lib/slot-passport";
import { englishDossierSlugs } from "../src/lib/english-dossier-routes";
import { englishCatalogFact } from "../src/lib/english-catalog-facts";
import { englishFullDossiers, englishDossierFeatureCards, englishMetricLabel, englishReleaseDate } from "../src/lib/english-full-dossiers";
import reviewedSourceHashes from "../src/lib/english-full-dossier-source-hashes.json" with { type: "json" };

function numbers(value: string) {
  return value.replace(/(\d)[ \u00a0](?=\d{3}(?:\D|$))/g, "$1").match(/\d+(?:[.,]\d+)?/g)?.map(number => number.replace(",", ".")) ?? [];
}

test("full English copy covers exactly 100 unchanged source dossiers and their existing routes", () => {
  expect(slots).toHaveLength(100);
  expect(Object.keys(englishFullDossiers).sort()).toEqual(slots.map(game => game.slug).sort());
  expect(Object.keys(englishFullDossiers).sort()).toEqual([...englishDossierSlugs].sort());
  expect(Object.keys(reviewedSourceHashes).sort()).toEqual(slots.map(game => game.slug).sort());
  for (const game of slots) {
    const source = { name:game.name, provider:game.provider, year:game.year, field:game.field, rtp:game.rtp, volatility:game.volatility, description:game.description, feature:game.feature, note:game.note, tags:game.tags, image:game.image, featureImage:game.featureImage, source:game.source, cards:slotFeatureCards(game), metrics:getVerifiedSlotMetrics(game.slug), passport:getVerifiedSlotPassport(game.slug) };
    expect(createHash("sha256").update(JSON.stringify(source)).digest("hex"), game.slug).toBe((reviewedSourceHashes as Record<string,string>)[game.slug]);
    expect(existsSync(join(process.cwd(), "out/en/slots", game.slug, "index.html")), game.slug).toBe(true);
  }
});

test("every description, feature, editorial caveat and feature card preserves source numbers", () => {
  for (const game of slots) {
    const copy = englishFullDossiers[game.slug];
    const metrics = getVerifiedSlotMetrics(game.slug);
    const passport = getVerifiedSlotPassport(game.slug);
    for (const key of ["description", "feature", "note"] as const) {
      expect(copy[key], `${game.slug}: ${key}`).not.toMatch(/[А-Яа-яЁё]/);
      expect(copy[key].length, `${game.slug}: ${key}`).toBeGreaterThan(20);
      expect(numbers(copy[key]), `${game.slug}: ${key}`).toEqual(numbers(game[key]));
    }
    if (metrics?.note) {
      expect(copy.metricsNote, game.slug).toBeTruthy();
      expect(copy.metricsNote, game.slug).not.toMatch(/[А-Яа-яЁё]/);
      expect(numbers(copy.metricsNote!), game.slug).toEqual(numbers(metrics.note));
    }
    if (passport) expect(copy.releaseDate ?? englishReleaseDate(passport.releaseDate), game.slug).not.toMatch(/[А-Яа-яЁё]/);
    const cards = englishDossierFeatureCards(game);
    const original = slotFeatureCards(game);
    expect(cards, game.slug).toHaveLength(original.length);
    cards.forEach((card,index) => {
      expect(card.title + card.text, `${game.slug}: card ${index}`).not.toMatch(/[А-Яа-яЁё]/);
      expect(numbers(card.text), `${game.slug}: card ${index}`).toEqual(numbers(original[index].text));
      expect(numbers(card.title), `${game.slug}: card ${index} title`).toEqual(numbers(original[index].title));
      expect(card.kind).toBe(original[index].kind);
    });
  }
});

for (const game of slots) {
  test(`Full English dossier retains facts, caveats, features and all sources: ${game.slug}`, async ({ page }) => {
    expect((await page.goto(`/en/slots/${game.slug}/`))?.status()).toBe(200);
    const copy = englishFullDossiers[game.slug];
    const metrics = getVerifiedSlotMetrics(game.slug);
    const passport = getVerifiedSlotPassport(game.slug);
    await expect(page.getByRole("heading", {name:game.name, exact:true})).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]/);
    await expect(page.locator(".slot-deck")).toHaveText(copy.description);
    await expect(page.locator("#perspective blockquote")).toHaveText(copy.note);
    for (const value of [game.field, game.rtp, game.volatility, metrics?.maxWin, metrics?.observedWin].filter(Boolean)) await expect(page.locator(".facts")).toContainText(englishCatalogFact(value!));
    if (metrics?.maxWin) await expect(page.locator(".facts dt").filter({hasText:englishMetricLabel(metrics.maxWinLabel,"Documented maximum")})).toHaveCount(1);
    if (metrics?.observedWin) await expect(page.locator(".facts dt").filter({hasText:englishMetricLabel(metrics.observedWinLabel,"Observed win")})).toHaveCount(1);
    if (passport) {
      await expect(page.locator(".facts")).toContainText(copy.releaseDate ?? englishReleaseDate(passport.releaseDate));
      await expect(page.locator(".facts")).toContainText(passport.gameType);
    }
    if (metrics?.note) await expect(page.locator(".metric-caveat")).toHaveText(copy.metricsNote!);
    if (copy.attributionNote) await expect(page.locator(".slot-summary")).toContainText(copy.attributionNote);
    const cards = englishDossierFeatureCards(game);
    await expect(page.locator("#feature .dossier-feature-card")).toHaveCount(cards.length);
    for (let index=0; index<cards.length; index++) await expect(page.locator("#feature .dossier-feature-card").nth(index)).toContainText(cards[index].text);
    const expectedSources = new Set([game.source, passport?.source, metrics?.source, ...(metrics?.additionalSources ?? []).map(source=>source.url)].filter(Boolean));
    const renderedSources = await page.locator("#source a[href^='https://']").evaluateAll(links=>links.map(link=>link.getAttribute("href")!));
    expect([...new Set(renderedSources)].sort()).toEqual([...expectedSources].sort());
    await expect(page.locator("#faq details")).toHaveCount(3);
    for (const related of relatedSlots(game,3)) await expect(page.locator("#related").getByRole("link", {name:related.name,exact:true})).toHaveAttribute("href", new RegExp(`/en/slots/${related.slug}/?$`));
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/en/slots/${game.slug}/?$`));
    await expect(page.locator('link[rel="alternate"][hreflang="ru"]')).toHaveAttribute("href", new RegExp(`/slots/${game.slug}/?$`));
    const article = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(article.some(value => { const parsed=JSON.parse(value); return parsed["@type"]==="Article" && parsed.inLanguage==="en" && parsed.description===copy.description; })).toBe(true);
  });
}

for (const width of [320,390,768,1024,1440]) {
  test(`Full English dossiers preserve readable facts and keyboard navigation at ${width}px`, async ({page},testInfo) => {
    await page.setViewportSize({width,height:1000});
    for (const slug of ["reactoonz","fury-of-anubis","1win-bonanza"]) {
      await page.goto(`/en/slots/${slug}/`);
      await page.evaluate(()=>document.fonts.ready);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
      expect((await page.locator(".slot-summary").boundingBox())!.width).toBeGreaterThanOrEqual(Math.min(260,width-48));
      expect(await page.locator(".facts dd").first().evaluate(element=>parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(14);
      const first = page.locator(".article-toc > a").first();
      expect((await first.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      await first.focus();
      await expect(first).toBeFocused();
      expect(await first.evaluate(element=>getComputedStyle(element).outlineStyle)).not.toBe("none");
      await page.keyboard.press("Enter");
      await expect.poll(()=>new URL(page.url()).hash).toBe("#rules");
      await page.screenshot({path:testInfo.outputPath(`${slug}-${width}.png`),fullPage:true});
    }
  });
}
