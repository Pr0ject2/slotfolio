import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function factsFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const gameType = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  const mechanics = research?.mechanics ?? [];
  return {
    details,
    gameType,
    mechanics,
    score: detailFacts + (gameType ? 1 : 0) + mechanics.length,
  };
}

test("probe remaining Hacksaw score-2 cards after provider-wide pass 2", () => {
  const ranked = catalogSeeds.map((seed) => ({ seed, ...factsFor(seed.slug) }));
  const remaining = ranked.filter((row) => row.seed.provider === "Hacksaw Gaming" && row.score === 2);

  const records = remaining.map((row) => ({
    slug: row.seed.slug,
    name: row.seed.name,
    source: row.seed.source,
    gameType: row.gameType?.gameType ?? null,
    field: row.details?.field ?? null,
    rtp: row.details?.rtp ?? null,
    maxWin: row.details?.maxWin ?? null,
    volatility: row.details?.volatility ?? null,
    releaseDate: row.details?.releaseDate ?? null,
    mechanics: row.mechanics,
  }));

  const groups = records.reduce<Record<string, number>>((acc, row) => {
    const detailCount = [row.field, row.rtp, row.maxWin, row.volatility, row.releaseDate].filter(Boolean).length;
    const key = `type:${row.gameType ? "yes" : "no"}|details:${detailCount}|mechanics:${row.mechanics.length}`;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const all = ranked.map((row) => ({ provider: row.seed.provider, slug: row.seed.slug, score: row.score }));
  console.log("HACKSAW_SCORE2_GROUPS=" + JSON.stringify(groups));
  console.log("HACKSAW_SCORE2_RECORDS=" + JSON.stringify(records));
  console.log("CATALOG_TOTALS=" + JSON.stringify({
    le1: all.filter((row) => row.score <= 1).length,
    score2: all.filter((row) => row.score === 2).length,
    score3: all.filter((row) => row.score === 3).length,
  }));

  expect(remaining).toHaveLength(59);
  expect(all.filter((row) => row.score === 2)).toHaveLength(114);
  expect(all.filter((row) => row.score === 3)).toHaveLength(489);
});
