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

test.only("list exact catalog score3-score4 residual", () => {
  const rows = catalogSeeds
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const score = scoreFor(seed.slug);
      const missing = [
        ["field", details?.field],
        ["rtp", details?.rtp],
        ["maxWin", details?.maxWin],
        ["volatility", details?.volatility],
        ["releaseDate", details?.releaseDate],
      ].filter(([, value]) => !value).map(([field]) => field);
      return { slug: seed.slug, provider: seed.provider, score, releaseDate: details?.releaseDate, missing, source: seed.source };
    })
    .filter((row) => row.score === 3 || row.score === 4);

  console.log("SCORE3_SCORE4_RESIDUAL", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
