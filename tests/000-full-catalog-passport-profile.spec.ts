import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

test.only("profile full catalog passport gaps", () => {
  const rows = catalogSeeds.map((seed) => {
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
    return { provider: seed.provider, slug: seed.slug, missing };
  }).filter((row) => row.missing.length > 0);

  const byField: Record<string, number> = {};
  const byProvider: Record<string, { total: number; fields: Record<string, number> }> = {};
  for (const row of rows) {
    const p = byProvider[row.provider] ??= { total: 0, fields: {} };
    p.total += 1;
    for (const field of row.missing) {
      byField[field] = (byField[field] ?? 0) + 1;
      p.fields[field] = (p.fields[field] ?? 0) + 1;
    }
  }

  console.log("FULL_PASSPORT_PROFILE", JSON.stringify({ totalIncomplete: rows.length, byField, byProvider, rows }));
  expect(rows.length).toBe(-1);
});
