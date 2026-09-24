import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-24";

const records: Record<string, CatalogResearch> = {
  "hacksaw-gaming-epic-ze-zeus": {
    mechanics: ["Divine Squares", "Множители", "Сбор символов"],
    source: "https://www.hacksawgaming.com/games/epic-ze-zeus",
    verifiedAt,
    evidence: "Official feature rules describe Divine Squares, Zap of Zeus multipliers up to x10 and Vessel of Wealth symbols that collect Coin and Vessel values.",
  },
  "hacksaw-gaming-great-game-rockies": {
    mechanics: ["Hunting Season", "Трансформация символов", "Сбор символов", "Множители"],
    source: "https://www.hacksawgaming.com/games/great-game-rockies",
    verifiedAt,
    evidence: "Official Hunting Season rules transform Animal symbols into Coins or Traps, Traps collect values, and hit Wilds apply multipliers to Coins or Traps.",
  },
  "hacksaw-gaming-jelly-slice": {
    mechanics: ["Slicer", "Razor-Sharp Bonus"],
    source: "https://www.hacksawgaming.com/games/jelly-slice",
    verifiedAt,
    evidence: "Official feature rules name the Slicer mechanic and Razor-Sharp Bonus, where slicers split symbols and FS scatters award the bonus and extra free spins.",
  },
  "hacksaw-gaming-le-hooligan": {
    mechanics: ["Highlighted Wins", "Трансформация символов", "Сбор символов"],
    source: "https://www.hacksawgaming.com/games/le-hooligan",
    verifiedAt,
    evidence: "Official Highlighted Wins rules turn winning positions into Golden Squares; Rainbow symbols reveal Coins, Clovers and Buckets, with Buckets collecting rewards.",
  },
  "hacksaw-gaming-le-sortudo": {
    mechanics: ["Hold & Win", "Rainbow Fortune Hold & Win", "Rainbow Epic Drop™ Hold & Win"],
    source: "https://www.hacksawgaming.com/games/le-sortudo",
    verifiedAt,
    evidence: "Official feature rules name two Hold & Win games: Rainbow Fortune Hold & Win and Rainbow Epic Drop™ Hold & Win.",
  },
  "hacksaw-gaming-supreme-zeus": {
    mechanics: ["CoinWays™", "Сбор символов"],
    source: "https://www.hacksawgaming.com/games/supreme-zeus",
    verifiedAt,
    evidence: "Official CoinWays™ rules describe Coin formations and a Coin Bar that accumulates Coin values when CoinWays™ activate.",
  },
  "push-gaming-red-hot-multipliers": {
    mechanics: ["Hot Multipliers"],
    source: "https://www.pushgaming.com/games/red-hot-multipliers.html",
    verifiedAt,
    evidence: "Official Hot Multipliers rules state that up to three random symbols can receive 2x, 3x, 5x, 10x or 20x multipliers on each spin.",
  },
};

export function getCatalogResearchLowScoreFinal20260924(slug: string) {
  return records[slug];
}
