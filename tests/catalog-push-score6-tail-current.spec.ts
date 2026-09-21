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

const newlyClassified = [
  "push-gaming-10-santas-reindeers",
  "push-gaming-3-liberty-eagles",
  "push-gaming-bait-n-bank",
  "push-gaming-diamond-supernova-100",
  "push-gaming-diamond-supernova-20",
  "push-gaming-diamond-supernova-40",
  "push-gaming-diamond-supernova-5",
  "push-gaming-dino-p-d",
  "push-gaming-fat-banker",
  "push-gaming-fish-n-nudge-big-catch",
  "push-gaming-jiggys-pot-o-gold",
  "push-gaming-masked-mayhem",
  "push-gaming-santa-hopper",
  "push-gaming-tarot-treasures",
] as const;

const expectedScoreSix = [
  "push-gaming-big-bamboo-2",
  "push-gaming-fang-city",
  "push-gaming-happy-bamboo",
  "push-gaming-henry-the-ape",
  "push-gaming-mad-blast",
  "push-gaming-razor-shark-jackpots",
  "push-gaming-red-hot-multipliers",
  "push-gaming-regal-knights",
  "push-gaming-the-great-banker",
] as const;

test("Push Gaming score-six tail drops from 28 to nine remaining evidence gaps", () => {
  const scoreSix = catalogSeeds
    .filter((seed) => seed.provider === "Push Gaming" && scoreFor(seed.slug) === 6)
    .map((seed) => seed.slug)
    .sort();

  expect(scoreSix).toEqual([...expectedScoreSix].sort());
});

test("official Push game pages classify the fourteen promoted score-six records as slots", () => {
  for (const slug of newlyClassified) {
    const type = getVerifiedCatalogGameType(slug);
    expect(type?.gameType, slug).toBe("Slots");
    expect(type?.source, slug).toContain("pushgaming.com/");
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(7);
  }
});

test("five direct Push facts close another five score-six gaps", () => {
  expect(getVerifiedCatalogDetails("push-gaming-10-cash-bisons")?.releaseDate).toBe("2025-08");
  expect(getVerifiedCatalogDetails("push-gaming-bison-battle")?.field).toBe("5 барабанов");
  expect(getVerifiedCatalogDetails("push-gaming-blaze-of-ra")?.releaseDate).toBe("2018-05-22");
  expect(getVerifiedCatalogDetails("push-gaming-olympus-unleashed")?.field).toBe("5 рядов");
  expect(getVerifiedCatalogDetails("push-gaming-the-grand-show")?.field).toBe("Бонус: 5×8");

  for (const slug of [
    "push-gaming-10-cash-bisons",
    "push-gaming-bison-battle",
    "push-gaming-blaze-of-ra",
    "push-gaming-olympus-unleashed",
    "push-gaming-the-grand-show",
  ]) {
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(7);
  }
});
