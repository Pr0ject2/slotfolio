const verifiedAt = "2026-09-18";

const gameTypes = {
  "playn-go-chinese-new-year": {
    gameType: "Video Slot" as const,
    source: "https://www.playngo.com/games/chinese-new-year",
    verifiedAt,
  },
  "playn-go-lucky-diamonds": {
    gameType: "Video Slot" as const,
    source: "https://www.playngo.com/games/lucky-diamonds",
    verifiedAt,
  },
};

export function getVerifiedCatalogGameTypePlayngoFill(slug: string) {
  return gameTypes[slug as keyof typeof gameTypes];
}
