import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

test.only("list exact Hacksaw max-win residual", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Hacksaw Gaming")
    .filter((seed) => !getVerifiedCatalogDetails(seed.slug)?.maxWin)
    .map((seed) => ({ slug: seed.slug, source: seed.source }))
    .sort((a, b) => a.slug.localeCompare(b.slug));

  console.log("HACKSAW_MAXWIN_RESIDUAL", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
