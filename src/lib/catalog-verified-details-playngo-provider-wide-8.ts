import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-15";

type SourcedCatalogVerifiedDetails = CatalogVerifiedDetails & {
  fieldSource?: string;
};

const details: Record<string, SourcedCatalogVerifiedDetails> = {
  "playn-go-highway-legends": {
    field: "5 барабанов",
    releaseDate: "2023-05-18",
    source: "https://www.playngo.com/games/highway-legends",
    fieldSource: "https://www.playngo.com/post/playngo-plot-a-prize-hunting-heis-in-highway-legends",
    verifiedAt,
  },
  "playn-go-enchanted-meadow": {
    field: "5 барабанов",
    releaseDate: "2012-10-01",
    source: "https://www.playngo.com/games/enchanted-meadow",
    fieldSource: "https://www.playngo.com/posts/top-summer-themed-slots-to-play-in-2023",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoProviderWide8(slug: string) {
  return details[slug];
}
