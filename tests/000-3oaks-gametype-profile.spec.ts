import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test.only("profile current 3 Oaks missing game type", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "3 Oaks Gaming" && !getVerifiedCatalogGameType(seed.slug))
    .map((seed) => ({
      slug: seed.slug,
      source: seed.source,
      details: getVerifiedCatalogDetails(seed.slug),
      mechanics: getVerifiedCatalogResearch(seed.slug)?.mechanics.length ?? 0,
    }));
  console.log("THREE_OAKS_GAMETYPE_PROFILE", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
