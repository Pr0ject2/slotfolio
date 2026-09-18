import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function rowFor(slug: string, provider: string) {
  const details = getVerifiedCatalogDetails(slug);
  const gameType = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0;
  const score = detailFacts + (gameType ? 1 : 0) + (research?.mechanics.length ?? 0);
  return {
    slug,
    provider,
    score,
    field: details?.field ?? null,
    rtp: details?.rtp ?? null,
    maxWin: details?.maxWin ?? null,
    volatility: details?.volatility ?? null,
    releaseDate: details?.releaseDate ?? null,
    gameType: gameType ?? null,
    mechanics: research?.mechanics ?? [],
  };
}

test.only("diagnose remaining low-score cards after fill 4", () => {
  const rows = catalogSeeds.map((seed) => rowFor(seed.slug, seed.provider));
  const counts = Object.fromEntries(Array.from({ length: 11 }, (_, score) => [score, rows.filter((row) => row.score === score).length]));
  const low = rows.filter((row) => row.score <= 3);
  console.log("CATALOG_FILL_4", JSON.stringify({ counts, low, total: rows.length }));
  expect(rows).toHaveLength(900);
});
