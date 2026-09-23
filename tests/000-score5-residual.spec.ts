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

test.only("list exact catalog score5 residual", () => {
  const rows = catalogSeeds
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      const type = getVerifiedCatalogGameType(seed.slug);
      const score = scoreFor(seed.slug);
      const missing = [
        ["field", details?.field],
        ["rtp", details?.rtp],
        ["maxWin", details?.maxWin],
        ["volatility", details?.volatility],
        ["releaseDate", details?.releaseDate],
      ].filter(([, value]) => !value).map(([field]) => field);
      return {
        slug: seed.slug,
        provider: seed.provider,
        score,
        releaseDate: details?.releaseDate,
        missing,
        mechanics: research?.mechanics ?? [],
        gameType: type?.gameType,
        source: seed.source,
      };
    })
    .filter((row) => row.score === 5);

  const byProvider = rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.provider] = (acc[row.provider] ?? 0) + 1;
    return acc;
  }, {});

  console.log("SCORE5_PROVIDER_COUNTS", JSON.stringify(byProvider));
  console.log("SCORE5_RESIDUAL", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
