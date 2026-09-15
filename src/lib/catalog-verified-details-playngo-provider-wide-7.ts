import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-15";

type SourcedCatalogVerifiedDetails = CatalogVerifiedDetails & {
  fieldSource?: string;
  maxWinSource?: string;
};

const details: Record<string, SourcedCatalogVerifiedDetails> = {
  "playn-go-colt-lightning": {
    field: "5 барабанов · ряды 3-4-4-4-3",
    maxWin: "25000x",
    releaseDate: "2023-02-16",
    source: "https://www.playngo.com/games/colt-lightning",
    fieldSource: "https://www.playngo.com/post/popular-slot-games-2023",
    maxWinSource: "https://www.playngo.com/post/popular-slot-games-2023",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoProviderWide7(slug: string) {
  return details[slug];
}
