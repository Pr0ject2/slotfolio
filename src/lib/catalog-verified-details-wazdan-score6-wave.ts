import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type WazdanScore6Values = Partial<Pick<CatalogVerifiedDetails, "field" | "maxWin" | "volatility" | "releaseDate">> & {
  releaseDateSource?: string;
};

const verifiedAt = "2026-09-20";

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
  "wazdan-back-to-the-70s": {
    releaseDate: "2017-05-01",
    releaseDateSource: "https://wazdan.com/news/new-releases-updates/four-new-games-added-in-may",
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
  "wazdan-relic-hunters-and-the-book-of-faith": {
    releaseDate: "2019-10-04",
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
};

export function getCatalogVerifiedDetailsWazdanScore6Wave(slug: string) {
  const value = values[slug];
  if (!value) return undefined;

  return {
    ...value,
    source: `https://wazdan.com/games/${slug.replace("wazdan-", "")}`,
    verifiedAt,
  };
}
