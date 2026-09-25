import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test.only("temporary 3 Oaks passport profile", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "3 Oaks Gaming")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const gameType = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      const missing = [
        !details?.field ? "field" : null,
        !details?.rtp ? "rtp" : null,
        !details?.maxWin ? "maxWin" : null,
        !details?.volatility ? "volatility" : null,
        !details?.releaseDate ? "releaseDate" : null,
        !gameType?.gameType ? "gameType" : null,
        !(research?.mechanics.length) ? "mechanics" : null,
      ].filter(Boolean);
      return { slug: seed.slug, missing };
    })
    .filter((row) => row.missing.length > 0);

  console.log("THREE_OAKS_PASSPORT_PROFILE", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
