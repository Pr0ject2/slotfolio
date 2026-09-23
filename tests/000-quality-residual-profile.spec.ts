import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function profile(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const facts = [details?.field, details?.rtp, details?.maxWin, details?.volatility, details?.releaseDate];
  const missing = ["field", "rtp", "maxWin", "volatility", "releaseDate"].filter((_, i) => !facts[i]);
  const score = facts.filter(Boolean).length + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
  return {
    score,
    missing,
    gameType: type?.gameType,
    mechanics: research?.mechanics ?? [],
    source: details?.source,
  };
}

test.only("profile current catalog passport gaps", () => {
  const rows = catalogSeeds.map((seed) => ({ provider: seed.provider, slug: seed.slug, ...profile(seed.slug) }));
  const passportThin = rows.filter((row) => row.missing.length >= 3);
  const byProvider = passportThin.reduce<Record<string, number>>((acc, row) => {
    acc[row.provider] = (acc[row.provider] ?? 0) + 1;
    return acc;
  }, {});
  const missingField = rows.filter((row) => row.missing.includes("field"));
  const missingRtp = rows.filter((row) => row.missing.includes("rtp"));
  const missingMaxWin = rows.filter((row) => row.missing.includes("maxWin"));
  const missingVolatility = rows.filter((row) => row.missing.includes("volatility"));
  const missingReleaseDate = rows.filter((row) => row.missing.includes("releaseDate"));

  console.log("PASSPORT_THIN_PROVIDER_COUNTS", JSON.stringify(byProvider));
  console.log("PASSPORT_THIN_3PLUS", JSON.stringify(passportThin));
  console.log("PASSPORT_MISSING_COUNTS", JSON.stringify({
    field: missingField.length,
    rtp: missingRtp.length,
    maxWin: missingMaxWin.length,
    volatility: missingVolatility.length,
    releaseDate: missingReleaseDate.length,
  }));
  expect(passportThin.length).toBe(-1);
});
