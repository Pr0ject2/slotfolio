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

test.only("profile score-four distribution after provider passes", () => {
  const rows = catalogSeeds
    .map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }))
    .filter((row) => row.score === 4);

  const byProvider = rows.reduce<Record<string, string[]>>((acc, row) => {
    (acc[row.provider] ??= []).push(row.slug);
    return acc;
  }, {});

  const ranked = Object.entries(byProvider)
    .map(([provider, slugs]) => ({ provider, count: slugs.length, slugs }))
    .sort((a, b) => b.count - a.count || a.provider.localeCompare(b.provider));

  console.log("SCORE4_AFTER_PASSES", JSON.stringify({ total: rows.length, ranked }));
  expect(rows.length).toBeGreaterThan(0);
});
