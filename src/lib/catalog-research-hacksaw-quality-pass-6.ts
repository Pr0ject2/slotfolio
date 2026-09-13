import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-13";

const research: Record<string, CatalogResearch> = {
  "hacksaw-gaming-le-fisherman": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/le-fisherman",
    verifiedAt,
    evidence: "Official page says Buckets collect Coins, activated Buckets and Global Buckets, while Global Buckets collect them across the grid.",
  },
  "hacksaw-gaming-le-digger": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/le-digger",
    verifiedAt,
    evidence: "Official page says Collector symbols collect Coins and activated Collectors revealed on Golden positions.",
  },
  "hacksaw-gaming-le-king": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/le-king",
    verifiedAt,
    evidence: "Official page says Treasure Pots collect and store the total value of visible Coins and other Pots.",
  },
  "hacksaw-gaming-le-santa": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/le-santa",
    verifiedAt,
    evidence: "Official page says Santa Sacks collect and store the total value of visible Coins and other Santa Sacks.",
  },
  "hacksaw-gaming-marlin-masters-atlantis": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/marlin-masters-atlantis",
    verifiedAt,
    evidence: "Official page says Fisherman symbols collect all Marlin and Jackpot Marlin symbols on the grid.",
  },
  "hacksaw-gaming-miami-mayhem": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/miami-mayhem",
    verifiedAt,
    evidence: "Official page says the Mayhem Bar collects expanded Crew Reels during the WE SPLIT bonus.",
  },
  "hacksaw-gaming-stormborn": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/stormborn",
    verifiedAt,
    evidence: "Official page says Collector Chests collect all Coin values and may multiply the total before collecting.",
  },
  "hacksaw-gaming-zeus-ze-zecond": {
    mechanics: ["Сбор символов"],
    source: "https://www.hacksawgaming.com/games/zeus-ze-zecond",
    verifiedAt,
    evidence: "Official page says Pots of Olympus collect revealed Coins, Diamonds and Clovers into the total win.",
  },
};

export function getCatalogResearchHacksawQualityPass6(slug: string) {
  return research[slug];
}
