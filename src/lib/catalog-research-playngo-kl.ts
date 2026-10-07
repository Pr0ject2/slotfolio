import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-11";

export const catalogResearchPlayngoKL: Record<string, CatalogResearch> = {
  "playn-go-king-of-sweets": {
    mechanics: ["Кластеры", "Каскады"],
    source: "https://www.playngo.com/games/king-of-sweets",
    verifiedAt,
    evidence: "Official Play'n GO material describes a 5x5 cascading grid with cluster wins.",
  },
  "playn-go-kiss-reels-of-rock": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/kiss-reels-of-rock",
    verifiedAt,
    evidence: "Official game page describes a 6x4 grid and an expanding-grid feature reaching 4096 ways to win.",
  },
  "playn-go-lady-of-fortune": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/lady-of-fortune",
    verifiedAt,
    evidence: "Official game page explicitly describes prizes on selected lines.",
  },
  "playn-go-lady-of-fortune-remastered": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/lady-of-fortune-remastered",
    verifiedAt,
    evidence: "Official Play'n GO release describes a 5x3 video slot with 15 paylines.",
  },
  "playn-go-lawn-n-disorder": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/lawn-n'-disorder",
    verifiedAt,
    evidence: "Official Play'n GO release describes a 5x3 video slot with 243 ways to win.",
  },
  "playn-go-legacy-of-gems-blitzways": {
    mechanics: ["Способы", "Кластеры", "Каскады"],
    source: "https://www.playngo.com/games/legacy-of-gems-blitzways",
    verifiedAt,
    evidence: "Official Play'n GO material describes Blitzways dynamic payways, cluster wins and cascading wins, with up to 16,807 ways.",
  },
  "playn-go-legend-of-the-ice-dragon": {
    mechanics: ["Каскады"],
    source: "https://www.playngo.com/games/legend-of-the-ice-dragon",
    verifiedAt,
    evidence: "Official game page explicitly calls it a cascading grid slot.",
  },
  "playn-go-leprechaun-goes-egypt": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/leprechaun-goes-egypt",
    verifiedAt,
    evidence: "Official Play'n GO game page states that players can activate up to 20 lines and separates Wild, Scatter and Bonus symbols.",
  },
  "playn-go-leprechaun-goes-wild": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/leprechaun-goes-wild",
    verifiedAt,
    evidence: "Official Play'n GO game page states that winning combinations are created across twenty paylines.",
  },

  "playn-go-lion-saga-odyssey": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/lion-saga-odyssey",
    verifiedAt,
    evidence: "Official game page describes a 5x3 slot with ten paylines.",
  },
  "playn-go-lordi-reel-monsters": {
    mechanics: ["Кластеры"],
    source: "https://www.playngo.com/games/lordi-reel-monsters",
    verifiedAt,
    evidence: "Official game page describes a 7x7 grid where Lordi destroy matching symbols on the grid.",
  },
  "playn-go-luchamigos": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/luchamigos",
    verifiedAt,
    evidence: "Official game page describes adjacent-symbol wins across the 5x4 reels without fixed paylines.",
  },
  "playn-go-lucky-diamonds": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/lucky-diamonds",
    verifiedAt,
    evidence: "Official game page describes a three-reel slot with a single payline.",
  },
};

export function getCatalogResearchPlayngoKL(slug: string) {
  return catalogResearchPlayngoKL[slug];
}
