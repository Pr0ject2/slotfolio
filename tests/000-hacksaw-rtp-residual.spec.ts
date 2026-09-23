import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

test.only("list exact Hacksaw RTP residual", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Hacksaw Gaming")
    .filter((seed) => !getVerifiedCatalogDetails(seed.slug)?.rtp)
    .map((seed) => ({ slug: seed.slug, source: seed.source }));

  console.log("HACKSAW_RTP_RESIDUAL", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
