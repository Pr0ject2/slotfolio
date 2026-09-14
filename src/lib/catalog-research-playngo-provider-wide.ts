import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-14";

type SourcedCatalogResearch = CatalogResearch & {
  evidenceSource?: string;
};

const research: Record<string, SourcedCatalogResearch> = {
  "playn-go-agent-destiny": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/agent-destiny",
    verifiedAt,
    evidence: "Official game page states that differently sized matching symbols form wins on the payline.",
    evidenceSource: "https://www.playngo.com/games/agent-destiny",
  },
  "playn-go-animal-madness": {
    mechanics: ["Кластеры", "Каскады"],
    source: "https://www.playngo.com/games/animal-madness",
    verifiedAt,
    evidence: "Official review states that wins form from matching clusters on the 5x5 grid and that winning symbols disappear before new symbols cascade from above.",
    evidenceSource: "https://www.playngo.com/post/review-animal-madness-play-n-go-grid-slot",
  },
  "playn-go-captain-glum-pirate-hunter": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/captain-glum%3A-pirate-hunter",
    verifiedAt,
    evidence: "Official game page and release describe Wilds completing paylines to create wins.",
    evidenceSource: "https://www.playngo.com/post/captain-glum-pirate-hunter",
  },
  "playn-go-gargantoonz": {
    mechanics: ["Кластеры", "Каскады"],
    source: "https://www.playngo.com/games/gargantoonz",
    verifiedAt,
    evidence: "Official release describes Gargantoonz as a 7x7 cascading grid slot where five or more matching symbols form clusters for wins.",
    evidenceSource: "https://www.playngo.com/posts/garagantoonz",
  },
  "playn-go-gerards-gambit": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/gerard's-gambit",
    verifiedAt,
    evidence: "Official release states that the game begins with one payline on a 3x1 reel and progresses to ten paylines on a 5x3 reel.",
    evidenceSource: "https://www.playngo.com/post/gerards-gambit",
  },
  "playn-go-hope-unleashed-fortune-rises": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/hope-unleashed-fortune-rises",
    verifiedAt,
    evidence: "Official game page states that Souls are collected on the reels and that collecting more Souls increases the chance of unlocking Pandora's Box.",
  },
  "playn-go-hugo-legacy": {
    mechanics: ["Кластеры"],
    source: "https://www.playngo.com/games/hugo-legacy",
    verifiedAt,
    evidence: "Official Play’n GO material describes removing winning clusters from the fixed 7x7 grid.",
    evidenceSource: "https://www.playngo.com/posts/hugo-legacy",
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
  "playn-go-piggy-blitz": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/piggy-blitz",
    verifiedAt,
    evidence: "Official release states that Piggy Blitz has 4,096 payways.",
    evidenceSource: "https://www.playngo.com/post/piggy-blitz",
  },
};

export function getCatalogResearchPlayngoProviderWide(slug: string) {
  return research[slug];
}
