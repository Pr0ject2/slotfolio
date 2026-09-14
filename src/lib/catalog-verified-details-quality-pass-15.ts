import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ReleaseSourcedDetails = CatalogVerifiedDetails & {
  releaseDateSource: string;
};

const verifiedAt = "2026-09-14";

const details: Record<string, ReleaseSourcedDetails> = {
  "push-gaming-razor-shark-jackpots": {
    maxWin: "11007.70x",
    volatility: "Средняя",
    releaseDate: "2026-06-03",
    releaseDateSource:
      "https://www.pushgaming.com/blog/push-gaming-redefines-staple-slot-series-release-razor-shark-jackpots.html",
    source: "https://www.pushgaming.com/games/razor-shark-jackpots.html",
    verifiedAt,
  },
  "push-gaming-red-hot-multipliers": {
    maxWin: "2500x",
    volatility: "Низкая",
    releaseDate: "2026-02",
    releaseDateSource:
      "https://www.pushgaming.com/blog/reel-hot-games-continues-2026-momentum-release-diamonds-4-win.html",
    source: "https://www.pushgaming.com/games/red-hot-multipliers.html",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsQualityPass15(slug: string) {
  return details[slug];
}
