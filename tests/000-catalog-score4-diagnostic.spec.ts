import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function score(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const gameType = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (gameType ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test.only("measure quality after Hacksaw score-four fill", () => {
  const rows = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: score(seed.slug) }));
  const counts = Object.fromEntries(Array.from({ length: 10 }, (_, value) => [String(value), rows.filter((row) => row.score === value).length]));
  const hacksawLow = rows.filter((row) => row.provider === "Hacksaw Gaming" && row.score <= 4);
  console.log("AFTER_HACKSAW_SCORE4", JSON.stringify({ counts, hacksawLow }));
  expect(rows).toHaveLength(900);
  expect(rows.filter((row) => row.score === 4)).toHaveLength(396);
});
