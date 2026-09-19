import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-cat-wilde-and-the-incan-quest",
  "playn-go-gemix-100",
  "playn-go-hugo-legacy",
  "playn-go-legacy-of-undead-dragon-abyssways",
  "playn-go-nsync-pop",
  "playn-go-legacy-of-dynasties",
  "playn-go-gates-of-troy",
  "playn-go-merlin-journey-of-flame",
  "playn-go-merlin-realm-of-charm",
  "playn-go-mystery-egg-surprise",
  "playn-go-moon-princess",
  "playn-go-dio-killing-the-dragon",
  "playn-go-fulong-88",
  "playn-go-gold-of-fortune-god",
  "playn-go-playn-go-mole-digger",
  "playn-go-fire-toad-2",
  "playn-go-luchamigos",
  "playn-go-naughty-nicks-book",
  "playn-go-eye-of-atum",
  "playn-go-cash-a-cabana",
  "playn-go-cat-wilde-and-the-pyramids-of-dead",
  "playn-go-immortails-of-egypt",
  "playn-go-legend-of-the-ice-dragon",
  "playn-go-puebla-parade",
  "playn-go-forge-of-fortunes",
  "playn-go-primal-rampage",
  "playn-go-7-sins",
  "playn-go-captain-xenos-earth-adventure",
  "playn-go-dragon-maiden",
  "playn-go-forge-of-gems",
  "playn-go-leprechauns-vault",
  "playn-go-new-year-riches",
  "playn-go-raging-rex",
  "playn-go-kiss-reels-of-rock",
  "playn-go-merlins-grimoire",
  "playn-go-madame-ink",
  "playn-go-highway-legends",
  "playn-go-mystery-joker-6000",
  "playn-go-bull-in-a-china-shop",
  "playn-go-candy-island-princess",
  "playn-go-disco-diamonds",
  "playn-go-fox-mayhem",
  "playn-go-free-reelin-joker",
  "playn-go-gerards-gambit",
  "playn-go-house-of-doom-2-the-crypt",
  "playn-go-diamonds-of-the-realm",
  "playn-go-golden-ticket-2",
  "playn-go-fire-toad",
  "playn-go-demon",
  "playn-go-divine-showdown",
  "playn-go-annihilator",
  "playn-go-blinged",
  "playn-go-cops-n-robbers",
  "playn-go-coywolf-cash",
  "playn-go-crystal-sun",
  "playn-go-dawn-of-egypt",
  "playn-go-firefly-frenzy",
  "playn-go-fortunes-of-ali-baba",
  "playn-go-gold-king",
  "playn-go-helloween",
  "playn-go-feline-fury",
  "playn-go-hugo-carts",
  "playn-go-merlin-and-the-ice-queen-morgana",
  "playn-go-prism-of-gems",
  "playn-go-legion-gold-and-the-throne-of-dead",
  "playn-go-lordi-reel-monsters",
  "playn-go-love-joker",
  "playn-go-motley-crue",
  "playn-go-mahjong-88",
  "playn-go-octopus-treasure",
  "playn-go-piggy-bank-farm",
  "playn-go-mission-cash",
  "playn-go-planet-fortune",
  "playn-go-prosperity-palace",
  "playn-go-rainforest-magic",
] as const;

const representativeMechanics: Record<string, string[]> = {
  "playn-go-cat-wilde-and-the-incan-quest": ["Walking Wilds", "Jackpots"],
  "playn-go-legacy-of-undead-dragon-abyssways": ["Instant Prizes", "Sticky Wilds"],
  "playn-go-moon-princess": ["Удаление символов", "Wild Add"],
  "playn-go-gold-of-fortune-god": ["Hold N Spin", "Бонусное колесо"],
  "playn-go-luchamigos": ["Stacked Wilds", "Mega Symbols"],
  "playn-go-legend-of-the-ice-dragon": ["Sticky Frames", "Wild Add"],
  "playn-go-7-sins": ["Sticky Symbols", "Instant Prizes"],
  "playn-go-forge-of-gems": ["Symbol Splitting", "Stacked Wilds"],
  "playn-go-raging-rex": ["Walking Wilds", "Респины"],
  "playn-go-disco-diamonds": ["Прогрессивные множители", "Бонусное колесо"],
  "playn-go-house-of-doom-2-the-crypt": ["Расширяющиеся символы", "Трансформация символов"],
  "playn-go-golden-ticket-2": ["Mega Symbols", "Instant Prizes"],
  "playn-go-annihilator": ["Sticky Wilds", "Pick-and-click"],
  "playn-go-coywolf-cash": ["Wild Reels", "Stacked Wilds"],
  "playn-go-helloween": ["Walking Wilds", "Mega Symbols"],
  "playn-go-prism-of-gems": ["Symbol Splitting", "Прогрессивные множители"],
  "playn-go-piggy-bank-farm": ["Hold N Spin", "Mega Symbols"],
  "playn-go-planet-fortune": ["Walking Wilds", "Mega Symbols"],
};

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

test("Play’n GO waves 14-19 keep every enriched score-four card above the old floor", () => {
  expect(targets).toHaveLength(75);
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const slug of targets) {
    const seed = selected.get(slug);
    const research = getVerifiedCatalogResearch(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed?.provider, slug).toBe("Play’n GO");
    expect(research, slug).toBeTruthy();
    expect(research?.source, slug).toBe(seed?.source);
    expect(research?.verifiedAt, slug).toMatch(/^20\d{2}-\d{2}-\d{2}$/);
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(5);
  }
});

test("Play’n GO waves 14-19 retain representative official feature enrichment", () => {
  for (const [slug, mechanics] of Object.entries(representativeMechanics)) {
    const research = getVerifiedCatalogResearch(slug);
    for (const mechanic of mechanics) {
      expect(research?.mechanics, `${slug}: ${mechanic}`).toContain(mechanic);
    }
  }
});
