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

test("profile current score-six provider tail", () => {
  const scoreSix = catalogSeeds.filter((seed) => scoreFor(seed.slug) === 6);
  const byProvider = Object.entries(
    scoreSix.reduce<Record<string, number>>((acc, seed) => {
      acc[seed.provider] = (acc[seed.provider] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const playngo = scoreSix
    .filter((seed) => seed.provider === "Play’n GO")
    .map((seed) => {
      const details = getVerifiedCatalogDetails(seed.slug);
      const type = getVerifiedCatalogGameType(seed.slug);
      const research = getVerifiedCatalogResearch(seed.slug);
      return {
        slug: seed.slug,
        missing: [
          !details?.field && "field",
          !details?.rtp && "rtp",
          !details?.maxWin && "maxWin",
          !details?.volatility && "volatility",
          !details?.releaseDate && "releaseDate",
          !type && "gameType",
        ].filter(Boolean),
        mechanicsCount: research?.mechanics.length ?? 0,
      };
    });

  console.log("SCORE6_PROVIDER_COUNTS", JSON.stringify(byProvider));
  console.log("PLAYNGO_SCORE6_PROFILE", JSON.stringify(playngo));
  expect(scoreSix.length).toBeGreaterThan(0);
});
