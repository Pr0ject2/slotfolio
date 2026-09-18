import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "hacksaw-gaming-booze-bash": {
    mechanics: ["Match-2-Win", "Множители"],
    source: "https://www.hacksawgaming.com/games/booze-bash",
    verifiedAt,
    evidence: "Official Multiplier Pairs rules state that a completed pair acts as a Global Multiplier applied to all wins on the spin, with values up to x20.",
  },
  "hacksaw-gaming-bullets-and-bounty": {
    mechanics: ["Линии", "DuelReels™", "Расширяющиеся барабаны", "Множители"],
    source: "https://www.hacksawgaming.com/games/Bullets-and-bounty",
    verifiedAt,
    evidence: "Official DuelReels™ rules state that VS symbols expand into full-reel Wild DuelReels and apply 2x–100x or combined Bounty multipliers to wins on the reel.",
  },
  "hacksaw-gaming-cash-crew": {
    mechanics: ["Линии", "Множители"],
    source: "https://www.hacksawgaming.com/games/cash-crew",
    verifiedAt,
    evidence: "Official Multipliers Gone Wild rules state that Multiplier symbols multiply winning paylines, with multiple multipliers on the same payline multiplying each other.",
  },
  "hacksaw-gaming-divine-drop": {
    mechanics: ["Линии", "Множители", "Респины"],
    source: "https://www.hacksawgaming.com/games/divine-drop",
    verifiedAt,
    evidence: "Official Wild Multiplier rules apply multiplier values to winning combinations and state that Wild Multipliers with remaining Vitality stay sticky and award respins.",
  },
  "hacksaw-gaming-donny-dough": {
    mechanics: ["Линии", "LOOTLINES™", "Множители"],
    source: "https://www.hacksawgaming.com/games/donny-dough",
    verifiedAt,
    evidence: "Official LOOTLINES™ rules define adding and multiplying Multi-Dough values that determine the payout of a winning payline.",
  },
  "hacksaw-gaming-fighter-pit": {
    mechanics: ["Линии", "Wild Fist Reels", "Расширяющиеся барабаны", "Множители"],
    source: "https://www.hacksawgaming.com/games/fighter-pit",
    verifiedAt,
    evidence: "Official Wild Fist Reels rules state that a Fist expands upward into a Wild Reel and can collect multiplier values that apply to winning combinations.",
  },
};

export function getCatalogResearchHacksawNormalizedFill2(slug: string) {
  return records[slug];
}
