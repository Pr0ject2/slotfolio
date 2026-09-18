import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test.only("diagnose current low-score catalog cards", () => {
  const rows = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));
  const low = rows.filter((row) => row.score <= 3);
  const counts = Object.fromEntries(
    Array.from(new Set(low.map((row) => row.provider))).sort().map((provider) => [
      provider,
      {
        score2: low.filter((row) => row.provider === provider && row.score === 2).length,
        score3: low.filter((row) => row.provider === provider && row.score === 3).length,
      },
    ]),
  );
  console.log("CATALOG_FILL_COUNTS", JSON.stringify({ total: rows.length, low: low.length, counts }));

  const playngo = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO" && scoreFor(seed.slug) === 3)
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const type = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      return {
        slug: seed.slug,
        source: seed.source,
        field: details?.field ?? null,
        rtp: details?.rtp ?? null,
        maxWin: details?.maxWin ?? null,
        volatility: details?.volatility ?? null,
        releaseDate: details?.releaseDate ?? null,
        gameType: type?.gameType ?? null,
        mechanics: research?.mechanics ?? [],
      };
    });
  console.log("PLAYNGO_SCORE3_EXACT", JSON.stringify(playngo));
  expect(rows).toHaveLength(900);
});
