import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "playn-go-athena-ascending": {
    mechanics: ["Множители", "Блокировка символов", "Sticky Wilds"],
    source: "https://www.playngo.com/games/athena-ascending",
    verifiedAt,
    evidence: "Official release describes Multiplier Wilds that stick to the reels and ascend in value during Free Spins.",
  },
  "playn-go-canine-carnage": {
    mechanics: ["Сбор символов", "Множители", "Splitter Wilds"],
    source: "https://www.playngo.com/games/canine-carnage",
    verifiedAt,
    evidence: "Official game page describes Cash Collection, persistent Free Spins multipliers and Splitter Wilds that divide non-Scatter symbols in two.",
  },
  "playn-go-clash-of-camelot": {
    mechanics: ["Сбор символов", "Множители"],
    source: "https://www.playngo.com/games/clash-of-camelot",
    verifiedAt,
    evidence: "Official release describes accumulating Win Multipliers up to x100 and player-selected multiplier/free-spin combinations.",
  },
  "playn-go-gnawn-gold": {
    mechanics: ["Сбор символов", "Множители", "Persistent Trail", "Instant Prizes"],
    source: "https://www.playngo.com/games/gnaw%27n-gold",
    verifiedAt,
    evidence: "Official game page describes a Persistent Trail that permanently unlocks Collectors, five Instant Prize Collectors and multiplier upgrades during Beaver Spins.",
  },
  "playn-go-hooligan-hustle": {
    mechanics: ["Способы", "Множители", "Wild Reels", "Split Symbols"],
    source: "https://www.playngo.com/games/hooligan-hustle",
    verifiedAt,
    evidence: "Official page describes Dynamic Payways, reel-payway multipliers, Wild Reel modifiers and symbols splitting to increase ways to win.",
  },
  "playn-go-idol-of-fortune": {
    mechanics: ["Mystery Symbols", "Pick-and-click", "Mystery Reels"],
    source: "https://www.playngo.com/games/idol-of-fortune",
    verifiedAt,
    evidence: "Official page describes the Wild Prize matching mini-game and player-selected Mystery Reels capable of producing up to 88 Mystery Symbols.",
  },
  "playn-go-jewel-box": {
    mechanics: ["Pick-and-click", "Множители", "Gamble"],
    source: "https://www.playngo.com/games/jewel-box",
    verifiedAt,
    evidence: "Official page describes the Jewel Box pick-and-click bonus, random x2-x5 Multiplier Wilds and an optional collect-or-gamble decision after the pick.",
  },
  "playn-go-joker-flip": {
    mechanics: ["Линии", "Walking Wilds"],
    source: "https://www.playngo.com/games/joker-flip",
    verifiedAt,
    evidence: "Official release describes a Walking Wild that moves left-to-right in base play and reverses direction during Casino Free Spins.",
  },
  "playn-go-jolly-roger-2": {
    mechanics: ["Сбор символов", "Множители", "Pick-and-click", "Instant Prizes", "Stacked Wilds", "Трансформация символов", "Synchronized Reels"],
    source: "https://www.playngo.com/games/jolly-roger-2",
    verifiedAt,
    evidence: "Official page describes Sea Compass multipliers, pick-driven Bonus Quests, stacked Wild rewards, symbol-to-Wild transformations, synchronized reels, Instant Prizes and treasure-map collection.",
  },
  "playn-go-legacy-of-inca": {
    mechanics: ["Способы", "Бонусное колесо", "Random Wilds"],
    source: "https://www.playngo.com/games/legacy-of-inca",
    verifiedAt,
    evidence: "Official release describes payways, Wheel of the Gods and a meter that determines how many Wilds are added to the middle reels during Free Spins.",
  },
};

export function getCatalogResearchPlayngoFillMechanics10(slug: string) {
  return records[slug];
}
