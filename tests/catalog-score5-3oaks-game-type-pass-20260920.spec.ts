import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected: Record<string, string> = {
  "3-oaks-gaming-3-hot-teapots": "https://3oaks.com/game/3_hot_teapots",
  "3-oaks-gaming-3-lucky-sparks": "https://3oaks.com/game/3_lucky_sparks",
  "3-oaks-gaming-777-fruity-coins": "https://3oaks.com/game/777_fruity_coins",
  "3-oaks-gaming-crystal-scarabs": "https://3oaks.com/game/crystal_scarabs",
  "3-oaks-gaming-dancing-joker": "https://3oaks.com/game/dancing_joker",
  "3-oaks-gaming-grand": "https://3oaks.com/game/grand",
  "3-oaks-gaming-lava-coins": "https://3oaks.com/game/lava_coins",
  "3-oaks-gaming-lord-of-thunder": "https://3oaks.com/game/lord_of_thunder",
  "3-oaks-gaming-magic-apple": "https://3oaks.com/game/magic_apple",
  "3-oaks-gaming-moon-sisters": "https://3oaks.com/game/moon_sisters",
  "3-oaks-gaming-power-sun": "https://3oaks.com/game/power_sun",
  "3-oaks-gaming-power-sun-xxl": "https://3oaks.com/game/power_sun_xxl",
  "3-oaks-gaming-purple-diamond": "https://3oaks.com/game/purple_diamond",
  "3-oaks-gaming-rio-gems": "https://3oaks.com/game/rio_gems",
  "3-oaks-gaming-sun-of-egypt": "https://3oaks.com/game/sun_of_egypt",
  "3-oaks-gaming-super-hot-teapots": "https://3oaks.com/game/super_hot_teapots",
};

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

test("3 Oaks score-five pass preserves official slot classifications and allows later enrichment", () => {
  expect(Object.keys(expected)).toHaveLength(16);

  for (const [slug, source] of Object.entries(expected)) {
    const seed = catalogSeeds.find((item) => item.slug === slug);
    const gameType = getVerifiedCatalogGameType(slug);

    expect(seed, slug).toBeTruthy();
    expect(seed?.provider, slug).toBe("3 Oaks Gaming");
    expect(seed?.source, slug).toBe(source);
    expect(gameType?.gameType, slug).toBe("Slots");
    expect(gameType?.source, slug).toBe(source);
    expect(gameType?.verifiedAt, slug).toMatch(/^20\d{2}-\d{2}-\d{2}$/);
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(6);
  }
});
