import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return (
    (details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0) +
    (type ? 1 : 0) +
    (research?.mechanics.length ?? 0)
  );
}

const wazdanTargets: Record<string, string> = {
  "wazdan-arcade": "https://wazdan.com/games/arcade",
  "wazdan-back-to-the-70s": "https://wazdan.com/games/back-to-the-70s",
  "wazdan-black-hawk": "https://wazdan.com/games/black-hawk",
  "wazdan-black-horse-cash-out-edition": "https://wazdan.com/games/black-horse-cash-out-edition",
  "wazdan-fenix-play-27": "https://wazdan.com/games/fenix-play-27",
  "wazdan-hot-777": "https://wazdan.com/games/hot-777",
  "wazdan-relic-hunters-and-the-book-of-faith": "https://wazdan.com/games/relic-hunters-and-the-book-of-faith",
  "wazdan-turbo-play": "https://wazdan.com/games/turbo-play",
};

const hacksawAdditions: Record<string, string[]> = {
  "hacksaw-gaming-3-cursed-chests-hold-and-win": ["Hold & Win", "Sticky Coins"],
  "hacksaw-gaming-arizona-james-and-the-lost-relics": ["Pistol Reveals", "Gamble"],
  "hacksaw-gaming-beam-boys": ["Volatility Switch", "Wild Rows"],
  "hacksaw-gaming-beast-below": ["Persistent Wilds"],
  "hacksaw-gaming-bouncy-bombs": ["Прогрессивные множители"],
  "hacksaw-gaming-danny-dollar": ["Прогрессивные множители"],
  "hacksaw-gaming-donny-dough": ["Sticky Symbols", "Респины"],
  "hacksaw-gaming-grug-make-fire": ["Прогрессивные множители"],
  "hacksaw-gaming-hot-ross": ["Activated Reels"],
  "hacksaw-gaming-jaws-of-justice": ["Force Fields"],
  "hacksaw-gaming-jelly-slice": ["Slicer Mechanic"],
  "hacksaw-gaming-keepem": ["Sticky Symbols"],
  "hacksaw-gaming-le-fisherman": ["Множители"],
  "hacksaw-gaming-le-pharaoh": ["Instant Prizes"],
  "hacksaw-gaming-le-viking": ["Instant Prizes"],
  "hacksaw-gaming-mayan-stackways": ["Stackways™"],
  "hacksaw-gaming-munchy-milo": ["Sticky Wilds", "Chain Reaction"],
  "hacksaw-gaming-rainbow-princess": ["Sticky Symbols", "Прогрессивные множители"],
  "hacksaw-gaming-red-rascal": ["Colossal Symbols"],
  "hacksaw-gaming-reign-of-rome": ["Сбор символов"],
  "hacksaw-gaming-ronin-stackways": ["Stackways™"],
  "hacksaw-gaming-sand-and-ashes": ["Persistent Wilds"],
  "hacksaw-gaming-slayers-inc": ["DuelReels™", "Slicer Mechanic"],
  "hacksaw-gaming-spinman": ["Instant Prizes"],
  "hacksaw-gaming-steamrunners": ["Sticky Wilds"],
  "hacksaw-gaming-sun-princess": ["Sticky Wilds", "Chain Reaction"],
  "hacksaw-gaming-the-count": ["Трансформация символов"],
  "hacksaw-gaming-the-wildwood-curse": ["Sticky Wilds"],
  "hacksaw-gaming-toshi-ways-club": ["Slicer Mechanic"],
  "hacksaw-gaming-twisted-lab": ["RotoGrid™", "Sticky Symbols"],
  "hacksaw-gaming-zeus-ze-zecond": ["Instant Prizes", "Sticky Symbols"],
};

test("Wazdan score-five tail preserves official slot classification and moves above score five", () => {
  expect(Object.keys(wazdanTargets)).toHaveLength(8);
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const [slug, source] of Object.entries(wazdanTargets)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed?.provider, slug).toBe("Wazdan");
    const type = getVerifiedCatalogGameType(slug);
    expect(type?.gameType, slug).toBe("Slots");
    expect(type?.source, slug).toBe(source);
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(6);
  }
});

test("Hacksaw score-five provider pass keeps official additions additive and above score five", () => {
  expect(Object.keys(hacksawAdditions)).toHaveLength(31);
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const [slug, additions] of Object.entries(hacksawAdditions)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed?.provider, slug).toBe("Hacksaw Gaming");

    const research = getVerifiedCatalogResearch(slug);
    expect(research, slug).toBeTruthy();
    expect(research?.source, slug).toBe(seed?.source);
    expect(research?.evidence, slug).toBeTruthy();
    for (const mechanic of additions) {
      expect(research?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    }
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(6);
  }
});
