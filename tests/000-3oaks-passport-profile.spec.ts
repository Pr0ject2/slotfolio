import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const passportFields = ["field", "rtp", "maxWin", "volatility", "releaseDate"] as const;

test.only("profile current 3 Oaks passport residual", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "3 Oaks Gaming")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const type = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      const missing = passportFields.filter((field) => !details?.[field]);
      const score = passportFields.filter((field) => Boolean(details?.[field])).length + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
      return {
        slug: seed.slug,
        source: seed.source,
        score,
        missing,
        mechanics: research?.mechanics.length ?? 0,
        gameType: type?.gameType ?? null,
      };
    })
    .filter((row) => row.missing.length > 0)
    .sort((a, b) => a.score - b.score || a.missing.length - b.missing.length || a.slug.localeCompare(b.slug));

  const grouped = Object.fromEntries(
    Array.from(new Set(rows.map((row) => row.missing.join("|")))).map((signature) => [
      signature,
      rows.filter((row) => row.missing.join("|") === signature).map((row) => ({ slug: row.slug, score: row.score })),
    ]),
  );

  const counts = Object.fromEntries(passportFields.map((field) => [field, rows.filter((row) => row.missing.includes(field)).length]));
  console.log("THREE_OAKS_PASSPORT_PROFILE", JSON.stringify({ totalMissingAny: rows.length, counts, grouped, rows }));
  expect(rows.length).toBe(-1);
});
