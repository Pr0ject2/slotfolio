import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-14";

type SourcedCatalogResearch = CatalogResearch & {
  evidenceSource?: string;
};

const research: Record<string, SourcedCatalogResearch> = {
  "playn-go-hope-unleashed-fortune-rises": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/hope-unleashed-fortune-rises",
    verifiedAt,
    evidence: "Official game page states that Souls are collected on the reels and that collecting more Souls increases the chance of unlocking Pandora's Box.",
  },
  "playn-go-legacy-of-inca": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/legacy-of-inca",
    verifiedAt,
    evidence: "Official Play'n GO release states that added Wilds on the middle reels can create a multitude of payways.",
    evidenceSource: "https://www.playngo.com/post/legacy-of-inca",
  },
  "playn-go-manta-mayhem": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/manta-mayhem",
    verifiedAt,
    evidence: "Official game page describes Pearl symbols landing on the reels and being collected by the Manta Ray in the Pearl Collection feature.",
  },
  "playn-go-merlin-and-the-ice-queen-morgana": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/merlin-and-the-ice-queen-morgana",
    verifiedAt,
    evidence: "Official game page describes Expanding Symbols forming win lines and explicitly refers to paylines.",
  },
  "playn-go-merry-xmas": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/merry-xmas",
    verifiedAt,
    evidence: "Official Play'n GO review states that three or more adjacent symbols on any payline award wins.",
    evidenceSource: "https://www.playngo.com/post/merry-xmas-review",
  },
};

export function getCatalogResearchPlayngoProviderWide2(slug: string) {
  return research[slug];
}
