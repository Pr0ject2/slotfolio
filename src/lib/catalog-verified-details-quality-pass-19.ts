import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-14";

type SourcedCatalogVerifiedDetails = CatalogVerifiedDetails & {
  fieldSource?: string;
};

const details: Record<string, SourcedCatalogVerifiedDetails> = {
  "playn-go-gold-of-fortune-god": {
    field: "5×3",
    releaseDate: "2024-06-06",
    source: "https://www.playngo.com/games/gold-of-fortune-god",
    fieldSource: "https://www.playngo.com/posts/gold-of-fortune-god",
    verifiedAt,
  },
  "playn-go-hot-dog-heist": {
    field: "5×3 · 40 линий",
    releaseDate: "2024-12-13",
    source: "https://www.playngo.com/games/hot-dog-heist",
    fieldSource: "https://www.playngo.com/post/hot-dog-heist",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsQualityPass19(slug: string) {
  return details[slug];
}
