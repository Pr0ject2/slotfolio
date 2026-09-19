import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const pushWave1Slugs = [
  "push-gaming-3-liberty-eagles",
  "push-gaming-blaze-of-ra",
  "push-gaming-boss-bear",
  "push-gaming-diamond-supernova-100",
  "push-gaming-diamond-supernova-20",
  "push-gaming-diamond-supernova-40",
  "push-gaming-diamond-supernova-5",
  "push-gaming-diamonds-4-the-win",
  "push-gaming-dino-p-d",
  "push-gaming-dinopolis",
  "push-gaming-fat-banker",
  "push-gaming-fire-pig-push-ways",
  "push-gaming-generous-jack",
  "push-gaming-goat-getter",
  "push-gaming-happy-bamboo",
  "push-gaming-hearts-highway",
  "push-gaming-henry-the-ape",
  "push-gaming-iron-phoenix",
  "push-gaming-jaguar-drop",
  "push-gaming-jiggys-pot-o-gold",
  "push-gaming-joker-troupe",
  "push-gaming-mad-blast",
  "push-gaming-mad-cars",
  "push-gaming-masked-mayhem",
  "push-gaming-mystery-mission-to-the-moon",
  "push-gaming-mystery-of-the-nile",
  "push-gaming-neon-cash-city",
  "push-gaming-olympus-unleashed",
  "push-gaming-power-paws",
  "push-gaming-power-vault",
  "push-gaming-rat-king",
  "push-gaming-razor-shark-jackpots",
  "push-gaming-razor-ways",
  "push-gaming-red-hot-multipliers",
  "push-gaming-regal-knights",
  "push-gaming-retro-sweets",
  "push-gaming-retroverse",
  "push-gaming-samurais-katana",
  "push-gaming-santa-hopper",
  "push-gaming-santas-vault",
];

test("Push Gaming verified wave 1 records stay selected and preserve exact official sources while allowing later enrichment", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const slug of pushWave1Slugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seed!.source);
    expect(getVerifiedCatalogResearch(slug)?.source, slug).toBe(seed!.source);

    const gameType = getVerifiedCatalogGameType(slug);
    if (gameType) {
      expect(new URL(gameType.source).hostname, slug).toBe(new URL(seed!.source).hostname);
      expect(gameType.verifiedAt, slug).toMatch(/^20\d{2}-\d{2}-\d{2}$/);
    }
  }

  expect(getVerifiedCatalogDetails("push-gaming-retro-tapes")).toBeUndefined();
});
