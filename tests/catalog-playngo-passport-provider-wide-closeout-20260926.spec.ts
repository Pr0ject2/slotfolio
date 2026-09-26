import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test("Play’n GO provider-wide passport closeout leaves zero missing fields", () => {
  const residual = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const missing = [
        !details?.field && "field",
        !details?.rtp && "rtp",
        !details?.maxWin && "maxWin",
        !details?.volatility && "volatility",
        !details?.releaseDate && "releaseDate",
        !getVerifiedCatalogGameType(seed.slug)?.gameType && "gameType",
        !(getVerifiedCatalogResearch(seed.slug)?.mechanics.length) && "mechanics",
      ].filter(Boolean);
      return { slug: seed.slug, missing };
    })
    .filter((row) => row.missing.length > 0);

  expect(residual, JSON.stringify(residual)).toEqual([]);
});
