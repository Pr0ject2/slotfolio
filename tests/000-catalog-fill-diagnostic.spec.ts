import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test.only("diagnose final catalog-fill distribution", () => {
  const rows = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));
  const histogram = Object.fromEntries(
    Array.from(new Set(rows.map((row) => row.score))).sort((a, b) => a - b).map((score) => [score, rows.filter((row) => row.score === score).length]),
  );
  const low = rows.filter((row) => row.score <= 3);
  const counts = Object.fromEntries(
    Array.from(new Set(low.map((row) => row.provider))).sort().map((provider) => [provider, {
      score2: low.filter((row) => row.provider === provider && row.score === 2).length,
      score3: low.filter((row) => row.provider === provider && row.score === 3).length,
    }]),
  );
  console.log("CATALOG_FILL_FINAL", JSON.stringify({ total: rows.length, histogram, low: low.length, counts }));
  console.log("PLAYNGO_SCORE3_FINAL", JSON.stringify(rows.filter((row) => row.provider === "Play’n GO" && row.score === 3).map((row) => row.slug)));
  expect(rows).toHaveLength(900);
});
