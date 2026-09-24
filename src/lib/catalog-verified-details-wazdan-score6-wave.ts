import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type WazdanScore6Values = Partial<Pick<CatalogVerifiedDetails, "field" | "maxWin" | "volatility" | "releaseDate">> & {
  releaseDateSource?: string;
  verifiedAt?: string;
};

const verifiedAt = "2026-09-20";
const verifiedAtLatest = "2026-09-24";

const values: Record<string, WazdanScore6Values> = {
  "wazdan-16-coins-x5000": {
    field: "16 барабанов",
  },
  "wazdan-25-coins-x3000": {
    maxWin: "3000x",
  },
  "wazdan-9-coins": {
    field: "9 барабанов",
  },
  "wazdan-9-lions": {
    volatility: "Низкая / Стандартная / Высокая",
  },
  "wazdan-bumba-meu-boi-coin": {
    field: "4 барабана",
  },
  "wazdan-dino-reels-81": {
    field: "4 барабана · 7 линий",
  },
  "wazdan-highschool-manga": {
    volatility: "Низкая / Стандартная / Высокая",
  },
  "wazdan-hot-slot-gold-coins": {
    field: "15 барабанов · 10 линий",
  },
  "wazdan-kick-off": {
    field: "Без традиционных барабанов и линий",
  },
  "wazdan-arcade": {
    releaseDate: "2013-02-15",
  },
  "wazdan-black-horse": {
    releaseDate: "2012-02-20",
    releaseDateSource: "https://wazdan.com/news/new-releases-updates/wazdan-rolled-out-black-horse-slot",
  },
  "wazdan-black-horse-cash-out-edition": {
    releaseDate: "2023-11-30",
  },
  "wazdan-corrida-romance": {
    releaseDate: "2013-09-12",
    releaseDateSource: "https://wazdan.com/news/new-releases-updates/face-the-bull-in-corrida-romance",
  },
  "wazdan-highway-to-hell": {
    releaseDate: "2012-05-23",
    releaseDateSource: "https://wazdan.com/news/new-releases-updates/make-a-trip-with-highway-to-hell-slot",
  },
  "wazdan-joker-explosion": {
    releaseDate: "2014-09-08",
    releaseDateSource: "https://wazdan.com/news/new-releases-updates/more-than-20-new-games-launched",
  },
  "wazdan-lucky-fortune": {
    releaseDate: "2014-09-08",
    releaseDateSource: "https://wazdan.com/news/new-releases-updates/more-than-20-new-games-launched",
  },
  "wazdan-power-of-gods-hades": {
    releaseDate: "2021-09-08",
    releaseDateSource: "https://wazdan.com/news/new-market/wazdan-gains-greek-licence",
  },
  "wazdan-space-gem": {
    releaseDate: "2019-01-22",
    releaseDateSource: "https://wazdan.com/news/new-releases-updates/wazdan-launches-cosmic-slot-space-gem",
  },
  "wazdan-turbo-play": {
    releaseDate: "2013-02-15",
    releaseDateSource: "https://wazdan.com/news/new-releases-updates/four-new-classic-video-slots-released",
  },
  "wazdan-vegas-reels-ii": {
    releaseDate: "2013-02-15",
    releaseDateSource: "https://wazdan.com/news/new-releases-updates/four-new-classic-video-slots-released",
  },
  "wazdan-9-burning-stars": {
    releaseDate: "2022-08-07",
    releaseDateSource: "https://slotcatalog.com/en/slots/9-Burning-Stars",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-back-to-the-70s": {
    releaseDate: "2016-05-01",
    releaseDateSource: "https://slotcatalog.com/en/slots/Back-to-the-70s",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-black-hawk": {
    releaseDate: "2016-07-01",
    releaseDateSource: "https://slotcatalog.com/en/slots/Black-Hawk",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-fenix-play-27": {
    releaseDate: "2012-06-06",
    releaseDateSource: "https://slotcatalog.com/en/slots/Fenix-Play-27",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-fire-bird": {
    releaseDate: "2012-06-06",
    releaseDateSource: "https://slotcatalog.com/en/slots/Fire-Bird-Wazdan",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-football-mania": {
    releaseDate: "2014-08-01",
    releaseDateSource: "https://slotcatalog.com/en/slots/Football-Mania-Wazdan",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-hot-777": {
    releaseDate: "2012-06-15",
    releaseDateSource: "https://slotcatalog.com/en/slots/Hot-777",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-hot-party": {
    releaseDate: "2014-09-18",
    releaseDateSource: "https://slotcatalog.com/en/slots/Hot-Party",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-magic-fruits": {
    releaseDate: "2017-11-28",
    releaseDateSource: "https://slotcatalog.com/en/slots/Magic-Fruits",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-magic-fruits-27": {
    releaseDate: "2013-07-15",
    releaseDateSource: "https://slotcatalog.com/en/slots/Magic-Fruits-27",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-relic-hunters-and-the-book-of-faith": {
    releaseDate: "2019-10-04",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-vegas-hot": {
    releaseDate: "2014-11-15",
    releaseDateSource: "https://slotcatalog.com/en/slots/Vegas-Hot",
    verifiedAt: verifiedAtLatest,
  },
};

export function getCatalogVerifiedDetailsWazdanScore6Wave(slug: string) {
  const value = values[slug];
  if (!value) return undefined;

  const { verifiedAt: valueVerifiedAt, ...details } = value;
  return {
    ...details,
    source: `https://wazdan.com/games/${slug.replace("wazdan-", "")}`,
    verifiedAt: valueVerifiedAt ?? verifiedAt,
  };
}
