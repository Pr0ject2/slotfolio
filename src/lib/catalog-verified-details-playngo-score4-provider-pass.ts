import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-18";

type PlayngoScore4Details = CatalogVerifiedDetails & {
  fieldSource?: string;
  maxWinSource?: string;
  releaseDateSource?: string;
};

const details: Record<string, PlayngoScore4Details> = {
  "playn-go-agent-destiny": {
    field: "≥5 барабанов",
    source: "https://www.playngo.com/games/agent-destiny",
    fieldSource: "https://www.playngo.com/games/agent-destiny",
    verifiedAt,
  },
  "playn-go-alice-cooper-and-the-tome-of-madness": {
    field: "5×5",
    source: "https://www.playngo.com/post/monsters-n-music-slots",
    fieldSource: "https://www.playngo.com/post/monsters-n-music-slots",
    verifiedAt,
  },
  "playn-go-bullion-xpress": {
    field: "≥5 барабанов",
    source: "https://www.playngo.com/games/bullion-xpress",
    fieldSource: "https://www.playngo.com/games/bullion-xpress",
    verifiedAt,
  },
  "playn-go-cat-wilde-and-the-pyramids-of-dead": {
    maxWin: "5000x / 10000x",
    source: "https://www.playngo.com/games/cat-wilde-and-the-pyramids-of-dead",
    maxWinSource: "https://www.playngo.com/posts/cat-wilde-pyramids-of-dead",
    verifiedAt,
  },
  "playn-go-cloud-quest": {
    field: "5×5",
    source: "https://www.playngo.com/games/cloud-quest",
    fieldSource: "https://www.playngo.com/games/cloud-quest",
    verifiedAt,
  },
  "playn-go-energoonz": {
    field: "5×5",
    source: "https://www.playngo.com/games/energoonz",
    fieldSource: "https://www.playngo.com/posts/review-energoonz-play-n-go-s-landmark-sci-fi-grid-slot",
    verifiedAt,
  },
  "playn-go-gemix-2": {
    field: "7×7",
    source: "https://www.playngo.com/games/gemix-2",
    fieldSource: "https://www.playngo.com/post/play-n-go-introduces-new-worlds-in-gemix-2",
    verifiedAt,
  },
  "playn-go-gold-volcano": {
    field: "Вулканическая сетка · 8×8 в Free Spins",
    source: "https://www.playngo.com/games/gold-volcano",
    fieldSource: "https://www.playngo.com/posts/latest-slot-from-play-n-go-erupts-into-life",
    verifiedAt,
  },
  "playn-go-lady-of-fortune": {
    field: "≥5 барабанов",
    source: "https://www.playngo.com/games/lady-of-fortune",
    fieldSource: "https://www.playngo.com/games/lady-of-fortune",
    verifiedAt,
  },
  "playn-go-merry-xmas": {
    field: "15 линий",
    source: "https://www.playngo.com/games/merry-xmas",
    fieldSource: "https://www.playngo.com/post/top-christmas-slots-2023",
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

export function getCatalogVerifiedDetailsPlayngoScore4ProviderPass(slug: string) {
  return details[slug];
}
