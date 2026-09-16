import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function factsFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return {
    score: detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0),
    field: details?.field || "",
    rtp: details?.rtp || "",
    maxWin: details?.maxWin || "",
    volatility: details?.volatility || "",
    releaseDate: details?.releaseDate || "",
    gameType: type?.gameType || "",
    mechanics: research?.mechanics || [],
  };
}

test("print remaining Play’n GO score-2 catalog records with components", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO")
    .map((seed) => ({ slug: seed.slug, name: seed.name, ...factsFor(seed.slug) }))
    .filter((row) => row.score === 2)
    .sort((a, b) => a.slug.localeCompare(b.slug));

  console.log("PLAYNGO_PASS9_COMPONENTS=" + JSON.stringify(rows));
  expect(rows, `remaining Play’n GO score2=${rows.length}`).toHaveLength(0);
});
