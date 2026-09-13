import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-13";

const gameTypes: Record<string, CatalogVerifiedGameType> = {
  "3-oaks-gaming-3-jewel-crowns": { gameType: "Slots", source: "https://3oaks.com/game/3_jewel_crowns", verifiedAt },
  "3-oaks-gaming-coin-lamp": { gameType: "Slots", source: "https://3oaks.com/game/coin_lamp", verifiedAt },
  "3-oaks-gaming-coin-up-lightning": { gameType: "Slots", source: "https://3oaks.com/game/coin_lightning", verifiedAt },
};

export function getVerifiedCatalogGameType3OaksQualityPass5(slug: string) {
  return gameTypes[slug];
}
