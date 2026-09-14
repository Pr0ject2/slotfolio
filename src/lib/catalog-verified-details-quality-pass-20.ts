import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-14";

type SourcedCatalogVerifiedDetails = CatalogVerifiedDetails & {
  fieldSource?: string;
};

const details: Record<string, SourcedCatalogVerifiedDetails> = {
  "playn-go-happy-halloween": {
    field: "5 барабанов · до 50 линий",
    releaseDate: "2015-10-14",
    source: "https://www.playngo.com/games/happy-halloween",
    verifiedAt,
  },
  "playn-go-house-of-doom": {
    field: "5 барабанов · 10 фиксированных линий",
    releaseDate: "2018-03-12",
    source: "https://www.playngo.com/games/house-of-doom",
    fieldSource: "https://www.playngo.com/posts/play-n-go-top-charts-with-musical-masterpiece-house-of-doom",
    verifiedAt,
  },
  "playn-go-hugo-2": {
    field: "5 барабанов · 10 линий",
    releaseDate: "2017-11-22",
    source: "https://www.playngo.com/games/hugo-2",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsQualityPass20(slug: string) {
  return details[slug];
}
