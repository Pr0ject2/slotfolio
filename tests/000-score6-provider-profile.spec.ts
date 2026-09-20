import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function profile(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const facts = {
    field: details?.field ?? null,
    rtp: details?.rtp ?? null,
    maxWin: details?.maxWin ?? null,
    volatility: details?.volatility ?? null,
    releaseDate: details?.releaseDate ?? null,
    gameType: type?.gameType ?? null,
    mechanics: research?.mechanics ?? [],
  };
  const score = [facts.field, facts.rtp, facts.maxWin, facts.volatility, facts.releaseDate].filter(Boolean).length
    + (facts.gameType ? 1 : 0)
    + facts.mechanics.length;
  return { score, ...facts };
}

test.only("profile Play’n GO score-six field gaps after Wazdan wave", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO")
    .map((seed) => ({ slug: seed.slug, source: seed.source, ...profile(seed.slug) }))
    .filter((row) => row.score === 6 && !row.field);

  console.log("PLAYNGO_SCORE6_FIELD_GAPS", rows.length);
  console.log("PLAYNGO_SCORE6_FIELD_ROWS", JSON.stringify(rows));

  expect(rows.length).toBeGreaterThan(0);
});
