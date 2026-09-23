import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

test.only("list exact Wazdan release-date residual", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Wazdan")
    .filter((seed) => !getVerifiedCatalogDetails(seed.slug)?.releaseDate)
    .map((seed) => ({ slug: seed.slug, source: seed.source }));

  console.log("WAZDAN_RELEASE_DATE_RESIDUAL", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
