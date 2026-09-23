import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-21";
const verifiedAtCleanup = "2026-09-23";

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
  "push-gaming-happy-bamboo": {
    mechanics: ["Сбор символов", "Hold & Respin"],
    source: "https://www.pushgaming.com/games/happy-bamboo.html",
    verifiedAt: verifiedAtCleanup,
    evidence: "Official Push game page preserves the existing collection-based gameplay and describes Hold And Respin as a distinct feature triggered through the Panda Pot and played on nine locking positions.",
  },
  "push-gaming-henry-the-ape": {
    mechanics: ["Сбор символов", "Rewind"],
    source: "https://www.pushgaming.com/games/henry-ape.html",
    verifiedAt: verifiedAtCleanup,
    evidence: "Official Push game page preserves the existing collection progression and names Rewind as a distinct base-game feature that re-spins a non-winning result to form a winning combination.",
  },
  "push-gaming-mad-blast": {
    mechanics: ["Каскады", "Extra Life"],
    source: "https://www.pushgaming.com/games/mad-blast.html",
    verifiedAt: verifiedAtCleanup,
    evidence: "Official Push game page preserves cascading wins and names Extra Life as a distinct symbol feature that activates on a losing cascade and clears the grid under its stated conditions.",
  },
  "push-gaming-razor-shark-jackpots": {
    mechanics: ["Mystery Symbols", "Jackpot Feature"],
    source: "https://www.pushgaming.com/games/razor-shark-jackpots.html",
    verifiedAt: verifiedAtCleanup,
    evidence: "Official Push game page preserves the Mystery Symbols mechanic and explicitly describes a separate Jackpot Feature with five jackpot prize tiers.",
  },
  "push-gaming-regal-knights": {
    mechanics: ["Сбор символов", "Mystery Symbols"],
    source: "https://www.pushgaming.com/games/regal-knights.html",
    verifiedAt: verifiedAtCleanup,
    evidence: "Official Push game page preserves the existing collection progression and explicitly describes Mystery Symbols that can reveal Wilds, paying symbols or a Golden Mystery Symbol in the base game and Free Spins.",
  },
};

export function getCatalogResearchPushScore6Final(slug: string): CatalogResearch | undefined {
  return research[slug];
}
