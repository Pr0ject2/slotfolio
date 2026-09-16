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

test("probe thin Hacksaw catalog-only cards", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Hacksaw Gaming")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const type = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      return {
        slug: seed.slug,
        name: seed.name,
        source: seed.source,
        score: scoreFor(seed.slug),
        field: details?.field ?? null,
        rtp: details?.rtp ?? null,
        maxWin: details?.maxWin ?? null,
        volatility: details?.volatility ?? null,
        releaseDate: details?.releaseDate ?? null,
        gameType: type?.gameType ?? null,
        mechanics: research?.mechanics ?? [],
      };
    })
    .filter((row) => row.score <= 1);

  console.log("HACKSAW_THIN_PROBE=" + JSON.stringify(rows));
  expect(rows).toHaveLength(17);
});
