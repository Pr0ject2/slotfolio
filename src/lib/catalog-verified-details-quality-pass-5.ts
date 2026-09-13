import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-13";

const details: Record<string, CatalogVerifiedDetails> = {
  "3-oaks-gaming-3-coin-volcanoes": { field: "4×3 · 2 линии", releaseDate: "2024-11", source: "https://3oaks.com/game/3_coin_volcanoes", verifiedAt },
  "3-oaks-gaming-3-jewel-crowns": { field: "3 барабана", releaseDate: "2025-06", source: "https://3oaks.com/game/3_jewel_crowns", verifiedAt },
  "3-oaks-gaming-coin-up-lightning": { field: "3×3", releaseDate: "2024-07", source: "https://3oaks.com/game/coin_lightning", verifiedAt },
  "3-oaks-gaming-coin-volcano": { field: "3×3", releaseDate: "2023-08", source: "https://3oaks.com/game/coin_volcano", verifiedAt },
  "3-oaks-gaming-dj-tiger-x1000": { field: "6×5", releaseDate: "2026-03", source: "https://3oaks.com/game/dj_tiger_x1000", verifiedAt },
  "3-oaks-gaming-egypt-power-x1000": { field: "6×5", maxWin: "40000x", releaseDate: "2025-11", source: "https://3oaks.com/game/egypt_power_x1000", verifiedAt },
  "3-oaks-gaming-joker-glitz-x1000": { field: "6×5", releaseDate: "2026-06", source: "https://3oaks.com/game/joker_glitz_x1000", verifiedAt },
  "3-oaks-gaming-magic-apple-2": { field: "5×4 · 20 линий", releaseDate: "2022-06", source: "https://3oaks.com/game/magic_apple_2", verifiedAt },
  "3-oaks-gaming-sunlight-princess": { field: "5×3 · 30 линий", releaseDate: "2023-02", source: "https://3oaks.com/game/sunlight_princess", verifiedAt },
};

export function getCatalogVerifiedDetailsQualityPass5(slug: string) {
  return details[slug];
}
