import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return (
    (details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0) +
    (type ? 1 : 0) +
    (research?.mechanics.length ?? 0)
  );
}

test("final legacy 3 Oaks corrections preserve exact official facts and provenance", () => {
  const blackWolf = getVerifiedCatalogDetails("3-oaks-gaming-black-wolf-2");
  expect(blackWolf?.field).toBe("5×4 · 25 линий");
  expect(blackWolf?.releaseDate).toBe("2023-08");
  expect(blackWolf?.source).toBe("https://3oaks.com/game/black_wolf_2");
  expect(blackWolf?.releaseDateSource).toBe("https://bng.games/game/black_wolf_2/?lang=en");

  const dragonPearls = getVerifiedCatalogDetails("3-oaks-gaming-dragon-pearls");
  expect(dragonPearls?.maxWin).toBe("1000x");
  expect(dragonPearls?.releaseDate).toBe("2019-03");
  expect(dragonPearls?.source).toBe("https://3oaks.com/game/dragon_pearls");
  expect(dragonPearls?.releaseDateSource).toBe("https://bng.games/game/dragon_pearls/");

  const hotFireFruits = getVerifiedCatalogDetails("3-oaks-gaming-hot-fire-fruits");
  expect(hotFireFruits?.field).toBe("3×3 · 5 линий");
  expect(hotFireFruits?.releaseDate).toBe("2024-10-24");
  expect(hotFireFruits?.source).toBe("https://3oaks.com/game/hot_fire_fruits");
});

test("official BNG evidence enriches legacy 3 Oaks mechanics without losing canonical research sources", () => {
  const expectations = {
    "3-oaks-gaming-tiger-jungle": ["Hold & Win", "Респины", "Сбор символов", "Sticky Wilds", "Jackpots", "Free Spins"],
    "3-oaks-gaming-black-wolf-2": ["Респины", "Сбор символов", "Mystery Symbols", "Jackpots", "Free Spins"],
    "3-oaks-gaming-dragon-pearls": ["Респины", "Jackpots", "Free Spins"],
  } as const;

  for (const [slug, mechanics] of Object.entries(expectations)) {
    const seed = catalogSeeds.find((item) => item.slug === slug);
    const research = getVerifiedCatalogResearch(slug);
    expect(seed, slug).toBeTruthy();
    expect(research?.source, slug).toBe(seed?.source);
    expect(research?.evidenceSource, slug).toContain("bng.games/game/");
    for (const mechanic of mechanics) {
      expect(research?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    }
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(5);
  }

  expect(getVerifiedCatalogGameType("3-oaks-gaming-tiger-jungle")?.gameType).toBe("Slots");
});

test("catalog quality floor allows only the deliberately thin future tail and a small evidence-limited score-four tail", () => {
  const scores = catalogSeeds.map((seed) => scoreFor(seed.slug));
  const score2 = scores.filter((score) => score === 2).length;
  const score3 = scores.filter((score) => score === 3).length;
  const score4 = scores.filter((score) => score === 4).length;
  const score5Plus = scores.filter((score) => score >= 5).length;

  expect(score2).toBeLessThanOrEqual(3);
  expect(score3).toBe(0);
  expect(score4).toBeLessThanOrEqual(4);
  expect(score5Plus).toBeGreaterThanOrEqual(893);
});
