import { expect, test } from "@playwright/test";
import { getCatalogArtwork } from "../src/lib/catalog-artwork";

const slots = [
  "3-oaks-gaming-15-dragon-pearls",
  "3-oaks-gaming-3-african-drums",
  "3-oaks-gaming-3-aztec-temples",
  "3-oaks-gaming-3-china-pots",
  "3-oaks-gaming-3-clover-pots",
  "3-oaks-gaming-3-hot-teapots",
  "3-oaks-gaming-3-jewel-crowns",
  "3-oaks-gaming-3-lucky-sparks",
  "3-oaks-gaming-3-olymp-fortunes",
  "3-oaks-gaming-3-pots-of-egypt",
];

test("approved 3 Oaks catalog cards use their local game artwork", async ({ page }) => {
  for (const slug of slots) {
    const artwork = getCatalogArtwork(slug);
    expect(artwork).toBe(`/images/catalog/${slug}.webp`);
    await page.goto(`/slots/catalog/${slug}`);
    const image = page.locator(".slot-figure .catalog-dossier-art");
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src", new RegExp(slug));
  }
});
