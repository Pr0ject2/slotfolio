import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test("report remaining runtime catalog-only enrichment gaps", () => {
  const gaps = catalogSeeds.filter(
    (seed) =>
      !getVerifiedCatalogDetails(seed.slug) &&
      !getVerifiedCatalogGameType(seed.slug) &&
      !getVerifiedCatalogResearch(seed.slug),
  );

  const byProvider = Object.fromEntries(
    Object.entries(
      gaps.reduce<Record<string, number>>((acc, seed) => {
        acc[seed.provider] = (acc[seed.provider] || 0) + 1;
        return acc;
      }, {}),
    ).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "en")),
  );

  console.log(
    "UNVERIFIED_RUNTIME_GAPS",
    JSON.stringify({
      count: gaps.length,
      byProvider,
      records: gaps.map(({ slug, name, provider, source }) => ({ slug, name, provider, source })),
    }),
  );

  expect(gaps).toEqual([]);
});
