import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ThreeOaksFill4Overlay = Partial<
  Pick<CatalogVerifiedDetails, "maxWin" | "volatility" | "releaseDate">
> & {
  verifiedAt: string;
  releaseDateSource?: string;
};

const details: Record<string, ThreeOaksFill4Overlay> = {
  "3-oaks-gaming-4-african-drums": {
    maxWin: "20000x",
    volatility: "Высокая",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-egypt-power-x1000": {
    maxWin: "40000x",
    volatility: "Высокая",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-hot-fire-fruits": {
    releaseDate: "2024-10-24",
    releaseDateSource: "https://3oaks.com/news/new-release-hot-fire-fruits",
    verifiedAt: "2026-09-19",
  },
  "3-oaks-gaming-magic-clovers": {
    releaseDate: "2025-08-14",
    releaseDateSource: "https://3oaks.com/news/new-release-magic-clovers",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-power-sun": {
    releaseDate: "2025-03-27",
    releaseDateSource: "https://3oaks.com/news/new-release-power-sun",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-power-sun-xxl": {
    releaseDate: "2025-10-02",
    releaseDateSource: "https://3oaks.com/news/new-release-power-sun-xxl",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-purple-diamond": {
    releaseDate: "2026-03-26",
    releaseDateSource: "https://3oaks.com/news/new-release-purple-diamond",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-rush-for-gold": {
    releaseDate: "2025-12-05",
    releaseDateSource: "https://3oaks.com/news/new-release-rush-for-gold",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-sky-pearls": {
    releaseDate: "2024-03-07",
    releaseDateSource: "https://3oaks.com/news/new-release-sky-pearls",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-space-coins": {
    releaseDate: "2025-05-22",
    releaseDateSource: "https://3oaks.com/news/new-release-space-coins",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-sun-of-egypt-4": {
    releaseDate: "2024-01-04",
    releaseDateSource: "https://3oaks.com/news/new-release-sun-of-egypt-4",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-sun-of-egypt-5": {
    releaseDate: "2025-09-25",
    releaseDateSource: "https://3oaks.com/news/new-release-sun-of-egypt-5",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-super-china-pots": {
    maxWin: "2000x",
    releaseDate: "2025-06-05",
    releaseDateSource: "https://3oaks.com/news/new-release-super-china-pots",
    verifiedAt: "2026-09-19",
  },
  "3-oaks-gaming-super-sticky-piggy": {
    releaseDate: "2024-06-06",
    releaseDateSource: "https://3oaks.com/news/new-release-super-sticky-piggy",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-supreme-diamond-xxl": {
    releaseDate: "2026-05-28",
    releaseDateSource: "https://3oaks.com/news/new-release-supreme-diamond-xxl",
    verifiedAt: "2026-09-18",
  },
};

export function getCatalogVerifiedDetails3OaksFill4(slug: string) {
  return details[slug];
}
