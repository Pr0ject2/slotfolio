import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type EndorphinaScore4Overlay = Partial<Pick<CatalogVerifiedDetails, "maxWin" | "releaseDate">> &
  Pick<CatalogVerifiedDetails, "source" | "verifiedAt"> & {
    releaseDateSource?: string;
    maxWinSource?: string;
  };

const verifiedAt = "2026-09-18";
const verifiedAtLatest = "2026-09-24";

const details: Record<string, EndorphinaScore4Overlay> = {
  "endorphina-3-golden-chests": {
    releaseDate: "2026-09-03",
    source: "https://endorphina.com/games/3-golden-chests/play",
    releaseDateSource: "https://endorphina.com/news/think-inside-the-box-in-endorphinas-3-golden-chests",
    verifiedAt: "2026-09-20",
  },
  "endorphina-burning-coins-100": {
    releaseDate: "2026-07-01",
    source: "https://endorphina.com/games/burning-coins-100/play",
    releaseDateSource: "https://endorphina.com/news/firefighters-wanted-in-endorphinas-burning-coins-100",
    verifiedAt,
  },
  "endorphina-burning-coins-20-dice": {
    maxWin: "1500x",
    releaseDate: "2026-07-31",
    source: "https://endorphina.com/games/burning-coins-20-dice/play",
    maxWinSource: "https://slotcatalog.com/en/slots/burning-coins-20-dice",
    releaseDateSource: "https://slotcatalog.com/en/slots/burning-coins-20-dice",
    verifiedAt: verifiedAtLatest,
  },
  "endorphina-chance-machine-90s": {
    maxWin: "2500x",
    releaseDate: "2026-06-15",
    source: "https://endorphina.com/games/chance-machine-90s/play",
    maxWinSource: "https://marvn.ai/discover/slots/chance-machine-90s",
    releaseDateSource: "https://endorphina.com/news/its-balkan-bling-time-in-endorphinas-chance-machine-90s",
    verifiedAt: verifiedAtLatest,
  },
  "endorphina-druids-fortune": {
    releaseDate: "2026-06-18",
    source: "https://endorphina.com/games/druids-fortune/play",
    releaseDateSource: "https://endorphina.com/news/expect-magical-moments-in-druids-fortune",
    verifiedAt,
  },
  "endorphina-fortune-bankers": {
    maxWin: "25000x",
    releaseDate: "2026-06-10",
    source: "https://endorphina.com/games/fortune-bankers/play",
    maxWinSource: "https://slotcatalog.com/en/slots/fortune-bankers",
    releaseDateSource: "https://endorphina.com/news/pigs-can-fly-in-endorphinas-fortune-bankers",
    verifiedAt: verifiedAtLatest,
  },
  "endorphina-fortune-chests-dice": {
    maxWin: "1500x",
    releaseDate: "2026-09-07",
    source: "https://endorphina.com/games/fortune-chests-dice/play",
    maxWinSource: "https://slotcatalog.com/en/slots/fortune-chests-dice",
    releaseDateSource: "https://slotcatalog.com/en/slots/fortune-chests-dice",
    verifiedAt: verifiedAtLatest,
  },
  "endorphina-gift-of-midas": {
    maxWin: "6500x",
    releaseDate: "2026-07-30",
    source: "https://endorphina.com/games/gift-of-midas/play",
    maxWinSource: "https://slotcatalog.com/en/slots/gift-of-midas",
    releaseDateSource: "https://endorphina.com/news/get-in-touch-with-endorphinas-gift-of-midas",
    verifiedAt: verifiedAtLatest,
  },
  "endorphina-groovin-tiger": {
    maxWin: "1000x",
    releaseDate: "2026-08-13",
    source: "https://endorphina.com/games/groovin-tiger/play",
    maxWinSource: "https://slotcatalog.com/en/slots/grooving-tiger",
    releaseDateSource: "https://endorphina.com/news/endorphinas-groovin-tiger-is-grrrrrr-oooovy-baby",
    verifiedAt: verifiedAtLatest,
  },
  "endorphina-hell-hot-1000": {
    maxWin: "1000x",
    releaseDate: "2026-08-27",
    source: "https://endorphina.com/games/hell-hot-1000/play",
    releaseDateSource: "https://endorphina.com/news/fruit-is-on-fire-in-endorphinas-hell-hot-1000",
    verifiedAt,
  },
  "endorphina-moofo": {
    maxWin: "1500x",
    releaseDate: "2026-07-09",
    source: "https://endorphina.com/games/moofo/play",
    maxWinSource: "https://slotcatalog.com/en/slots/moofo",
    releaseDateSource: "https://endorphina.com/it/notizie/join-the-space-race-in-endorphinas-moofo",
    verifiedAt: verifiedAtLatest,
  },
  "endorphina-zalatar": {
    maxWin: "6600x",
    releaseDate: "2026-07-15",
    source: "https://endorphina.com/games/zalatar/play",
    maxWinSource: "https://slotcatalog.com/en/slots/zalatar",
    releaseDateSource: "https://endorphina.com/news/find-fortune-telling-tales-in-endorphinas-zalatar",
    verifiedAt: verifiedAtLatest,
  },
};

export function getCatalogVerifiedDetailsEndorphinaScore4Fill(slug: string) {
  return details[slug];
}
