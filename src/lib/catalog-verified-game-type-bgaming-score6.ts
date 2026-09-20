import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-20";

const records: Record<string, CatalogVerifiedGameType> = {
  "bgaming-3-lucky-monkeys-hold-and-win": { gameType: "Slots", source: "https://bgaming.com/games/3-lucky-monkeys-hold-win", verifiedAt },
  "bgaming-alien-fruits-3": { gameType: "Slots", source: "https://bgaming.com/games/alien-fruits-3", verifiedAt },
  "bgaming-book-of-hidden-tombs": { gameType: "Slots", source: "https://bgaming.com/games/book-of-hidden-tombs", verifiedAt },
  "bgaming-chicken-fire": { gameType: "Slots", source: "https://bgaming.com/games/chicken-fire", verifiedAt },
  "bgaming-divine-queen-power-of-sun": { gameType: "Slots", source: "https://bgaming.com/games/divine-queen-power-of-sun", verifiedAt },
  "bgaming-dusty-duel": { gameType: "Slots", source: "https://bgaming.com/games/dusty-duel", verifiedAt },
  "bgaming-fortune-trio-minions-of-fu": { gameType: "Slots", source: "https://bgaming.com/games/fortune-trio-minions-of-fu", verifiedAt },
  "bgaming-frenzy-clusters": { gameType: "Slots", source: "https://bgaming.com/games/frenzy-clusters", verifiedAt },
  "bgaming-fruit-million-respin": { gameType: "Slots", source: "https://bgaming.com/games/fruit-million-respin", verifiedAt },
  "bgaming-johnny-vs-chicken": { gameType: "Slots", source: "https://bgaming.com/games/johnny-vs-chicken", verifiedAt },
  "bgaming-miss-cherry-wild-frames": { gameType: "Slots", source: "https://bgaming.com/games/miss-cherry-wild-frames", verifiedAt },
  "bgaming-money-maker": { gameType: "Slots", source: "https://bgaming.com/games/money-maker", verifiedAt },
  "bgaming-red-hot-chilli-chickens": { gameType: "Slots", source: "https://bgaming.com/games/red-hot-chilli-chickens", verifiedAt },
  "bgaming-reel-of-ra": { gameType: "Slots", source: "https://bgaming.com/games/reel-of-ra", verifiedAt },
  "bgaming-st-patricks-pots-hold-and-win": { gameType: "Slots", source: "https://bgaming.com/games/st-patricks-pots-hold-and-win", verifiedAt },
  "bgaming-stars-and-stripes-hold-and-win": { gameType: "Slots", source: "https://bgaming.com/games/stars-stripes-hold-and-win", verifiedAt },
  "bgaming-sweet-samurai": { gameType: "Slots", source: "https://bgaming.com/games/sweet-samurai", verifiedAt },
  "bgaming-the-godfather-3-pillars-of-power": { gameType: "Slots", source: "https://bgaming.com/games/the-godfather-3-pillars-of-power", verifiedAt },
  "bgaming-wincent-wolf": { gameType: "Slots", source: "https://bgaming.com/games/wincent-wolf", verifiedAt },
  "bgaming-yokai": { gameType: "Slots", source: "https://bgaming.com/games/yokai", verifiedAt },
};

export function getVerifiedCatalogGameTypeBgamingScore6(slug: string) {
  return records[slug];
}
