import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-23";

const records: Record<string, CatalogResearch> = {
  "playn-go-kings-mask-eclipse-of-gods": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/king%27s-mask-eclipse-of-gods",
    verifiedAt,
    evidence: "Official Play’n GO page states that three or more Scatters trigger Free Spins and keep the selected eclipse Wild feature active throughout the round.",
  },
  "playn-go-golden-caravan": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/golden-caravan",
    verifiedAt,
    evidence: "Official Play’n GO page states that three camel Scatters trigger ten Free Spins with a progressive win multiplier.",
  },
  "playn-go-golden-legend": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/golden-legend",
    verifiedAt,
    evidence: "Official Play’n GO page states that three Dragon symbols trigger the Free Spins feature, with stacked Wilds added during the round.",
  },
  "playn-go-prissy-princess": {
    mechanics: ["Dragon's Breath"],
    source: "https://www.playngo.com/games/prissy-princess",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly names Dragon's Breath, which randomly converts up to three symbols into Wilds after a non-winning spin.",
  },
  "playn-go-puebla-parade": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/puebla-parade",
    verifiedAt,
    evidence: "Official Play’n GO game page explicitly describes content that plays during the Free Spins feature.",
  },
  "playn-go-aztec-idols": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/aztec-idols",
    verifiedAt,
    evidence: "Official Play’n GO page states that three Sunstone symbols trigger the Sunstone Free Spin feature.",
  },
  "playn-go-buildin-even-more-bucks": {
    mechanics: ["Magic Spins"],
    source: "https://www.playngo.com/games/buildin%27-even-more-bucks",
    verifiedAt,
    evidence: "Official Play’n GO page states that landing a Magic Spin Coin inside a frame grants more Magic Spins.",
  },
  "playn-go-pearls-of-india": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/pearls-of-india",
    verifiedAt,
    evidence: "Official Play’n GO page states that three Pearl symbols trigger Free Spins, which can retrigger up to thirty spins.",
  },
};

export function getCatalogResearchPlayngoFillMechanics25(slug: string) {
  return records[slug];
}
