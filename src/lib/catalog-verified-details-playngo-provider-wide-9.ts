import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-16";

type SourcedCatalogVerifiedDetails = CatalogVerifiedDetails & {
  fieldSource?: string;
};

const details: Record<string, SourcedCatalogVerifiedDetails> = {
  "playn-go-aztec-idols": {
    field: "≥5 барабанов",
    releaseDate: "2012-08-11",
    source: "https://www.playngo.com/games/aztec-idols",
    fieldSource: "https://www.playngo.com/games/aztec-idols",
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
};

export function getCatalogVerifiedDetailsPlayngoProviderWide9(slug: string) {
  return details[slug];
}
