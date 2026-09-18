import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function profile(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  const score = detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
  return {
    score,
    field: details?.field ?? null,
    rtp: details?.rtp ?? null,
    maxWin: details?.maxWin ?? null,
    volatility: details?.volatility ?? null,
    releaseDate: details?.releaseDate ?? null,
    gameType: type?.gameType ?? null,
    mechanics: research?.mechanics ?? [],
    source: details?.source ?? research?.source ?? null,
  };
}

test.only("profile remaining Push score-four catalog cards", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Push Gaming")
    .map((seed) => ({ slug: seed.slug, ...profile(seed.slug) }))
    .filter((row) => row.score === 4);

  console.log("PUSH_SCORE4_PROFILE", JSON.stringify(rows));
  expect(rows.length).toBeGreaterThan(0);
});
