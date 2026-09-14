import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-14";

const details: Record<string, CatalogVerifiedDetails> = {
  "3-oaks-gaming-dancing-joker": { field: "5×3 · 40 линий", releaseDate: "2025-05", source: "https://3oaks.com/game/dancing_joker", verifiedAt },
  "3-oaks-gaming-egypt-fire-2": { field: "5×4 · 20 линий", releaseDate: "2025-10", source: "https://3oaks.com/game/egypt_fire_2", verifiedAt },
  "3-oaks-gaming-fishin-bear": { field: "5×3 · 25 линий", releaseDate: "2024-05", source: "https://3oaks.com/game/fishing_bear", verifiedAt },
  "3-oaks-gaming-fortune-globe": { field: "5×4 · 20 линий", releaseDate: "2024-10", source: "https://3oaks.com/game/fortune_globe", verifiedAt },
  "3-oaks-gaming-gold-express": { field: "5×4 · 20 линий", releaseDate: "2021-11", source: "https://3oaks.com/game/gold_express", verifiedAt },
  "3-oaks-gaming-golden-teapot": { field: "5×4 · 25 линий", releaseDate: "2024-07", source: "https://3oaks.com/game/golden_teapot", verifiedAt },
  "3-oaks-gaming-grab-more-gold": { field: "5×4 · 20 линий", releaseDate: "2023-11", source: "https://3oaks.com/game/grab_more_gold", verifiedAt },
  "3-oaks-gaming-grab-the-gold": { field: "5×3 · 20 линий", releaseDate: "2023-06", source: "https://3oaks.com/game/grab_the_gold", verifiedAt },
  "3-oaks-gaming-grand": { field: "5×3 · 5 линий", releaseDate: "2026-07", source: "https://3oaks.com/game/grand", verifiedAt },
  "3-oaks-gaming-green-chilli": { field: "5×3 · 20 линий", releaseDate: "2022-10", source: "https://3oaks.com/game/green_chilli", verifiedAt },
  "3-oaks-gaming-green-chilli-2": { field: "5×3 · 20 линий", releaseDate: "2023-09", source: "https://3oaks.com/game/green_chilli_2", verifiedAt },
  "3-oaks-gaming-hit-more-gold": { field: "5×4 · 25 линий", releaseDate: "2022-12", source: "https://3oaks.com/game/hit_more_gold", verifiedAt },
  "3-oaks-gaming-hit-the-gold": { field: "5×3 · 25 линий", releaseDate: "2021-06", source: "https://3oaks.com/game/hit_the_gold", verifiedAt },
  "3-oaks-gaming-hot-fire-fruits": { field: "3×3 · 5 линий", releaseDate: "2024-10", source: "https://3oaks.com/game/hot_fire_fruits", verifiedAt },
};

export function getCatalogVerifiedDetailsQualityPass11(slug: string) {
  return details[slug];
}
