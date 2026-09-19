import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-19";

const records: Record<string, CatalogResearch> = {
  "playn-go-merlin-and-the-ice-queen-morgana": {
    mechanics: ["Линии", "Расширяющиеся символы", "Множители", "Stacked Wilds"],
    source: "https://www.playngo.com/games/merlin-and-the-ice-queen-morgana",
    verifiedAt,
    evidence: "Official game page describes an Expanding Wild Multiplier, a Special Expanding Symbol for Free Spins and Morgana as a Special Wild that can land fully stacked and activate the Multiplier.",
  },
  "playn-go-prism-of-gems": {
    mechanics: ["Способы", "Каскады", "Symbol Splitting", "Прогрессивные множители"],
    source: "https://www.playngo.com/games/prism-of-gems",
    verifiedAt,
    evidence: "Official page describes cascading wins, Dynamic Payways symbol splitting and reel multipliers that increase up to x7 through cascades, carry into Free Spins and keep building progressively.",
  },
  "playn-go-legion-gold-and-the-throne-of-dead": {
    mechanics: ["Сбор символов", "Респины", "Pick-and-click", "Instant Prizes", "Mega Symbols"],
    source: "https://www.playngo.com/games/legion-gold-and-the-throne-of-dead",
    verifiedAt,
    evidence: "Official game page describes Coin Chest collection opening a Picker Game with matching Coins for an Instant Prize and Mega Spins where a Mega Symbol lands on every spin.",
  },
  "playn-go-lordi-reel-monsters": {
    mechanics: ["Pick-and-click", "Каскады"],
    source: "https://www.playngo.com/games/lordi-reel-monsters",
    verifiedAt,
    evidence: "Official game page describes a 7x7 grid where matching symbols are destroyed and the Free Spins feature uses a pick-and-click choice between two Lordi songs.",
  },
  "playn-go-love-joker": {
    mechanics: ["Сбор символов", "Респины", "Прогрессивные множители"],
    source: "https://www.playngo.com/games/love-joker",
    verifiedAt,
    evidence: "Official game page describes Love Re-Spins plus Heart collection where five Hearts increase the Multiplier and Golden Hearts double it, with potential progression up to x10000.",
  },
  "playn-go-motley-crue": {
    mechanics: ["Множители", "Stacked Wilds", "Wild Add"],
    source: "https://www.playngo.com/games/m%C3%B6tley-cr%C3%BCe",
    verifiedAt,
    evidence: "Official page says Wild Side uses Stacked Wilds, Kickstart My Heart randomly multiplies Wild Side wins and Live Wire randomly adds Wilds to the reels.",
  },
  "playn-go-mahjong-88": {
    mechanics: ["Кластеры", "Wild Add", "Удаление символов", "Sticky Wilds"],
    source: "https://www.playngo.com/games/mahjong-88",
    verifiedAt,
    evidence: "Official page describes Spring Wilds added randomly, Summer and Autumn Wilds destroying symbols and Winter Wilds staying sticky when they form part of a winning cluster.",
  },
  "playn-go-octopus-treasure": {
    mechanics: ["Линии", "Pick-and-click", "Трансформация символов", "Instant Prizes", "Wild Reels", "Респины"],
    source: "https://www.playngo.com/games/octopus-treasure",
    verifiedAt,
    evidence: "Official page describes coin and pot picks, symbol-to-Wild transformations, direct Instant Prizes, whole reels transformed Wild and Key Re-Spins that add more spins when Keys land.",
  },
  "playn-go-piggy-bank-farm": {
    mechanics: ["Линии", "Hold N Spin", "Sticky Symbols", "Mega Symbols", "Множители"],
    source: "https://www.playngo.com/games/piggy-bank-farm",
    verifiedAt,
    evidence: "Official page describes Piggy Bank Spins starting with three lives, landed Piggy Banks held sticky and merging into Mega Symbols up to 5x4, with Hammer multipliers up to x10 in Free Spins.",
  },
  "playn-go-mission-cash": {
    mechanics: ["Линии", "Расширяющиеся символы", "Sticky Wilds", "Респины"],
    source: "https://www.playngo.com/games/mission-cash",
    verifiedAt,
    evidence: "Official page says Take the Shot expands targeted agents to fill a reel, holds them as Wilds while the other reels re-spin and can retrigger until all reels are filled with Expanded Wilds.",
  },
  "playn-go-planet-fortune": {
    mechanics: ["Линии", "Mega Symbols", "Sticky Wilds", "Walking Wilds"],
    source: "https://www.playngo.com/games/planet-fortune",
    verifiedAt,
    evidence: "Official game page and release describe Magnetic Mayhem with 2x2/3x3 Mega Symbols and Free Spins where Wild Robots become sticky and walk left-to-right across the grid.",
  },
  "playn-go-prosperity-palace": {
    mechanics: ["Линии", "Gamble"],
    source: "https://www.playngo.com/games/prosperity-palace",
    verifiedAt,
    evidence: "Official game page explicitly offers an optional Gamble round that multiplies the prize when the player correctly guesses the colour or suit of a hidden card.",
  },
  "playn-go-rainforest-magic": {
    mechanics: ["Линии", "Mystery Symbols", "Mystery Reels", "Pick-and-click"],
    source: "https://www.playngo.com/games/rainforest-magic",
    verifiedAt,
    evidence: "Official page describes matching Mystery Symbols, Free Spins with stacks of Mystery Symbols as Mystery Reels and a four-flower pick that determines how many Mystery Reels are active.",
  },
};

export function getCatalogResearchPlayngoFillMechanics19(slug: string) {
  return records[slug];
}
