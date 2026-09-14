import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-14";

const research: Record<string, CatalogResearch> = {
  "3-oaks-gaming-magic-apple-2": {
    mechanics: ["Линии"],
    source: "https://3oaks.com/game/magic_apple_2",
    verifiedAt,
    evidence: "Official page describes Magic Apple 2 as a 5x4, 20-line game.",
  },
  "3-oaks-gaming-sunlight-princess": {
    mechanics: ["Линии"],
    source: "https://3oaks.com/game/sunlight_princess",
    verifiedAt,
    evidence: "Official page describes Sunlight Princess as a 5x3, 30-line adventure.",
  },
};

export function getCatalogResearch3OaksQualityPass13(slug: string) {
  return research[slug];
}
