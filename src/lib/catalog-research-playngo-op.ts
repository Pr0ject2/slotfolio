import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-11";

export const catalogResearchPlayngoOP: Record<string, CatalogResearch> = {
  "playn-go-odin-protector-of-realms": {
    mechanics: ["Кластеры", "Каскады"],
    source: "https://www.playngo.com/games/odin-protector-of-realms",
    verifiedAt,
    evidence: "Official page states that five or more connected symbols form winning clusters, which are removed before new symbols cascade into the gaps.",
  },
  "playn-go-pack-and-cash": {
    mechanics: ["Способы", "Каскады"],
    source: "https://www.playngo.com/games/pack-%26-cash",
    verifiedAt,
    evidence: "Official page identifies a five-reel video slot with 1024 payways and states that winning combinations are removed before new symbols cascade into empty positions.",
  },
  "playn-go-perfect-gems": {
    mechanics: ["Способы", "Каскады"],
    source: "https://www.playngo.com/games/perfect-gems",
    verifiedAt,
    evidence: "Official page calls Perfect Gems a six-reel cascading Dynamic Payways slot and describes the multiplier increasing after each cascade.",
  },
  "playn-go-photo-safari": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/photo-safari",
    verifiedAt,
    evidence: "Official page states that players can activate up to 20 lines and that the lines are activated in numerical order.",
  },
  "playn-go-piggy-bank-farm": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/piggy-bank-farm",
    verifiedAt,
    evidence: "Official page describes a five-reel, four-row video slot with 50 paylines paying from left to right.",
  },
  "playn-go-planet-fortune": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/planet-fortune",
    verifiedAt,
    evidence: "Official page describes a five-reel video slot where matching symbols pay on any of 40 lines.",
  },
  "playn-go-prism-of-gems": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/prism-of-gems",
    verifiedAt,
    evidence: "Official page identifies a five-reel Dynamic Payways video slot with up to 3087 ways to win.",
  },

  "playn-go-oasis-of-dead": {
    mechanics: ["Расширяющиеся символы", "Free Spins", "Gamble"],
    source: "https://www.playngo.com/games/oasis-of-dead",
    verifiedAt,
    evidence: "Official game page describes eight Free Spins, an instant multiplier, a randomly selected Expanding Symbol, unlimited retriggers and the optional colour/suit Gamble feature.",
  },
  "playn-go-octopus-treasure": {
    mechanics: ["Re-Spin", "Pick-and-click"],
    source: "https://www.playngo.com/games/octopus-treasure",
    verifiedAt,
    evidence: "Official game page describes a Key on reel three unlocking one of four Treasure Chest features, three Scatter-triggered Key Re-Spins and subsequent Treasure Spins with a bonus feature on every spin.",
  },
  "playn-go-pandastic-adventure": {
    mechanics: ["Сбор символов", "Hold & Spin"],
    source: "https://www.playngo.com/games/pandastic-adventure",
    verifiedAt,
    evidence: "Official game page describes Temple Free Spins that collect Wilds, followed by a Bonus Round where collecting eight Wilds activates Hold and Spin and prize tiers.",
  },

  "playn-go-phoenix-reborn": {
    mechanics: ["Линии","Free Spins"],
    source: "https://www.playngo.com/games/phoenix-reborn",
    verifiedAt,
    evidence: "Official game page confirms five by six reels, 40 paylines, an Expanding Phoenix Wild, and 7/12/20 Free Spins triggered by three/four/five Aztec Masks.",
  },
  "playn-go-piggy-blitz-casino-gold": {
    mechanics: ["Способы","Сбор символов"],
    source: "https://www.playngo.com/games/piggy-blitz-casino-gold",
    verifiedAt,
    evidence: "Official game page describes Pig Collect, Bonus Game Multiplier from 1x to 5x, a Re-Spin from two collectors, and separate Blitz Spins and Free Spins.",
  },
  "playn-go-piggy-blitz-disco-gold": {
    mechanics: ["Сбор символов","Free Spins"],
    source: "https://www.playngo.com/games/piggy-blitz-disco-gold",
    verifiedAt,
    evidence: "Official game page describes Cash Coins, Piggy Bank collection on reels one and six, Gold Piggy, and Blitz/Free/Mystery Spins.",
  },
  "playn-go-piggy-heist": {
    mechanics: ["Сбор символов","Hold & Spin"],
    source: "https://www.playngo.com/games/piggy-heist",
    verifiedAt,
    evidence: "Official game page describes six reels, Safe Box collection, Hold and Spin, up to four Gamble choices, and persistent Stethoscope Wild Meter.",
  },
  "playn-go-piranha-pays": {
    mechanics: ["Сбор символов","Множители"],
    source: "https://www.playngo.com/games/piranha-pays",
    verifiedAt,
    evidence: "Official game page describes the Piranha Trail, an independent Multiplier Jar, and Scatter/Piranha Wild Instant Prizes.",
  },
  "playn-go-playn-go-buffalo-of-wealth": {
    mechanics: ["Free Spins","Множители"],
    source: "https://www.playngo.com/games/play'n-go-buffalo-of-wealth",
    verifiedAt,
    evidence: "Official game page describes random 2x/3x Wilds, three-Scatter Free Spins, and gradual reel expansion from 5x4 up to 5x8.",
  },
  "playn-go-potion-of-madness": {
    mechanics: ["Re-Spin","Free Spins"],
    source: "https://www.playngo.com/games/potion-of-madness",
    verifiedAt,
    evidence: "Official game page differentiates one-Scatter Wild transformation, two-Scatter Sticky Wild Re-Spins, and three-Scatter 5x6 Free Spins.",
  },
  "playn-go-primal-rampage": {
    mechanics: ["Сбор символов","Free Spins"],
    source: "https://www.playngo.com/games/primal-rampage",
    verifiedAt,
    evidence: "Official game page describes a compact three-reel slot, Rage Symbols, the Primal Wheel, and Kong Quest/King Spin bonus modes.",
  },
  "playn-go-prosperity-palace": {
    mechanics: ["Линии","Free Spins"],
    source: "https://www.playngo.com/games/prosperity-palace",
    verifiedAt,
    evidence: "Official game page confirms five reels, ten paylines, Jade Dragon Wild, three Golden Buddha Scatter triggers for ten Free Spins, and optional card Gamble.",
  },

};

export function getCatalogResearchPlayngoOP(slug: string) {
  return catalogResearchPlayngoOP[slug];
}
