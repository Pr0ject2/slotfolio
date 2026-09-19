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
  return { score, ...facts, detailsSource: details?.source ?? null, researchSource: research?.source ?? null };
}

test.only("profile exact remaining catalog quality tail", () => {
  const rows = catalogSeeds
    .map((seed) => ({ slug: seed.slug, provider: seed.provider, ...profile(seed.slug) }))
    .filter((row) => row.score <= 4)
    .sort((a, b) => a.score - b.score || a.provider.localeCompare(b.provider) || a.slug.localeCompare(b.slug));

  console.log("FINAL_TAIL_COUNT", rows.length);
  console.log("FINAL_TAIL_ROWS", JSON.stringify(rows));
  expect(rows.length).toBeGreaterThan(0);
});
