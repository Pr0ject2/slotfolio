import { test, expect } from "@playwright/test";
import { slots, getSlot } from "../src/lib/data";
import { editorialArtworkBySlug, getEditorialArtwork } from "../src/lib/editorial-artwork";
import { readFileSync } from "node:fs";
import { join } from "node:path";

test.use({ baseURL: process.env.AUDIT_BASE_URL || "http://localhost:3000" });

const chosen = [
  "1win-bonanza",
  "gates-of-1win",
  "house-of-sins",
  "gates-of-olympus",
  "gates-of-olympus-1000",
  "big-bass-bonanza",
  "the-dog-house",
  "sugar-rush",
  "fruit-party",
  "fury-of-anubis"
];

test("initial ten original editorial assets remain source-safe", () => {
  expect(Object.keys(editorialArtworkBySlug).filter((slug) => chosen.includes(slug)).sort()).toEqual([...chosen].sort());
  expect(slots.length).toBeGreaterThanOrEqual(100);
  for (const slug of chosen) {
    const slot = getSlot(slug);
    expect(slot, slug).toBeTruthy();
    expect(slot!.source, slug).toMatch(/^https:\/\//);
    // Original source-backed artwork remains unchanged and available.
    expect(slot!.image, slug).toMatch(/^\/images\/slots\//);
    expect(getEditorialArtwork(slug)).toBe(`/images/editorial/${slug}.svg`);
    const svg = readFileSync(join(process.cwd(), "public", "images", "editorial", `${slug}.svg`), "utf8");
    expect(svg).toContain('viewBox="0 0 1200 675"');
    expect(svg).toContain("Авторская декоративная иллюстрация");
    expect(svg).toContain('role="img"');
    expect(svg).not.toMatch(/<script\b|<foreignObject\b|(?:href|src)\s*=\s*["\u0027]https?:\/\//i);
  }
  expect(getEditorialArtwork("reactoonz")).toBeUndefined();
  expect(getEditorialArtwork("max-win-machine")).toBeUndefined();
});

test("all ten dossiers load sharp local editorial artwork without fallbacks", async ({ page }) => {
  for (const slug of chosen) {
    await page.goto(`/slots/${slug}`);
    const image = page.locator(".slot-figure img").first();
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute("src", new RegExp(`/images/editorial/${slug}\\.svg$`));
    await expect.poll(async () => image.evaluate((node) => {
      const img = node as HTMLImageElement;
      return { loaded: img.complete && img.naturalWidth === 1200 && img.naturalHeight === 675,
        fallback: (img.currentSrc || img.src).includes("unavailable.svg") };
    })).toEqual({ loaded: true, fallback: false });
  }
});

test("non-selected original and high-resolution homepage feature imagery are unchanged", async ({ page }) => {
  await page.goto("/slots/reactoonz");
  await expect(page.locator(".slot-figure img")).toHaveAttribute("src", /\/images\/slots\/reactoonz\.webp$/);

  await page.goto("/");
  await expect(page.locator(".cover-art img")).not.toHaveAttribute("src", /\/images\/editorial\/gates-of-olympus\.svg$/);
});
