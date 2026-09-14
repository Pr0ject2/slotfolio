import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-14";

const details: Record<string, CatalogVerifiedDetails> = {
  "3-oaks-gaming-coin-princess-x1000": { field: "6×5 · Scatter Pays", releaseDate: "2025-06", source: "https://3oaks.com/game/coin_princess_x1000", verifiedAt },
  "3-oaks-gaming-lady-fortune": { field: "6×5 · Scatter Pays · каскады", releaseDate: "2023-07", source: "https://3oaks.com/game/lady_fortune", verifiedAt },
};

export function getCatalogVerifiedDetailsQualityPass12(slug: string) {
  return details[slug];
}
