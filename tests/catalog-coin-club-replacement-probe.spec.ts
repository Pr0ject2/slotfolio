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

test("probe replacement after rejecting broken Coin Club seed", () => {
  expect(catalogSeeds).toHaveLength(900);
  expect(catalogSeeds.some((seed) => seed.slug === "playn-go-coin-club")).toBe(false);

  const low = catalogSeeds
    .map((seed) => ({ slug: seed.slug, name: seed.name, provider: seed.provider, source: seed.source, score: scoreFor(seed.slug) }))
    .filter((row) => row.score <= 2);
  const tail = catalogSeeds.slice(-16).map((seed) => ({ slug: seed.slug, name: seed.name, provider: seed.provider, source: seed.source, score: scoreFor(seed.slug) }));
  const playngoTail = catalogSeeds
    .filter((seed) => seed.provider === "Play’n GO")
    .slice(-8)
    .map((seed) => ({ slug: seed.slug, name: seed.name, source: seed.source, score: scoreFor(seed.slug) }));

  console.log(`COIN_CLUB_LOW=${JSON.stringify(low)}`);
  console.log(`COIN_CLUB_TAIL=${JSON.stringify(tail)}`);
  console.log(`COIN_CLUB_PLAYNGO_TAIL=${JSON.stringify(playngoTail)}`);
});
