import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-13";

const research: Record<string, CatalogResearch> = {
  "playn-go-chambers-of-ancients": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/chambers-of-ancients",
    verifiedAt,
    evidence: "Official Play’n GO page publishes a 5x3 layout with 10 paylines.",
  },
  "playn-go-charlie-chance": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/charlie-chance",
    verifiedAt,
    evidence: "Official Play’n GO page publishes five reels and 243 payways.",
  },
  "playn-go-charlie-chance-and-the-curse-of-cleopatra": {
    mechanics: ["Кластеры", "Каскады"],
    source: "https://www.playngo.com/games/charlie-chance-and-the-curse-of-cleopatra",
    verifiedAt,
    evidence: "Official Play’n GO page describes a 6x6 Grid Slot using cluster wins and cascading symbols.",
  },
  "playn-go-colt-lightning-firestorm": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/colt-lightning-firestorm",
    verifiedAt,
    evidence: "Official Play’n GO page publishes 1,024 ways in the base game.",
  },
  "playn-go-leprechaun-goes-egypt": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/leprechaun-goes-egypt",
    verifiedAt,
    evidence: "Official Play’n GO page publishes up to 20 paylines.",
  },
  "playn-go-leprechaun-goes-wild": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/leprechaun-goes-wild",
    verifiedAt,
    evidence: "Official Play’n GO page publishes 20 paylines.",
  },
  "playn-go-lion-saga-odyssey": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/lion-saga-odyssey",
    verifiedAt,
    evidence: "Official Play’n GO page publishes a 5x3 layout with 10 paylines.",
  },
  "playn-go-luchamigos": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/luchamigos",
    verifiedAt,
    evidence: "Official Play’n GO page describes the 5x4 game using ways-to-win mechanics.",
  },
  "playn-go-ras-reckoning": {
    mechanics: ["Кластеры", "Каскады"],
    source: "https://www.playngo.com/games/ra's-reckoning",
    verifiedAt,
    evidence: "Official Play’n GO page describes a 6x5 game with cluster wins and cascading symbols; its structured Game Type field is blank and remains unknown.",
  },
  "playn-go-raging-rex-3": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/raging-rex-3",
    verifiedAt,
    evidence: "Official Play’n GO page publishes a 6x4 layout with 4,096 ways to win.",
  },
};

export function getCatalogResearchPlayngoGapFinal(slug: string) {
  return research[slug];
}
