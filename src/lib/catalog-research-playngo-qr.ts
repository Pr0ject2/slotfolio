import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-12";

export const catalogResearchPlayngoQR: Record<string, CatalogResearch> = {
  "playn-go-rabbit-hole-riches-court-of-hearts": {
    mechanics: ["Линии", "Каскады"],
    source: "https://www.playngo.com/games/rabbit-hole-riches---court-of-hearts",
    verifiedAt,
    evidence: "Official page describes five cascading reels, line wins during Free Spins, and winning cascades that move the expanding Wild.",
  },
  "playn-go-raging-rex": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/raging-rex",
    verifiedAt,
    evidence: "Official page describes a six-reel, four-row video slot with 4,096 payways.",
  },
  "playn-go-raging-rex-2": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/raging-rex-2",
    verifiedAt,
    evidence: "Official page states that Raging Rex 2 has 4,096 ways to win.",
  },
  "playn-go-puebla-parade": {
    "mechanics": [
      "Расширяющиеся барабаны",
      "Множители"
    ],
    "source": "https://www.playngo.com/games/puebla-parade",
    "evidence": "Official Play’n GO game page describes expanding the 5x4 layout to 5x7 and dancer Wilds joining to create a moving multiplier.",
    "verifiedAt": "2026-10-08"
  },
  "playn-go-queens-day-tilt": {
    "mechanics": [
      "Кластеры",
      "Re-Spin"
    ],
    "source": "https://www.playngo.com/games/queen's-day-tilt",
    "evidence": "Official page describes 3x3 horizontal/vertical adjacent matches, Tilt removing the last symbol, Game of Accession and Queen's Day Free Spins.",
    "verifiedAt": "2026-10-08"
  },
  "playn-go-ras-reckoning": {
    "mechanics": [
      "Кластеры",
      "Каскады"
    ],
    "source": "https://www.playngo.com/games/ra's-reckoning",
    "evidence": "Official page describes 6x5 cascading cluster wins and Mega Drop removing all matching regular symbols throughout the grid.",
    "verifiedAt": "2026-10-08"
  },
  "playn-go-rabbit-hole-riches": {
    "mechanics": [
      "Линии",
      "Множители"
    ],
    "source": "https://www.playngo.com/games/rabbit-hole-riches",
    "evidence": "Official provider describes original 3x3 grid and separate Tower Power and Queen's Army Free Spins bonuses.",
    "verifiedAt": "2026-10-08"
  },
  "playn-go-rage-to-riches": {
    "mechanics": [
      "Линии",
      "Free Spins"
    ],
    "source": "https://www.playngo.com/games/rage-to-riches",
    "evidence": "Official page describes five bonus stars from 10,J,Q,K,A ordered scatter, three girl Free Spins and an optional card Gamble.",
    "verifiedAt": "2026-10-08"
  },

  "playn-go-raging-rex-3": {
    "mechanics": [
      "Способы",
      "Re-Spin",
      "Free Spins"
    ],
    "source": "https://www.playngo.com/games/raging-rex-3",
    "verifiedAt": "2026-10-10",
    "evidence": "Official Raging Rex 3 page confirms 6x4, 4096 ways, walking Rex re-spins, 3–6 Scatters awarding 7/9/11/13 spins, and Feeding Frenzy, Hatchling Mania and Survival."
  },
  "playn-go-rainforest-magic": {
    "mechanics": [
      "Линии",
      "Mystery Symbols",
      "Free Spins"
    ],
    "source": "https://www.playngo.com/games/rainforest-magic",
    "verifiedAt": "2026-10-10",
    "evidence": "Official Rainforest Magic page confirms five reels, 25 paylines, synchronized Mystery Symbol reveals, Jaguar Wild triggering Free Spins, flower pick selecting 1–4 Mystery Reels and up to 30 free spins."
  },
  "playn-go-rally-4-riches": {
    "mechanics": [
      "Линии",
      "Бонусный барабан",
      "The Race"
    ],
    "source": "https://www.playngo.com/games/rally-4-riches",
    "verifiedAt": "2026-10-10",
    "evidence": "Official game page describes 3-reel slot plus independent bonus reel, x2/x3/x4/x5/x10 multipliers, 24-square The Race, rankings and five-tier jackpot reaching x1000; separate release post inconsistently says five reels."
  },
};

export function getCatalogResearchPlayngoQR(slug: string) {
  return catalogResearchPlayngoQR[slug];
}
