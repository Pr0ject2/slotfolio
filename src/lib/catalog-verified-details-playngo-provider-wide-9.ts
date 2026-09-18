import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-18";

type SourcedCatalogVerifiedDetails = CatalogVerifiedDetails & {
  fieldSource?: string;
  maxWinSource?: string;
  releaseDateSource?: string;
};

const details: Record<string, SourcedCatalogVerifiedDetails> = {
  "playn-go-agent-destiny": {
    field: "≥5 барабанов",
    releaseDate: "2020-05-07",
    source: "https://www.playngo.com/games/agent-destiny",
    fieldSource: "https://www.playngo.com/games/agent-destiny",
    verifiedAt,
  },
  "playn-go-alice-cooper-and-the-tome-of-madness": {
    field: "5×5",
    releaseDate: "2021-10-07",
    source: "https://www.playngo.com/games/alice-cooper-and-the-tome-of-madness",
    fieldSource: "https://www.playngo.com/post/monsters-n-music-slots",
    verifiedAt,
  },
  "playn-go-aztec-idols": {
    field: "≥5 барабанов",
    releaseDate: "2012-08-11",
    source: "https://www.playngo.com/games/aztec-idols",
    fieldSource: "https://www.playngo.com/games/aztec-idols",
    verifiedAt,
  },
  "playn-go-bullion-xpress": {
    field: "≥5 барабанов",
    releaseDate: "2025-09-25",
    source: "https://www.playngo.com/games/bullion-xpress",
    fieldSource: "https://www.playngo.com/games/bullion-xpress",
    verifiedAt,
  },
  "playn-go-cat-wilde-and-the-pyramids-of-dead": {
    maxWin: "5000x / 10000x",
    releaseDate: "2022-06-23",
    source: "https://www.playngo.com/games/cat-wilde-and-the-pyramids-of-dead",
    maxWinSource: "https://www.playngo.com/posts/cat-wilde-pyramids-of-dead",
    verifiedAt,
  },
  "playn-go-cloud-quest": {
    field: "5×5",
    releaseDate: "2016-03-09",
    source: "https://www.playngo.com/games/cloud-quest",
    fieldSource: "https://www.playngo.com/games/cloud-quest",
    verifiedAt,
  },
  "playn-go-crazy-cows": {
    field: "≥5 барабанов",
    releaseDate: "2014-11-05",
    source: "https://www.playngo.com/games/crazy-cows",
    fieldSource: "https://www.playngo.com/games/crazy-cows",
    verifiedAt,
  },
  "playn-go-dragon-ship": {
    field: "≥5 барабанов",
    releaseDate: "2012-10-07",
    source: "https://www.playngo.com/games/dragon-ship",
    fieldSource: "https://www.playngo.com/games/dragon-ship",
    verifiedAt,
  },
  "playn-go-enchanted-crystals": {
    field: "≥5 барабанов",
    releaseDate: "2014-05-26",
    source: "https://www.playngo.com/games/enchanted-crystals",
    fieldSource: "https://www.playngo.com/games/enchanted-crystals",
    verifiedAt,
  },
  "playn-go-energoonz": {
    field: "5×5",
    releaseDate: "2013-11-28",
    source: "https://www.playngo.com/games/energoonz",
    fieldSource: "https://www.playngo.com/posts/review-energoonz-play-n-go-s-landmark-sci-fi-grid-slot",
    verifiedAt,
  },
  "playn-go-gemix-2": {
    field: "7×7",
    releaseDate: "2021-07-08",
    source: "https://www.playngo.com/games/gemix-2",
    fieldSource: "https://www.playngo.com/post/play-n-go-introduces-new-worlds-in-gemix-2",
    verifiedAt,
  },
  "playn-go-gold-volcano": {
    field: "Вулканическая сетка · 8×8 в Free Spins",
    releaseDate: "2020-07-16",
    source: "https://www.playngo.com/games/gold-volcano",
    fieldSource: "https://www.playngo.com/posts/latest-slot-from-play-n-go-erupts-into-life",
    verifiedAt,
  },
  "playn-go-golden-caravan": {
    field: "≥5 барабанов",
    releaseDate: "2016-04-20",
    source: "https://www.playngo.com/games/golden-caravan",
    fieldSource: "https://www.playngo.com/games/golden-caravan",
    verifiedAt,
  },
  "playn-go-golden-colts": {
    field: "≥5 барабанов",
    releaseDate: "2019-02-26",
    source: "https://www.playngo.com/games/golden-colts",
    fieldSource: "https://www.playngo.com/games/golden-colts",
    verifiedAt,
  },
  "playn-go-golden-legend": {
    field: "≥5 барабанов",
    releaseDate: "2015-04-20",
    source: "https://www.playngo.com/games/golden-legend",
    fieldSource: "https://www.playngo.com/games/golden-legend",
    verifiedAt,
  },
  "playn-go-grim-muerto": {
    field: "≥5 барабанов",
    releaseDate: "2016-07-11",
    source: "https://www.playngo.com/games/grim-muerto",
    fieldSource: "https://www.playngo.com/games/grim-muerto",
    verifiedAt,
  },
  "playn-go-holiday-season": {
    field: "3 позиции на барабане",
    releaseDate: "2016-11-14",
    source: "https://www.playngo.com/games/holiday-season",
    fieldSource: "https://www.playngo.com/games/holiday-season",
    verifiedAt,
  },
  "playn-go-imperial-opera": {
    field: "5 барабанов · 20 линий",
    releaseDate: "2018-03-06",
    source: "https://www.playngo.com/games/imperial-opera",
    fieldSource: "https://www.playngo.com/post/hit-the-high-notes-with-play-n-go-s-imperial-opera",
    verifiedAt,
  },
  "playn-go-lady-of-fortune": {
    field: "≥5 барабанов",
    releaseDate: "2014-04-02",
    source: "https://www.playngo.com/games/lady-of-fortune",
    fieldSource: "https://www.playngo.com/games/lady-of-fortune",
    verifiedAt,
  },
  "playn-go-merry-xmas": {
    field: "15 линий",
    releaseDate: "2014-11-17",
    source: "https://www.playngo.com/games/merry-xmas",
    fieldSource: "https://www.playngo.com/post/top-christmas-slots-2023",
    verifiedAt,
  },
  "playn-go-motley-crue": {
    field: "≥5 барабанов",
    releaseDate: "2022-12-22",
    source: "https://www.playngo.com/games/m%C3%B6tley-cr%C3%BCe",
    fieldSource: "https://www.playngo.com/games/m%C3%B6tley-cr%C3%BCe",
    verifiedAt,
  },
  "playn-go-ninja-fruits": {
    field: "≥5 барабанов",
    releaseDate: "2013-06-19",
    source: "https://www.playngo.com/games/ninja-fruits",
    fieldSource: "https://www.playngo.com/games/ninja-fruits",
    verifiedAt,
  },
  "playn-go-ras-reckoning": {
    field: "6×5",
    releaseDate: "2025-12-04",
    source: "https://www.playngo.com/games/ra%27s-reckoning",
    fieldSource: "https://www.playngo.com/games/ra%27s-reckoning",
    releaseDateSource: "https://www.playngo.com/games/ra%27s-reckoning",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoProviderWide9(slug: string) {
  return details[slug];
}
