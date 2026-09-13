import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-13";

const research: Record<string, CatalogResearch> = {
  "3-oaks-gaming-coin-lamp": {
    mechanics: ["Сбор символов"],
    source: "https://3oaks.com/game/coin_lamp",
    verifiedAt,
    evidence: "Official page says players collect Coin Bonus Symbols during respins and a Collect Symbol gathers all visible values.",
  },
  "3-oaks-gaming-sun-of-egypt-5": {
    mechanics: ["Сбор символов"],
    source: "https://3oaks.com/game/sun_of_egypt_5",
    verifiedAt,
    evidence: "Official page says symbols are collected to unlock extra rows and the Sun Meter collects Bonus and Power Symbols.",
  },
};

export function getCatalogResearch3OaksQualityPass5(slug: string) {
  return research[slug];
}
