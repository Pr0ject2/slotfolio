import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-13";

const research: Record<string, CatalogResearch> = {
  "hacksaw-gaming-army-of-ares": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/army-of-ares",
    verifiedAt,
    evidence: "Official page says each Battle Horse symbol is collected above the reel it landed on.",
  },
  "hacksaw-gaming-le-pharaoh": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/le-pharaoh",
    verifiedAt,
    evidence: "Official page says Pot Of Gold symbols collect the values of visible Coins and other Pots.",
  },
  "hacksaw-gaming-le-viking": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/le-viking",
    verifiedAt,
    evidence: "Official page says Coins, Diamonds and Clovers stay sticky until collected by the Magic Cauldron.",
  },
  "hacksaw-gaming-le-zeus": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/le-zeus",
    verifiedAt,
    evidence: "Official page says Pots of Gold collect revealed values into one total.",
  },
  "hacksaw-gaming-marlin-masters": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/marlin-masters",
    verifiedAt,
    evidence: "Official page says Fisherman symbols collect all Marlin cash prizes on the grid.",
  },
  "hacksaw-gaming-octo-attack": {
    mechanics: ["Каскады"],
    source: "https://www.hacksawgaming.com/games/octo-attack",
    verifiedAt,
    evidence: "Official page says winning symbols are removed and new symbols drop in to replace them after a win.",
  },
  "hacksaw-gaming-rise-of-fortuna": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/rise-of-fortuna",
    verifiedAt,
    evidence: "Official page says Fortuna Wheel values are collected by the Cash Prize Bar before the final cash prize is awarded.",
  },
  "hacksaw-gaming-spear-of-athena": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/spear-of-athena",
    verifiedAt,
    evidence: "Official page says Amphoras collect and store the total value of visible Coins and other Amphoras.",
  },
  "hacksaw-gaming-strength-of-hercules": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/strength-of-hercules",
    verifiedAt,
    evidence: "Official page explicitly says Coin and FS symbols are collected in the corresponding Treasure Chests.",
  },
  "hacksaw-gaming-the-wildwood-curse": {
    mechanics: ["Кластеры"],
    source: "https://www.hacksawgaming.com/games/the-wildwood-curse",
    verifiedAt,
    evidence: "Official page explicitly names 2x2 Cursed Cluster formations and repeatedly describes the Cluster feature.",
  },
};

export function getCatalogResearchHacksawQualityPass8(slug: string) {
  return research[slug];
}
