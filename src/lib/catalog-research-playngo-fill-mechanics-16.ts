import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-19";

const records: Record<string, CatalogResearch> = {
  "playn-go-7-sins": {
    mechanics: ["Способы", "Sticky Symbols", "Расширяющиеся символы", "Множители", "Pick-and-click", "Instant Prizes"],
    source: "https://www.playngo.com/games/7-sins",
    verifiedAt,
    evidence: "Official game page describes a Sticky Expanded Sin on the middle reel during Free Spins, a multiplier rising from x1 to x7 and a Second Chance pick feature that can open Free Spins or award an instant prize.",
  },
  "playn-go-captain-xenos-earth-adventure": {
    mechanics: ["Способы", "Symbol Splitting"],
    source: "https://www.playngo.com/games/captain-xeno%27s-earth-adventure",
    verifiedAt,
    evidence: "Official game page explicitly says Dynamic Payways works by splitting symbols, creating up to 32,768 ways to win.",
  },
  "playn-go-dragon-maiden": {
    mechanics: ["Способы", "Респины", "Sticky Symbols", "Расширяющиеся барабаны"],
    source: "https://www.playngo.com/games/dragon-maiden",
    verifiedAt,
    evidence: "Official game page describes two Dragon Scatters freezing in place and triggering re-spins, while Dragon Scatters in Free Spins expand the reels up to 5x6.",
  },
  "playn-go-forge-of-gems": {
    mechanics: ["Способы", "Symbol Splitting", "Множители", "Stacked Wilds", "Instant Prizes"],
    source: "https://www.playngo.com/games/forge-of-gems",
    verifiedAt,
    evidence: "Official game page says Forge Reel symbols split symbols, award Universal Multipliers and create Stacked Wilds, while the Gem Box can award an Instant Prize.",
  },
  "playn-go-leprechauns-vault": {
    mechanics: ["Множители", "Sticky Wilds"],
    source: "https://www.playngo.com/games/leprechaun%27s-vault",
    verifiedAt,
    evidence: "Official game page says Wilds landing on the three golden middle reels during Free Spins become Sticky Wilds and remain for the rest of the feature, alongside Wild Multipliers.",
  },
  "playn-go-new-year-riches": {
    mechanics: ["Множители", "Респины", "Прогрессивные множители"],
    source: "https://www.playngo.com/games/new-year-riches",
    verifiedAt,
    evidence: "Official game page says Free Spins begin with an x2 Win Multiplier that adds another x2 on every subsequent spin until x20.",
  },
  "playn-go-raging-rex": {
    mechanics: ["Способы", "Stacked Wilds", "Walking Wilds", "Респины", "Множители"],
    source: "https://www.playngo.com/games/raging-rex",
    verifiedAt,
    evidence: "Official game page describes Rex becoming a Stacked Wild, stomping right-to-left across reels, awarding a free re-spin for each reel left behind, and Wild Hunt adding multipliers to Rex Wilds.",
  },
  "playn-go-kiss-reels-of-rock": {
    mechanics: ["Способы", "Random Wilds", "Множители", "Расширяющиеся барабаны"],
    source: "https://www.playngo.com/games/kiss-reels-of-rock",
    verifiedAt,
    evidence: "Official game page explicitly lists Random Wilds and Multipliers and says Encore Spins trigger an expanding grid that creates 4096 ways to win.",
  },
  "playn-go-merlins-grimoire": {
    mechanics: ["Способы", "Расширяющиеся символы", "Расширяющиеся барабаны"],
    source: "https://www.playngo.com/games/merlin%27s-grimoire",
    verifiedAt,
    evidence: "Official game page says the game focuses on the Expanding Symbol feature and expands from three reels in the base game to all five reels during Free Spins.",
  },
  "playn-go-madame-ink": {
    mechanics: ["Mystery Reels", "Расширяющиеся символы", "Трансформация символов", "Stacked Symbols"],
    source: "https://www.playngo.com/games/madame-ink",
    verifiedAt,
    evidence: "Official game page says Wild Ink can spread to fill a reel, while Madame's Mystery reveals a stack of matching high-paying symbols and transforms other high-paying symbols to match that stack.",
  },
  "playn-go-highway-legends": {
    mechanics: ["Сбор символов", "Stacked Wilds", "Sticky Wilds", "Респины"],
    source: "https://www.playngo.com/games/highway-legends",
    verifiedAt,
    evidence: "Official game page describes Money Bag cash-value collection, Rider Stacked Wilds, Bandit Sticky Wilds and a fifth-reel re-spin when two Scatters land.",
  },
  "playn-go-mystery-joker-6000": {
    mechanics: ["Линии", "Бонусное колесо", "Респины"],
    source: "https://www.playngo.com/games/mystery-joker-6000",
    verifiedAt,
    evidence: "Official game page says three Joker hats trigger the Mystery Wheel and two Joker hats can award a Free Re-Spin to complete the payline.",
  },
};

export function getCatalogResearchPlayngoFillMechanics16(slug: string) {
  return records[slug];
}
