import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function facts(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const gameType = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return {
    field: Boolean(details?.field),
    rtp: Boolean(details?.rtp),
    maxWin: Boolean(details?.maxWin),
    volatility: Boolean(details?.volatility),
    releaseDate: Boolean(details?.releaseDate),
    gameType: Boolean(gameType),
    mechanics: research?.mechanics.length ?? 0,
  };
}

function score(slug: string) {
  const f = facts(slug);
  return Number(f.field) + Number(f.rtp) + Number(f.maxWin) + Number(f.volatility) + Number(f.releaseDate) + Number(f.gameType) + f.mechanics;
}

function signature(slug: string) {
  const f = facts(slug);
  return [
    !f.field && "field",
    !f.rtp && "rtp",
    !f.maxWin && "maxWin",
    !f.volatility && "volatility",
    !f.releaseDate && "releaseDate",
    !f.gameType && "gameType",
    `mechanics:${f.mechanics}`,
  ].filter(Boolean).join("|");
}

test.only("profile next score-four catalog batch", () => {
  const scored = catalogSeeds.map((seed) => ({ ...seed, score: score(seed.slug) }));
  const rows = scored
    .filter((seed) => seed.score === 4)
    .map((seed) => ({ slug: seed.slug, provider: seed.provider, source: seed.source, signature: signature(seed.slug) }));
  const providers = Array.from(new Set(rows.map((row) => row.provider))).sort();
  const grouped = Object.fromEntries(providers.map((provider) => {
    const selected = rows.filter((row) => row.provider === provider);
    const signatures = Array.from(new Set(selected.map((row) => row.signature))).sort();
    return [provider, {
      count: selected.length,
      signatures: Object.fromEntries(signatures.map((sig) => [sig, {
        count: selected.filter((row) => row.signature === sig).length,
        slugs: selected.filter((row) => row.signature === sig).map((row) => row.slug),
      }])),
    }];
  }));
  const scoreCounts = Object.fromEntries(
    Array.from(new Set(scored.map((row) => row.score))).sort((a, b) => a - b).map((value) => [
      value,
      scored.filter((row) => row.score === value).length,
    ]),
  );
  console.log("NEXT_SCORE4_PROFILE", JSON.stringify({ total: rows.length, scoreCounts, providers: grouped }));
  expect(rows).toHaveLength(350);
});
