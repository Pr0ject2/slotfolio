import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-14";

const research: Record<string, CatalogResearch> = {
  "playn-go-hugo-carts": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/hugo-carts",
    verifiedAt,
    evidence: "Official game page states that Hugo Carts gives players more ways to win with every spin and has 1,024 ways by default.",
  },
};

export function getCatalogResearchPlayngoQualityPass21(slug: string) {
  return research[slug];
}
