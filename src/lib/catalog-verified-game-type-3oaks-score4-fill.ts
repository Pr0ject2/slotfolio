import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-18";

const entries: Record<string, CatalogVerifiedGameType> = {
  "3-oaks-gaming-3-jewel-crowns": {
    gameType: "Slots",
    source: "https://3oaks.com/game/3_jewel_crowns",
    verifiedAt,
  },
  "3-oaks-gaming-coin-princess-x1000": {
    gameType: "Slots",
    source: "https://3oaks.com/game/coin_princess_x1000",
    verifiedAt,
  },
  "3-oaks-gaming-joker-glitz-x1000": {
    gameType: "Slots",
    source: "https://www.3oaks.com/",
    verifiedAt,
  },
  "3-oaks-gaming-lucky-apple-x1000": {
    gameType: "Slots",
    source: "https://3oaks.com/news/new-release-lucky-apple-x1000",
    verifiedAt,
  },
  "3-oaks-gaming-lucky-penny": {
    gameType: "Slots",
    source: "https://3oaks.com/game/lucky_penny",
    verifiedAt,
  },
  "3-oaks-gaming-lucky-penny-2": {
    gameType: "Slots",
    source: "https://3oaks.com/news/new-partnership-eurobet",
    verifiedAt,
  },
  "3-oaks-gaming-lucky-penny-power-scatter": {
    gameType: "Slots",
    source: "https://3oaks.com/news/new-release-lucky-penny-power-scatter",
    verifiedAt,
  },
  "3-oaks-gaming-super-china-pots": {
    gameType: "Slots",
    source: "https://3oaks.com/news/new-release-super-china-pots",
    verifiedAt,
  },
};

export function getVerifiedCatalogGameType3OaksScore4Fill(slug: string) {
  return entries[slug];
}
