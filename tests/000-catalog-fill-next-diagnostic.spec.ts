import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function facts(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return {
    field: Boolean(details?.field),
    rtp: Boolean(details?.rtp),
    maxWin: Boolean(details?.maxWin),
    volatility: Boolean(details?.volatility),
    releaseDate: Boolean(details?.releaseDate),
    gameType: Boolean(type?.gameType),
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

test.only("diagnose next catalog fill", () => {
  const providers = ["3 Oaks Gaming", "Hacksaw Gaming", "Play’n GO"];
  const result: Record<string, unknown> = {};

  for (const provider of providers) {
    const rows = catalogSeeds
      .filter((seed) => seed.provider === provider && score(seed.slug) === 3)
      .map((seed) => ({ slug: seed.slug, source: seed.source, signature: signature(seed.slug), facts: facts(seed.slug) }));

    const grouped = Object.fromEntries(
      Array.from(new Set(rows.map((row) => row.signature))).sort().map((sig) => [
        sig,
        {
          count: rows.filter((row) => row.signature === sig).length,
          slugs: rows.filter((row) => row.signature === sig).map((row) => row.slug),
        },
      ]),
    );

    result[provider] = { count: rows.length, grouped };
  }

  console.log("CATALOG_FILL_NEXT", JSON.stringify(result));
  expect(catalogSeeds).toHaveLength(900);
});
