import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-21";

const research: Record<string, CatalogResearch> = {
  "push-gaming-big-bamboo-2": {
    mechanics: ["Instant Prizes"],
    source: "https://www.pushgaming.com/games/big-bamboo-2",
    verifiedAt,
    evidence: "Official Push game copy describes Golden Bamboo and mystery features that can award instant prizes alongside the existing symbol-transformation mechanic.",
  },
  "push-gaming-fang-city": {
    mechanics: ["Множители"],
    source: "https://www.pushgaming.com/games/fang-city",
    verifiedAt,
    evidence: "Official Push game copy describes a persistent escalating multiplier during Fang City's feature.",
  },
  "push-gaming-the-great-banker": {
    mechanics: ["Wheel Feature"],
    source: "https://www.pushgaming.com/games/the-great-banker",
    verifiedAt,
    evidence: "Official Push game copy explicitly describes a Wheel Feature that can award jackpots and free spins.",
  },
};

export function getCatalogResearchPushScore6Final(slug: string): CatalogResearch | undefined {
  return research[slug];
}
