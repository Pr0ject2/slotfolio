import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedRtp = {
  "wazdan-16-coins-x5000": "96,17%",
  "wazdan-9-burning-stars": "96,14%",
  "wazdan-9-coins": "96,06%",
  "wazdan-bumba-meu-boi-coin": "96,14%",
  "wazdan-choco-reels": "96,22%",
  "wazdan-cube-mania": "96,43%",
  "wazdan-cube-mania-deluxe": "96,59%",
  "wazdan-football-mania": "96,59%",
  "wazdan-highway-to-hell": "96,18%",
  "wazdan-hot-party": "96,48%",
  "wazdan-jelly-reels": "96,22%",
  "wazdan-joker-explosion": "96,50%",
  "wazdan-kick-off": "96,42%",
  "wazdan-lucky-fish": "96,50%",
  "wazdan-power-of-gods-hades": "96,14%",
  "wazdan-space-gem": "96,40%",
  "wazdan-valentines-coins": "96,06%",
  "wazdan-vegas-hot": "96,05%",
  "wazdan-vegas-reels-ii": "96,16%",
} as const;

const expectedField: Partial<Record<keyof typeof expectedRtp, string>> = {
  "wazdan-9-burning-stars": "9 барабанов",
  "wazdan-football-mania": "9 барабанов",
  "wazdan-highway-to-hell": "5 барабанов · 5 линий",
  "wazdan-hot-party": "5 барабанов · 20 линий",
  "wazdan-joker-explosion": "4 барабана · 7 линий",
  "wazdan-power-of-gods-hades": "5 барабанов · 243 способа",
  "wazdan-space-gem": "6 барабанов · 10 линий",
  "wazdan-valentines-coins": "9 барабанов",
  "wazdan-vegas-hot": "3 барабана · 5 линий",
  "wazdan-vegas-reels-ii": "3 барабана · 1 линия",
};

const expectedReleaseDate: Partial<Record<keyof typeof expectedRtp, string>> = {
  "wazdan-16-coins-x5000": "2025-10-09",
  "wazdan-9-coins": "2022-07-07",
  "wazdan-bumba-meu-boi-coin": "2026-01-29",
  "wazdan-kick-off": "2016-06-03",
  "wazdan-valentines-coins": "2026-02-03",
};

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("provider-wide Wazdan pass preserves the facts that moved all nineteen cards to at least score 3", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(Object.keys(expectedRtp)).toHaveLength(19);

  for (const [slug, rtp] of Object.entries(expectedRtp) as [keyof typeof expectedRtp, string][]) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Wazdan");
    expect(seed!.source, slug).toBe(`https://wazdan.com/games/${slug.replace("wazdan-", "")}`);

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.rtp, slug).toBe(rtp);
    expect(details?.source, slug).toBe(seed!.source);
    expect(details?.verifiedAt, slug).toBe("2026-09-16");

    if (expectedField[slug]) expect(details?.field, slug).toBe(expectedField[slug]);
    if (expectedReleaseDate[slug]) expect(details?.releaseDate, slug).toBe(expectedReleaseDate[slug]);

    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(3);
  }
});
