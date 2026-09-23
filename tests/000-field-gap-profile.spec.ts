import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

test.only("list exact Hacksaw volatility residual", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Hacksaw Gaming")
    .filter((seed) => !getVerifiedCatalogDetails(seed.slug)?.volatility)
    .map((seed) => seed.slug)
    .sort();

  console.log("HACKSAW_VOLATILITY_RESIDUAL", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
