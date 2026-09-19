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
  const missing = [
    !facts.field && "field",
    !facts.rtp && "rtp",
    !facts.maxWin && "maxWin",
    !facts.volatility && "volatility",
    !facts.releaseDate && "releaseDate",
    !facts.gameType && "gameType",
  ].filter(Boolean) as string[];
  return { score, missing, ...facts };
}

test.only("profile current score-five provider tail", () => {
  const rows = catalogSeeds
    .map((seed) => ({ slug: seed.slug, provider: seed.provider, ...profile(seed.slug) }))
    .filter((row) => row.score === 5);

  const byProvider = Object.entries(
    rows.reduce<Record<string, number>>((acc, row) => {
      acc[row.provider] = (acc[row.provider] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const missingPatterns = Object.entries(
    rows.reduce<Record<string, number>>((acc, row) => {
      const key = row.missing.join("+") || "none";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const providerPatterns = Object.entries(
    rows.reduce<Record<string, Record<string, number>>>((acc, row) => {
      const key = row.missing.join("+") || "none";
      acc[row.provider] ??= {};
      acc[row.provider][key] = (acc[row.provider][key] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => Object.values(b[1]).reduce((x, y) => x + y, 0) - Object.values(a[1]).reduce((x, y) => x + y, 0));

  console.log("SCORE5_COUNT", rows.length);
  console.log("SCORE5_BY_PROVIDER", JSON.stringify(byProvider));
  console.log("SCORE5_MISSING_PATTERNS", JSON.stringify(missingPatterns));
  console.log("SCORE5_PROVIDER_PATTERNS", JSON.stringify(providerPatterns));
  console.log("HACKSAW_SCORE5_ROWS", JSON.stringify(rows.filter((row) => row.provider === "Hacksaw Gaming")));

  expect(rows.length).toBeGreaterThan(0);
});
