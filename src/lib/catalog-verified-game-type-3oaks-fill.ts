import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-18";

type SourcedGameType = CatalogVerifiedGameType & {
  evidenceSource?: string;
};

const entries: Record<string, SourcedGameType> = {
  "3-oaks-gaming-15-dragon-pearls": { gameType: "Slots", source: "https://3oaks.com/game/15_dragon_pearls", verifiedAt },
  "3-oaks-gaming-3-african-drums": { gameType: "Slots", source: "https://3oaks.com/game/3_african_drums", verifiedAt },
  "3-oaks-gaming-3-aztec-temples": { gameType: "Slots", source: "https://3oaks.com/game/3_aztec_temples", verifiedAt },
  "3-oaks-gaming-3-china-pots": { gameType: "Slots", source: "https://3oaks.com/game/3_china_pots", verifiedAt },
  "3-oaks-gaming-3-clover-pots": { gameType: "Slots", source: "https://3oaks.com/game/3_clover_pots", verifiedAt },
  "3-oaks-gaming-3-clover-pots-extra": { gameType: "Slots", source: "https://3oaks.com/game/3_clover_pots_extra", verifiedAt },
  "3-oaks-gaming-3-coins": { gameType: "Slots", source: "https://3oaks.com/game/3_coins", verifiedAt },
  "3-oaks-gaming-3-egypt-chests": { gameType: "Slots", source: "https://3oaks.com/game/3_egypt_chests", verifiedAt },
  "3-oaks-gaming-3-pots-of-egypt": { gameType: "Slots", source: "https://3oaks.com/game/3_pots_of_egypt", verifiedAt },
  "3-oaks-gaming-4-african-drums": { gameType: "Slots", source: "https://3oaks.com/game/4_african_drums", verifiedAt },
  "3-oaks-gaming-777-gems-respin": { gameType: "Slots", source: "https://3oaks.com/game/777_gems_respin", verifiedAt },
  "3-oaks-gaming-aztec-fire": { gameType: "Slots", source: "https://3oaks.com/game/aztec_fire", verifiedAt },
  "3-oaks-gaming-aztec-sun": { gameType: "Slots", source: "https://3oaks.com/game/aztec_sun", verifiedAt },
  "3-oaks-gaming-big-heist": { gameType: "Slots", source: "https://3oaks.com/game/big_heist", verifiedAt },
  "3-oaks-gaming-black-wolf": { gameType: "Slots", source: "https://3oaks.com/game/black_wolf", verifiedAt },
  "3-oaks-gaming-black-wolf-2": { gameType: "Slots", source: "https://3oaks.com/game/black_wolf_2", verifiedAt },
  "3-oaks-gaming-book-of-sun-multichance": { gameType: "Slots", source: "https://3oaks.com/game/book_of_sun_multichance", verifiedAt },
  "3-oaks-gaming-chili-coins": { gameType: "Slots", source: "https://3oaks.com/game/chili_coins", verifiedAt },
  "3-oaks-gaming-coin-express": { gameType: "Slots", source: "https://3oaks.com/game/coin_express", verifiedAt },
  "3-oaks-gaming-dragon-pearls": { gameType: "Slots", source: "https://3oaks.com/game/dragon_pearls", verifiedAt },
  "3-oaks-gaming-egypt-fire-2": { gameType: "Slots", source: "https://3oaks.com/game/egypt_fire_2", verifiedAt },
  "3-oaks-gaming-fishin-bear": { gameType: "Slots", source: "https://3oaks.com/game/fishing_bear", verifiedAt },
  "3-oaks-gaming-fortune-globe": { gameType: "Slots", source: "https://3oaks.com/game/fortune_globe", verifiedAt },
  "3-oaks-gaming-gold-express": { gameType: "Slots", source: "https://3oaks.com/game/gold_express", verifiedAt },
  "3-oaks-gaming-green-chilli": { gameType: "Slots", source: "https://3oaks.com/game/green_chilli", verifiedAt },
  "3-oaks-gaming-hot-fire-fruits": { gameType: "Slots", source: "https://3oaks.com/game/hot_fire_fruits", verifiedAt },
  "3-oaks-gaming-lady-fortune": { gameType: "Slots", source: "https://3oaks.com/game/lady_fortune", verifiedAt },
  "3-oaks-gaming-3-jewel-crowns": { gameType: "Slots", source: "https://3oaks.com/game/3_jewel_crowns", verifiedAt },
  "3-oaks-gaming-buddha-megaways": { gameType: "Slots", source: "https://3oaks.com/game/buddha_megaways", verifiedAt },
  "3-oaks-gaming-coin-princess-x1000": { gameType: "Slots", source: "https://3oaks.com/game/coin_princess_x1000", verifiedAt },
  "3-oaks-gaming-joker-glitz-x1000": {
    gameType: "Slots",
    source: "https://3oaks.com/game/joker_glitz_x1000",
    evidenceSource: "https://www.3oaks.com/",
    verifiedAt,
  },
  "3-oaks-gaming-lucky-apple-x1000": {
    gameType: "Slots",
    source: "https://3oaks.com/game/lucky_apple_x1000",
    evidenceSource: "https://3oaks.com/news/new-release-lucky-apple-x1000",
    verifiedAt,
  },
  "3-oaks-gaming-lucky-penny": { gameType: "Slots", source: "https://3oaks.com/game/lucky_penny", verifiedAt },
  "3-oaks-gaming-lucky-penny-2": {
    gameType: "Slots",
    source: "https://3oaks.com/game/lucky_penny_2",
    evidenceSource: "https://3oaks.com/news/new-partnership-eurobet",
    verifiedAt,
  },
  "3-oaks-gaming-lucky-penny-power-scatter": {
    gameType: "Slots",
    source: "https://3oaks.com/game/lucky_penny_powerscatter",
    evidenceSource: "https://3oaks.com/news/new-release-lucky-penny-power-scatter",
    verifiedAt,
  },
  "3-oaks-gaming-super-china-pots": {
    gameType: "Slots",
    source: "https://3oaks.com/game/super_china_pots",
    evidenceSource: "https://3oaks.com/news/new-release-super-china-pots",
    verifiedAt: "2026-09-19",
  },
};

export function getVerifiedCatalogGameType3OaksFill(slug: string) {
  return entries[slug];
}
