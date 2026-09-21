import { expect, test } from "@playwright/test";
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

test("report current Push Gaming score-six tail", () => {
  const scoreSix = catalogSeeds
    .filter((seed) => seed.provider === "Push Gaming" && scoreFor(seed.slug) === 6)
    .map((seed) => ({
      slug: seed.slug,
      details: getVerifiedCatalogDetails(seed.slug),
      type: getVerifiedCatalogGameType(seed.slug)?.gameType ?? null,
      mechanics: getVerifiedCatalogResearch(seed.slug)?.mechanics ?? [],
    }));

  console.log("PUSH_SCORE6", JSON.stringify({ count: scoreSix.length, records: scoreSix }));
  expect(scoreSix).toHaveLength(28);
});
