import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-23";

const gameTypes: Record<string, CatalogVerifiedGameType> = {
  "3-oaks-gaming-3-super-coin-volcanoes": {
    gameType: "Slots",
    source: "https://3oaks.com/game/3_super_coin_volcanoes",
    verifiedAt,
  },
  "3-oaks-gaming-4-clover-pots": {
    gameType: "Slots",
    source: "https://3oaks.com/news/new-release-4-clover-pots",
    verifiedAt,
  },
  "3-oaks-gaming-4-fairy-flowers": {
    gameType: "Slots",
    source: "https://3oaks.com/news/new-release-4-fairy-flowers",
    verifiedAt,
  },
  "3-oaks-gaming-4-pots-of-egypt": {
    gameType: "Slots",
    source: "https://3oaks.com/news/new-release-4-pots-of-gold",
    verifiedAt,
  },
  "3-oaks-gaming-4-wolf-drums": {
    gameType: "Slots",
    source: "https://3oaks.com/news/new-release-4-wolf-drums",
    verifiedAt,
  },
  "3-oaks-gaming-aztec-fire-2": {
    gameType: "Slots",
    source: "https://3oaks.com/news/portugal-certification",
    verifiedAt,
  },
  "3-oaks-gaming-coin-up-lightning": {
    gameType: "Slots",
    source: "https://3oaks.com/game/coin_lightning",
    verifiedAt,
  },
  "3-oaks-gaming-coin-volcano-2": {
    gameType: "Slots",
    source: "https://3oaks.com/news/new-release-coin-volcano-2",
    verifiedAt,
  },
  "3-oaks-gaming-egypt-power-x1000": {
    gameType: "Slots",
    source: "https://3oaks.com/news/new-release-egypt-power-x1000",
    verifiedAt,
  },
  "3-oaks-gaming-sun-of-egypt-4": {
    gameType: "Slots",
    source: "https://3oaks.com/game/sun_of_egypt_4",
    verifiedAt,
  },
  "3-oaks-gaming-wolf-night": {
    gameType: "Slots",
    source: "https://3oaks.com/game/wolf_night",
    verifiedAt,
  },
};

export function getVerifiedCatalogGameType3OaksCurrent(slug: string) {
  return gameTypes[slug];
}
