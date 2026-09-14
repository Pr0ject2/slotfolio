import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-14";

const details: Record<string, CatalogVerifiedDetails> = {
  "3-oaks-gaming-3-olymp-fortunes": { field: "5×3 · 25 линий", releaseDate: "2026-04", source: "https://3oaks.com/game/3_olymp_fortunes", verifiedAt },
  "3-oaks-gaming-3-pots-of-egypt": { field: "5×3 · 25 линий", releaseDate: "2024-10", source: "https://3oaks.com/game/3_pots_of_egypt", verifiedAt },
  "3-oaks-gaming-3-super-hot-chillies": { field: "5×3 · 25 линий", releaseDate: "2025-05", source: "https://3oaks.com/game/3_super_hot_chillies", verifiedAt },
  "3-oaks-gaming-4-african-drums": { field: "5×3 · 25 линий", releaseDate: "2025-11", source: "https://3oaks.com/game/4_african_drums", verifiedAt },
  "3-oaks-gaming-4-clover-pots": { field: "5×3 · 25 линий", releaseDate: "2026-06", source: "https://3oaks.com/game/4_clover_pots", verifiedAt },
  "3-oaks-gaming-4-fairy-flowers": { field: "5×3 · 25 линий", releaseDate: "2026-03", source: "https://3oaks.com/game/4_fairy_flowers", verifiedAt },
  "3-oaks-gaming-4-pots-of-egypt": { field: "5×3 · 20 линий", releaseDate: "2025-12", source: "https://3oaks.com/game/4_pots_of_egypt", verifiedAt },
  "3-oaks-gaming-4-wolf-drums": { field: "5×3 · 25 линий", releaseDate: "2026-02", source: "https://3oaks.com/game/4_wolf_drums", verifiedAt },
  "3-oaks-gaming-777-fruity-coins": { field: "3×3 · 5 линий", releaseDate: "2025-07", source: "https://3oaks.com/game/777_fruity_coins", verifiedAt },
  "3-oaks-gaming-777-gems-respin": { field: "3×3 · 5 линий", releaseDate: "2019-12", source: "https://3oaks.com/game/777_gems_respin", verifiedAt },
  "3-oaks-gaming-amazonia-wins": { field: "5×3 · 25 линий", releaseDate: "2025-07", source: "https://3oaks.com/game/amazonia_wins", verifiedAt },
  "3-oaks-gaming-aztec-fire": { field: "5×4 · 20 линий", releaseDate: "2022-08", source: "https://3oaks.com/game/aztec_fire", verifiedAt },
  "3-oaks-gaming-aztec-fire-2": { field: "5×4 · 20 линий", releaseDate: "2023-12", source: "https://3oaks.com/game/aztec_fire_2", verifiedAt },
  "3-oaks-gaming-aztec-sun": { field: "5×3 · 25 линий", releaseDate: "2020-06", source: "https://3oaks.com/game/aztec_sun", verifiedAt },
  "3-oaks-gaming-big-heist": { field: "5×3 · 10 линий", releaseDate: "2022-09", source: "https://3oaks.com/game/big_heist", verifiedAt },
  "3-oaks-gaming-black-wolf": { field: "5×4 · 25 линий", releaseDate: "2021-12", source: "https://3oaks.com/game/black_wolf", verifiedAt },
  "3-oaks-gaming-black-wolf-2": { field: "5×4 · 25 линий", releaseDate: "2023-09", source: "https://3oaks.com/game/black_wolf_2", verifiedAt },
  "3-oaks-gaming-book-of-sun-multichance": { field: "5×3 · 10 линий", releaseDate: "2019-05", source: "https://3oaks.com/game/book_of_sun_multichance", verifiedAt },
  "3-oaks-gaming-chili-coins": { field: "3×3 · 5 линий", releaseDate: "2026-01", source: "https://3oaks.com/game/chili_coins", verifiedAt },
  "3-oaks-gaming-coin-express": { field: "5×3 · 5 линий", releaseDate: "2025-04", source: "https://3oaks.com/game/coin_express", verifiedAt },
};

export function getCatalogVerifiedDetailsQualityPass10(slug: string) {
  return details[slug];
}
