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
  return { score, ...facts, missing, source: details?.source ?? research?.source ?? null };
}

test.only("profile remaining score-four catalog tail", () => {
  const all = catalogSeeds.map((seed) => ({ provider: seed.provider, slug: seed.slug, ...profile(seed.slug) }));
  const histogram = new Map<number, number>();
  for (const row of all) histogram.set(row.score, (histogram.get(row.score) ?? 0) + 1);

  const rows = all.filter((row) => row.score === 4);
  const byProvider = new Map<string, typeof rows>();
  for (const row of rows) {
    const current = byProvider.get(row.provider) ?? [];
    current.push(row);
    byProvider.set(row.provider, current);
  }

  const providerSummary = [...byProvider.entries()]
    .map(([provider, providerRows]) => {
      const signatures = new Map<string, number>();
      for (const row of providerRows) {
        const key = row.missing.join("+") || "none";
        signatures.set(key, (signatures.get(key) ?? 0) + 1);
      }
      return {
        provider,
        count: providerRows.length,
        signatures: [...signatures.entries()]
          .map(([signature, count]) => ({ signature, count }))
          .sort((a, b) => b.count - a.count),
        slugs: providerRows.map((row) => row.slug),
      };
    })
    .sort((a, b) => b.count - a.count);

  console.log("CATALOG_SCORE_HISTOGRAM", JSON.stringify([...histogram.entries()].sort((a, b) => a[0] - b[0])));
  console.log("SCORE4_TOTAL", rows.length);
  console.log("SCORE4_BY_PROVIDER", JSON.stringify(providerSummary));
  expect(rows.length).toBeGreaterThan(0);
});
