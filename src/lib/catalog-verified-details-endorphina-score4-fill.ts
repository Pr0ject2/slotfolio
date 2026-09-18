import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type EndorphinaScore4Overlay = Partial<Pick<CatalogVerifiedDetails, "maxWin" | "releaseDate">> & {
  verifiedAt: string;
  releaseDateSource?: string;
};

const verifiedAt = "2026-09-18";

const details: Record<string, EndorphinaScore4Overlay> = {
  "endorphina-burning-coins-100": {
    releaseDate: "2026-07-01",
    releaseDateSource: "https://endorphina.com/news/firefighters-wanted-in-endorphinas-burning-coins-100",
    verifiedAt,
  },
  "endorphina-chance-machine-90s": {
    releaseDate: "2026-06-15",
    releaseDateSource: "https://endorphina.com/news/its-balkan-bling-time-in-endorphinas-chance-machine-90s",
    verifiedAt,
  },
  "endorphina-druids-fortune": {
    releaseDate: "2026-06-18",
    releaseDateSource: "https://endorphina.com/news/expect-magical-moments-in-druids-fortune",
    verifiedAt,
  },
  "endorphina-fortune-bankers": {
    releaseDate: "2026-06-10",
    releaseDateSource: "https://endorphina.com/news/pigs-can-fly-in-endorphinas-fortune-bankers",
    verifiedAt,
  },
  "endorphina-gift-of-midas": {
    releaseDate: "2026-07-30",
    releaseDateSource: "https://endorphina.com/news/get-in-touch-with-endorphinas-gift-of-midas",
    verifiedAt,
  },
  "endorphina-groovin-tiger": {
    releaseDate: "2026-08-13",
    releaseDateSource: "https://endorphina.com/news/endorphinas-groovin-tiger-is-grrrrrr-oooovy-baby",
    verifiedAt,
  },
  "endorphina-hell-hot-1000": {
    maxWin: "1000x",
    releaseDate: "2026-08-27",
    releaseDateSource: "https://endorphina.com/news/fruit-is-on-fire-in-endorphinas-hell-hot-1000",
    verifiedAt,
  },
  "endorphina-moofo": {
    releaseDate: "2026-07-09",
    releaseDateSource: "https://endorphina.com/it/notizie/join-the-space-race-in-endorphinas-moofo",
    verifiedAt,
  },
  "endorphina-zalatar": {
    releaseDate: "2026-07-15",
    releaseDateSource: "https://endorphina.com/news/find-fortune-telling-tales-in-endorphinas-zalatar",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsEndorphinaScore4Fill(slug: string) {
  return details[slug];
}
