import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-13";

const sources: Record<string, string> = {
  "wazdan-beach-party-hot": "https://wazdan.com/games/beach-party-hot",
  "wazdan-black-horse": "https://wazdan.com/games/black-horse",
  "wazdan-black-horse-deluxe": "https://wazdan.com/games/black-horse-deluxe",
  "wazdan-book-of-faith": "https://wazdan.com/games/book-of-faith",
  "wazdan-burning-reels": "https://wazdan.com/games/burning-reels",
  "wazdan-burning-stars": "https://wazdan.com/games/burning-stars",
  "wazdan-captain-shark": "https://wazdan.com/games/captain-shark",
  "wazdan-clover-lady": "https://wazdan.com/games/clover-lady",
  "wazdan-colin-the-cat": "https://wazdan.com/games/colin-the-cat",
  "wazdan-corrida-romance": "https://wazdan.com/games/corrida-romance",
  "wazdan-corrida-romance-deluxe": "https://wazdan.com/games/corrida-romance-deluxe",
  "wazdan-crazy-cars": "https://wazdan.com/games/crazy-cars",
  "wazdan-demon-jack-27": "https://wazdan.com/games/demon-jack-27",
  "wazdan-dino-reels-81": "https://wazdan.com/games/dino-reels-81",
  "wazdan-draculas-castle": "https://wazdan.com/games/draculas-castle",
  "wazdan-dragons-lucky-8": "https://wazdan.com/games/dragons-lucky-8",
  "wazdan-fenix-play-27-deluxe": "https://wazdan.com/games/fenix-play-27-deluxe",
  "wazdan-fenix-play-deluxe": "https://wazdan.com/games/fenix-play-deluxe",
  "wazdan-fire-bird": "https://wazdan.com/games/fire-bird",
  "wazdan-fortune-reels": "https://wazdan.com/games/fortune-reels",
  "wazdan-fruit-fiesta": "https://wazdan.com/games/fruit-fiesta",
  "wazdan-hot-slot-777-diamond-crown": "https://wazdan.com/games/hot-slot-777-diamond-crown",
  "wazdan-hot-slot-777-gold-crown": "https://wazdan.com/games/hot-slot-777-gold-crown",
  "wazdan-hot-slot-777-platinum-crown": "https://wazdan.com/games/hot-slot-777-platinum-crown",
  "wazdan-hot-slot-777-rubies": "https://wazdan.com/games/hot-slot-777-rubies",
  "wazdan-hot-slot-777-rubies-extremely-light": "https://wazdan.com/games/hot-slot-777-rubies-extremely-light",
  "wazdan-hot-slot-777-stars-extremely-light": "https://wazdan.com/games/hot-slot-777-stars-extremely-light",
  "wazdan-hot-slot-gold-coins": "https://wazdan.com/games/hot-slot-gold-coins",
  "wazdan-hot-slot-magic-bombs": "https://wazdan.com/games/hot-slot-magic-bombs",
  "wazdan-lucky-9": "https://wazdan.com/games/lucky-9",
  "wazdan-lucky-fortune": "https://wazdan.com/games/lucky-fortune",
  "wazdan-lucky-queen": "https://wazdan.com/games/lucky-queen",
  "wazdan-magic-fruits": "https://wazdan.com/games/magic-fruits",
  "wazdan-magic-fruits-27": "https://wazdan.com/games/magic-fruits-27",
  "wazdan-magic-fruits-4": "https://wazdan.com/games/magic-fruits-4",
  "wazdan-magic-fruits-4-deluxe": "https://wazdan.com/games/magic-fruits-4-deluxe",
  "wazdan-magic-fruits-81": "https://wazdan.com/games/magic-fruits-81",
  "wazdan-magic-fruits-deluxe": "https://wazdan.com/games/magic-fruits-deluxe",
  "wazdan-magic-fruits-dice": "https://wazdan.com/games/magic-fruits-dice",
  "wazdan-mystery-jack": "https://wazdan.com/games/mystery-jack",
  "wazdan-sizzling-777": "https://wazdan.com/games/sizzling-777",
  "wazdan-sizzling-777-deluxe": "https://wazdan.com/games/sizzling-777-deluxe",
};

const gameTypes = Object.fromEntries(
  Object.entries(sources).map(([slug, source]) => [slug, { gameType: "Slots", source, verifiedAt }]),
) as Record<string, CatalogVerifiedGameType>;

export function getVerifiedCatalogGameTypeWazdanQualityPass4(slug: string) {
  return gameTypes[slug];
}
