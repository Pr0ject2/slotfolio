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

test.only("profile current field gaps", () => {
  const rows = catalogSeeds
    .map((seed) => ({
      provider: seed.provider,
      slug: seed.slug,
      score: scoreFor(seed.slug),
      source: getVerifiedCatalogDetails(seed.slug)?.source ?? seed.source,
      gameType: getVerifiedCatalogGameType(seed.slug)?.gameType,
      mechanics: getVerifiedCatalogResearch(seed.slug)?.mechanics ?? [],
      missingField: !getVerifiedCatalogDetails(seed.slug)?.field,
    }))
    .filter((row) => row.missingField)
    .sort((a, b) => a.score - b.score || a.provider.localeCompare(b.provider) || a.slug.localeCompare(b.slug));

  const byProvider = rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.provider] = (acc[row.provider] ?? 0) + 1;
    return acc;
  }, {});

  console.log("FIELD_GAP_PROVIDER_COUNTS", JSON.stringify(byProvider));
  console.log("FIELD_GAPS", JSON.stringify(rows));
  expect(rows.length).toBe(-1);
});
