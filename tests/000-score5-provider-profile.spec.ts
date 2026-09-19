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
    ["field", facts.field],
    ["rtp", facts.rtp],
    ["maxWin", facts.maxWin],
    ["volatility", facts.volatility],
    ["releaseDate", facts.releaseDate],
    ["gameType", facts.gameType],
  ].filter(([, value]) => !value).map(([name]) => name);
  return { score, missing, mechanicsCount: facts.mechanics.length };
}

test.only("profile score-five catalog cards by provider and missing technical fields", () => {
  const rows = catalogSeeds
    .map((seed) => ({ slug: seed.slug, provider: seed.provider, ...profile(seed.slug) }))
    .filter((row) => row.score === 5);

  const providerCounts: Record<string, number> = {};
  const providerPatterns: Record<string, Record<string, number>> = {};
  const providerExamples: Record<string, string[]> = {};

  for (const row of rows) {
    providerCounts[row.provider] = (providerCounts[row.provider] ?? 0) + 1;
    const pattern = row.missing.join("+") || "complete-core";
    providerPatterns[row.provider] ??= {};
    providerPatterns[row.provider][pattern] = (providerPatterns[row.provider][pattern] ?? 0) + 1;
    providerExamples[row.provider] ??= [];
    if (providerExamples[row.provider].length < 25) providerExamples[row.provider].push(row.slug);
  }

  console.log("SCORE5_COUNT", rows.length);
  console.log("SCORE5_BY_PROVIDER", JSON.stringify(providerCounts));
  console.log("SCORE5_PATTERNS", JSON.stringify(providerPatterns));
  console.log("SCORE5_EXAMPLES", JSON.stringify(providerExamples));
  expect(rows.length).toBeGreaterThan(0);
});
