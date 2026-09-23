import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targetFields = ["field", "maxWin", "releaseDate"] as const;
const allPassportFields = ["field", "rtp", "maxWin", "volatility", "releaseDate"] as const;

test.only("profile current Play'n GO official-friendly passport residual", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const gameType = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      const missing = targetFields.filter((field) => !details?.[field]);
      const missingGameType = !gameType;
      const score = allPassportFields.filter((field) => Boolean(details?.[field])).length + (gameType ? 1 : 0) + (research?.mechanics.length ?? 0);
      return {
        slug: seed.slug,
        source: seed.source,
        score,
        missing,
        missingGameType,
        mechanics: research?.mechanics.length ?? 0,
      };
    })
    .filter((row) => row.missing.length > 0 || row.missingGameType)
    .sort((a, b) => a.score - b.score || b.missing.length - a.missing.length || Number(b.missingGameType) - Number(a.missingGameType) || a.slug.localeCompare(b.slug));

  const counts = {
    field: rows.filter((row) => row.missing.includes("field")).length,
    maxWin: rows.filter((row) => row.missing.includes("maxWin")).length,
    releaseDate: rows.filter((row) => row.missing.includes("releaseDate")).length,
    gameType: rows.filter((row) => row.missingGameType).length,
  };
  console.log("PLAYNGO_CURRENT_PASSPORT_PROFILE", JSON.stringify({ total: rows.length, counts, rows }));
  expect(rows.length).toBe(-1);
});
