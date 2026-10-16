import { expect, test } from "@playwright/test";
import { englishReadyPaths, languageHref } from "../src/lib/locales";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

const englishUrls = [
  "/en",
  "/en/about",
  "/en/editorial-policy",
  "/en/privacy",
  "/en/disclosure",
  "/en/responsible-gaming",
  "/en/journal/understanding-rtp",
];

test("the language selector includes reviewed English pages and catalogue entry points", () => {
  expect(englishReadyPaths).toEqual([
    "/", "/about", "/slots", "/search", "/editorial-policy", "/privacy",
    "/disclosure", "/responsible-gaming", "/journal/understanding-rtp",
  ]);
  expect(languageHref("/about", "en")).toBe("/en/about");
  expect(languageHref("/en/about", "ru")).toBe("/about");
  expect(languageHref("/en/journal/understanding-rtp", "ru")).toBe("/journal/understanding-rtp");
  expect(languageHref("/slots", "en")).toBe("/en/slots");
  expect(languageHref("/search", "en")).toBe("/en/search");
  expect(languageHref("/slots/gates-of-olympus", "en")).toBe("/en/slots/gates-of-olympus");
  expect(languageHref("/slots/catalog/no-such-entry", "en")).toBe("/en");
  expect(languageHref("/en", "ru")).toBe("/");
});

test("each translated page has real English copy, locale metadata and noindex", async ({ page }) => {
  test.setTimeout(90_000);
  for (const path of englishUrls) {
    await page.goto(path);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("main > div[lang='en']")).toBeVisible();
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_GB");
    const englishAlternate = await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute("href");
    expect(new URL(englishAlternate!).pathname.replace(/\/$/, "")).toBe(path);
    await expect(page.locator('link[rel="alternate"][hreflang="ru"]')).toHaveAttribute("href", /^https?:\/\//);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const prose = await page.locator("main").innerText();
    expect(prose).not.toMatch(/[А-Яа-яЁё]{3,}/);
    await expect(page.locator("header").first()).toContainText("RTP guide");
    await expect(page.locator("footer")).toContainText("Safer gambling");
  }
});

test("English site keeps readable navigation and mobile layout", async ({ page }) => {
  test.setTimeout(90_000);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/en", "/en/about", "/en/privacy", "/en/journal/understanding-rtp"]) {
      await page.goto(path);
      if (width <= 600) {
        await page.getByRole("button", { name: /^Menu/ }).click();
      }
      await expect(page.getByRole("link", { name: "RU", exact: true })).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(overflow, `horizontal overflow at ${width}px on ${path}`).toBeLessThanOrEqual(width + 1);
    }
  }
});

test("Russian routes keep their own text, language and a functioning English switch", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator("main")).toContainText("Как пользоваться Slotfolio");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/about\/?$/);
  await expect(page.locator("main")).toContainText("How to use Slotfolio");
  await page.getByRole("link", { name: "RU", exact: true }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
});

test("English pages never link to untranslated pages without indicating Russian", async ({ page }) => {
  for (const path of englishUrls) {
    await page.goto(path);
    const leaks = await page.locator("main a[href^='/']").evaluateAll((links) => links
      .map((x) => ({ href: x.getAttribute("href") || "", text: ((x.textContent || "") + " " + (x.getAttribute("aria-label") || "")).trim() }))
      .filter(({ href, text }) => !href.startsWith("/en") && !/Russian|RU/i.test(text)));
    expect(leaks, `${path} should label links to Russian-only pages`).toEqual([]);
  }
});
