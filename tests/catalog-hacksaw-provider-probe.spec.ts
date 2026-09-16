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

test("probe totals after Hacksaw provider-wide enrichment", () => {
  const ranked = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));
  const hacksawThin = ranked.filter((row) => row.provider === "Hacksaw Gaming" && row.score <= 1);
  const totals = {
    le1: ranked.filter((row) => row.score <= 1).length,
    score2: ranked.filter((row) => row.score === 2).length,
    score3: ranked.filter((row) => row.score === 3).length,
    hacksawThin: hacksawThin.length,
    nolimitThin: ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1).length,
    coinClubScore: ranked.find((row) => row.slug === "playn-go-coin-club")?.score ?? null,
  };

  console.log("HACKSAW_PROVIDER_WIDE_TOTALS=" + JSON.stringify(totals));
  console.log("HACKSAW_REMAINING_THIN=" + JSON.stringify(hacksawThin));
  expect(hacksawThin).toHaveLength(0);
});
