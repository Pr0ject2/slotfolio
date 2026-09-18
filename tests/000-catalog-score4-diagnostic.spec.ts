import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function rowFor(slug: string, provider: string) {
  const details = getVerifiedCatalogDetails(slug);
  const gameType = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
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

test.only("measure catalog quality after Wazdan score-four fill", () => {
  const rows = catalogSeeds.map((seed) => rowFor(seed.slug, seed.provider));
  const counts = Object.fromEntries(
    Array.from({ length: 11 }, (_, score) => [String(score), rows.filter((row) => row.score === score).length]),
  );
  const wazdan = rows.filter((row) => row.provider === "Wazdan");
  const wazdanCounts = Object.fromEntries(
    Array.from({ length: 11 }, (_, score) => [String(score), wazdan.filter((row) => row.score === score).length]),
  );
  const wazdanLow = wazdan.filter((row) => row.score <= 6);
  console.log("CATALOG_AFTER_WAZDAN_SCORE4", JSON.stringify({ counts, wazdanCounts, wazdanLow }));
  expect(rows).toHaveLength(900);
});
