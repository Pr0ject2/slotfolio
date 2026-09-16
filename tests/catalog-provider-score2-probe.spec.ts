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

test("probe next provider-wide score-2 batch", () => {
  const ranked = catalogSeeds.map((seed) => ({
    slug: seed.slug,
    name: seed.name,
    provider: seed.provider,
    source: seed.source,
    score: scoreFor(seed.slug),
  }));

  const score2 = ranked.filter((row) => row.score === 2);
  const byProvider = [...score2.reduce((map, row) => {
    const current = map.get(row.provider) ?? [];
    current.push({ slug: row.slug, name: row.name, source: row.source });
    map.set(row.provider, current);
    return map;
  }, new Map<string, Array<{ slug: string; name: string; source: string }>>()).entries()]
    .map(([provider, records]) => ({ provider, count: records.length, records }))
    .sort((a, b) => b.count - a.count || a.provider.localeCompare(b.provider));

  const thin = ranked.filter((row) => row.score <= 1);

  console.log("SCORE2_PROVIDER_RANKING=" + JSON.stringify(byProvider));
  console.log("REMAINING_THIN=" + JSON.stringify(thin));
  expect(score2).toHaveLength(147);
  expect(thin).toHaveLength(5);
});
