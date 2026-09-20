import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-20";

const records: Record<string, CatalogVerifiedGameType> = {
  "3-oaks-gaming-3-olymp-fortunes": { gameType: "Slots", source: "https://3oaks.com/game/3_olymp_fortunes", verifiedAt },
  "3-oaks-gaming-3-super-hot-chillies": { gameType: "Slots", source: "https://3oaks.com/game/3_super_hot_chillies", verifiedAt },
  "3-oaks-gaming-amazonia-wins": { gameType: "Slots", source: "https://3oaks.com/game/amazonia_wins", verifiedAt },
  "3-oaks-gaming-china-festival": { gameType: "Slots", source: "https://3oaks.com/game/china_festival", verifiedAt },
  "3-oaks-gaming-coin-up-hot-fire": { gameType: "Slots", source: "https://3oaks.com/game/coin_up", verifiedAt },
  "3-oaks-gaming-coin-volcano": { gameType: "Slots", source: "https://3oaks.com/game/coin_volcano", verifiedAt },
  "3-oaks-gaming-gold-nuggets": { gameType: "Slots", source: "https://3oaks.com/game/gold_nuggets", verifiedAt },
  "3-oaks-gaming-golden-teapot": { gameType: "Slots", source: "https://3oaks.com/game/golden_teapot", verifiedAt },
  "3-oaks-gaming-grab-more-gold": { gameType: "Slots", source: "https://3oaks.com/game/grab_more_gold", verifiedAt },
  "3-oaks-gaming-grab-the-gold": { gameType: "Slots", source: "https://3oaks.com/game/grab_the_gold", verifiedAt },
  "3-oaks-gaming-green-chilli-2": { gameType: "Slots", source: "https://3oaks.com/game/green_chilli_2", verifiedAt },
  "3-oaks-gaming-hit-more-gold": { gameType: "Slots", source: "https://3oaks.com/game/hit_more_gold", verifiedAt },
  "3-oaks-gaming-lava-coins-2": { gameType: "Slots", source: "https://3oaks.com/game/lava_coins_2", verifiedAt },
  "3-oaks-gaming-little-farm": { gameType: "Slots", source: "https://3oaks.com/game/little_farm", verifiedAt },
  "3-oaks-gaming-magic-apple-2": { gameType: "Slots", source: "https://3oaks.com/game/magic_apple_2", verifiedAt },
  "3-oaks-gaming-magic-clovers": { gameType: "Slots", source: "https://3oaks.com/game/magic_clovers", verifiedAt },
  "3-oaks-gaming-more-magic-apple": { gameType: "Slots", source: "https://3oaks.com/game/more_magic_apple", verifiedAt },
  "3-oaks-gaming-rush-for-gold": { gameType: "Slots", source: "https://3oaks.com/game/rush_for_gold", verifiedAt },
  "3-oaks-gaming-sky-pearls": { gameType: "Slots", source: "https://3oaks.com/game/sky_pearls", verifiedAt },
  "3-oaks-gaming-space-coins": { gameType: "Slots", source: "https://3oaks.com/game/space_coins", verifiedAt },
  "3-oaks-gaming-sun-of-egypt-2": { gameType: "Slots", source: "https://3oaks.com/game/sun_of_egypt_2", verifiedAt },
  "3-oaks-gaming-sun-of-egypt-3": { gameType: "Slots", source: "https://3oaks.com/game/sun_of_egypt_3", verifiedAt },
  "3-oaks-gaming-super-hot-chilli": { gameType: "Slots", source: "https://3oaks.com/game/super_hot_chilli", verifiedAt },
  "3-oaks-gaming-super-hotfire-diamonds": { gameType: "Slots", source: "https://3oaks.com/game/super_hotfire_diamonds", verifiedAt },
  "3-oaks-gaming-super-sticky-piggy": { gameType: "Slots", source: "https://3oaks.com/game/super_sticky_piggy", verifiedAt },
  "3-oaks-gaming-supreme-diamond-xxl": { gameType: "Slots", source: "https://3oaks.com/game/supreme_diamond_xxl", verifiedAt },
  "3-oaks-gaming-thunder-tiger": { gameType: "Slots", source: "https://3oaks.com/game/thunder_tiger", verifiedAt },
  "3-oaks-gaming-tiger-gems": { gameType: "Slots", source: "https://3oaks.com/game/tiger_gems", verifiedAt },
};

export function getVerifiedCatalogGameType3OaksScore6(slug: string) {
  return records[slug];
}
