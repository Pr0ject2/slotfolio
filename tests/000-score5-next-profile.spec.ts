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

test.only("profile remaining score-five catalog-only records", () => {
  const all = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, ...profile(seed.slug) }));
  const rows = all.filter((row) => row.score === 5);
  const score4Rows = all.filter((row) => row.score === 4);
  const histogram = Object.fromEntries(
    Array.from(new Set(all.map((row) => row.score))).sort((a, b) => a - b).map((score) => [score, all.filter((row) => row.score === score).length]),
  );
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
      const key = `${row.provider} :: missing=${missing.join(",") || "none"} :: mechanics=${row.mechanics.length}`;
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  console.log("SCORE_HISTOGRAM", JSON.stringify(histogram));
  console.log("SCORE4_COUNT", score4Rows.length);
  console.log("SCORE4_ROWS", JSON.stringify(score4Rows));
  console.log("SCORE5_COUNT", rows.length);
  console.log("SCORE5_BY_PROVIDER", JSON.stringify(byProvider));
  console.log("SCORE5_SIGNATURES", JSON.stringify(signatures));
  console.log("SCORE5_ROWS", JSON.stringify(rows));
  expect(rows.length).toBeGreaterThan(0);
});
