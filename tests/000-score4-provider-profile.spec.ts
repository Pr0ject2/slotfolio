import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return (details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0)
    + (type ? 1 : 0)
    + (research?.mechanics.length ?? 0);
}

test.only("profile remaining score-four cards by provider", () => {
  const rows = catalogSeeds
    .map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }))
    .filter((row) => row.score === 4);

  const byProvider = new Map<string, string[]>();
  for (const row of rows) {
    const current = byProvider.get(row.provider) ?? [];
    current.push(row.slug);
    byProvider.set(row.provider, current);
  }

  const profile = [...byProvider.entries()]
    .map(([provider, slugs]) => ({ provider, count: slugs.length, slugs }))
    .sort((a, b) => b.count - a.count);

  console.log("SCORE4_TOTAL", rows.length);
  console.log("SCORE4_BY_PROVIDER", JSON.stringify(profile));
  expect(rows.length).toBeGreaterThan(0);
});
