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
  ].filter(Boolean);
  return { score, ...facts, missing, source: details?.source ?? research?.source ?? null };
}

test.only("profile remaining Play’n GO score-four catalog cards", () => {
  const rows = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO")
    .map((seed) => ({ slug: seed.slug, ...profile(seed.slug) }))
    .filter((row) => row.score === 4);

  const signatures = new Map<string, string[]>();
  for (const row of rows) {
    const key = row.missing.join("+") || "none";
    const current = signatures.get(key) ?? [];
    current.push(row.slug);
    signatures.set(key, current);
  }

  console.log("PLAYNGO_SCORE4_COUNT", rows.length);
  console.log("PLAYNGO_SCORE4_SIGNATURES", JSON.stringify(
    [...signatures.entries()]
      .map(([signature, slugs]) => ({ signature, count: slugs.length, slugs }))
      .sort((a, b) => b.count - a.count),
  ));
  console.log("PLAYNGO_SCORE4_ROWS", JSON.stringify(rows));
  expect(rows.length).toBeGreaterThan(0);
});
