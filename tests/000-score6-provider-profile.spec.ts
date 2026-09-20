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

test.only("profile Wazdan score-six remainder after game-type wave", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Wazdan")
    .map((seed) => ({ slug: seed.slug, source: seed.source, ...profile(seed.slug) }))
    .filter((row) => row.score === 6);

  const missingGameType = rows.filter((row) => !row.gameType);
  const signatures = Object.entries(
    rows.reduce<Record<string, number>>((acc, row) => {
      const missing = ["field", "rtp", "maxWin", "volatility", "releaseDate", "gameType"]
        .filter((key) => !row[key as keyof typeof row]);
      const signature = `missing=${missing.join(",") || "none"} :: mechanics=${row.mechanics.length}`;
      acc[signature] = (acc[signature] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  console.log("WAZDAN_SCORE6_REMAINING", rows.length);
  console.log("WAZDAN_SCORE6_SIGNATURES", JSON.stringify(signatures));
  console.log("WAZDAN_SCORE6_ROWS", JSON.stringify(rows));
  expect(missingGameType).toHaveLength(0);
});
