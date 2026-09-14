import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-14";

type SourcedCatalogVerifiedDetails = CatalogVerifiedDetails & {
  fieldSource?: string;
};

const details: Record<string, SourcedCatalogVerifiedDetails> = {
  "playn-go-legacy-of-egypt": {
    field: "5 барабанов · 30 линий",
    releaseDate: "2018-04-24",
    source: "https://www.playngo.com/games/legacy-of-egypt",
    fieldSource: "https://www.playngo.com/posts/play-n-go-unearths-new-legacy-of-egypt-slot",
    verifiedAt,
  },
  "playn-go-legion-gold-unleashed": {
    field: "5×3 · 25 линий",
    releaseDate: "2024-02-29",
    source: "https://www.playngo.com/games/legion-gold-unleashed",
    fieldSource: "https://www.playngo.com/posts/legion-gold-unleashed-online-slot-review",
    verifiedAt,
  },
  "playn-go-legion-gold-and-the-sphinx-of-dead": {
    field: "5×3",
    releaseDate: "2024-10-31",
    source: "https://www.playngo.com/games/legion-gold-and-the-sphinx-of-dead",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsQualityPass23(slug: string) {
  return details[slug];
}
