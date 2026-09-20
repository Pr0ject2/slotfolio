import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const volatilitySource = "https://www.hacksawgaming.com/games";

const expected: Record<string, string> = {
  "hacksaw-gaming-cloud-princess": "3/5",
  "hacksaw-gaming-donny-and-danny": "3/5",
  "hacksaw-gaming-donut-division": "3/5",
  "hacksaw-gaming-dragons-domain": "4/5",
  "hacksaw-gaming-evil-eyes": "4/5",
  "hacksaw-gaming-fire-my-laser": "3/5",
  "hacksaw-gaming-hounds-of-hell": "4/5",
  "hacksaw-gaming-klowns": "3/5",
  "hacksaw-gaming-le-cowboy": "3/5",
  "hacksaw-gaming-le-pharaoh": "3/5",
  "hacksaw-gaming-le-viking": "3/5",
  "hacksaw-gaming-phoenix-duelreels": "3/5",
  "hacksaw-gaming-reign-of-rome": "4/5",
};

function qualityScore(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type?.gameType ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("Hacksaw provider-wide volatility meter preserves canonical sources and lifts all score-six targets", () => {
  expect(Object.keys(expected)).toHaveLength(13);
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const [slug, volatility] of Object.entries(expected)) {
    const seed = seeds.get(slug);
    const details = getVerifiedCatalogDetails(slug);

    expect(seed, `${slug} selected seed`).toBeTruthy();
    expect(details?.volatility, `${slug} volatility`).toBe(volatility);
    expect(details?.volatilitySource, `${slug} volatility provenance`).toBe(volatilitySource);
    expect(details?.source, `${slug} canonical source`).toBe(seed?.source);
    expect(details?.verifiedAt, `${slug} remains verified`).toBeTruthy();
    expect(qualityScore(slug), `${slug} must leave score six`).toBeGreaterThan(6);
  }
});
