import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function profile(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const facts = {
    field: details?.field ?? null,
    rtp: details?.rtp ?? null,
    maxWin: details?.maxWin ?? null,
    volatility: details?.volatility ?? null,
    releaseDate: details?.releaseDate ?? null,
    gameType: type?.gameType ?? null,
    mechanics: research?.mechanics ?? [],
  };
  const score = [facts.field, facts.rtp, facts.maxWin, facts.volatility, facts.releaseDate].filter(Boolean).length
    + (facts.gameType ? 1 : 0)
    + facts.mechanics.length;
  return { score, ...facts };
}

test.only("profile post-score-four catalog quality floor", () => {
  const rows = catalogSeeds.map((seed) => ({ provider: seed.provider, slug: seed.slug, ...profile(seed.slug) }));
  const histogram: Record<number, number> = {};
  for (const row of rows) histogram[row.score] = (histogram[row.score] ?? 0) + 1;
  const weak = rows.filter((row) => row.score <= 4);
  const byProvider: Record<string, number> = {};
  for (const row of weak) byProvider[row.provider] = (byProvider[row.provider] ?? 0) + 1;
  console.log("QUALITY_HISTOGRAM", JSON.stringify(histogram));
  console.log("QUALITY_LE4_BY_PROVIDER", JSON.stringify(byProvider));
  console.log("QUALITY_LE4_ROWS", JSON.stringify(weak));
  expect(rows).toHaveLength(900);
});
