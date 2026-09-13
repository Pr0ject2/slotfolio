import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test.only("list thin Push Gaming runtime records for quality pass 3", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Push Gaming")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const type = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      const detailFacts = details
        ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
        : 0;
      const score = detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
      return {
        score,
        slug: seed.slug,
        name: seed.name,
        source: seed.source,
        facts: {
          field: details?.field ?? null,
          rtp: details?.rtp ?? null,
          maxWin: details?.maxWin ?? null,
          volatility: details?.volatility ?? null,
          releaseDate: details?.releaseDate ?? null,
          gameType: type?.gameType ?? null,
          mechanics: research?.mechanics ?? [],
        },
      };
    })
    .filter((row) => row.score <= 1)
    .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name, "en"));

  console.log("PUSH_QUALITY_THIN_PASS3", JSON.stringify(rows));
  expect(rows.length).toBe(0);
});
