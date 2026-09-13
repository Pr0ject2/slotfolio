import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-13";

const gameTypes: Record<string, CatalogVerifiedGameType> = {
  "bgaming-money-maker": {
    gameType: "Slots",
    source: "https://bgaming.com/games/money-maker",
    verifiedAt,
  },
  "endorphina-moofo": {
    gameType: "Slots",
    source: "https://endorphina.com/games/moofo/play",
    verifiedAt,
  },
  "endorphina-zalatar": {
    gameType: "Slots",
    source: "https://endorphina.com/games/zalatar/play",
    verifiedAt,
  },
  "playn-go-chinese-new-year": {
    gameType: "Video Slot",
    source: "https://www.playngo.com/games/chinese-new-year",
    verifiedAt,
  },
  "playn-go-lucky-diamonds": {
    gameType: "Video Slot",
    source: "https://www.playngo.com/games/lucky-diamonds",
    verifiedAt,
  },
};

export function getVerifiedCatalogGameTypeQualityPass7(slug: string) {
  return gameTypes[slug];
}
