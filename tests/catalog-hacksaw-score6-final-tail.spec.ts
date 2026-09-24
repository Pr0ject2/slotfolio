import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const formerlyFieldLimited = [
  "hacksaw-gaming-epic-ze-zeus",
  "hacksaw-gaming-great-game-rockies",
  "hacksaw-gaming-le-hooligan",
  "hacksaw-gaming-le-sortudo",
  "hacksaw-gaming-supreme-zeus",
] as const;

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("Hacksaw score-six tail is closed by direct official feature evidence", () => {
  const scoreSix = catalogSeeds
    .filter((seed) => seed.provider === "Hacksaw Gaming" && scoreFor(seed.slug) === 6)
    .map((seed) => seed.slug)
    .sort();

  expect(scoreSix).toEqual([]);

  for (const slug of formerlyFieldLimited) {
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.field, `${slug} field remains unknown`).toBeUndefined();
    expect(details?.rtp, `${slug} RTP stays verified`).toBeTruthy();
    expect(details?.maxWin, `${slug} max win stays verified`).toBeTruthy();
    expect(details?.volatility, `${slug} volatility stays verified`).toBeTruthy();
    expect(details?.releaseDate, `${slug} release date stays verified`).toBeTruthy();
    expect(getVerifiedCatalogGameType(slug)?.gameType, `${slug} stays classified`).toBe("Slots");
    expect(getVerifiedCatalogResearch(slug)?.mechanics.length, `${slug} keeps richer official mechanics`).toBeGreaterThan(1);
    expect(scoreFor(slug), `${slug} moves beyond score six`).toBeGreaterThan(6);
  }

  const jelly = getVerifiedCatalogDetails("hacksaw-gaming-jelly-slice");
  expect(jelly?.field).toBe("5×4 · до 1204 способов");
  expect(jelly?.maxWin).toBe("10 000x");
  expect(jelly?.volatility).toBe("3/5");
  expect(getVerifiedCatalogGameType("hacksaw-gaming-jelly-slice")?.gameType).toBe("Slots");
  expect(getVerifiedCatalogResearch("hacksaw-gaming-jelly-slice")?.mechanics.length).toBeGreaterThan(1);
  expect(scoreFor("hacksaw-gaming-jelly-slice")).toBeGreaterThan(6);
});
