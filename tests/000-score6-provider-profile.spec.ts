import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test.only("profile score6 catalog by provider and missing fields", () => {
  const rows = catalogSeeds.flatMap((seed) => {
    if (scoreFor(seed.slug) !== 6) return [];
    const details = getVerifiedCatalogDetails(seed.slug);
    const missing = [
      ["field", details?.field],
      ["rtp", details?.rtp],
      ["maxWin", details?.maxWin],
      ["volatility", details?.volatility],
      ["releaseDate", details?.releaseDate],
    ].filter(([, value]) => !value).map(([field]) => field).sort();
    return [{ slug: seed.slug, provider: seed.provider, missing, releaseDate: details?.releaseDate, source: seed.source }];
  });

  const providers = rows.reduce<Record<string, { count: number; patterns: Record<string, number> }>>((acc, row) => {
    const entry = acc[row.provider] ??= { count: 0, patterns: {} };
    entry.count += 1;
    const pattern = row.missing.join("+") || "none";
    entry.patterns[pattern] = (entry.patterns[pattern] ?? 0) + 1;
    return acc;
  }, {});

  console.log("SCORE6_PROVIDER_PROFILE", JSON.stringify(providers));
  console.log("SCORE6_ROWS", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
