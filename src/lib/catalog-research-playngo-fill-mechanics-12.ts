import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-19";

const records: Record<string, CatalogResearch> = {
  "playn-go-24k-dragon": {
    mechanics: ["Способы", "Множители", "Респины", "Расширяющиеся барабаны"],
    source: "https://www.playngo.com/games/24k-dragon",
    verifiedAt,
    evidence: "Official game page describes 1024 ways, x2/x4 Multiplier Wilds, a Golden Dragon Head respin and expanding reel heights that can raise the game to 8192 ways during Free Spins.",
  },
  "playn-go-3-clown-monty-ii": {
    mechanics: ["Линии", "Множители", "Walking Wilds", "Pick-and-click"],
    source: "https://www.playngo.com/games/3-clown-monty-ii",
    verifiedAt,
    evidence: "Official game page describes 20 paylines, x2/x3/x5 Multiplier Wilds, guaranteed Walking Wilds during Free Spins and the Bonus Prize Pick feature.",
  },
  "playn-go-ankh-of-anubis": {
    mechanics: ["Способы", "Random Wilds", "Сбор символов"],
    source: "https://www.playngo.com/games/ankh-of-anubis",
    verifiedAt,
    evidence: "Official game page describes 576 payways, randomly triggered Anubis Wilds and Ankh collection during Free Spins that triggers additional Anubis Wilds.",
  },
  "playn-go-bakers-treat": {
    mechanics: ["Сбор символов", "Wild Reels", "Mini-games"],
    source: "https://www.playngo.com/games/baker%27s-treat",
    verifiedAt,
    evidence: "Official game page describes collecting treat tokens to unlock Flour Power features including extra Wilds and fully Wild reels, plus the Bake-Off feature chaining all five Flour Power effects.",
  },
  "playn-go-beasts-of-fire": {
    mechanics: ["Способы", "Расширяющиеся барабаны", "Stacked Symbols"],
    source: "https://www.playngo.com/games/beasts-of-fire",
    verifiedAt,
    evidence: "Official game and release pages describe Buffalo Stacks and an expanding-reel Dynamic Payways feature that can create up to 12,348 ways to win.",
  },
  "playn-go-big-win-cat": {
    mechanics: ["Бонусное колесо", "Респины", "Множители"],
    source: "https://www.playngo.com/games/big-win-cat",
    verifiedAt,
    evidence: "Official game page describes Free Re-Spins when matching symbols cover two reels and the Wheel of Multipliers awarding up to x10 on a full-house grid.",
  },
  "playn-go-blazin-bullfrog": {
    mechanics: ["Способы", "Респины", "Расширяющиеся символы", "Sticky Wilds"],
    source: "https://www.playngo.com/games/blazin%27-bullfrog",
    verifiedAt,
    evidence: "Official page describes a 243-payway game where a Scatter triggers Blazin’ Re-Spin, turns into an expanding Wild Scatter and remains sticky for the feature.",
  },
  "playn-go-buildin-bucks": {
    mechanics: ["Способы", "Бонусное колесо", "Instant Prizes", "Сбор символов"],
    source: "https://www.playngo.com/games/buildin%27-bucks",
    verifiedAt,
    evidence: "Official game page describes the Feature Wheel, Minor/Major/Grand Instant Prizes and Hard Hat/Frame collection and upgrades that convert to prize-bearing houses at the end of Free Spins.",
  },
  "playn-go-contact": {
    mechanics: ["Кластеры", "Множители", "Удаление символов", "Трансформация символов"],
    source: "https://www.playngo.com/games/contact",
    verifiedAt,
    evidence: "Official game page describes 5x7 cluster wins plus multiplier blocks, Block Destroyer removing multiplier blocks and Symbol Upgrade transforming winning clusters into higher-value symbols.",
  },
  "playn-go-honey-rush-100": {
    mechanics: ["Кластеры", "Random Wilds", "Sticky Wilds", "Сбор символов", "Множители"],
    source: "https://www.playngo.com/games/honey-rush-100",
    verifiedAt,
    evidence: "Official page describes cluster wins on the hexagonal grid, Random Wilds, Sticky Wilds, Overcharge symbol collection and multiple ways to increase the Honey Pot multiplier.",
  },
};

export function getCatalogResearchPlayngoFillMechanics12(slug: string) {
  return records[slug];
}
