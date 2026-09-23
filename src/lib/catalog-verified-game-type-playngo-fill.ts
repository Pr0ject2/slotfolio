type PlayngoGameType = {
  gameType: "Video Slot" | "Grid Slot" | "Slots";
  source: string;
  verifiedAt: string;
  gameTypeSource?: string;
};

const legacyVerifiedAt = "2026-09-18";

const gameTypes: Record<string, PlayngoGameType> = {
  "playn-go-chinese-new-year": {
    gameType: "Video Slot",
    source: "https://www.playngo.com/games/chinese-new-year",
    verifiedAt: legacyVerifiedAt,
  },
  "playn-go-lucky-diamonds": {
    gameType: "Video Slot",
    source: "https://www.playngo.com/games/lucky-diamonds",
    verifiedAt: legacyVerifiedAt,
  },
  "playn-go-ras-reckoning": {
    gameType: "Grid Slot",
    source: "https://www.playngo.com/games/ra's-reckoning",
    gameTypeSource: "https://www.playngo.com/post/ras-reckoning",
    verifiedAt: "2026-09-23",
  },
};

export function getVerifiedCatalogGameTypePlayngoFill(slug: string) {
  return gameTypes[slug];
}
