import { test, expect } from "@playwright/test";
import { hasReviewedGameArtwork } from "../src/lib/artwork-availability";

const pseudoCovers = ["gates-of-1win", "1win-bonanza", "house-of-sins"] as const;

test("editorial SVGs are never treated as real game imagery", () => {
  for (const slug of pseudoCovers) {
    expect(hasReviewedGameArtwork(`/images/slots/${slug}.svg`)).toBe(false);
    expect(hasReviewedGameArtwork(`/slotfolio/images/slots/${slug}.svg`)).toBe(false);
  }
  expect(hasReviewedGameArtwork("/images/unavailable.svg")).toBe(false);
  expect(hasReviewedGameArtwork("/images/slots/gates-of-olympus.webp")).toBe(true);
});

for (const language of ["", "/en"]) {
  for (const slug of pseudoCovers) {
    test(`${language || "ru"}: ${slug} has no fake game artwork`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${language}/slots/${slug}/`);
      await expect(page.locator(".slot-intro-without-artwork")).toHaveCount(1);
      await expect(page.locator(".slot-intro .slot-figure")).toHaveCount(0);
      await expect(page.locator(".slot-intro .facts")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
    });
  }
}

test("published slot list never renders pseudo-cover SVGs", async ({ page }) => {
  for (const route of ["/slots/", "/en/slots/"]) {
    await page.goto(route);
    await expect(page.locator('img[src$="/gates-of-1win.svg"], img[src$="/1win-bonanza.svg"], img[src$="/house-of-sins.svg"]')).toHaveCount(0);
  }
});
