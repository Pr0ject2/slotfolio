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

test.only("profile remaining catalog quality tail", () => {
  const rows = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, ...profile(seed.slug) }));
  const histogram = Object.fromEntries([...new Set(rows.map((row) => row.score))].sort((a, b) => a - b).map((score) => [score, rows.filter((row) => row.score === score).length]));
  const score4 = rows.filter((row) => row.score === 4);
  const providers = Object.fromEntries([...new Set(score4.map((row) => row.provider))].sort().map((provider) => [provider, score4.filter((row) => row.provider === provider).length]));
  const signatures = new Map<string, number>();
  for (const row of score4) {
    const missing = ["field", "rtp", "maxWin", "volatility", "releaseDate", "gameType"].filter((key) => !(row as Record<string, unknown>)[key]);
    const signature = missing.join("+") || "mechanics-only";
    signatures.set(signature, (signatures.get(signature) ?? 0) + 1);
  }
  console.log("QUALITY_HISTOGRAM", JSON.stringify(histogram));
  console.log("SCORE4_PROVIDERS", JSON.stringify(providers));
  console.log("SCORE4_SIGNATURES", JSON.stringify(Object.fromEntries([...signatures.entries()].sort((a, b) => b[1] - a[1]))));
  console.log("SCORE4_ROWS", JSON.stringify(score4));
  expect(score4.length).toBeGreaterThanOrEqual(0);
});
