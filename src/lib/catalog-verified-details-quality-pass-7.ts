import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-13";

const details: Record<string, CatalogVerifiedDetails> = {
  "bgaming-money-maker": {
    field: "3×1 · 1 линия",
    rtp: "97,00%",
    maxWin: "1 000x",
    volatility: "Низкая",
    releaseDate: "2026-06-10",
    source: "https://bgaming.com/games/money-maker",
    verifiedAt: "2026-09-24",
  },
  "endorphina-moofo": {
    field: "5×3 · 30 линий",
    rtp: "96,05%",
    volatility: "Высокая",
    source: "https://endorphina.com/games/moofo/play",
    verifiedAt,
  },
  "endorphina-zalatar": {
    field: "5×3 · 25 линий",
    rtp: "96,03%",
    volatility: "Высокая",
    source: "https://endorphina.com/games/zalatar/play",
    verifiedAt,
  },
  "playn-go-chinese-new-year": {
    field: "5×3",
    releaseDate: "2014-04-28",
    source: "https://www.playngo.com/games/chinese-new-year",
    verifiedAt,
  },
  "playn-go-lucky-diamonds": {
    field: "3 барабана · 1 линия",
    releaseDate: "2012-11-29",
    source: "https://www.playngo.com/games/lucky-diamonds",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsQualityPass7(slug: string) {
  return details[slug];
}
