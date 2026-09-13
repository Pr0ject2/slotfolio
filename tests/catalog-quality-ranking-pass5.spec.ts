import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test.only("rank thinnest runtime catalog-only records after quality pass 4", () => {
  const ranked = catalogSeeds
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const type = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      const detailFacts = details
        ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
        : 0;
      const score = detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
      return {
        score,
        slug: seed.slug,
        name: seed.name,
        provider: seed.provider,
        source: seed.source,
        facts: {
          field: details?.field ?? null,
          rtp: details?.rtp ?? null,
          maxWin: details?.maxWin ?? null,
          volatility: details?.volatility ?? null,
          releaseDate: details?.releaseDate ?? null,
          gameType: type?.gameType ?? null,
          mechanics: research?.mechanics ?? [],
        },
      };
    })
    .sort((a, b) => a.score - b.score || a.provider.localeCompare(b.provider, "en") || a.name.localeCompare(b.name, "en"));

  const scoreDistribution = Object.fromEntries(
    Object.entries(ranked.reduce<Record<string, number>>((acc, row) => {
      acc[String(row.score)] = (acc[String(row.score)] || 0) + 1;
      return acc;
    }, {})).sort((a, b) => Number(a[0]) - Number(b[0])),
  );

  console.log("CATALOG_QUALITY_DISTRIBUTION_PASS5", JSON.stringify(scoreDistribution));
  console.log("CATALOG_QUALITY_BOTTOM_PASS5", JSON.stringify(ranked.slice(0, 120)));
  expect(ranked[0]?.score ?? 99).toBeGreaterThanOrEqual(99);
});
