import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function profile(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const mechanics = research?.mechanics ?? [];
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  const score = detailFacts + (type ? 1 : 0) + mechanics.length;
  const missing = [
    !details?.field && "field",
    !details?.rtp && "rtp",
    !details?.maxWin && "maxWin",
    !details?.volatility && "volatility",
    !details?.releaseDate && "releaseDate",
    !type && "gameType",
  ].filter(Boolean);

  return {
    score,
    missing,
    mechanicsCount: mechanics.length,
    mechanics,
    field: details?.field,
    rtp: details?.rtp,
    maxWin: details?.maxWin,
    volatility: details?.volatility,
    releaseDate: details?.releaseDate,
    gameType: type,
    source: details?.source,
  };
}

test("profile current global score-six tail without narrowing the suite", () => {
  const records = catalogSeeds
    .map((seed) => ({ slug: seed.slug, provider: seed.provider, ...profile(seed.slug) }))
    .filter((record) => record.score === 6)
    .sort((a, b) => a.provider.localeCompare(b.provider) || a.slug.localeCompare(b.slug));

  const byProvider = records.reduce<Record<string, number>>((acc, record) => {
    acc[record.provider] = (acc[record.provider] ?? 0) + 1;
    return acc;
  }, {});

  console.log("GLOBAL_SCORE6_PROFILE", JSON.stringify({ count: records.length, byProvider, records }));
  expect(records.length).toBeGreaterThan(0);
});
