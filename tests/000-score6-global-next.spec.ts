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

function missingFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return [
    !details?.field && "field",
    !details?.rtp && "rtp",
    !details?.maxWin && "maxWin",
    !details?.volatility && "volatility",
    !details?.releaseDate && "releaseDate",
    !type && "gameType",
    !(research?.mechanics.length) && "mechanics",
  ].filter(Boolean);
}

test.only("profile current global score-six tail", () => {
  const rows = catalogSeeds
    .filter((seed) => scoreFor(seed.slug) === 6)
    .map((seed) => ({ provider: seed.provider, slug: seed.slug, missing: missingFor(seed.slug) }));

  const byProvider = Object.entries(
    rows.reduce<Record<string, number>>((acc, row) => {
      acc[row.provider] = (acc[row.provider] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  console.log("GLOBAL_SCORE6_COUNT", rows.length);
  console.log("GLOBAL_SCORE6_BY_PROVIDER", JSON.stringify(byProvider));
  console.log("GLOBAL_SCORE6_ROWS", JSON.stringify(rows));
  expect(rows.length).toBeGreaterThan(0);
});
