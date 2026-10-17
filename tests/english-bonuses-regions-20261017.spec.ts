import { test, expect } from "@playwright/test";
import { languageHref, translatedCounterpart } from "../src/lib/locales";

const pairs = [
  ["/bonuses", "/en/bonuses"],
  ["/regions", "/en/regions"],
  ["/regions/great-britain", "/en/regions/great-britain"],
] as const;

test("bonus and territory routes are reviewed bilingual counterparts", () => {
  for (const [ru, en] of pairs) {
    expect(languageHref(ru, "en")).toBe(en);
    expect(languageHref(en, "ru")).toBe(ru);
    expect(translatedCounterpart(ru)).toBe(en);
    expect(translatedCounterpart(en)).toBe(ru);
  }
});

for (const [ru, en] of pairs) {
  test(`English route ${en} keeps factual and locale metadata`, async ({ page }) => {
    await page.goto(en);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_GB");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${en}/?$`));
    await expect(page.locator('link[rel="alternate"][hreflang="ru"]')).toHaveAttribute("href", new RegExp(`${ru}/?$`));
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]{3,}/);
  });
}

test("bonus terms identify illustrative figures and link to safer gambling", async ({ page }) => {
  await page.goto("/en/bonuses/");
  await expect(page.getByRole("heading", { name: "Read the terms before the headline" })).toBeVisible();
  await expect(page.locator("#wager")).toContainText("1,000 units");
  await expect(page.locator("#wager")).toContainText("not a live offer");
  await expect(page.getByRole("link", { name: "Read our safer gambling guidance" })).toHaveAttribute("href", "/en/responsible-gaming/");
});

test("Great Britain guide links the official regulator and excludes Northern Ireland", async ({ page }) => {
  await page.goto("/en/regions/great-britain/");
  await expect(page.getByText(/not about Northern Ireland/)).toBeVisible();
  await expect(page.locator("#register a")).toHaveAttribute("href", "https://www.gamblingcommission.gov.uk/public-register/businesses/");
  await expect(page.locator("#sources")).toContainText("General information only");
  await expect(page.locator("#conditions tbody tr")).toHaveCount(5);
});

test("all three guides avoid mobile overflow", async ({ page }) => {
  test.setTimeout(90_000);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [, route] of pairs) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth, `${route} at ${width}px`).toBeLessThanOrEqual(width + 1);
    }
  }
});

test("English home reflects the completed catalogue without outdated pilot wording", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.getByText(/All 1,000 catalogue entries are available in English/)).toBeVisible();
  await expect(page.getByText(/900 source-linked technical records and 100 full game guides/)).toBeVisible();
  await expect(page.locator("main")).not.toContainText(/More English game guides are being added/);
});

test("English privacy page links to the reviewed comparison page", async ({ page }) => {
  await page.goto("/en/privacy/");
  await expect(page.getByRole("link", { name: "Open the English comparison" })).toHaveAttribute("href", "/en/compare/");
});
