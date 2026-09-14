import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-14";

type SourcedCatalogVerifiedDetails = CatalogVerifiedDetails & {
  fieldSource?: string;
};

const details: Record<string, SourcedCatalogVerifiedDetails> = {
  "playn-go-ice-joker": {
    field: "5×3 · 20 линий",
    releaseDate: "2020-12-03",
    source: "https://www.playngo.com/games/ice-joker",
    fieldSource: "https://www.playngo.com/posts/top-winter-themed-slots",
    verifiedAt,
  },
  "playn-go-kings-mask": {
    maxWin: "10000x",
    releaseDate: "2022-05-26",
    source: "https://www.playngo.com/games/king's-mask",
    verifiedAt,
  },
  "playn-go-lady-of-fortune-destiny-spins": {
    field: "3 направления выплат",
    releaseDate: "2025-08-07",
    source: "https://www.playngo.com/games/lady-of-fortune-destiny-spins",
    verifiedAt,
  },
  "playn-go-merlin-journey-of-flame": {
    field: "6 барабанов в Free Spins",
    releaseDate: "2023-07-13",
    source: "https://www.playngo.com/games/merlin%3A-journey-of-flame",
    verifiedAt,
  },
  "playn-go-moon-princess-100": {
    field: "5×5",
    releaseDate: "2022-04-07",
    source: "https://www.playngo.com/games/moon-princess-100",
    fieldSource: "https://it.playngo.com/series/grid-slots",
    verifiedAt,
  },
  "playn-go-naughty-nicks-book": {
    field: "6 барабанов в Free Spins",
    releaseDate: "2022-12-08",
    source: "https://www.playngo.com/games/naughty-nick's-book",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoProviderWide2(slug: string) {
  return details[slug];
}
