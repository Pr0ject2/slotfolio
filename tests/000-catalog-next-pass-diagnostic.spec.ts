import { test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function rowFor(slug: string, provider: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const facts = {
    field: Boolean(details?.field),
    rtp: Boolean(details?.rtp),
    maxWin: Boolean(details?.maxWin),
    volatility: Boolean(details?.volatility),
    releaseDate: Boolean(details?.releaseDate),
    gameType: Boolean(type),
    mechanics: Boolean(research?.mechanics.length),
  };
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  const score = detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
  return {
    slug,
    provider,
    score,
    missing: Object.entries(facts).filter(([, present]) => !present).map(([key]) => key),
    mechanicsCount: research?.mechanics.length ?? 0,
  };
}

test.only("diagnose next provider-wide catalog enrichment pass", () => {
  const rows = catalogSeeds.map((seed) => rowFor(seed.slug, seed.provider));
  const score3 = rows.filter((row) => row.score === 3);
  const providers = [...new Set(score3.map((row) => row.provider))]
    .map((provider) => {
      const providerRows = score3.filter((row) => row.provider === provider);
      const signatures = Object.entries(
        providerRows.reduce<Record<string, number>>((acc, row) => {
          const key = `${row.missing.join(",")}|mechanics=${row.mechanicsCount}`;
          acc[key] = (acc[key] ?? 0) + 1;
          return acc;
        }, {}),
      ).sort((a, b) => b[1] - a[1]);
      return {
        provider,
        count: providerRows.length,
        signatures,
        sample: providerRows.slice(0, 30).map((row) => ({
          slug: row.slug,
          missing: row.missing,
          mechanicsCount: row.mechanicsCount,
        })),
      };
    })
    .sort((a, b) => b.count - a.count);

  console.log("NEXT_PASS_PROFILE", JSON.stringify({
    score2: rows.filter((row) => row.score === 2).map((row) => ({
      slug: row.slug,
      provider: row.provider,
      missing: row.missing,
      mechanicsCount: row.mechanicsCount,
    })),
    score3Total: score3.length,
    providers,
  }));

  throw new Error("diagnostic only");
});
