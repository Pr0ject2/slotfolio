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
  "3-oaks-gaming-3-super-coin-volcanoes",
  "3-oaks-gaming-3-super-hot-chillies",
  "3-oaks-gaming-3-super-hot-teapots",
  "3-oaks-gaming-4-african-drums",
  "3-oaks-gaming-4-clover-pots",
  "3-oaks-gaming-4-fairy-flowers",
  "3-oaks-gaming-4-fortune-clovers",
  "3-oaks-gaming-4-pots-of-egypt",
  "3-oaks-gaming-4-wolf-drums",
  "3-oaks-gaming-777-fruity-coins",
  "3-oaks-gaming-777-gems-respin",
  "3-oaks-gaming-amazonia-wins",
  "3-oaks-gaming-aztec-fire",
  "3-oaks-gaming-aztec-fire-2",
  "3-oaks-gaming-aztec-sun",
  "3-oaks-gaming-big-heist",
  "3-oaks-gaming-black-wolf",
  "3-oaks-gaming-black-wolf-2",
  "3-oaks-gaming-book-of-sun-multichance",
  "3-oaks-gaming-buddha-megaways",
  "3-oaks-gaming-chili-coins",
  "3-oaks-gaming-china-festival",
  "3-oaks-gaming-coin-express",
  "3-oaks-gaming-coin-lamp",
  "3-oaks-gaming-coin-princess-x1000",
  "3-oaks-gaming-coin-up-volcano",
  "3-oaks-gaming-coin-volcano",
  "3-oaks-gaming-coin-volcano-2",
  "3-oaks-gaming-crystal-scarabs",
  "3-oaks-gaming-dancing-joker",
  "3-oaks-gaming-dj-tiger-x1000",
  "3-oaks-gaming-dragon-pearls",
  "3-oaks-gaming-egypt-fire-2",
  "3-oaks-gaming-egypt-power-x1000",
  "3-oaks-gaming-fortune-globe",
  "3-oaks-gaming-gold-express",
  "3-oaks-gaming-gold-nuggets",
  "3-oaks-gaming-golden-teapot",
  "3-oaks-gaming-grab-more-gold",
  "3-oaks-gaming-grab-the-gold",
  "3-oaks-gaming-green-chilli",
  "3-oaks-gaming-green-chilli-2",
  "3-oaks-gaming-hit-more-gold",
  "3-oaks-gaming-hit-the-gold",
  "3-oaks-gaming-hot-fire-fruits",
];

test("approved 3 Oaks catalog cards use their local game artwork", async ({ page }) => {
  for (const slug of slots) {
    const artwork = getCatalogArtwork(slug);
    expect(artwork).toBe(`/images/catalog/${slug}.webp`);
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator(".slot-heading"), `Missing static card for ${slug}`).toBeVisible();
    const image = page.locator(".slot-figure .catalog-dossier-art");
    await expect(image, `Missing rendered artwork for ${slug}`).toBeVisible();
    await expect(image).toHaveAttribute("src", new RegExp(slug));
  }
});
