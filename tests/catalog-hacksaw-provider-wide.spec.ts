import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
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

test("provider-wide Hacksaw pass preserves all seventeen official feature facts", () => {
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
    expect(research?.mechanics, slug).toContain(mechanic);
    expect(research?.evidence, slug).toBeTruthy();

    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Slots");
  }
});
