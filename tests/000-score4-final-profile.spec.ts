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

test.only("profile final catalog score-four tail", () => {
  const rows = catalogSeeds.map((seed) => ({ provider: seed.provider, slug: seed.slug, ...profile(seed.slug) }));
  const histogram = new Map<number, number>();
  for (const row of rows) histogram.set(row.score, (histogram.get(row.score) ?? 0) + 1);

  const score4 = rows.filter((row) => row.score === 4);
  const byProvider = new Map<string, number>();
  for (const row of score4) byProvider.set(row.provider, (byProvider.get(row.provider) ?? 0) + 1);

  const missingPattern = (row: (typeof rows)[number]) => [
    !row.field && "field",
    !row.rtp && "rtp",
    !row.maxWin && "maxWin",
    !row.volatility && "volatility",
    !row.releaseDate && "releaseDate",
    !row.gameType && "gameType",
  ].filter(Boolean).join("+") || "mechanics-only";

  const playngoPatterns = new Map<string, number>();
  for (const row of score4.filter((item) => item.provider === "Play’n GO")) {
    const pattern = missingPattern(row);
    playngoPatterns.set(pattern, (playngoPatterns.get(pattern) ?? 0) + 1);
  }

  console.log("FINAL_SCORE_HISTOGRAM", JSON.stringify(Object.fromEntries([...histogram].sort((a, b) => a[0] - b[0]))));
  console.log("FINAL_SCORE4_BY_PROVIDER", JSON.stringify(Object.fromEntries([...byProvider].sort((a, b) => b[1] - a[1]))));
  console.log("FINAL_PLAYNGO_SCORE4_PATTERNS", JSON.stringify(Object.fromEntries([...playngoPatterns].sort((a, b) => b[1] - a[1]))));
  console.log("FINAL_PLAYNGO_SCORE4_ROWS", JSON.stringify(score4.filter((row) => row.provider === "Play’n GO")));
  console.log("FINAL_OTHER_SCORE4_ROWS", JSON.stringify(score4.filter((row) => row.provider !== "Play’n GO")));

  expect(score4.length).toBeGreaterThan(0);
});
