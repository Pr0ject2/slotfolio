import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function profile(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const facts = [details?.field, details?.rtp, details?.maxWin, details?.volatility, details?.releaseDate];
  const score = facts.filter(Boolean).length + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
  return {
    score,
    missing: ["field", "rtp", "maxWin", "volatility", "releaseDate"].filter((_, i) => !facts[i]),
    gameType: type?.gameType,
    mechanics: research?.mechanics ?? [],
    source: details?.source,
  };
}

test.only("profile current catalog quality residual", () => {
  const rows = catalogSeeds.map((seed) => ({ provider: seed.provider, slug: seed.slug, ...profile(seed.slug) }));
  const residual = rows.filter((row) => row.score <= 6);
  const distribution = rows.reduce<Record<string, number>>((acc, row) => {
    acc[String(row.score)] = (acc[String(row.score)] ?? 0) + 1;
    return acc;
  }, {});
  const residualByProvider = residual.reduce<Record<string, Record<string, number>>>((acc, row) => {
    acc[row.provider] ??= {};
    acc[row.provider][String(row.score)] = (acc[row.provider][String(row.score)] ?? 0) + 1;
    return acc;
  }, {});

  console.log("QUALITY_SCORE_DISTRIBUTION", JSON.stringify(distribution));
  console.log("QUALITY_RESIDUAL_PROVIDER_COUNTS", JSON.stringify(residualByProvider));
  console.log("QUALITY_RESIDUAL_LE6", JSON.stringify(residual));
  expect(residual.length).toBe(-1);
});
