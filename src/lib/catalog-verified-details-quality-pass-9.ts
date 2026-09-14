import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-14";

const details: Record<string, CatalogVerifiedDetails> = {
  "3-oaks-gaming-15-dragon-pearls": { field: "5×3 · 25 линий", releaseDate: "2020-08", source: "https://3oaks.com/game/15_dragon_pearls", verifiedAt },
  "3-oaks-gaming-3-african-drums": { field: "5×3 · 25 линий", releaseDate: "2025-01", source: "https://3oaks.com/game/3_african_drums", verifiedAt },
  "3-oaks-gaming-3-aztec-temples": { field: "5×3 · 25 линий", releaseDate: "2025-04", source: "https://3oaks.com/game/3_aztec_temples", verifiedAt },
  "3-oaks-gaming-3-china-pots": { field: "5×3 · 25 линий", releaseDate: "2024-04", source: "https://3oaks.com/game/3_china_pots", verifiedAt },
  "3-oaks-gaming-3-clover-pots": { field: "5×3 · 25 линий", releaseDate: "2024-03", source: "https://3oaks.com/game/3_clover_pots", verifiedAt },
  "3-oaks-gaming-3-clover-pots-extra": { field: "5×4 · 30 линий", releaseDate: "2025-03", source: "https://3oaks.com/game/3_clover_pots_extra", verifiedAt },
  "3-oaks-gaming-3-coins": { field: "3×3 · 5 линий", releaseDate: "2021-01", source: "https://3oaks.com/game/3_coins", verifiedAt },
  "3-oaks-gaming-3-egypt-chests": { field: "5×3 · 10 линий", releaseDate: "2024-02", source: "https://3oaks.com/game/3_egypt_chests", verifiedAt },
  "3-oaks-gaming-3-hot-teapots": { field: "5×3 · 25 линий", releaseDate: "2025-04", source: "https://3oaks.com/game/3_hot_teapots", verifiedAt },
  "3-oaks-gaming-3-lucky-sparks": { field: "5×3 · 25 линий", releaseDate: "2026-06", source: "https://3oaks.com/game/3_lucky_sparks", verifiedAt },
};

export function getCatalogVerifiedDetailsQualityPass9(slug: string) {
  return details[slug];
}
