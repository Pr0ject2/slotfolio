import { expect, test } from "@playwright/test";
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

test("temporary global score-six profile", () => {
  const byProvider: Record<string, string[]> = {};
  for (const seed of catalogSeeds) {
    if (scoreFor(seed.slug) !== 6) continue;
    (byProvider[seed.provider] ??= []).push(seed.slug);
  }

  const histogram = Object.fromEntries(
    Object.entries(byProvider)
      .map(([provider, slugs]) => [provider, slugs.length] as const)
      .sort((a, b) => b[1] - a[1]),
  );

  console.log("SCORE6_PROVIDER_HISTOGRAM", JSON.stringify(histogram));
  console.log("SCORE6_PROVIDER_SLUGS", JSON.stringify(byProvider));
  expect(Object.keys(byProvider).length).toBeGreaterThan(0);
});
