import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-20";

const sources: Record<string, string> = {
  "wazdan-12-bells": "https://wazdan.com/games/12-bells",
  "wazdan-9-tigers": "https://wazdan.com/games/9-tigers",
  "wazdan-bars7s": "https://wazdan.com/games/bars7s",
  "wazdan-beach-party": "https://wazdan.com/games/beach-party",
  "wazdan-bell-wizard": "https://wazdan.com/games/bell-wizard",
  "wazdan-bells-of-fortune": "https://wazdan.com/games/bells-of-fortune",
  "wazdan-black-hawk-deluxe": "https://wazdan.com/games/black-hawk-deluxe",
  "wazdan-criss-cross-81": "https://wazdan.com/games/criss-cross-81",
  "wazdan-fenix-play": "https://wazdan.com/games/fenix-play",
  "wazdan-hot-slot-777-cash-out-extremely-light": "https://wazdan.com/games/hot-slot-777-cash-out-extremely-light",
  "wazdan-hot-slot-777-cash-out-grand-diamond-edition": "https://wazdan.com/games/hot-slot-777-cash-out-grand-diamond-edition",
  "wazdan-hot-slot-777-cash-out-grand-gold-edition": "https://wazdan.com/games/hot-slot-777-cash-out-grand-gold-edition",
  "wazdan-hot-slot-777-cash-out-grand-platinum-edition": "https://wazdan.com/games/hot-slot-777-cash-out-grand-platinum-edition",
  "wazdan-hot-slot-777-coins": "https://wazdan.com/games/hot-slot-777-coins",
  "wazdan-hot-slot-777-coins-extremely-light": "https://wazdan.com/games/hot-slot-777-coins-extremely-light",
  "wazdan-hot-slot-777-hold-the-jackpot": "https://wazdan.com/games/hot-slot-777-hold-the-jackpot",
  "wazdan-hot-slot-777-stars": "https://wazdan.com/games/hot-slot-777-stars",
  "wazdan-hot-slot-great-book-of-magic": "https://wazdan.com/games/hot-slot-great-book-of-magic",
  "wazdan-jack-on-hold": "https://wazdan.com/games/jack-on-hold",
  "wazdan-jackpot-builders": "https://wazdan.com/games/jackpot-builders",
  "wazdan-lucky-reels": "https://wazdan.com/games/lucky-reels",
  "wazdan-magic-hot-4-deluxe": "https://wazdan.com/games/magic-hot-4-deluxe",
  "wazdan-magic-stars-3": "https://wazdan.com/games/magic-stars-3",
  "wazdan-magic-stars-5": "https://wazdan.com/games/magic-stars-5",
  "wazdan-magic-stars-6": "https://wazdan.com/games/magic-stars-6",
  "wazdan-magic-target": "https://wazdan.com/games/magic-target",
  "wazdan-magic-target-deluxe": "https://wazdan.com/games/magic-target-deluxe",
  "wazdan-mayan-ritual": "https://wazdan.com/games/mayan-ritual",
  "wazdan-miami-beach": "https://wazdan.com/games/miami-beach",
  "wazdan-midnight-in-tokyo": "https://wazdan.com/games/midnight-in-tokyo",
  "wazdan-mighty-hot-777": "https://wazdan.com/games/mighty-hot-777",
  "wazdan-mystery-jack-deluxe": "https://wazdan.com/games/mystery-jack-deluxe",
  "wazdan-mystery-kingdom-mystery-bells": "https://wazdan.com/games/mystery-kingdom-mystery-bells",
  "wazdan-night-club-81": "https://wazdan.com/games/night-club-81",
  "wazdan-prosperity-reels": "https://wazdan.com/games/prosperity-reels",
  "wazdan-reel-hero": "https://wazdan.com/games/reel-hero",
  "wazdan-reel-joke": "https://wazdan.com/games/reel-joke",
  "wazdan-sizzling-bells": "https://wazdan.com/games/sizzling-bells",
  "wazdan-sizzling-eggs": "https://wazdan.com/games/sizzling-eggs",
  "wazdan-sizzling-eggs-extremely-light": "https://wazdan.com/games/sizzling-eggs-extremely-light",
  "wazdan-sizzling-kingdom-bison": "https://wazdan.com/games/sizzling-kingdom-bison",
  "wazdan-telly-reels": "https://wazdan.com/games/telly-reels",
  "wazdan-valentines-coins": "https://wazdan.com/games/valentines-coins",
  "wazdan-vegas-hot-81": "https://wazdan.com/games/vegas-hot-81",
  "wazdan-win-replay": "https://wazdan.com/games/win-replay",
};

const gameTypes = Object.fromEntries(
  Object.entries(sources).map(([slug, source]) => [slug, { gameType: "Slots", source, verifiedAt }]),
) as Record<string, CatalogVerifiedGameType>;

export function getVerifiedCatalogGameTypeWazdanWave5(slug: string) {
  return gameTypes[slug];
}
