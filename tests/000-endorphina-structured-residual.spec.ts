import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";

test.only("profile Endorphina field RTP volatility residual", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Endorphina")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const missing = [
        ["field", details?.field],
        ["rtp", details?.rtp],
        ["volatility", details?.volatility],
      ].filter(([, value]) => !value).map(([field]) => field);
      return { slug: seed.slug, missing, source: seed.source };
    })
    .filter((row) => row.missing.length > 0);

  const patterns = rows.reduce<Record<string, number>>((acc, row) => {
    const pattern = row.missing.sort().join("+");
    acc[pattern] = (acc[pattern] ?? 0) + 1;
    return acc;
  }, {});

  console.log("ENDORPHINA_STRUCTURED_PATTERNS", JSON.stringify(patterns));
  console.log("ENDORPHINA_STRUCTURED_RESIDUAL", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
