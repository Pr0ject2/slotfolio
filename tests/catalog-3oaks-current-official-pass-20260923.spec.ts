import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogGameType3OaksCurrent } from "../src/lib/catalog-verified-game-type-3oaks-current";

const slotEvidence = {
  "3-oaks-gaming-3-super-coin-volcanoes": "https://3oaks.com/game/3_super_coin_volcanoes",
  "3-oaks-gaming-4-clover-pots": "https://3oaks.com/news/new-release-4-clover-pots",
  "3-oaks-gaming-4-fairy-flowers": "https://3oaks.com/news/new-release-4-fairy-flowers",
  "3-oaks-gaming-4-pots-of-egypt": "https://3oaks.com/news/new-release-4-pots-of-gold",
  "3-oaks-gaming-4-wolf-drums": "https://3oaks.com/news/new-release-4-wolf-drums",
  "3-oaks-gaming-aztec-fire-2": "https://3oaks.com/news/portugal-certification",
  "3-oaks-gaming-coin-up-lightning": "https://3oaks.com/game/coin_lightning",
  "3-oaks-gaming-coin-volcano-2": "https://3oaks.com/news/new-release-coin-volcano-2",
  "3-oaks-gaming-egypt-power-x1000": "https://3oaks.com/news/new-release-egypt-power-x1000",
  "3-oaks-gaming-sun-of-egypt-4": "https://3oaks.com/game/sun_of_egypt_4",
  "3-oaks-gaming-wolf-night": "https://3oaks.com/game/wolf_night",
} as const;

const evidenceLimitedGameTypeTail = [
  "3-oaks-gaming-3-coin-volcanoes",
  "3-oaks-gaming-hit-the-gold",
  "3-oaks-gaming-sunlight-princess",
] as const;

test("current official 3 Oaks pass adds only directly published slot classifications", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const [slug, evidenceSource] of Object.entries(slotEvidence)) {
    const seed = selected.get(slug);
    const type = getVerifiedCatalogGameType(slug);
    const direct = getVerifiedCatalogGameType3OaksCurrent(slug);

    expect(seed, slug).toBeTruthy();
    expect(type?.gameType, slug).toBe("Slots");
    expect(type?.source, `${slug} must keep the canonical game source`).toBe(seed!.source);
    expect(direct?.gameTypeSource ?? direct?.source, `${slug} must retain the exact Game Type evidence`).toBe(evidenceSource);
    expect(type?.verifiedAt, slug).toBe("2026-09-23");
  }

  const residual = catalogSeeds
    .filter((seed) => seed.provider === "3 Oaks Gaming" && !getVerifiedCatalogGameType(seed.slug))
    .map((seed) => seed.slug)
    .sort();
  expect(residual).toEqual([...evidenceLimitedGameTypeTail].sort());
});

test("Buddha Megaways keeps its official release month without inventing a day", () => {
  const details = getVerifiedCatalogDetails("3-oaks-gaming-buddha-megaways");
  expect(details?.releaseDate).toBe("2021-12");
  expect(details?.releaseDateSource).toBe("https://3oaks.com/game/buddha_megaways");
  expect(details?.source).toBe("https://3oaks.com/game/buddha_megaways");
});

test("new 3 Oaks evidence does not rewrite older verification dates", () => {
  expect(getVerifiedCatalogDetails("3-oaks-gaming-sun-of-egypt-5")?.verifiedAt).toBe("2026-09-18");
});
