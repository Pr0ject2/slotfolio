import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expected = {
  "3-oaks-gaming-3-jewel-crowns": { field: "3 барабана", releaseDate: "2025-06", detailSource: "https://3oaks.com/game/3_jewel_crowns" },
  "3-oaks-gaming-sky-pearls": { field: "4×4", releaseDate: "2024-03", detailSource: "https://3oaks.com/game/sky_pearls", evidenceSource: "https://3oaks.com/news/new-release-sky-pearls" },
} as const;

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("quality pass 18 preserves its original collect evidence while allowing later enrichment", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  expect(Object.keys(expected)).toHaveLength(2);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const [slug, values] of Object.entries(expected)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("3 Oaks Gaming");
    expect(seed!.source, slug).toBe(values.detailSource);
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(values.detailSource);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, slug).toEqual(expect.stringMatching(new RegExp(`^${values.releaseDate}(?:$|-)`)));
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toBe(values.detailSource);
    expect(research?.mechanics, `${slug} must retain the verified collect mechanic`).toContain("Сбор символов");
    if ("evidenceSource" in values) {
      expect(research?.evidenceSource, slug).toBe(values.evidenceSource);
    }
    const gameType = getVerifiedCatalogGameType(slug);
    if (gameType) expect(gameType.source, slug).toBe(seed!.source);
    expect(scoreFor(slug), `${slug} must stay at or above its achieved quality floor`).toBeGreaterThanOrEqual(3);
  }
});
