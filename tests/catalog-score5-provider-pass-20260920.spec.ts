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

const playngoTargets = [
  "playn-go-count-jokula",
  "playn-go-derby-wheel",
  "playn-go-grannys-wild",
  "playn-go-jewel-box",
  "playn-go-jolly-roger-wild-kraken",
  "playn-go-legacy-of-inca",
  "playn-go-legion-gold",
  "playn-go-legion-gold-reckoning",
  "playn-go-myth",
  "playn-go-new-year-riches",
  "playn-go-pandoras-box-of-evil",
  "playn-go-pilgrim-of-dead",
  "playn-go-rage-to-riches",
  "playn-go-rally-4-riches",
  "playn-go-piggy-blitz",
  "playn-go-lab-of-madness-its-a-wild",
  "playn-go-playn-go-mole-digger",
  "playn-go-playn-go-buffalo-of-wealth",
  "playn-go-playn-go-wrappin-gold",
  "playn-go-primal-rampage",
  "playn-go-raging-rex-2",
  "playn-go-rabbit-hole-riches-court-of-hearts",
  "playn-go-pandastic-adventure",
  "playn-go-piggy-blitz-disco-gold",
  "playn-go-beasts-of-fire-maximum",
  "playn-go-bullion-xpress",
  "playn-go-gigantoonz",
  "playn-go-lordi-reel-monsters",
  "playn-go-love-is-in-the-fair",
  "playn-go-ace-of-spades",
  "playn-go-fire-toad-2",
  "playn-go-gold-trophy-2",
  "playn-go-journey-to-paris",
  "playn-go-legion-gold-victory",
  "playn-go-leprechauns-diamond-dig",
  "playn-go-leprechauns-vault",
  "playn-go-lion-saga-odyssey",
  "playn-go-lucky-diamonds",
  "playn-go-merry-xmas",
  "playn-go-miner-donkey-trouble",
  "playn-go-moon-princess-power-of-love",
  "playn-go-pack-and-cash",
  "playn-go-pearl-lagoon",
  "playn-go-pimped",
  "playn-go-prosperity-palace",
  "playn-go-ras-reckoning",
] as const;

const hacksawTargets = [
  "hacksaw-gaming-army-of-ares",
  "hacksaw-gaming-chaos-crew-3",
  "hacksaw-gaming-deal-with-death",
  "hacksaw-gaming-dynasty-of-death",
  "hacksaw-gaming-epic-bullets-and-bounty",
  "hacksaw-gaming-eternal-duel",
  "hacksaw-gaming-freds-food-truck",
  "hacksaw-gaming-superstar-sevens",
  "hacksaw-gaming-dorks-of-the-deep",
  "hacksaw-gaming-strength-of-hercules",
  "hacksaw-gaming-duel-at-dawn",
  "hacksaw-gaming-frkn-bananas",
  "hacksaw-gaming-octo-attack",
  "hacksaw-gaming-phoenix-duelreels",
  "hacksaw-gaming-hounds-of-hell",
  "hacksaw-gaming-bash-bros",
  "hacksaw-gaming-booze-bash",
  "hacksaw-gaming-cloud-princess",
  "hacksaw-gaming-cursed-crypt",
  "hacksaw-gaming-dawn-of-kings",
  "hacksaw-gaming-get-the-cheese",
  "hacksaw-gaming-marlin-masters",
  "hacksaw-gaming-pray-for-six",
  "hacksaw-gaming-pray-for-three",
  "hacksaw-gaming-shaolin-master",
  "hacksaw-gaming-sixsixsix",
  "hacksaw-gaming-smoking-dragon",
  "hacksaw-gaming-tiger-legends",
  "hacksaw-gaming-wings-of-horus",
  "hacksaw-gaming-wishbringer",
] as const;

const smallTailTargets = [
  "bgaming-cats-love-yummy",
  "bgaming-money-maker",
  "endorphina-3-golden-chests",
  "endorphina-burning-coins-20-dice",
  "endorphina-fortune-chests-dice",
] as const;

test("2026-09-20 provider passes keep every explicitly enriched score-five target above score five", () => {
  const selected = new Set(catalogSeeds.map((seed) => seed.slug));
  const targets = [...playngoTargets, ...hacksawTargets, ...smallTailTargets];

  expect(new Set(targets).size).toBe(targets.length);
  for (const slug of targets) {
    expect(selected.has(slug), slug).toBe(true);
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(6);
  }
});

test("Play’n GO score-five pass preserves exact newly verified technical wins and representative features", () => {
  expect(getVerifiedCatalogDetails("playn-go-raging-rex-2")?.maxWin).toBe("30 000x");
  expect(getVerifiedCatalogDetails("playn-go-forge-of-fortunes")?.maxWin).toBe("2500x");
  expect(getVerifiedCatalogDetails("playn-go-lordi-reel-monsters")?.maxWin).toBe("4000x");

  expect(getVerifiedCatalogResearch("playn-go-rally-4-riches")?.mechanics).toEqual(
    expect.arrayContaining(["Free Spins", "Win Spins™", "Jackpots", "Gamble"]),
  );
  expect(getVerifiedCatalogResearch("playn-go-pack-and-cash")?.mechanics).toEqual(
    expect.arrayContaining(["Mystery Symbols", "Free Spins", "Прогрессивные множители"]),
  );
  expect(getVerifiedCatalogResearch("playn-go-ras-reckoning")?.mechanics).toEqual(
    expect.arrayContaining(["Free Spins", "Persistent Frames"]),
  );
});

test("Hacksaw and small-provider tails retain their official feature evidence", () => {
  expect(getVerifiedCatalogResearch("hacksaw-gaming-deal-with-death")?.mechanics).toEqual(
    expect.arrayContaining(["Poker Mode", "Free Spins"]),
  );
  expect(getVerifiedCatalogResearch("hacksaw-gaming-pray-for-six")?.mechanics).toEqual(
    expect.arrayContaining(["Free Spins", "Instant Prizes"]),
  );
  expect(getVerifiedCatalogResearch("bgaming-cats-love-yummy")?.mechanics).toEqual(
    expect.arrayContaining(["Wilds", "Free Spins", "Jackpots"]),
  );
  expect(getVerifiedCatalogResearch("bgaming-money-maker")?.mechanics).toContain("Gamble");
  expect(getVerifiedCatalogResearch("endorphina-burning-coins-20-dice")?.mechanics).toEqual(
    expect.arrayContaining(["Wilds", "Hold & Win", "Jackpots"]),
  );
  expect(getVerifiedCatalogResearch("endorphina-fortune-chests-dice")?.mechanics).toEqual(
    expect.arrayContaining(["Hold & Win", "Pick Game", "Jackpots"]),
  );
});
