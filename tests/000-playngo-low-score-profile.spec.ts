import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const allPassportFields = ["field", "rtp", "maxWin", "volatility", "releaseDate"] as const;

const scoreFor = (slug: string) => {
  const details = getVerifiedCatalogDetails(slug);
  const gameType = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return allPassportFields.filter((field) => Boolean(details?.[field])).length + (gameType ? 1 : 0) + (research?.mechanics.length ?? 0);
};

test.only("profile current low-score Play'n GO tail", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const gameType = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      return {
        slug: seed.slug,
        source: seed.source,
        score: scoreFor(seed.slug),
        missing: allPassportFields.filter((field) => !details?.[field]),
        missingGameType: !gameType,
        mechanics: research?.mechanics.length ?? 0,
      };
    })
    .filter((row) => row.score <= 6)
    .sort((a, b) => a.score - b.score || b.missing.length - a.missing.length || a.slug.localeCompare(b.slug));

  console.log("PLAYNGO_LOW_SCORE_PROFILE", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
