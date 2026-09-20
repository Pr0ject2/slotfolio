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

test.only("profile score-six catalog-only records by provider and missing fields", () => {
  const rows = catalogSeeds
    .map((seed) => ({ slug: seed.slug, provider: seed.provider, source: seed.source, ...profile(seed.slug) }))
    .filter((row) => row.score === 6);

  const byProvider = Object.entries(
    rows.reduce<Record<string, number>>((acc, row) => {
      acc[row.provider] = (acc[row.provider] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const signatures = Object.entries(
    rows.reduce<Record<string, number>>((acc, row) => {
      const missing = ["field", "rtp", "maxWin", "volatility", "releaseDate", "gameType"]
        .filter((key) => !row[key as keyof typeof row]);
      const signature = `${row.provider} :: missing=${missing.join(",") || "none"} :: mechanics=${row.mechanics.length}`;
      acc[signature] = (acc[signature] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  console.log("SCORE6_COUNT", rows.length);
  console.log("SCORE6_BY_PROVIDER", JSON.stringify(byProvider));
  console.log("SCORE6_SIGNATURES", JSON.stringify(signatures));
  console.log("SCORE6_ROWS", JSON.stringify(rows));
  expect(rows.length).toBeGreaterThan(0);
});
