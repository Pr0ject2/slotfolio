import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-20";

const records: Record<string, CatalogResearch> = {
  "wazdan-9-burning-stars": {
    mechanics: ["Множители"],
    source: "https://wazdan.com/games/9-burning-stars",
    verifiedAt,
    evidence: "Official page lists a Multiplier symbol that multiplies collected prize values.",
  },
  "wazdan-back-to-the-70s": {
    mechanics: ["Расширяющиеся символы"],
    source: "https://wazdan.com/games/back-to-the-70s",
    verifiedAt,
    evidence: "Official page lists Free Spins with an Expanding Bonus Symbol among the game features.",
  },
  "wazdan-black-hawk": {
    mechanics: ["Gamble Feature"],
    source: "https://wazdan.com/games/black-hawk",
    verifiedAt,
    evidence: "Official page explicitly lists the Unique Gamble Feature alongside the Wild feature.",
  },
  "wazdan-fenix-play-27": {
    mechanics: ["x3 Wall Multiplier"],
    source: "https://wazdan.com/games/fenix-play-27",
    verifiedAt,
    evidence: "Official page explicitly lists the x3 Wall Multiplier feature.",
  },
  "wazdan-fire-bird": {
    mechanics: ["Bonus Symbol"],
    source: "https://wazdan.com/games/fire-bird",
    verifiedAt,
    evidence: "Official page explicitly lists the Bonus Symbol as a game feature.",
  },
  "wazdan-football-mania": {
    mechanics: ["Football Bonus"],
    source: "https://wazdan.com/games/football-mania",
    verifiedAt,
    evidence: "Official page lists Football Bonus and Football Lottery Bonus in addition to Block Symbols Mode.",
  },
  "wazdan-hot-777": {
    mechanics: ["Coin Bonus"],
    source: "https://wazdan.com/games/hot-777",
    verifiedAt,
    evidence: "Official page explicitly lists Coin Bonus among the game features.",
  },
  "wazdan-hot-party": {
    mechanics: ["Scatter"],
    source: "https://wazdan.com/games/hot-party",
    verifiedAt,
    evidence: "Official page explicitly lists Scatter as a game feature.",
  },
  "wazdan-magic-fruits": {
    mechanics: ["Bonus Symbol"],
    source: "https://wazdan.com/games/magic-fruits",
    verifiedAt,
    evidence: "Official page explicitly lists the Bonus Symbol as a game feature.",
  },
  "wazdan-magic-fruits-27": {
    mechanics: ["x3 Wall Multiplier"],
    source: "https://wazdan.com/games/magic-fruits-27",
    verifiedAt,
    evidence: "Official page explicitly lists the x3 Wall Multiplier feature.",
  },
  "wazdan-relic-hunters-and-the-book-of-faith": {
    mechanics: ["Walking Wilds"],
    source: "https://wazdan.com/games/relic-hunters-and-the-book-of-faith",
    verifiedAt,
    evidence: "Official page explicitly lists Walking Wilds among the game features; conflicting official release dates are intentionally not resolved here.",
  },
  "wazdan-vegas-hot": {
    mechanics: ["x2 Wall Multiplier"],
    source: "https://wazdan.com/games/vegas-hot",
    verifiedAt,
    evidence: "Official page explicitly lists the x2 Wall Multiplier feature.",
  },
};

export function getCatalogResearchWazdanScore6Wave(slug: string) {
  return records[slug];
}
