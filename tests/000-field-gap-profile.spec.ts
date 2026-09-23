import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const facts = [details?.field, details?.rtp, details?.maxWin, details?.volatility, details?.releaseDate];
  return facts.filter(Boolean).length + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test.only("profile current Hacksaw passport residual", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Hacksaw Gaming")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const missing = [
        ["field", details?.field],
        ["rtp", details?.rtp],
        ["maxWin", details?.maxWin],
        ["volatility", details?.volatility],
        ["releaseDate", details?.releaseDate],
      ].filter(([, value]) => !value).map(([field]) => field);
      return {
        slug: seed.slug,
        score: scoreFor(seed.slug),
        missing,
        gameType: getVerifiedCatalogGameType(seed.slug)?.gameType,
        mechanics: getVerifiedCatalogResearch(seed.slug)?.mechanics ?? [],
        source: details?.source ?? seed.source,
      };
    })
    .filter((row) => row.missing.length > 0)
    .sort((a, b) => a.score - b.score || b.missing.length - a.missing.length || a.slug.localeCompare(b.slug));

  console.log("HACKSAW_PASSPORT_RESIDUAL", JSON.stringify(rows));
  console.log("HACKSAW_MISSING_COUNTS", JSON.stringify(rows.reduce<Record<string, number>>((acc, row) => {
    for (const field of row.missing) acc[field] = (acc[field] ?? 0) + 1;
    return acc;
  }, {})));
  expect(rows.length).toBe(-1);
});
