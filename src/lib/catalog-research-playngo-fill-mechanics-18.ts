import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-19";

const records: Record<string, CatalogResearch> = {
  "playn-go-annihilator": {
    mechanics: ["Линии", "Расширяющиеся символы", "Респины", "Sticky Wilds", "Pick-and-click", "Wild Add"],
    source: "https://www.playngo.com/games/annihilator",
    verifiedAt,
    evidence: "Official game page describes randomly triggered Expanding Wilds, re-spins where Expanded Wilds remain in place, a Fun Palace pick feature and a Free Spins trail that can transform highlighted positions into additional Wilds.",
  },
  "playn-go-blinged": {
    mechanics: ["Линии", "Респины", "Прогрессивные множители"],
    source: "https://www.playngo.com/games/blinged",
    verifiedAt,
    evidence: "Official game page says non-winning Win Spins trigger repeated re-spins until a win and the multiplier increases by one on every further re-spin, carrying forward across the feature.",
  },
  "playn-go-cops-n-robbers": {
    mechanics: ["Линии", "Множители", "Gamble"],
    source: "https://www.playngo.com/games/cops-%E2%80%99n%E2%80%99-robbers",
    verifiedAt,
    evidence: "Official game page says the Vault Wild doubles wins and the Gamble round can multiply winnings by guessing the colour or suit of a hidden card.",
  },
  "playn-go-coywolf-cash": {
    mechanics: ["Линии", "Stacked Wilds", "Wild Reels", "Расширяющиеся символы", "Множители", "Трансформация символов"],
    source: "https://www.playngo.com/games/coywolf-cash",
    verifiedAt,
    evidence: "Official page describes Stacked Coywolf Wilds, horizontal Wild Reels, Alpha Coywolves expanding to fill reels, tier-two Multiplier Wilds and Totem Scatters turning Wild when aligned with an Alpha Coywolf.",
  },
  "playn-go-crystal-sun": {
    mechanics: ["Линии", "Расширяющиеся символы", "Множители", "Респины"],
    source: "https://www.playngo.com/games/crystal-sun",
    verifiedAt,
    evidence: "Official game page says the Wild always expands to cover its reel, can carry x1/x2/x3 multipliers and automatically triggers a re-spin, with re-spins continuing while further Wilds land.",
  },
  "playn-go-dawn-of-egypt": {
    mechanics: ["Линии", "Бонусное колесо", "Трансформация символов", "Sticky Symbols"],
    source: "https://www.playngo.com/games/dawn-of-egypt",
    verifiedAt,
    evidence: "Official game page describes the Wheel of God deciding Free Spins, Ra upgrading one picture symbol on each spin and upgraded symbols remaining in their upgraded form throughout Pyramid Spins.",
  },
  "playn-go-firefly-frenzy": {
    mechanics: ["Линии", "Множители"],
    source: "https://www.playngo.com/games/firefly-frenzy",
    verifiedAt,
    evidence: "Official game page describes orange x2 and pink x3 Firefly Multiplier Wilds, with multiple multipliers multiplying together on a winning line.",
  },
  "playn-go-fortunes-of-ali-baba": {
    mechanics: ["Линии", "Pick-and-click", "Instant Prizes", "Респины", "Walking Wilds", "Wild Add", "Прогрессивные множители"],
    source: "https://www.playngo.com/games/fortunes-of-ali-baba",
    verifiedAt,
    evidence: "Official page describes a pot-picking Den of Thieves bonus with Instant Prizes, Thieves Wild re-spins where the Wild moves toward Ali Baba leaving Wilds behind, and Scatter retriggers that increase the multiplier for later Free Spins.",
  },
  "playn-go-gold-king": {
    mechanics: ["Линии", "Stacked Symbols", "Расширяющиеся символы"],
    source: "https://www.playngo.com/games/gold-king",
    verifiedAt,
    evidence: "Official game page describes Super Stack symbols loaded across reels and high-paying crown, amulet and gold-bar symbols expanding to fill their reel when they can form a win.",
  },
  "playn-go-helloween": {
    mechanics: ["Линии", "Бонусное колесо", "Sticky Wilds", "Расширяющиеся символы", "Трансформация символов", "Walking Wilds", "Mega Symbols", "Множители", "Сбор символов"],
    source: "https://www.playngo.com/games/helloween",
    verifiedAt,
    evidence: "Official page describes the Seven Keys feature wheel plus Sticky/Expanding Wilds, symbol-to-Wild transformations, moving Wilds, 2x2 Wilds, Scatter collection and a post-feature multiplier up to x10.",
  },
  "playn-go-feline-fury": {
    mechanics: ["Линии", "Трансформация символов", "Расширяющиеся символы", "Множители", "Сбор символов"],
    source: "https://www.playngo.com/games/feline-fury",
    verifiedAt,
    evidence: "Official page says Feline Wilds transform cat symbols into Wilds, Fury Reel Wilds expand to cover reels and can apply x2/x3 multipliers, while Free Spins collect shields to activate persistent Feline Wild types.",
  },
  "playn-go-hugo-carts": {
    mechanics: ["Способы", "Респины", "Множители", "Wild Add", "Mystery Symbols"],
    source: "https://www.playngo.com/games/hugo-carts",
    verifiedAt,
    evidence: "Official page describes character-triggered re-spins, Hugolina adding symbol multipliers, Hugo dropping Golden Nugget Wilds and Scylla casting Mystery Symbols across the grid.",
  },
};

export function getCatalogResearchPlayngoFillMechanics18(slug: string) {
  return records[slug];
}
