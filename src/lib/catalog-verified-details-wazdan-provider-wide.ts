import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-16";
const verifiedAtLatest = "2026-09-17";

const details: Record<string, CatalogVerifiedDetails> = {
  "wazdan-16-coins-x5000": {
    rtp: "96,17%",
    releaseDate: "2025-10-09",
    source: "https://wazdan.com/games/16-coins-x5000",
    verifiedAt,
  },
  "wazdan-9-burning-stars": {
    field: "9 барабанов",
    rtp: "96,14%",
    source: "https://wazdan.com/games/9-burning-stars",
    verifiedAt,
  },
  "wazdan-9-coins": {
    rtp: "96,06%",
    releaseDate: "2022-07-07",
    source: "https://wazdan.com/games/9-coins",
    verifiedAt,
  },
  "wazdan-bumba-meu-boi-coin": {
    rtp: "96,14%",
    releaseDate: "2026-01-29",
    source: "https://wazdan.com/games/bumba-meu-boi-coin",
    verifiedAt,
  },
  "wazdan-choco-reels": {
    field: "6 барабанов · до 46 656 способов",
    rtp: "96,22%",
    maxWin: "9500x",
    volatility: "Средняя–высокая",
    releaseDate: "2020-08-26",
    source: "https://wazdan.com/games/choco-reels",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-cube-mania": {
    field: "4 барабана · 9 линий",
    rtp: "96,43%",
    maxWin: "1400x",
    volatility: "Стандартная",
    releaseDate: "2013-07-28",
    source: "https://wazdan.com/games/cube-mania",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-cube-mania-deluxe": {
    field: "4 барабана · 9 линий",
    rtp: "96,59%",
    maxWin: "570x",
    volatility: "Средняя",
    releaseDate: "2018-06-06",
    source: "https://wazdan.com/games/cube-mania-deluxe",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-football-mania": {
    field: "9 барабанов",
    rtp: "96,59%",
    source: "https://wazdan.com/games/football-mania",
    verifiedAt,
  },
  "wazdan-highway-to-hell": {
    field: "5 барабанов · 5 линий",
    rtp: "96,18%",
    source: "https://wazdan.com/games/highway-to-hell",
    verifiedAt,
  },
  "wazdan-hot-party": {
    field: "5 барабанов · 20 линий",
    rtp: "96,48%",
    source: "https://wazdan.com/games/hot-party",
    verifiedAt,
  },
  "wazdan-jelly-reels": {
    field: "8 барабанов · 16 777 216 способов",
    rtp: "96,22%",
    maxWin: "2500x",
    volatility: "Очень высокая",
    releaseDate: "2021-11-18",
    source: "https://wazdan.com/games/jelly-reels",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-joker-explosion": {
    field: "4 барабана · 7 линий",
    rtp: "96,50%",
    source: "https://wazdan.com/games/joker-explosion",
    verifiedAt,
  },
  "wazdan-kick-off": {
    rtp: "96,42%",
    releaseDate: "2016-06-03",
    source: "https://wazdan.com/games/kick-off",
    verifiedAt,
  },
  "wazdan-lucky-fish": {
    field: "5 барабанов · 243 способа",
    rtp: "96,50%",
    maxWin: "350x",
    volatility: "Низкая–средняя",
    releaseDate: "2019-07-02",
    source: "https://wazdan.com/games/lucky-fish",
    verifiedAt: verifiedAtLatest,
  },
  "wazdan-power-of-gods-hades": {
    field: "5 барабанов · 243 способа",
    rtp: "96,14%",
    source: "https://wazdan.com/games/power-of-gods-hades",
    verifiedAt,
  },
  "wazdan-space-gem": {
    field: "6 барабанов · 10 линий",
    rtp: "96,40%",
    source: "https://wazdan.com/games/space-gem",
    verifiedAt,
  },
  "wazdan-valentines-coins": {
    field: "9 барабанов",
    rtp: "96,06%",
    releaseDate: "2026-02-03",
    source: "https://wazdan.com/games/valentines-coins",
    verifiedAt,
  },
  "wazdan-vegas-hot": {
    field: "3 барабана · 5 линий",
    rtp: "96,05%",
    source: "https://wazdan.com/games/vegas-hot",
    verifiedAt,
  },
  "wazdan-vegas-reels-ii": {
    field: "3 барабана · 1 линия",
    rtp: "96,16%",
    source: "https://wazdan.com/games/vegas-reels-ii",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsWazdanProviderWide(slug: string) {
  return details[slug];
}
