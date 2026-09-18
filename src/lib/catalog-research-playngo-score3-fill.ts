import type { CatalogResearch } from "./catalog-research";

const records: Record<string, CatalogResearch> = {
  "playn-go-invading-vegas": {
    mechanics: ["Lock On Re-Spin", "Респины", "Walking Wilds", "Расширяющиеся символы"],
    source: "https://www.playngo.com/games/invading-vegas",
    verifiedAt: "2026-09-18",
    evidence: "Official Play’n GO page explicitly lists Re-Spins, Walking Wilds and Expanding Wilds, alongside the Lock On Re-Spin feature.",
  },
  "playn-go-5x-magic": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/5x-magic",
    verifiedAt: "2026-09-18",
    evidence: "Official page states that a 5x Wild multiplies a normal prize by five and two 5x symbols multiply it by twenty-five.",
  },
  "playn-go-cat-wilde-and-the-lost-chapter": {
    mechanics: ["Расширяющиеся символы"],
    source: "https://www.playngo.com/games/cat-wilde-and-the-lost-chapter",
    verifiedAt: "2026-09-18",
    evidence: "Official page describes Expanding Symbols in Pyramid Spins after Scatter activation.",
  },
  "playn-go-mega-don": {
    mechanics: ["Трансформация символов"],
    source: "https://www.playngo.com/games/mega-don",
    verifiedAt: "2026-09-18",
    evidence: "Official page describes symbol upgrades and transformation progression triggered by Scatters and continued through Free Spins.",
  },
  "playn-go-myth": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/myth",
    verifiedAt: "2026-09-18",
    evidence: "Official page states that Wild wins are doubled and Free Spin winning combinations are tripled, with Wild wins reaching six times the normal prize.",
  },
};

export function getCatalogResearchPlayngoScore3Fill(slug: string) {
  return records[slug];
}
