import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getSlot } from "../src/lib/data";
import { editorialArtworkBySlug } from "../src/lib/editorial-artwork";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });
const batch1 = ["1win-bonanza", "gates-of-1win", "house-of-sins", "gates-of-olympus",
  "gates-of-olympus-1000", "big-bass-bonanza", "the-dog-house",
  "sugar-rush", "fruit-party", "fury-of-anubis"];
const batch2 = [
  "sweet-bonanza",
  "mahjong-wins-super-scatter",
  "gates-of-olympus-super-scatter",
  "sugar-rush-1000",
  "starlight-princess",
  "the-big-dog-house",
  "hot-and-spicy-jackpot",
  "legacy-of-dead",
  "hand-of-anubis",
  "rise-of-olympus"
];

test("20 editorial covers are explicitly selected, safe and keep originals for evidence", () => {
  expect(Object.keys(editorialArtworkBySlug).sort()).toEqual([...batch1, ...batch2].sort());
  for (const slug of batch2) {
    const slot = getSlot(slug)!;
    expect(slot, `${slug} must be published`).toBeTruthy();
    expect(slot.source).toMatch(/^https:\/\//);
    expect(slot.image).toMatch(/^\/images\/slots\//);
    expect(editorialArtworkBySlug[slug]).toBe(`/images/editorial/${slug}.svg`);
    const image = readFileSync(join(process.cwd(), "public", "images", "editorial", `${slug}.svg`), "utf8");
    expect(image).toContain('width="1200" height="675" viewBox="0 0 1200 675"');
    expect(image).toContain("Авторское тематическое изображение Slotfolio");
    expect(image).toContain('role="img"');
    expect(image).not.toMatch(/<script\b|<foreignObject\b|(?:href|src)\s*=\s*["\u0027]https?:\/\//i);
  }
});

test("all ten new editorial SVGs load on their dossier pages at full intrinsic resolution", async ({ page }) => {
  for (const slug of batch2) {
    await page.goto(`/slots/${slug}`);
    const image = page.locator(".slot-figure img").first();
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute("src", new RegExp(`/images/editorial/${slug}\\.svg$`));
    await expect.poll(async () => image.evaluate((node) => {
      const element = node as HTMLImageElement;
      return element.complete && element.naturalWidth === 1200 && element.naturalHeight === 675
        && !element.currentSrc.includes("unavailable.svg");
    })).toBe(true);
  }
});

test("collection-specific Sweet Bonanza composition and priority hero remain unchanged", async ({ page }) => {
  await page.goto("/collections/beyond-lines");
  await expect(page.locator(".collection-entry").first().locator("img"))
    .toHaveAttribute("src", /\/images\/collections\/sweet-bonanza-feature\.svg$/);
  await page.goto("/");
  await expect(page.locator(".cover-art img"))
    .not.toHaveAttribute("src", /\/images\/editorial\/gates-of-olympus\.svg$/);
});
