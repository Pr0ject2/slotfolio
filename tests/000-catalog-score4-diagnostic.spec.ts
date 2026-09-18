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

test.only("profile remaining score-four catalog records", () => {
  const scoreFour = catalogSeeds
    .filter((seed) => score(seed.slug) === 4)
    .map((seed) => ({ slug: seed.slug, provider: seed.provider, source: seed.source, signature: signature(seed.slug) }));

  const providers = Array.from(new Set(scoreFour.map((row) => row.provider))).sort();
  const result = Object.fromEntries(providers.map((provider) => {
    const rows = scoreFour.filter((row) => row.provider === provider);
    const signatures = Array.from(new Set(rows.map((row) => row.signature))).sort();
    return [provider, {
      count: rows.length,
      grouped: Object.fromEntries(signatures.map((sig) => [sig, {
        count: rows.filter((row) => row.signature === sig).length,
        slugs: rows.filter((row) => row.signature === sig).map((row) => row.slug),
      }])),
    }];
  }));

  console.log("SCORE4_PROFILE", JSON.stringify({ total: scoreFour.length, providers: result }));
  expect(scoreFour).toHaveLength(411);
});
