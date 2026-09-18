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

test.only("diagnose remaining score-three catalog tail", () => {
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
      evidence: research?.evidence ?? "",
      mechanics: research?.mechanics ?? [],
      shape: {
        field: Boolean(details?.field),
        rtp: Boolean(details?.rtp),
        maxWin: Boolean(details?.maxWin),
        volatility: Boolean(details?.volatility),
        releaseDate: Boolean(details?.releaseDate),
        gameType: Boolean(type),
        mechanics: research?.mechanics.length ?? 0,
      },
    };
  });

  const score3 = rows.filter((row) => row.score === 3);
  const scoreCounts = Object.fromEntries(
    Array.from(new Set(rows.map((row) => row.score))).sort((a, b) => a - b).map((score) => [score, rows.filter((row) => row.score === score).length]),
  );
  const byProvider = Object.fromEntries(
    Array.from(new Set(score3.map((row) => row.provider))).sort().map((provider) => [
      provider,
      {
        count: score3.filter((row) => row.provider === provider).length,
        records: score3.filter((row) => row.provider === provider),
      },
    ]),
  );

  console.log("CATALOG_FILL_2_DIAGNOSTIC", JSON.stringify({ total: rows.length, score3: score3.length, scoreCounts, byProvider }));
  expect(score3).toHaveLength(113);
});
