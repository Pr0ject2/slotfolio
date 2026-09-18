import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-18";

const sources: Record<string, string> = {
  "3-oaks-gaming-15-dragon-pearls": "https://3oaks.com/game/15_dragon_pearls",
  "3-oaks-gaming-3-african-drums": "https://3oaks.com/game/3_african_drums",
  "3-oaks-gaming-3-aztec-temples": "https://3oaks.com/game/3_aztec_temples",
  "3-oaks-gaming-3-china-pots": "https://3oaks.com/game/3_china_pots",
  "3-oaks-gaming-3-clover-pots": "https://3oaks.com/game/3_clover_pots",
  "3-oaks-gaming-3-clover-pots-extra": "https://3oaks.com/game/3_clover_pots_extra",
  "3-oaks-gaming-3-coins": "https://3oaks.com/game/3_coins",
  "3-oaks-gaming-3-egypt-chests": "https://3oaks.com/game/3_egypt_chests",
  "3-oaks-gaming-3-pots-of-egypt": "https://3oaks.com/game/3_pots_of_egypt",
  "3-oaks-gaming-4-african-drums": "https://3oaks.com/game/4_african_drums",
  "3-oaks-gaming-777-gems-respin": "https://3oaks.com/game/777_gems_respin",
  "3-oaks-gaming-aztec-fire": "https://3oaks.com/game/aztec_fire",
  "3-oaks-gaming-aztec-sun": "https://3oaks.com/game/aztec_sun",
  "3-oaks-gaming-big-heist": "https://3oaks.com/game/big_heist",
  "3-oaks-gaming-black-wolf": "https://3oaks.com/game/black_wolf",
  "3-oaks-gaming-black-wolf-2": "https://3oaks.com/game/black_wolf_2",
  "3-oaks-gaming-book-of-sun-multichance": "https://3oaks.com/game/book_of_sun_multichance",
  "3-oaks-gaming-chili-coins": "https://3oaks.com/game/chili_coins",
  "3-oaks-gaming-coin-express": "https://3oaks.com/game/coin_express",
  "3-oaks-gaming-dragon-pearls": "https://3oaks.com/game/dragon_pearls",
  "3-oaks-gaming-egypt-fire-2": "https://3oaks.com/game/egypt_fire_2",
  "3-oaks-gaming-fishin-bear": "https://3oaks.com/game/fishing_bear",
  "3-oaks-gaming-fortune-globe": "https://3oaks.com/game/fortune_globe",
  "3-oaks-gaming-gold-express": "https://3oaks.com/game/gold_express",
  "3-oaks-gaming-green-chilli": "https://3oaks.com/game/green_chilli",
  "3-oaks-gaming-hot-fire-fruits": "https://3oaks.com/game/hot_fire_fruits",
  "3-oaks-gaming-lady-fortune": "https://3oaks.com/game/lady_fortune",
  "3-oaks-gaming-3-jewel-crowns": "https://3oaks.com/game/3_jewel_crowns",
  "3-oaks-gaming-coin-princess-x1000": "https://3oaks.com/game/coin_princess_x1000",
  "3-oaks-gaming-joker-glitz-x1000": "https://www.3oaks.com/",
  "3-oaks-gaming-lucky-apple-x1000": "https://3oaks.com/news/new-release-lucky-apple-x1000",
  "3-oaks-gaming-lucky-penny": "https://3oaks.com/game/lucky_penny",
  "3-oaks-gaming-lucky-penny-2": "https://3oaks.com/news/new-partnership-eurobet",
  "3-oaks-gaming-lucky-penny-power-scatter": "https://3oaks.com/news/new-release-lucky-penny-power-scatter",
  "3-oaks-gaming-super-china-pots": "https://3oaks.com/news/new-release-super-china-pots",
};

const gameTypes = Object.fromEntries(
  Object.entries(sources).map(([slug, source]) => [slug, { gameType: "Slots", source, verifiedAt }]),
) as Record<string, CatalogVerifiedGameType>;

export function getVerifiedCatalogGameType3OaksFill(slug: string) {
  return gameTypes[slug];
}
