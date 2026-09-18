import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type PlayngoFillOverlay = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "volatility" | "releaseDate">
> & {
  verifiedAt: string;
  fieldSource?: string;
  maxWinSource?: string;
};

const verifiedAt = "2026-09-18";

const details: Record<string, PlayngoFillOverlay> = {
  "playn-go-boat-bonanza": {
    field: "5×4",
    maxWin: "5000x",
    fieldSource: "https://www.playngo.com/post/game-review-boat-bonanza",
    maxWinSource: "https://www.playngo.com/post/game-review-boat-bonanza",
    verifiedAt,
  },
  "playn-go-eye-of-the-kraken": {
    field: "3×3 · 8 динамических линий",
    maxWin: "500x",
    fieldSource: "https://www.playngo.com/post/the-top-4-underwater-slots-to-play-in-2023",
    maxWinSource: "https://www.playngo.com/post/the-top-4-underwater-slots-to-play-in-2023",
    verifiedAt,
  },
  "playn-go-fire-joker-freeze": {
    field: "3×3",
    fieldSource: "https://www.playngo.com/post/playngo-bring-stacks-of-fun-with-fire-joker-freeze",
    verifiedAt,
  },
  "playn-go-fire-toad-2": {
    field: "5 барабанов · 1024 способа",
    fieldSource: "https://www.playngo.com/post/fire-toad-2",
    verifiedAt,
  },
  "playn-go-hugo-carts": {
    field: "1024 способа",
    fieldSource: "https://www.playngo.com/games/hugo-carts",
    verifiedAt,
  },
  "playn-go-mystery-joker-6000": {
    maxWin: "6000x",
    maxWinSource: "https://www.playngo.com/games/mystery-joker-6000",
    verifiedAt,
  },
  "playn-go-inferno-joker": {
    field: "5×3",
    fieldSource: "https://www.playngo.com/post/play-n-go-release-new-slot-alongside-innovative-new-poker-game",
    verifiedAt,
  },
  "playn-go-frozen-gems": {
    field: "5×3 · до 8748 способов",
    fieldSource: "https://www.playngo.com/post/play-n-go-unearth-their-latest-gem-with-new-release",
    verifiedAt,
  },
  "playn-go-golden-osiris": {
    maxWin: "12000x",
    maxWinSource: "https://www.playngo.com/games/golden-osiris",
    verifiedAt,
  },
  "playn-go-moon-princess-origins": {
    field: "5×5",
    maxWin: "10000x",
    fieldSource: "https://www.playngo.com/games/moon-princess-origins",
    maxWinSource: "https://www.playngo.com/games/moon-princess-origins",
    verifiedAt,
  },
  "playn-go-love-joker": {
    field: "3×3",
    fieldSource: "https://www.playngo.com/valentines-slots",
    verifiedAt,
  },
  "playn-go-legend-of-the-ice-dragon": {
    field: "7×7",
    fieldSource: "https://www.playngo.com/post/top-winter-themed-slots",
    verifiedAt,
  },
  "playn-go-merlin-and-the-ice-queen-morgana": {
    field: "5×3",
    fieldSource: "https://www.playngo.com/post/top-winter-themed-slots",
    verifiedAt,
  },
  "playn-go-black-mamba": {
    field: "5×5",
    fieldSource: "https://it.playngo.com/series/grid-slots",
    verifiedAt,
  },
  "playn-go-gigantoonz": {
    field: "8×8",
    fieldSource: "https://www.playngo.com/post/gigantoonz-review-reactoonz-series",
    verifiedAt,
  },
  "playn-go-moon-princess-christmas-kingdom": {
    field: "5×5",
    fieldSource: "https://www.playngo.com/post/copy-of-grow-your-blog-community",
    verifiedAt,
  },
  "playn-go-hotel-yeti-way": {
    maxWin: "30000x",
    maxWinSource: "https://www.playngo.com/games/hotel-yeti-way",
    verifiedAt,
  },
  "playn-go-infernal-trinity-go-guaranteed": {
    field: "5 барабанов",
    fieldSource: "https://www.playngo.com/post/infernal-trinity-go-guaranteed",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoFill(slug: string) {
  return details[slug];
}
