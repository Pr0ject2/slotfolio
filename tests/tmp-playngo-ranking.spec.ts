import { test, expect } from "@playwright/test";
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

test("probe remaining Play’n GO catalog-only quality", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO")
    .map((seed) => ({
      slug: seed.slug,
      name: seed.name,
      source: seed.source,
      score: scoreFor(seed.slug),
      details: getVerifiedCatalogDetails(seed.slug),
      gameType: getVerifiedCatalogGameType(seed.slug),
      research: getVerifiedCatalogResearch(seed.slug),
    }))
    .sort((a, b) => a.score - b.score || a.slug.localeCompare(b.slug, "en"));

  console.log("PLAYNGO_WEAK", JSON.stringify(rows.filter((row) => row.score <= 2)));
  expect(rows.length).toBeGreaterThan(0);
});
