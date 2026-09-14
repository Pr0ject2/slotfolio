import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-14";

const research: Record<string, CatalogResearch> = {
  "3-oaks-gaming-coin-up-hot-fire": {
    mechanics: ["Сбор символов"],
    source: "https://3oaks.com/game/coin_up",
    verifiedAt,
    evidence: "Official page states that the COLLECT SYMBOL gathers all current values during the bonus round.",
  },
  "3-oaks-gaming-coin-volcano": {
    mechanics: ["Сбор символов"],
    source: "https://3oaks.com/game/coin_volcano",
    verifiedAt,
    evidence: "Official page states that the COLLECT SYMBOL gathers all current coin values during respins.",
  },
  "3-oaks-gaming-gold-nuggets": {
    mechanics: ["Сбор символов"],
    source: "https://3oaks.com/game/gold_nuggets",
    verifiedAt,
    evidence: "Official page states that the COLLECT SYMBOL gathers all visible values during the Hold & Win bonus.",
  },
};

export function getCatalogResearch3OaksQualityPass16(slug: string) {
  return research[slug];
}
