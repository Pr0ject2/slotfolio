import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const passportFields = ["field", "rtp", "maxWin", "volatility", "releaseDate"] as const;

test.only("profile current global score-six-and-below tail", () => {
  const rows = catalogSeeds
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const gameType = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      const score = passportFields.filter((field) => Boolean(details?.[field])).length + (gameType ? 1 : 0) + (research?.mechanics.length ?? 0);
      return {
        provider: seed.provider,
        slug: seed.slug,
        score,
        missing: passportFields.filter((field) => !details?.[field]),
        missingGameType: !gameType,
        mechanics: research?.mechanics.length ?? 0,
      };
    })
    .filter((row) => row.score <= 6)
    .sort((a, b) => a.score - b.score || a.provider.localeCompare(b.provider) || a.slug.localeCompare(b.slug));

  const byProvider = Object.fromEntries(
    [...new Set(rows.map((row) => row.provider))].sort().map((provider) => [provider, rows.filter((row) => row.provider === provider).length]),
  );
  const byScore = Object.fromEntries(
    [...new Set(rows.map((row) => row.score))].sort((a, b) => a - b).map((score) => [String(score), rows.filter((row) => row.score === score).length]),
  );

  console.log("GLOBAL_LOW_SCORE_PROFILE", JSON.stringify({ total: rows.length, byProvider, byScore, rows }));
  expect(rows.length).toBe(-1);
});
