import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const expectedMechanics = {
  "hacksaw-gaming-cloud-princess": ["Каскады", "Multiplier Symbols"],
  "hacksaw-gaming-donny-and-danny": ["Линии", "Dollar-Reels"],
  "hacksaw-gaming-donut-division": ["Линии", "Gooey Guns and Gooey Wilds"],
  "hacksaw-gaming-dorks-of-the-deep": ["Expanding Wild Reels", "Last Chance"],
  "hacksaw-gaming-dragons-domain": ["Каскады", "Dragonfire"],
  "hacksaw-gaming-duel-at-dawn": ["DuelReels™", "The Outlaw Feature"],
  "hacksaw-gaming-fire-my-laser": ["Каскады", "Bombs Away"],
  "hacksaw-gaming-frkn-bananas": ["Линии", "Banana Spread"],
  "hacksaw-gaming-hounds-of-hell": ["Каскады", "Hellhounds"],
  "hacksaw-gaming-le-pharaoh": ["Сбор символов", "Sticky Re-drops"],
  "hacksaw-gaming-le-viking": ["Сбор символов", "Raid Spins"],
  "hacksaw-gaming-marlin-masters": ["Сбор символов", "Marlin Progress Bar"],
  "hacksaw-gaming-octo-attack": ["Каскады", "Tenta-Grab"],
  "hacksaw-gaming-phoenix-duelreels": ["DuelReels™", "Resurrection Spins"],
  "hacksaw-gaming-reign-of-rome": ["Линии", "Tribute Symbols"],
  "hacksaw-gaming-strength-of-hercules": ["Сбор символов", "RotoGrid™"],
  "hacksaw-gaming-wings-of-horus": ["Orb Transformations", "Sacred Scripture"],
  "hacksaw-gaming-bash-bros": ["Cash Stacks"],
  "hacksaw-gaming-booze-bash": ["Match-2-Win"],
  "hacksaw-gaming-tiger-legends": ["Expanding Legendary Frame Warriors"],
} as const;

const fieldOnly = {
  "hacksaw-gaming-bash-bros": "6 барабанов",
  "hacksaw-gaming-booze-bash": "6 барабанов",
  "hacksaw-gaming-tiger-legends": "5×4",
} as const;

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("final Hacksaw provider tail moves every remaining score-2 record to score 3 from exact official features", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(Object.keys(expectedMechanics)).toHaveLength(20);

  for (const [slug, mechanics] of Object.entries(expectedMechanics)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Hacksaw Gaming");

    const research = getVerifiedCatalogResearch(slug);
    expect(research, slug).toBeTruthy();
    expect(research?.source, slug).toBe(seed!.source);
    expect(research?.verifiedAt, slug).toBe("2026-09-16");
    expect(research?.mechanics, slug).toEqual(mechanics);
    expect(research?.evidence, slug).toBeTruthy();
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Slots");

    const details = getVerifiedCatalogDetails(slug);
    if (slug in fieldOnly) {
      const expectedField = fieldOnly[slug as keyof typeof fieldOnly];
      expect(details?.field, slug).toBe(expectedField);
      expect(details?.source, slug).toBe(seed!.source);
      expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
      expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
      expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();
      expect(details?.releaseDate, `${slug} must not invent a release date`).toBeUndefined();
    } else {
      expect(details, `${slug} must remain free of unverified technical passport values`).toBeUndefined();
    }

    expect(scoreFor(slug), `${slug} must finish at score 3`).toBe(3);
  }
});
