import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-20";

const records: Record<string, CatalogResearch> = {
  "bgaming-cats-love-yummy": {
    mechanics: ["Wilds", "Free Spins", "Jackpots"],
    source: "https://bgaming.com/games/cats-love-yummy",
    verifiedAt,
    evidence: "Official BGaming page describes Wild symbols, Bonus-triggered Free Spins with multiplier boosts and Mini, Minor, Major and Grand Cats Jackpot prizes.",
  },
  "bgaming-money-maker": {
    mechanics: ["Gamble"],
    source: "https://bgaming.com/games/money-maker",
    verifiedAt,
    evidence: "Official BGaming page describes the heads-or-tails Gamble round available after any main-game win. The two official BGaming surfaces currently disagree on RTP, so this pass intentionally leaves RTP unfilled.",
  },
  "endorphina-3-golden-chests": {
    mechanics: ["Hold & Win"],
    source: "https://endorphina.com/games/3-golden-chests/play",
    verifiedAt,
    evidence: "Official Endorphina game page lists Hold and Win as a core feature and describes three Hold and Win bonus games tied to the Boost, Mystery and Collect chests.",
  },
  "endorphina-burning-coins-20-dice": {
    mechanics: ["Wilds", "Hold & Win", "Jackpots"],
    source: "https://endorphina.com/games/burning-coins-20-dice/play",
    verifiedAt,
    evidence: "Official Endorphina game page lists Wild, Hold and Win and Jackpots among the core features and describes the Fiery Fortune bonus with a Max Jackpot up to 1000x total bet.",
  },
  "endorphina-fortune-chests-dice": {
    mechanics: ["Hold & Win", "Pick Game", "Jackpots"],
    source: "https://endorphina.com/games/fortune-chests-dice/play",
    verifiedAt,
    evidence: "Official Endorphina game page lists Hold and Win, Pick Game and Jackpots as core features and describes three Fortune Chests tied to Pick Me, Hold & Win and Jackpot Collecting bonus games.",
  },
};

export function getCatalogResearchScore5SmallTail20260920(slug: string) {
  return records[slug];
}
