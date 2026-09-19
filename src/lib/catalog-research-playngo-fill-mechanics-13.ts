import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-19";

const records: Record<string, CatalogResearch> = {
  "playn-go-15-crystal-roses-a-tale-of-love": {
    mechanics: ["Сбор символов", "Stacked Scatters", "Множители"],
    source: "https://www.playngo.com/games/15-crystal-roses%3A-a-tale-of-love",
    verifiedAt,
    evidence: "Official game page describes collecting Crystal Roses through the Quest Map, rose Scatters stacked three symbols high and Multiplier Wilds with x2, x3, x5, x10 or x100 values.",
  },
  "playn-go-ace-of-spades": {
    mechanics: ["Линии", "Множители"],
    source: "https://www.playngo.com/games/ace-of-spades",
    verifiedAt,
    evidence: "Official game page states that the Wild Ace substitutes for symbols and doubles a win, while two Wild Aces in one winning combination quadruple it.",
  },
  "playn-go-aztec-warrior-princess": {
    mechanics: ["Линии", "Sticky Wilds", "Pick-and-click"],
    source: "https://www.playngo.com/games/aztec-warrior-princess",
    verifiedAt,
    evidence: "Official game page describes the Princess becoming Wild and staying Wild during Free Spins and a temple bonus where the player selects artefacts for prizes.",
  },
  "playn-go-battle-royal": {
    mechanics: ["Pick-and-click", "Sticky Wilds", "Трансформация символов", "Множители"],
    source: "https://www.playngo.com/games/battle-royal",
    verifiedAt,
    evidence: "Official game page describes player selection, eliminated wives becoming Wild for the rest of Free Spins, treasure-chest picks and a win multiplier in the feature flow.",
  },
  "playn-go-big-win-777": {
    mechanics: ["Линии", "Бонусное колесо", "Instant Prizes", "Sticky Wilds", "Gamble"],
    source: "https://www.playngo.com/games/big-win-777",
    verifiedAt,
    evidence: "Official game page describes the Chance Wheel, Instant Prizes, Sticky Wilds during Free Spins and the optional Gamble feature.",
  },
  "playn-go-cash-pump": {
    mechanics: ["Линии", "Stacked Wilds", "Множители", "Сбор символов"],
    source: "https://www.playngo.com/games/cash-pump",
    verifiedAt,
    evidence: "Official game page describes Stacked Wilds duplicated across play areas, x1-x4 multipliers that grow in Free Spins and Scatter collection that extends spins and increases multipliers.",
  },
  "playn-go-cash-vandal": {
    mechanics: ["Линии", "Респины", "Wild Reels", "Mega Symbols", "Random Wilds", "Mystery Symbols", "Stacked Wilds"],
    source: "https://www.playngo.com/games/cash-vandal",
    verifiedAt,
    evidence: "Official game page describes Re-Spins, a Wild reel, 2x2 Mega Symbols, Random Wilds, Mystery Symbols and stacked Wilds during Free Spins.",
  },
  "playn-go-cat-wilde-and-the-doom-of-dead": {
    mechanics: ["Линии", "Расширяющиеся символы"],
    source: "https://www.playngo.com/games/cat-wilde-and-the-doom-of-dead",
    verifiedAt,
    evidence: "Official game page describes Expanding Wilds in the base game and a selected Special Expanding Symbol during Free Spins.",
  },
  "playn-go-charlie-chance": {
    mechanics: ["Способы", "Множители", "Респины", "Sticky Wilds", "Moving Wilds"],
    source: "https://www.playngo.com/games/charlie-chance",
    verifiedAt,
    evidence: "Official game page describes a multiplier reel, Second Chance Re-Spins that hold Scatter reels and Wilds retained during Free Spins that move to random positions.",
  },
  "playn-go-charlie-chance-in-hell-to-pay": {
    mechanics: ["Множители", "Респины", "Random Wilds", "Instant Prizes", "Mini-games"],
    source: "https://www.playngo.com/games/charlie-chance-in-hell-to-pay",
    verifiedAt,
    evidence: "Official game page describes x2/x3 Multiplier Wilds and a Feature Board that can award Instant Cash, Re-Spins with Random Wilds, Re-Spin Multipliers, Win Spins or Free Spins.",
  },
  "playn-go-chinese-new-year": {
    mechanics: ["Линии", "Mini-games", "Бонусное колесо", "Gamble"],
    source: "https://www.playngo.com/games/chinese-new-year",
    verifiedAt,
    evidence: "Official game page describes the Dragon Fireworks bonus game, a fireworks wheel that selects an extra Scatter and an optional card Gamble round.",
  },
};

export function getCatalogResearchPlayngoFillMechanics13(slug: string) {
  return records[slug];
}
