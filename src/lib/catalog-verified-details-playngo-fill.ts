import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout1 } from "./catalog-verified-details-playngo-passport-closeout-1";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout2 } from "./catalog-verified-details-playngo-passport-closeout-2";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout3 } from "./catalog-verified-details-playngo-passport-closeout-3";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout4 } from "./catalog-verified-details-playngo-passport-closeout-4";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout5 } from "./catalog-verified-details-playngo-passport-closeout-5";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout6 } from "./catalog-verified-details-playngo-passport-closeout-6";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout7 } from "./catalog-verified-details-playngo-passport-closeout-7";

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
    field: "1024 способов",
    fieldSource: "https://www.playngo.com/games/hugo-carts",
    verifiedAt,
  },
  "playn-go-mystery-joker-6000": {
    field: "3×3",
    maxWin: "6000x",
    fieldSource: "https://www.playngo.com/post/play-n-go-return-to-the-classics-with-the-paying-piano-club",
    maxWinSource: "https://www.playngo.com/games/mystery-joker-6000",
    verifiedAt: "2026-09-20",
  },
  "playn-go-inferno-joker": {
    field: "5×3",
    fieldSource: "https://www.playngo.com/post/play-n-go-release-new-slot-alongside-innovative-new-poker-game",
    verifiedAt,
  },
  "playn-go-frozen-gems": {
    field: "5×3 · до 8748 способов",
    fieldSource: "https://www.playngo.com/post/playngo-unearth-their-latest-gem-with-new-release",
    verifiedAt,
  },
  "playn-go-golden-osiris": {
    maxWin: "12000x",
    maxWinSource: "https://www.playngo.com/games/golden-osiris",
    verifiedAt: "2026-09-20",
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
    field: "4096 способов",
    maxWin: "30000x",
    fieldSource: "https://www.playngo.com/games/hotel-yeti-way",
    maxWinSource: "https://www.playngo.com/games/hotel-yeti-way",
    verifiedAt: "2026-09-20",
  },
  "playn-go-infernal-trinity-go-guaranteed": {
    field: "5 барабанов",
    fieldSource: "https://www.playngo.com/post/infernal-trinity-go-guaranteed",
    verifiedAt,
  },
  "playn-go-lord-merlin-and-the-lady-of-the-lake": {
    field: "5×3 · 10 линий",
    fieldSource: "https://www.playngo.com/post/the-tales-of-merlin-slots-at-playngo",
    verifiedAt,
  },
  "playn-go-leprechauns-diamond-dig": {
    field: "5 барабанов",
    fieldSource: "https://www.playngo.com/games/leprechaun's-diamond-dig",
    verifiedAt,
  },
  "playn-go-playn-go-wrappin-gold": {
    field: "5 барабанов",
    fieldSource: "https://www.playngo.com/post/wrappin-gold",
    verifiedAt,
  },
  "playn-go-forge-of-fortunes": {
    maxWin: "2500x",
    maxWinSource: "https://www.playngo.com/games/forge-of-fortunes",
    verifiedAt: "2026-09-20",
  },
  "playn-go-lordi-reel-monsters": {
    maxWin: "4000x",
    maxWinSource: "https://www.playngo.com/games/lordi-reel-monsters",
    verifiedAt: "2026-09-20",
  },
  "playn-go-monkey-battle-for-the-scrolls": {
    field: "5×3 · до 7776 способов",
    fieldSource: "https://www.playngo.com/games/monkey%3A-battle-for-the-scrolls",
    verifiedAt: "2026-09-20",
  },
  "playn-go-ace-of-spades": {
    maxWin: "2500 монет",
    maxWinSource: "https://www.playngo.com/games/ace-of-spades",
    verifiedAt: "2026-09-23",
  },
  "playn-go-derby-wheel": {
    maxWin: "2800x",
    maxWinSource: "https://www.playngo.com/games/derby-wheel",
    verifiedAt: "2026-09-23",
  },
  "playn-go-leprechauns-vault": {
    maxWin: "9000x",
    maxWinSource: "https://www.playngo.com/games/leprechaun%27s-vault",
    verifiedAt: "2026-09-23",
  },
  "playn-go-octopus-treasure": {
    maxWin: "5000x",
    maxWinSource: "https://www.playngo.com/games/octopus-treasure",
    verifiedAt: "2026-09-23",
  },
  "playn-go-legion-gold-unleashed": {
    maxWin: "3000x",
    maxWinSource: "https://www.playngo.com/post/legion-gold-unleashed-online-slot-review",
    verifiedAt: "2026-09-23",
  },
  "playn-go-rally-4-riches": {
    field: "3 барабана",
    fieldSource: "https://www.playngo.com/games/rally-4-riches",
    verifiedAt: "2026-09-23",
  },
  "playn-go-def-leppard-hysteria": {
    field: "5×7",
    fieldSource: "https://it.playngo.com/series/grid-slots",
    verifiedAt: "2026-09-23",
  },
};

export function getCatalogVerifiedDetailsPlayngoFill(slug: string) {
  const legacy = details[slug];
  const closeout1 = getCatalogVerifiedDetailsPlayngoPassportCloseout1(slug);
  const closeout2 = getCatalogVerifiedDetailsPlayngoPassportCloseout2(slug);
  const closeout3 = getCatalogVerifiedDetailsPlayngoPassportCloseout3(slug);
  const closeout4 = getCatalogVerifiedDetailsPlayngoPassportCloseout4(slug);
  const closeout5 = getCatalogVerifiedDetailsPlayngoPassportCloseout5(slug);
  const closeout6 = getCatalogVerifiedDetailsPlayngoPassportCloseout6(slug);
  const closeout7 = getCatalogVerifiedDetailsPlayngoPassportCloseout7(slug);
  if (!legacy && !closeout1 && !closeout2 && !closeout3 && !closeout4 && !closeout5 && !closeout6 && !closeout7) return undefined;
  return { ...closeout7, ...closeout6, ...closeout5, ...closeout4, ...closeout3, ...closeout2, ...closeout1, ...legacy };
}
