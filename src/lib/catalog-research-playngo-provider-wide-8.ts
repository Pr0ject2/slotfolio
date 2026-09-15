import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-15";

type SourcedCatalogResearch = CatalogResearch & {
  evidenceSource?: string;
};

const research: Record<string, SourcedCatalogResearch> = {
  "playn-go-highway-legends": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/highway-legends",
    verifiedAt,
    evidence: "Official game page states that Money Bag values accumulate across reels 1–4 and are awarded when the collect symbol lands on reel five.",
  },
  "playn-go-def-leppard-hysteria": {
    mechanics: ["Кластеры", "Каскады"],
    source: "https://www.playngo.com/games/def-leppard%3A-hysteria",
    verifiedAt,
    evidence: "Play'n GO classifies Def Leppard: Hysteria as a Grid Slot; its official Grid Slots definition states that adjacent symbols form clusters and winning symbols disappear so symbols above cascade into place.",
    evidenceSource: "https://www.playngo.com/series/grid-slots",
  },
  "playn-go-cash-a-cabana": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/cash-a-cabana",
    verifiedAt,
    evidence: "Official game page explicitly instructs players to collect three Scatter symbols to unlock the Cabana Show, with additional Scatters extending the feature.",
  },
  "playn-go-fat-frankies": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/fat-frankies",
    verifiedAt,
    evidence: "Official release describes Burger Bonanza as accumulating sticky Burger symbols through repeated re-spins until no more Burgers land, after which the prizes pay.",
    evidenceSource: "https://www.playngo.com/post/fat-frankies",
  },
  "playn-go-lab-of-madness-its-a-wild": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/lab-of-madness-it's-a-wild!",
    verifiedAt,
    evidence: "Official game page describes glowing orbs progressively charging matching bulbs from uncharged to fully lit; additional orbs further power up the feature.",
  },
};

export function getCatalogResearchPlayngoProviderWide8(slug: string) {
  return research[slug];
}
