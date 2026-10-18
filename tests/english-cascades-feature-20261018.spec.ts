import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { languageHref, translatedCounterpart } from "../src/lib/locales";

const slug = "/journal/how-cascades-work";
const route = "/en/journal/how-cascades-work/";
const sectionIds = ["one-spin", "sequence", "different", "multiplier", "rhythm", "rules", "conclusion"];

test("the in-depth English cascades story exports a paired static page", () => {
  expect(languageHref(slug, "en")).toBe("/en" + slug);
  expect(translatedCounterpart("/en" + slug)).toBe(slug);
  expect(translatedCounterpart(slug)).toBe("/en" + slug);
  expect(existsSync(join(process.cwd(), "out", "en", "journal", "how-cascades-work", "index.html"))).toBe(true);
});

test("cascades story retains seven reviewed sections, examples and sources", async ({ page }) => {
  await page.goto(route);
  await expect(page.getByRole("heading", { name: /One spin/ })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\/journal\/how-cascades-work\/?$/);
  await expect(page.locator('link[rel="alternate"][hreflang="ru"]')).toHaveAttribute("href", /\/journal\/how-cascades-work\/?$/);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_GB");

  const ids = await page.locator("article.prose > section").evaluateAll(nodes => nodes.map(node => node.id));
  expect(ids).toEqual(sectionIds);
  await expect(page.locator("#sequence tbody tr")).toHaveCount(4);
  await expect(page.locator("#sequence")).toContainText("Initial grid");
  await expect(page.locator("#different")).toContainText("Cascades are not the same as clusters");
  await expect(page.locator("#multiplier")).toContainText("free spins");
  await expect(page.locator("#rhythm")).toContainText("balance");
  await expect(page.locator("#conclusion")).toContainText("theoretical long-run measure");

  await expect(page.getByRole("link", { name: "Gambling Commission's guide" })).toHaveAttribute("href", "https://www.gamblingcommission.gov.uk/public-and-players/guide/return-to-player-how-much-gaming-machines-payout");
  await expect(page.locator("#conclusion a[href^='https://www.pragmaticplay.com/']")).toHaveCount(2);
  await expect(page.locator("#conclusion a[href='https://www.playngo.com/games/reactoonz']")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "View three game examples" })).toHaveAttribute("href", /\/en\/collections\/beyond-lines\/?$/);
  for (const game of ["sweet-bonanza", "reactoonz", "gates-of-olympus"]) {
    await expect(page.locator(`a[href^="/en/slots/${game}"]`).first()).toBeVisible();
  }
  await expect(page.locator("main")).not.toContainText(/[А-Яа-яЁё]{3,}/);
  await expect(page.locator('img[alt="Official Sweet Bonanza game artwork"]')).toBeVisible();
});

test("the journal home features the English cascades story without untranslated claims", async ({ page }) => {
  await page.goto("/en/journal/");
  await expect(page.getByRole("link", { name: /One spin.*Several events/ })).toHaveAttribute("href", /\/en\/journal\/how-cascades-work\/?$/);
  await expect(page.getByText(/All five practical journal guides/)).toBeVisible();
  await expect(page.locator("main")).not.toContainText(/still awaiting its English adaptation/);
});

test("English cascades editorial stays readable and keyboard-navigable", async ({ page }) => {
  test.setTimeout(120_000);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(route);
    await expect(page.getByRole("heading", { name: /One spin/ })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `horizontal overflow at ${width}px`).toBeLessThanOrEqual(width + 1);
    const toc = page.getByRole("navigation", { name: "On this page" });
    await expect(toc.getByRole("link")).toHaveCount(7);
    const first = toc.getByRole("link").first();
    await first.focus();
    await expect(first).toBeFocused();
    await page.keyboard.press("Enter");
    await expect.poll(() => new URL(page.url()).hash).toBe("#one-spin");
    const sequence = page.getByRole("region", { name: "Cascade sequence, scrolls horizontally" });
    await sequence.focus();
    await expect(sequence).toBeFocused();
    expect(await sequence.evaluate(node => getComputedStyle(node).outlineStyle)).not.toBe("none");
    expect(await sequence.locator("td, th").evaluateAll(nodes => Math.min(...nodes.map(node => parseFloat(getComputedStyle(node).fontSize))))).toBeGreaterThanOrEqual(14);
    if (width <= 390) {
      await page.keyboard.press("ArrowRight");
      await expect.poll(() => sequence.evaluate(node => node.scrollLeft)).toBeGreaterThan(0);
      const examples = page.getByRole("link", { name: "View three game examples" });
      const box = await examples.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
  }
});
