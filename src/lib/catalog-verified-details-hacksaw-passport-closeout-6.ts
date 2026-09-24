import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawPassportCloseout6 = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "releaseDate">
> & {
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  releaseDateSource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-24";

const details: Record<string, HacksawPassportCloseout6> = {
  "hacksaw-gaming-donny-and-danny": {
    field: "5×5 · 19 линий",
    rtp: "96,29% / 94,35% / 92,26% / 86,27%",
    maxWin: "12 500x",
    releaseDate: "2025-12-18",
    fieldSource: "https://bonkku.com/demos/donny-danny/",
    rtpSource: "https://bonkku.com/demos/donny-danny/",
    maxWinSource: "https://bonkku.com/demos/donny-danny/",
    releaseDateSource: "https://bonkku.com/demos/donny-danny/",
    verifiedAt,
  },
  "hacksaw-gaming-dorks-of-the-deep": {
    field: "5×4 · 14 линий",
    rtp: "96,20% / 94,22% / 91,21% / 89,19%",
    maxWin: "10 000x",
    releaseDate: "2025-03-13",
    fieldSource: "https://bonkku.com/demos/dorks-of-the-deep-demo/",
    rtpSource: "https://bonkku.com/demos/dorks-of-the-deep-demo/",
    maxWinSource: "https://bonkku.com/demos/dorks-of-the-deep-demo/",
    releaseDateSource: "https://bonkku.com/demos/dorks-of-the-deep-demo/",
    verifiedAt,
  },
  "hacksaw-gaming-duel-at-dawn": {
    field: "5×5 · 19 линий",
    rtp: "96,30% / 94,27% / 92,28% / 88,37%",
    maxWin: "15 000x",
    releaseDate: "2024-11-21",
    fieldSource: "https://bonkku.com/demos/duel-at-dawn/",
    rtpSource: "https://bonkku.com/demos/duel-at-dawn/",
    maxWinSource: "https://bonkku.com/demos/duel-at-dawn/",
    releaseDateSource: "https://bonkku.com/demos/duel-at-dawn/",
    verifiedAt,
  },
  "hacksaw-gaming-fighter-pit": {
    rtp: "96,30%",
    releaseDate: "2025-04-17",
    rtpSource: "https://bonkku.com/demos/fighter-pit-demo/",
    releaseDateSource: "https://bonkku.com/demos/fighter-pit-demo/",
    verifiedAt,
  },
  "hacksaw-gaming-get-the-cheese": {
    field: "6×5 · кластеры",
    rtp: "96,31% / 94,20% / 92,29% / 88,25%",
    maxWin: "10 000x",
    releaseDate: "2024-10-10",
    fieldSource: "https://bonkku.com/demos/get-the-cheese/",
    rtpSource: "https://bonkku.com/demos/get-the-cheese/",
    maxWinSource: "https://bonkku.com/demos/get-the-cheese/",
    releaseDateSource: "https://bonkku.com/demos/get-the-cheese/",
    verifiedAt,
  },
  "hacksaw-gaming-grug-make-fire": {
    field: "5×4 · 14 линий",
    releaseDate: "2026-07-09",
    fieldSource: "https://bonkku.com/demos/grug-make-fire/",
    releaseDateSource: "https://bonkku.com/demos/grug-make-fire/",
    verifiedAt,
  },
  "hacksaw-gaming-hounds-of-hell": {
    field: "5×5 · Scatter Pays",
    rtp: "96,27% / 94,16% / 92,26% / 88,14%",
    maxWin: "20 000x",
    releaseDate: "2025-02-20",
    fieldSource: "https://bonkku.com/demos/hounds-of-hell-demo/",
    rtpSource: "https://bonkku.com/demos/hounds-of-hell-demo/",
    maxWinSource: "https://bonkku.com/demos/hounds-of-hell-demo/",
    releaseDateSource: "https://bonkku.com/demos/hounds-of-hell-demo/",
    verifiedAt,
  },
  "hacksaw-gaming-le-cowboy": {
    field: "6×5 · кластеры",
    rtp: "96,28% / 94,31% / 92,30% / 86,33%",
    maxWin: "25 000x",
    releaseDate: "2025-11-06",
    fieldSource: "https://bonkku.com/demos/le-cowboy/",
    rtpSource: "https://bonkku.com/demos/le-cowboy/",
    maxWinSource: "https://bonkku.com/demos/le-cowboy/",
    releaseDateSource: "https://bonkku.com/demos/le-cowboy/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawPassportCloseout6(slug: string) {
  return details[slug];
}
