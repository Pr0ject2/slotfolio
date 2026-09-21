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
  "push-gaming-happy-bamboo": {
    mechanics: ["Респины"],
    source: "https://www.pushgaming.com/games/happy-bamboo",
    verifiedAt,
    evidence: "Official Push game copy describes Hold & Respin gameplay in addition to the existing collect mechanic.",
  },
  "push-gaming-henry-the-ape": {
    mechanics: ["Сбор символов"],
    source: "https://www.pushgaming.com/games/henry-the-ape",
    verifiedAt,
    evidence: "Official Push game copy describes Gold Disks being collected into the Bonus Meter during the feature.",
  },
  "push-gaming-mad-blast": {
    mechanics: ["Множители"],
    source: "https://www.pushgaming.com/games/mad-blast",
    verifiedAt,
    evidence: "Official Push game copy describes multiplier progression alongside the existing cascading gameplay.",
  },
  "push-gaming-razor-shark-jackpots": {
    mechanics: ["Instant Prizes"],
    source: "https://www.pushgaming.com/games/razor-shark-jackpots",
    verifiedAt,
    evidence: "Official Push game copy describes instant-prize values within the mystery and jackpot feature set.",
  },
  "push-gaming-regal-knights": {
    mechanics: ["Instant Prizes"],
    source: "https://www.pushgaming.com/games/regal-knights",
    verifiedAt,
    evidence: "Official Push game copy describes Golden Mystery and instant-prize rewards in the feature set.",
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
