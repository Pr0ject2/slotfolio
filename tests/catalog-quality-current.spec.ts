import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("current catalog quality baseline", () => {
  const ranked = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));

  expect(catalogSeeds).toHaveLength(900);
  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(5);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(55);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(548);
  expect(ranked.filter((row) => row.provider === "Hacksaw Gaming" && row.score === 2)).toHaveLength(0);
  expect(ranked.filter((row) => row.provider === "Hacksaw Gaming" && row.score <= 1)).toHaveLength(0);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
});
