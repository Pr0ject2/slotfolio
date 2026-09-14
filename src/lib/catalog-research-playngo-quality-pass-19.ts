import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-14";

const research: Record<string, CatalogResearch> = {
  "playn-go-grannys-wild": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/granny's-wild",
    verifiedAt,
    evidence: "Official game page states that Coin symbols remaining on the reels are collected by Granny's Coin Collection Jar.",
  },
};

export function getCatalogResearchPlayngoQualityPass19(slug: string) {
  return research[slug];
}
