import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ThreeOaksFill4Overlay = Partial<Pick<CatalogVerifiedDetails, "releaseDate">> & {
  verifiedAt: string;
  releaseDateSource: string;
};

const details: Record<string, ThreeOaksFill4Overlay> = {
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
};

export function getCatalogVerifiedDetails3OaksFill4(slug: string) {
  return details[slug];
}
