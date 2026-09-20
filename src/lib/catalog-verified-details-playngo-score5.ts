import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-20";

const values: Record<string, CatalogVerifiedDetails> = {
  "playn-go-raging-rex-2": {
    field: "6×4 · 4096 способов",
    maxWin: "30 000x",
    source: "https://www.playngo.com/post/raging-rex-2",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoScore5(slug: string) {
  return values[slug];
}
