import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedFields: Record<string, string> = {
  "3-oaks-gaming-3-aztec-temples": "5×3 · 25 линий",
  "3-oaks-gaming-3-china-pots": "5×3 · 25 линий",
  "3-oaks-gaming-3-clover-pots": "5×3 · 25 линий",
  "3-oaks-gaming-3-clover-pots-extra": "5×4 · 30 линий",
  "3-oaks-gaming-3-coins": "3×3 · 5 линий",
  "3-oaks-gaming-3-egypt-chests": "5×3 · 10 линий",
  "3-oaks-gaming-3-hot-teapots": "5×3 · 25 линий",
  "3-oaks-gaming-3-lucky-sparks": "5×3 · 25 линий",
  "3-oaks-gaming-3-olymp-fortunes": "5×3 · 25 линий",
  "3-oaks-gaming-3-pots-of-egypt": "5×3 · 25 линий",
  "3-oaks-gaming-3-super-hot-chillies": "5×3 · 25 линий",
  "3-oaks-gaming-4-african-drums": "5×3 · 25 линий",
  "3-oaks-gaming-4-clover-pots": "5×3 · 25 линий",
  "3-oaks-gaming-4-fairy-flowers": "5×3 · 25 линий",
  "3-oaks-gaming-4-pots-of-egypt": "5×3 · 20 линий",
  "3-oaks-gaming-4-wolf-drums": "5×3 · 25 линий",
  "3-oaks-gaming-777-fruity-coins": "3×3 · 5 линий",
  "3-oaks-gaming-777-gems-respin": "3×3 · 5 линий",
  "3-oaks-gaming-amazonia-wins": "5×3 · 25 линий",
  "3-oaks-gaming-aztec-fire": "5×4 · 20 линий",
  "3-oaks-gaming-aztec-fire-2": "5×4 · 20 линий",
  "3-oaks-gaming-aztec-sun": "5×3 · 25 линий",
  "3-oaks-gaming-big-heist": "5×3 · 10 линий",
  "3-oaks-gaming-black-wolf": "5×4 · 25 линий",
  "3-oaks-gaming-black-wolf-2": "5×4 · 25 линий",
  "3-oaks-gaming-book-of-sun-multichance": "5×3 · 10 линий",
  "3-oaks-gaming-chili-coins": "3×3 · 5 линий",
  "3-oaks-gaming-coin-express": "5×3 · 5 линий",
  "3-oaks-gaming-dancing-joker": "5×3 · 40 линий",
  "3-oaks-gaming-egypt-fire-2": "5×4 · 20 линий",
  "3-oaks-gaming-fishin-bear": "5×3 · 25 линий",
  "3-oaks-gaming-fortune-globe": "5×4 · 20 линий",
  "3-oaks-gaming-gold-express": "5×4 · 20 линий",
  "3-oaks-gaming-golden-teapot": "5×4 · 25 линий",
  "3-oaks-gaming-grab-more-gold": "5×4 · 20 линий",
  "3-oaks-gaming-grab-the-gold": "5×3 · 20 линий",
  "3-oaks-gaming-grand": "5×3 · 5 линий",
  "3-oaks-gaming-green-chilli": "5×3 · 20 линий",
  "3-oaks-gaming-green-chilli-2": "5×3 · 20 линий",
  "3-oaks-gaming-hit-more-gold": "5×4 · 25 линий",
};

test("quality pass 1 promotes already verified 3 Oaks layouts into visible details", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const [slug, field] of Object.entries(expectedFields)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(seed!.source);
    expect(details?.field, slug).toBe(field);

    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toBe(seed!.source);
    expect(research?.mechanics, slug).toContain("Линии");
  }

  expect(Object.keys(expectedFields)).toHaveLength(40);
});
