import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-20";

const values: Record<string, Partial<CatalogVerifiedDetails>> = {
  "playn-go-monkey-battle-for-the-scrolls": {
    field: "5×3 · до 7776 способов",
  },
};

export function getCatalogVerifiedDetailsPlayngoScore6Wave(slug: string) {
  const value = values[slug];
  if (!value) return undefined;

  return {
    ...value,
    source: "https://www.playngo.com/games/monkey%3A-battle-for-the-scrolls",
    verifiedAt,
  };
}
