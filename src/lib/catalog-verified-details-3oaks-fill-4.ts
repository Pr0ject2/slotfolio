import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetails3OaksPassportCloseout1 } from "./catalog-verified-details-3oaks-passport-closeout-1";
import { getCatalogVerifiedDetails3OaksPassportCloseout2 } from "./catalog-verified-details-3oaks-passport-closeout-2";
import { getCatalogVerifiedDetails3OaksPassportCloseout3 } from "./catalog-verified-details-3oaks-passport-closeout-3";
import { getCatalogVerifiedDetails3OaksPassportCloseout4 } from "./catalog-verified-details-3oaks-passport-closeout-4";
import { getCatalogVerifiedDetails3OaksPassportCloseout5 } from "./catalog-verified-details-3oaks-passport-closeout-5";
import { getCatalogVerifiedDetails3OaksPassportCloseout6 } from "./catalog-verified-details-3oaks-passport-closeout-6";

type ThreeOaksFill4Overlay = Partial<
  Pick<CatalogVerifiedDetails, "field" | "maxWin" | "volatility" | "releaseDate" | "source">
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
  "3-oaks-gaming-black-wolf-2": {
    field: "5×4 · 25 линий",
    releaseDate: "2023-08",
    source: "https://3oaks.com/game/black_wolf_2",
    releaseDateSource: "https://bng.games/game/black_wolf_2/?lang=en",
    verifiedAt: "2026-09-19",
  },
  "3-oaks-gaming-buddha-megaways": {
    releaseDate: "2021-12",
    releaseDateSource: "https://3oaks.com/game/buddha_megaways",
    verifiedAt: "2026-09-23",
  },
  "3-oaks-gaming-dragon-pearls": {
    maxWin: "1000x",
    releaseDate: "2019-03",
    source: "https://3oaks.com/game/dragon_pearls",
    releaseDateSource: "https://bng.games/game/dragon_pearls/",
    verifiedAt: "2026-09-19",
  },
  "3-oaks-gaming-egypt-power-x1000": {
    maxWin: "40000x",
    volatility: "Высокая",
    verifiedAt: "2026-09-18",
  },
  "3-oaks-gaming-hot-fire-fruits": {
    field: "3×3 · 5 линий",
    releaseDate: "2024-10-24",
    source: "https://3oaks.com/game/hot_fire_fruits",
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
  const legacy = details[slug];
  const closeout1 = getCatalogVerifiedDetails3OaksPassportCloseout1(slug);
  const closeout2 = getCatalogVerifiedDetails3OaksPassportCloseout2(slug);
  const closeout3 = getCatalogVerifiedDetails3OaksPassportCloseout3(slug);
  const closeout4 = getCatalogVerifiedDetails3OaksPassportCloseout4(slug);
  const closeout5 = getCatalogVerifiedDetails3OaksPassportCloseout5(slug);
  const closeout6 = getCatalogVerifiedDetails3OaksPassportCloseout6(slug);
  if (!legacy && !closeout1 && !closeout2 && !closeout3 && !closeout4 && !closeout5 && !closeout6) return undefined;
  return { ...legacy, ...closeout1, ...closeout2, ...closeout3, ...closeout4, ...closeout5, ...closeout6 };
}
