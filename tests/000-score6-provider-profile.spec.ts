import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return [details?.field, details?.rtp, details?.maxWin, details?.volatility, details?.releaseDate].filter(Boolean).length
    + (type?.gameType ? 1 : 0)
    + (research?.mechanics.length ?? 0);
}

test.only("recount score-six providers after Wazdan and Play’n GO waves", () => {
  const rows = catalogSeeds
    .map((seed) => ({ provider: seed.provider, slug: seed.slug, score: scoreFor(seed.slug) }))
    .filter((row) => row.score === 6);

  const counts = Object.entries(rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.provider] = (acc[row.provider] ?? 0) + 1;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]);

  console.log("SCORE6_TOTAL", rows.length);
  console.log("SCORE6_BY_PROVIDER", JSON.stringify(counts));
  console.log("PLAYNGO_SCORE6_SLUGS", JSON.stringify(rows.filter((row) => row.provider === "Play’n GO").map((row) => row.slug)));

  expect(rows.filter((row) => row.provider === "Wazdan")).toHaveLength(0);
});
