import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ThreeOaksFill3Overlay = Partial<Pick<CatalogVerifiedDetails, "releaseDate">> & {
  verifiedAt: string;
  releaseDateSource: string;
};

const details: Record<string, ThreeOaksFill3Overlay> = {
  "3-oaks-gaming-3-super-coin-volcanoes": {
    releaseDate: "2026-01-26",
    releaseDateSource: "https://3oaks.com/news/new-release-3-super-coin-volcanoes",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-3-super-hot-chillies": {
    releaseDate: "2025-05-08",
    releaseDateSource: "https://3oaks.com/news/new-release-3-super-hot-chillies",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-3-olymp-fortunes": {
    releaseDate: "2026-04-16",
    releaseDateSource: "https://3oaks.com/news/new-release-3-olymp-fortunes",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-3-lucky-sparks": {
    releaseDate: "2026-06-04",
    releaseDateSource: "https://3oaks.com/news/new-release-3-lucky-sparks",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-4-clover-pots": {
    releaseDate: "2026-06-11",
    releaseDateSource: "https://3oaks.com/news/new-release-4-clover-pots",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-4-fairy-flowers": {
    releaseDate: "2026-03-19",
    releaseDateSource: "https://3oaks.com/news/new-release-4-fairy-flowers",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-4-pots-of-egypt": {
    releaseDate: "2025-12-04",
    releaseDateSource: "https://3oaks.com/news/new-release-4-pots-of-gold",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-777-fruity-coins": {
    releaseDate: "2025-07-03",
    releaseDateSource: "https://3oaks.com/news/new-release-777-fruity-coins",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-4-wolf-drums": {
    releaseDate: "2026-02-19",
    releaseDateSource: "https://3oaks.com/news/new-release-4-wolf-drums",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-amazonia-wins": {
    releaseDate: "2025-07-10",
    releaseDateSource: "https://3oaks.com/news/new-release-amazonia-wins",
    verifiedAt: "2026-09-18",
  },
};

export function getCatalogVerifiedDetails3OaksFill3(slug: string) {
  return details[slug];
}
