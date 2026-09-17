import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-12";

const gameTypes: Record<string, CatalogVerifiedGameType> = {
  "playn-go-queens-day-tilt": { gameType: "Grid Slot", source: "https://www.playngo.com/games/queen's-day-tilt", verifiedAt },
  "playn-go-rabbit-hole-riches": { gameType: "Video Slot", source: "https://www.playngo.com/games/rabbit-hole-riches", verifiedAt },
  "playn-go-rabbit-hole-riches-court-of-hearts": { gameType: "Video Slot", source: "https://www.playngo.com/games/rabbit-hole-riches---court-of-hearts", verifiedAt },
  "playn-go-rage-to-riches": { gameType: "Video Slot", source: "https://www.playngo.com/games/rage-to-riches", verifiedAt },
  "playn-go-raging-rex": { gameType: "Video Slot", source: "https://www.playngo.com/games/raging-rex", verifiedAt },
  "playn-go-raging-rex-2": { gameType: "Video Slot", source: "https://www.playngo.com/games/raging-rex-2", verifiedAt },
  "playn-go-rally-4-riches": { gameType: "Video Slot", source: "https://www.playngo.com/games/rally-4-riches", verifiedAt: "2026-09-17" },
};

export function getVerifiedCatalogGameTypePlayngoQR(slug: string) {
  return gameTypes[slug];
}
