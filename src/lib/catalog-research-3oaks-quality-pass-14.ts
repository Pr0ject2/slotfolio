import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-14";

const research: Record<string, CatalogResearch> = {
  "3-oaks-gaming-3-super-coin-volcanoes": {
    mechanics: ["Линии"],
    source: "https://3oaks.com/game/3_super_coin_volcanoes",
    verifiedAt,
    evidence: "Official page states that the bonus ignites when four symbols align on an active triggering line.",
  },
  "3-oaks-gaming-coin-volcano-2": {
    mechanics: ["Линии"],
    source: "https://3oaks.com/game/coin_volcano_2",
    verifiedAt,
    evidence: "Official 3 Oaks release states that the bonus is achieved by landing three symbols on a singular payline.",
  },
};

export function getCatalogResearch3OaksQualityPass14(slug: string) {
  return research[slug];
}
