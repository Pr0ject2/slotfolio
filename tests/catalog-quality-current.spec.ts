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
  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(0);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(3);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(10);
  expect(ranked.filter((row) => row.score === 4)).toHaveLength(350);
  expect(ranked.filter((row) => row.score === 5)).toHaveLength(162);
  expect(ranked.filter((row) => row.score === 6)).toHaveLength(186);
  expect(ranked.filter((row) => row.score === 7)).toHaveLength(185);
  expect(ranked.filter((row) => row.score === 8)).toHaveLength(3);
  expect(ranked.filter((row) => row.score === 9)).toHaveLength(1);

  expect(ranked.filter((row) => row.provider === "Hacksaw Gaming" && row.score <= 3)).toHaveLength(0);
  expect(ranked.filter((row) => row.provider === "Wazdan" && row.score <= 4)).toHaveLength(0);
  expect(ranked.filter((row) => row.provider === "Push Gaming" && row.score <= 2)).toHaveLength(0);
  expect(ranked.filter((row) => row.provider === "3 Oaks Gaming" && row.score <= 2)).toHaveLength(0);
  expect(ranked.filter((row) => row.provider === "Play’n GO" && row.score <= 2)).toHaveLength(0);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(0);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score === 2)).toHaveLength(3);

  expect(ranked.filter((row) => row.score <= 2).map((row) => row.slug).sort()).toEqual([
    "nolimit-city-bowel-of-beelzebub",
    "nolimit-city-fire-in-the-hole-4",
    "nolimit-city-six-feet-under",
  ]);
});
