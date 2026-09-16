import { test } from "@playwright/test";
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

test("probe Wazdan score-2 composition", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Wazdan" && scoreFor(seed.slug) === 2)
    .map((seed) => ({
      slug: seed.slug,
      source: seed.source,
      details: getVerifiedCatalogDetails(seed.slug) ?? null,
      gameType: getVerifiedCatalogGameType(seed.slug)?.gameType ?? null,
      mechanics: getVerifiedCatalogResearch(seed.slug)?.mechanics ?? [],
    }));

  console.log(`WAZDAN_SCORE2=${JSON.stringify(rows)}`);
});
