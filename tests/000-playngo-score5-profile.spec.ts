import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return (
    (details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0) +
    (type ? 1 : 0) +
    (research?.mechanics.length ?? 0)
  );
}

test.only("profile remaining Play’n GO score-five cards", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO")
    .map((seed) => ({ slug: seed.slug, score: scoreFor(seed.slug), mechanics: getVerifiedCatalogResearch(seed.slug)?.mechanics ?? [] }))
    .filter((row) => row.score === 5);
  console.log("PLAYNGO_SCORE5_COUNT", rows.length);
  console.log("PLAYNGO_SCORE5_ROWS", JSON.stringify(rows));
  expect(rows.length).toBeGreaterThan(0);
});
