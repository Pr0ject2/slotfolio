import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-25";

const gameTypes: Record<string, CatalogVerifiedGameType> = {
  "3-oaks-gaming-3-coin-volcanoes": {
    gameType: "Slots",
    source: "https://3oaks.com/game/3_coin_volcanoes",
    verifiedAt,
  },
  "3-oaks-gaming-hit-the-gold": {
    gameType: "Slots",
    source: "https://3oaks.com/game/hit_the_gold",
    verifiedAt,
  },
  "3-oaks-gaming-sunlight-princess": {
    gameType: "Slots",
    source: "https://3oaks.com/game/sunlight_princess",
    verifiedAt,
  },
};

export function getVerifiedCatalogGameType3OaksCloseout(slug: string) {
  return gameTypes[slug];
}
