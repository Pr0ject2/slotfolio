import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "3-oaks-gaming-3-super-coin-volcanoes": { field: "4×3", releaseDate: "2026-01", source: "https://3oaks.com/game/3_super_coin_volcanoes" },
  "3-oaks-gaming-coin-volcano-2": { field: "5×3", releaseDate: "2025-08", source: "https://3oaks.com/game/coin_volcano_2" },
} as const;

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("quality pass 14 preserves its original 3 Oaks line evidence while allowing later enrichment", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  expect(Object.keys(expected)).toHaveLength(2);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const [slug, values] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("3 Oaks Gaming");
    expect(seed!.source, slug).toBe(values.source);

    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(values.source);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, slug).toEqual(expect.stringMatching(new RegExp(`^${values.releaseDate}(?:$|-)`)));

    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toBe(values.source);
    expect(research?.mechanics, `${slug} must retain the verified line mechanic`).toContain("Линии");

    const gameType = getVerifiedCatalogGameType(slug);
    if (gameType) {
      expect(gameType.gameType, `${slug} later Game Type enrichment must remain slot-only`).toBe("Slots");
      expect(gameType.source, `${slug} later Game Type enrichment must preserve the canonical source`).toBe(values.source);
    }

    expect(scoreFor(slug), `${slug} must stay at or above its achieved quality floor`).toBeGreaterThanOrEqual(3);
  }
});
