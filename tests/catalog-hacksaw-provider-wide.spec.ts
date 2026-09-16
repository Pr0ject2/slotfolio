import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedMechanics = {
  "hacksaw-gaming-aiko-and-the-wind-spirit": "Expanded Wild Spirits",
  "hacksaw-gaming-chaos-crew-3": "EPIC DROP™",
  "hacksaw-gaming-circle-of-life": "Tree of Life Respins",
  "hacksaw-gaming-dandy-diamonds": "Dandy Respins",
  "hacksaw-gaming-dorks-of-the-deep": "Expanding Wild Reels",
  "hacksaw-gaming-duel-at-dawn": "DuelReels™",
  "hacksaw-gaming-dynasty-of-death": "DuelReels™",
  "hacksaw-gaming-epic-bullets-and-bounty": "DuelReels™",
  "hacksaw-gaming-eternal-duel": "DuelReels™",
  "hacksaw-gaming-freds-food-truck": "Global Multiplier",
  "hacksaw-gaming-hot-ross": "Expanding Wild Reels",
  "hacksaw-gaming-jaws-of-justice": "Laser Sharks",
  "hacksaw-gaming-phoenix-duelreels": "DuelReels™",
  "hacksaw-gaming-sixsixsix": "Wicked Wheels",
  "hacksaw-gaming-spinman": "Justice Reels",
  "hacksaw-gaming-the-count": "Expanded Bloody Wilds",
  "hacksaw-gaming-wings-of-horus": "Orb Transformations",
} as const;

const targetSlugs = new Set(Object.keys(expectedMechanics));

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("provider-wide Hacksaw pass enriches all seventeen remaining thin cards from official feature rules", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(17);
  expect(catalogSeeds).toHaveLength(900);

  for (const [slug, mechanic] of Object.entries(expectedMechanics)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Hacksaw Gaming");
    expect(seed!.source, slug).toBe(`https://www.hacksawgaming.com/games/${slug.replace("hacksaw-gaming-", "")}`);

    const research = getVerifiedCatalogResearch(slug);
    expect(research, slug).toBeTruthy();
    expect(research?.source, slug).toBe(seed!.source);
    expect(research?.verifiedAt, slug).toBe("2026-09-16");
    expect(research?.mechanics, slug).toEqual([mechanic]);
    expect(research?.evidence, slug).toBeTruthy();

    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Slots");
    expect(getVerifiedCatalogDetails(slug), `${slug} must not invent technical passport values`).toBeUndefined();
    expect(scoreFor(slug), `${slug} must leave score<=1 using one exact official feature fact`).toBe(2);
  }

  const ranked = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));

  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(5);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(114);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(489);
  expect(ranked.filter((row) => row.provider === "Hacksaw Gaming" && row.score <= 1)).toHaveLength(0);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
});
