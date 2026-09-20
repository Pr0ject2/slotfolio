import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type PlayngoScore6Details = Pick<CatalogVerifiedDetails, "source" | "verifiedAt" | "field">;

const verifiedAt = "2026-09-20";

const details: Record<string, PlayngoScore6Details> = {
  "playn-go-hotel-yeti-way": {
    field: "4096 способов",
    source: "https://www.playngo.com/games/hotel-yeti-way",
    verifiedAt,
  },
  "playn-go-mystery-joker-6000": {
    field: "3×3",
    source: "https://www.playngo.com/games/mystery-joker-6000",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoScore6(slug: string) {
  return details[slug];
}
