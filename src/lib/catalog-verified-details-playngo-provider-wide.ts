import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-14";

type SourcedCatalogVerifiedDetails = CatalogVerifiedDetails & {
  fieldSource?: string;
  maxWinSource?: string;
};

const details: Record<string, SourcedCatalogVerifiedDetails> = {
  "playn-go-15-crystal-roses-a-tale-of-love": {
    field: "5×3",
    releaseDate: "2022-01-13",
    source: "https://www.playngo.com/games/15-crystal-roses%3A-a-tale-of-love",
    fieldSource: "https://www.playngo.com/valentines-slots",
    verifiedAt,
  },
  "playn-go-animal-madness": {
    field: "5×5",
    maxWin: "2250x",
    releaseDate: "2022-05-19",
    source: "https://www.playngo.com/games/animal-madness",
    fieldSource: "https://www.playngo.com/post/review-animal-madness-play-n-go-grid-slot",
    maxWinSource: "https://www.playngo.com/post/review-animal-madness-play-n-go-grid-slot",
    verifiedAt,
  },
  "playn-go-big-win-cat-pawsperity": {
    field: "3×3",
    releaseDate: "2025-06-24",
    source: "https://www.playngo.com/games/big-win-cat-pawsperity",
    fieldSource: "https://www.playngo.com/posts/big-win-cat-pawsperity",
    verifiedAt,
  },
  "playn-go-easter-eggs": {
    field: "5×3",
    releaseDate: "2015-03-17",
    source: "https://www.playngo.com/games/easter-eggs",
    fieldSource: "https://www.playngo.com/post/top-easter-themed-slots-2025",
    verifiedAt,
  },
  "playn-go-easter-eggspedition": {
    field: "5×3",
    releaseDate: "2024-03-28",
    source: "https://www.playngo.com/games/easter-eggspedition",
    fieldSource: "https://www.playngo.com/post/easter-eggspedition-game-review",
    verifiedAt,
  },
  "playn-go-fire-joker-100": {
    field: "3×3",
    releaseDate: "2025-05-29",
    source: "https://www.playngo.com/games/fire-joker-100",
    fieldSource: "https://www.playngo.com/post/fire-joker-100",
    verifiedAt,
  },
  "playn-go-free-reelin-joker-1000": {
    field: "3×1",
    maxWin: "1000x",
    releaseDate: "2023-05-25",
    source: "https://www.playngo.com/games/free-reelin'-joker-1000",
    fieldSource: "https://www.playngo.com/post/playngos-free-reelin-joker-1000-is-the-winning-card-of-the-deck",
    maxWinSource: "https://www.playngo.com/post/the-evolution-of-joker-slot-series-retrospective",
    verifiedAt,
  },
  "playn-go-gargantoonz": {
    field: "7×7",
    releaseDate: "2023-11-30",
    source: "https://www.playngo.com/games/gargantoonz",
    fieldSource: "https://www.playngo.com/posts/garagantoonz",
    verifiedAt,
  },
  "playn-go-gerards-gambit": {
    field: "3×1 · 1 линия → 5×3 · 10 линий",
    releaseDate: "2023-04-27",
    source: "https://www.playngo.com/games/gerard's-gambit",
    fieldSource: "https://www.playngo.com/post/gerards-gambit",
    verifiedAt,
  },
  "playn-go-ghost-of-dead": {
    field: "5×3",
    maxWin: "10000x",
    releaseDate: "2021-09-16",
    source: "https://www.playngo.com/games/ghost-of-dead",
    fieldSource: "https://www.playngo.com/post/playngo-awaken-akh-as-the-dead-series-continues",
    maxWinSource: "https://www.playngo.com/post/playngo-awaken-akh-as-the-dead-series-continues",
    verifiedAt,
  },
  "playn-go-hugo-legacy": {
    field: "7×7",
    releaseDate: "2023-08-10",
    source: "https://www.playngo.com/games/hugo-legacy",
    fieldSource: "https://www.playngo.com/posts/hugo-legacy",
    verifiedAt,
  },
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
  "playn-go-loot-and-labyrinths": {
    field: "5×3",
    releaseDate: "2025-04-03",
    source: "https://www.playngo.com/games/loot-%26-labyrinths",
    fieldSource: "https://www.playngo.com/posts/loot-and-labyrinths",
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
  "playn-go-piggy-blitz": {
    field: "4096 способов",
    maxWin: "5000x",
    releaseDate: "2023-09-21",
    source: "https://www.playngo.com/games/piggy-blitz",
    fieldSource: "https://www.playngo.com/post/piggy-blitz",
    maxWinSource: "https://www.playngo.com/post/piggy-blitz",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoProviderWide(slug: string) {
  return details[slug];
}
