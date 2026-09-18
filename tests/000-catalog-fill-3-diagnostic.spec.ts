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

test.only("diagnose next catalog fill tail", () => {
  const rows = catalogSeeds.map((seed) => {
    const details = getVerifiedCatalogDetails(seed.slug);
    const type = getVerifiedCatalogGameType(seed.slug);
    const research = getVerifiedCatalogResearch(seed.slug);
    return {
      slug: seed.slug,
      name: seed.name,
      provider: seed.provider,
      source: seed.source,
      score: scoreFor(seed.slug),
      details: {
        field: details?.field ?? "",
        rtp: details?.rtp ?? "",
        maxWin: details?.maxWin ?? "",
        volatility: details?.volatility ?? "",
        releaseDate: details?.releaseDate ?? "",
        gameType: type?.gameType ?? "",
      },
      mechanics: research?.mechanics ?? [],
      evidence: research?.evidence ?? "",
    };
  });

  const score3 = rows.filter((row) => row.score === 3);
  const byProvider = Object.fromEntries(
    Array.from(new Set(score3.map((row) => row.provider))).sort().map((provider) => [
      provider,
      score3.filter((row) => row.provider === provider),
    ]),
  );

  console.log("CATALOG_FILL_3", JSON.stringify({ score3: score3.length, byProvider }));
  expect(score3).toHaveLength(107);
});
