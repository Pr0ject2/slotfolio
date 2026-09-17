import { test } from "@playwright/test";
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

test.only("dump current quality score buckets", () => {
  const ranked = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));
  const byScore = Object.fromEntries([...new Set(ranked.map((row) => row.score))].sort((a, b) => a - b).map((score) => [score, ranked.filter((row) => row.score === score).length]));
  const low = ranked.filter((row) => row.score <= 2);
  const nolimit = ranked.filter((row) => row.provider === "Nolimit City").map((row) => ({ slug: row.slug, score: row.score })).filter((row) => row.score <= 3);
  console.log("QUALITY_SCORE_BASELINE", JSON.stringify({ byScore, low, nolimit }));
});
