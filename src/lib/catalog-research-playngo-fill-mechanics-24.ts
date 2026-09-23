import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-23";

const records: Record<string, CatalogResearch> = {
  "playn-go-piggy-heist": {
    mechanics: ["Gamble"],
    source: "https://www.playngo.com/games/piggy-heist",
    verifiedAt,
    evidence: "Official Play’n GO page describes the Gamble Game after Hold’n Spin, where Multiplier Coins compete with Cop Coins.",
  },
  "playn-go-mystery-joker": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/mystery-joker",
    verifiedAt,
    evidence: "Official Play’n GO page states that three Scatters unlock Free Spins and additional Scatters can add more spins.",
  },
  "playn-go-multifruit-81": {
    mechanics: ["Wilds"],
    source: "https://www.playngo.com/games/multifruit-81",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly identifies the Joker as a Wild that substitutes other symbols.",
  },
  "playn-go-phoenix-reborn": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/phoenix-reborn",
    verifiedAt,
    evidence: "Official Play’n GO page states that three to five Scatters award seven, twelve or twenty Free Spins.",
  },
  "playn-go-motley-crue": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/m%C3%B6tley-cr%C3%BCe",
    verifiedAt,
    evidence: "Official Play’n GO page states that Shout at the Devil determines the number of Free Spins awarded.",
  },
  "playn-go-primal-rampage": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/primal-rampage",
    verifiedAt,
    evidence: "Official Play’n GO release identifies Kong Quest and King Spin Free Spins as features that extend the game.",
  },
  "playn-go-photo-safari": {
    mechanics: ["Wilds"],
    source: "https://www.playngo.com/games/photo-safari",
    verifiedAt,
    evidence: "Official Play’n GO page identifies the drums as the Wild symbol and describes its substitution behaviour.",
  },
};

export function getCatalogResearchPlayngoFillMechanics24(slug: string) {
  return records[slug];
}
