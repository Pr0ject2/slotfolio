import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const slugs = [
  "wazdan-beach-party-hot",
  "wazdan-black-horse",
  "wazdan-black-horse-deluxe",
  "wazdan-book-of-faith",
  "wazdan-burning-reels",
  "wazdan-burning-stars",
  "wazdan-captain-shark",
  "wazdan-clover-lady",
  "wazdan-colin-the-cat",
  "wazdan-corrida-romance",
  "wazdan-corrida-romance-deluxe",
  "wazdan-crazy-cars",
  "wazdan-demon-jack-27",
  "wazdan-dino-reels-81",
  "wazdan-draculas-castle",
  "wazdan-dragons-lucky-8",
  "wazdan-fenix-play-27-deluxe",
  "wazdan-fenix-play-deluxe",
  "wazdan-fire-bird",
  "wazdan-fortune-reels",
  "wazdan-fruit-fiesta",
  "wazdan-hot-slot-777-diamond-crown",
  "wazdan-hot-slot-777-gold-crown",
  "wazdan-hot-slot-777-platinum-crown",
  "wazdan-hot-slot-777-rubies",
  "wazdan-hot-slot-777-rubies-extremely-light",
  "wazdan-hot-slot-777-stars-extremely-light",
  "wazdan-hot-slot-gold-coins",
  "wazdan-hot-slot-magic-bombs",
  "wazdan-lucky-9",
  "wazdan-lucky-fortune",
  "wazdan-lucky-queen",
  "wazdan-magic-fruits",
  "wazdan-magic-fruits-27",
  "wazdan-magic-fruits-4",
  "wazdan-magic-fruits-4-deluxe",
  "wazdan-magic-fruits-81",
  "wazdan-magic-fruits-deluxe",
  "wazdan-magic-fruits-dice",
  "wazdan-mystery-jack",
  "wazdan-sizzling-777",
  "wazdan-sizzling-777-deluxe",
] as const;

test("quality pass 4 completes thin Wazdan runtime records from official Game Info", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(slugs).toHaveLength(42);

  for (const slug of slugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Wazdan");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(seed!.source);
    expect(details?.rtp, slug).toBeTruthy();
    expect(details?.maxWin, slug).toBeTruthy();
    expect(details?.volatility, slug).toBeTruthy();
    expect(details?.field, slug).toBeTruthy();

    const gameType = getVerifiedCatalogGameType(slug);
    expect(gameType?.gameType, slug).toBe("Slots");
    expect(gameType?.source, slug).toBe(seed!.source);
    expect(getVerifiedCatalogResearch(slug)?.mechanics.length, slug).toBeGreaterThan(0);
  }

  expect(getVerifiedCatalogDetails("wazdan-beach-party-hot")?.field).toBe("5 барабанов · 20 линий");
  expect(getVerifiedCatalogDetails("wazdan-beach-party-hot")?.rtp).toBe("96,24%");
  expect(getVerifiedCatalogDetails("wazdan-dino-reels-81")?.field).toBe("4 барабана · 7 линий");
  expect(getVerifiedCatalogDetails("wazdan-hot-slot-gold-coins")?.field).toBe("15 барабанов · 10 линий");
  expect(getVerifiedCatalogDetails("wazdan-fortune-reels")?.field).toBe("6 барабанов · 46 656 способов");
  expect(getVerifiedCatalogDetails("wazdan-hot-slot-777-rubies")?.volatility).toBe("Настраиваемая");
  expect(getVerifiedCatalogDetails("wazdan-magic-fruits-dice")?.releaseDate).toBe("2026-03-12");
  expect(getVerifiedCatalogDetails("wazdan-black-horse")?.releaseDate).toBe("2012-02-20");

  const remainingThinWazdan = catalogSeeds
    .filter((seed) => seed.provider === "Wazdan")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const detailFacts = details
        ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
        : 0;
      return {
        slug: seed.slug,
        score:
          detailFacts +
          (getVerifiedCatalogGameType(seed.slug) ? 1 : 0) +
          (getVerifiedCatalogResearch(seed.slug)?.mechanics.length ?? 0),
      };
    })
    .filter((row) => row.score <= 1);

  expect(remainingThinWazdan).toEqual([]);
});
