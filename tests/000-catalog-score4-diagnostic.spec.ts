import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function rowFor(slug: string, provider: string) {
  const details = getVerifiedCatalogDetails(slug);
  const gameType = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const flags = {
    field: Boolean(details?.field),
    rtp: Boolean(details?.rtp),
    maxWin: Boolean(details?.maxWin),
    volatility: Boolean(details?.volatility),
    releaseDate: Boolean(details?.releaseDate),
    gameType: Boolean(gameType),
  };
  const mechanics = research?.mechanics.length ?? 0;
  const detailFacts = Object.values(flags).filter(Boolean).length;
  const score = detailFacts + mechanics;
  const signature = [
    flags.field ? "F" : "-",
    flags.rtp ? "R" : "-",
    flags.maxWin ? "W" : "-",
    flags.volatility ? "V" : "-",
    flags.releaseDate ? "D" : "-",
    flags.gameType ? "T" : "-",
    `M${mechanics}`,
  ].join("");
  return { slug, provider, score, signature, flags, mechanics };
}

test.only("profile score-four catalog cards by provider and fact shape", () => {
  const rows = catalogSeeds.map((seed) => rowFor(seed.slug, seed.provider));
  const score4 = rows.filter((row) => row.score === 4);
  const providers = [...new Set(score4.map((row) => row.provider))].sort();
  const profile = Object.fromEntries(
    providers.map((provider) => {
      const providerRows = score4.filter((row) => row.provider === provider);
      const signatures = [...new Set(providerRows.map((row) => row.signature))]
        .map((signature) => {
          const matches = providerRows.filter((row) => row.signature === signature);
          return { signature, count: matches.length, sample: matches.slice(0, 15).map((row) => row.slug) };
        })
        .sort((a, b) => b.count - a.count || a.signature.localeCompare(b.signature));
      return [provider, { count: providerRows.length, signatures }];
    }),
  );
  console.log("CATALOG_SCORE4_PROFILE", JSON.stringify({ total: score4.length, profile }));
  expect(score4).toHaveLength(551);
});
