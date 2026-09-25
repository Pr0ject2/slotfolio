import { test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test.only("profile remaining Play'n GO passport gaps", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Play'n GO")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const type = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      const missing = [
        !details?.field ? "field" : null,
        !details?.rtp ? "rtp" : null,
        !details?.maxWin ? "maxWin" : null,
        !details?.volatility ? "volatility" : null,
        !details?.releaseDate ? "releaseDate" : null,
        !type?.gameType ? "gameType" : null,
        !(research?.mechanics?.length) ? "mechanics" : null,
      ].filter((field): field is string => Boolean(field));
      return { slug: seed.slug, title: seed.title, missing };
    })
    .filter((row) => row.missing.length > 0);

  const byField: Record<string, number> = {};
  for (const row of rows) {
    for (const field of row.missing) byField[field] = (byField[field] ?? 0) + 1;
  }

  throw new Error(`PLAYNGO_PROFILE ${JSON.stringify({ totalIncomplete: rows.length, byField, first30: rows.slice(0, 30) })}`);
});
