import type { CatalogResearch } from "./catalog-research";

const records: Record<string, CatalogResearch> = {
  "playn-go-invading-vegas": {
    mechanics: ["Lock On Re-Spin", "Респины", "Walking Wilds", "Расширяющиеся символы"],
    source: "https://www.playngo.com/games/invading-vegas",
    verifiedAt: "2026-09-18",
    evidence: "Official Play’n GO page explicitly lists Re-Spins, Walking Wilds and Expanding Wilds, alongside the Lock On Re-Spin feature.",
  },
  "playn-go-5x-magic": {
    mechanics: ["Множители", "Wilds", "Scatter Pays"],
    source: "https://www.playngo.com/games/5x-magic",
    verifiedAt: "2026-09-19",
    evidence: "Official page states that the 5x symbol is Wild, one or two 5x Wilds multiply winning combinations by x5 or x25, and two or more Scatter symbols pay anywhere on the reels.",
  },
  "playn-go-cat-wilde-and-the-lost-chapter": {
    mechanics: ["Расширяющиеся символы", "Free Spins", "Scatter Trigger"],
    source: "https://www.playngo.com/games/cat-wilde-and-the-lost-chapter",
    verifiedAt: "2026-09-19",
    evidence: "Official page describes Pyramid Spins as a Free Spins feature where landing two or more Scatter symbols unlocks the Expanding Symbols.",
  },
  "playn-go-mega-don": {
    mechanics: ["Трансформация символов", "Free Spins", "Retriggers"],
    source: "https://www.playngo.com/games/mega-don",
    verifiedAt: "2026-09-19",
    evidence: "Official page states that three Scatters unlock Free Spins and symbol upgrades, while further Scatters during Free Spins unlock retriggers that continue the symbol transformation progression.",
  },
  "playn-go-myth": {
    mechanics: ["Множители", "Free Spins", "Gamble"],
    source: "https://www.playngo.com/games/myth",
    verifiedAt: "2026-09-19",
    evidence: "Official page states that Wild wins are doubled, three or more Scatters trigger retriggerable Free Spins with tripled wins, and an optional Gamble round can multiply a prize by guessing card colour or suit.",
  },
  "playn-go-pearl-lagoon": {
    mechanics: ["Множители", "Free Spins", "Gamble"],
    source: "https://www.playngo.com/games/pearl-lagoon",
    verifiedAt: "2026-09-19",
    evidence: "Official page states that Wild wins pay double, three or more Scatters trigger retriggerable Free Spins with tripled wins, and the optional Gamble round can multiply a prize by guessing card colour or suit.",
  },
};

export function getCatalogResearchPlayngoScore3Fill(slug: string) {
  return records[slug];
}
