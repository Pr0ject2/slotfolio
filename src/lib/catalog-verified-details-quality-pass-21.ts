import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-14";

type SourcedCatalogVerifiedDetails = CatalogVerifiedDetails & {
  fieldSource?: string;
};

const details: Record<string, SourcedCatalogVerifiedDetails> = {
  "playn-go-house-of-doom-2-the-crypt": {
    field: "5×3 · 20 линий",
    releaseDate: "2021-03-11",
    source: "https://www.playngo.com/games/house-of-doom-2%3A-the-crypt",
    fieldSource: "https://www.playngo.com/post/topfive-halloween-games",
    verifiedAt,
  },
  "playn-go-hugos-adventure": {
    field: "5 барабанов · 10 линий",
    releaseDate: "2019-09-05",
    source: "https://www.playngo.com/games/hugo's-adventure",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsQualityPass21(slug: string) {
  return details[slug];
}
