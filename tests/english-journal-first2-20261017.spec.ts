import { test, expect } from "@playwright/test";
import { journalGuides } from "../src/lib/journal-guides";
import { englishJournalGuides } from "../src/lib/english-journal-guides";
import { languageHref, translatedCounterpart } from "../src/lib/locales";

test("the English journal includes two complete, source-backed articles without inventing facts", () => {
  expect(englishJournalGuides.map(guide => guide.slug)).toEqual(["reading-paytables", "payout-systems"]);
  for (const guide of englishJournalGuides) {
    const original = journalGuides.find(item => item.slug === guide.slug)!;
    expect(guide.sections.map(section => section.id)).toEqual(original.sections.map(section => section.id));
    expect(guide.sections).toHaveLength(original.sections.length);
    expect(guide.sources.map(source => source.href).sort()).toEqual(original.sources.map(source => source.href).sort());
    for (let i = 0; i < original.sections.length; i++) {
      const source = original.sections[i];
      const english = guide.sections[i];
      expect(english.paragraphs).toHaveLength(source.paragraphs.length);
      expect(Boolean(english.example)).toBe(Boolean(source.example));
      expect(english.checks?.length || 0).toBe(source.checks?.length || 0);
      expect(english.paragraphs.every(text => text.length > 40)).toBe(true);
    }
    expect(languageHref(`/journal/${guide.slug}`, "en")).toBe(`/en/journal/${guide.slug}`);
    expect(translatedCounterpart(`/en/journal/${guide.slug}`)).toBe(`/journal/${guide.slug}`);
  }
  expect(languageHref("/journal/wild-and-scatter", "en")).toBe("/en");
});

test("the English index links to reviewed articles and does not claim the untranslated guides", async ({ page }) => {
  await page.goto("/en/journal/");
  await expect(page.getByRole("heading", { name: "Journal and guides", exact: true })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  for (const guide of englishJournalGuides) {
    await expect(page.getByRole("link", { name: guide.title, exact: true })).toHaveAttribute("href", new RegExp(`/en/journal/${guide.slug}/?$`));
  }
  await expect(page.getByRole("link", { name: "What RTP actually means" })).toHaveAttribute("href", /\/en\/journal\/understanding-rtp\/?$/);
  await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]{3,}/);
});

for (const guide of englishJournalGuides) {
  test(`English journal: ${guide.slug}`, async ({ page }) => {
    await page.goto(`/en/journal/${guide.slug}/`);
    await expect(page.getByRole("heading", { name: guide.title, exact: true })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/en/journal/${guide.slug}/?$`));
    await expect(page.locator('link[rel="alternate"][hreflang="ru"]')).toHaveAttribute("href", new RegExp(`/journal/${guide.slug}/?$`));
    for (const section of guide.sections) {
      await expect(page.locator(`section#${section.id} h2`)).toHaveText(section.title);
    }
    const actualSources = await page.locator('section#sources ul').first().locator("a").evaluateAll(nodes => nodes.map(n => n.getAttribute("href")));
    expect(actualSources.sort()).toEqual(guide.sources.map(source => source.href).sort());
    await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]{3,}/);
    await expect(page.getByRole("link", { name: "All journal guides" })).toHaveAttribute("href", /\/en\/journal\/?$/);
  });
}

test("reading the translated journal is accessible at five widths", async ({ page }) => {
  test.setTimeout(90_000);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ["/en/journal/", "/en/journal/reading-paytables/", "/en/journal/payout-systems/"]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), path + " at " + width).toBeLessThanOrEqual(width + 1);
      if (path.includes("reading-paytables") || path.includes("payout-systems")) {
        const toc = page.getByRole("navigation", { name: "On this page" });
        await expect(toc.getByRole("link").first()).toBeVisible();
        const first = toc.getByRole("link").first();
        await first.focus();
        await expect(first).toBeFocused();
        await page.keyboard.press("Enter");
        await expect.poll(() => new URL(page.url()).hash).toBe(await first.getAttribute("href"));
      }
    }
  }
});

test("reviewed English journal routes coexist with published collections and region guides", () => {
  for (const [ru, en] of [
    ["/collections/beyond-lines", "/en/collections/beyond-lines"],
    ["/bonuses", "/en/bonuses"],
    ["/regions/great-britain", "/en/regions/great-britain"],
  ]) {
    expect(languageHref(ru, "en")).toBe(en);
    expect(translatedCounterpart(en)).toBe(ru);
  }
});
