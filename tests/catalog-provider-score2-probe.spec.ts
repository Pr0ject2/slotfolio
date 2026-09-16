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

test("probe totals after second Hacksaw provider-wide batch", () => {
  const ranked = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));
  const hacksawScore2 = ranked.filter((row) => row.provider === "Hacksaw Gaming" && row.score === 2);
  const thin = ranked.filter((row) => row.score <= 1);
  const totals = {
    le1: thin.length,
    score2: ranked.filter((row) => row.score === 2).length,
    score3: ranked.filter((row) => row.score === 3).length,
    hacksawScore2: hacksawScore2.length,
    hacksawThin: thin.filter((row) => row.provider === "Hacksaw Gaming").length,
  };

  console.log("HACKSAW_PROVIDER_WIDE_2_TOTALS=" + JSON.stringify(totals));
  console.log("HACKSAW_SCORE2_REMAINING=" + JSON.stringify(hacksawScore2));

  expect(totals).toEqual({ le1: 5, score2: 114, score3: 489, hacksawScore2: 59, hacksawThin: 0 });
});
