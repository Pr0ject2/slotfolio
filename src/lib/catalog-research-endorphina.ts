import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-11";
const verifiedAtFinal = "2026-09-13";
const verifiedAtLatest = "2026-09-24";

export const catalogResearchEndorphina: Record<string, CatalogResearch> = {
  "endorphina-3-golden-chests": {
    mechanics: ["Сбор символов"],
    source: "https://endorphina.com/games/3-golden-chests/play",
    verifiedAt: verifiedAtFinal,
    evidence: "Official game page describes a 4x3 slot with 12 cells and a Collect symbol that accumulates all visible Bonus prizes in the Hold and Win game.",
  },
  "endorphina-burning-coins-100": {
    mechanics: ["Линии", "Hot Hold", "Сбор символов"],
    source: "https://endorphina.com/news/firefighters-wanted-in-endorphinas-burning-coins-100",
    verifiedAt: verifiedAtLatest,
    evidence: "Official Endorphina release confirms a 5x4 slot with 100 fixed paylines and Hot Hold bonus games where special symbols remain in place; Collector variants collect visible Bonus prizes.",
  },
  "endorphina-burning-coins-20-dice": {
    mechanics: ["Линии"],
    source: "https://endorphina.com/games/burning-coins-20-dice/play",
    verifiedAt,
    evidence: "Official Game Details list 20 lines on a 5x3 grid.",
  },
  "endorphina-chance-machine-90s": {
    mechanics: ["Линии", "Rush Collect", "Сбор символов"],
    source: "https://endorphina.com/news/its-balkan-bling-time-in-endorphinas-chance-machine-90s",
    verifiedAt: verifiedAtLatest,
    evidence: "Official Endorphina release confirms 5 fixed paylines and the Rush Collect Bonus Game, where Collector symbols remain sticky and accumulate prizes from Bonus symbols.",
  },
  "endorphina-druids-fortune": {
    mechanics: ["Линии", "Hold and Win", "Сбор символов", "Расширяющиеся символы"],
    source: "https://endorphina.com/news/expect-magical-moments-in-druids-fortune",
    verifiedAt: verifiedAtLatest,
    evidence: "Official Endorphina release confirms 20 fixed paylines, two Hold And Win bonus games, Collector prize accumulation and vertically expanding Wild characters.",
  },
  "endorphina-fortune-bankers": {
    mechanics: ["Каскады", "Множители"],
    source: "https://endorphina.com/news/pigs-can-fly-in-endorphinas-fortune-bankers",
    verifiedAt: verifiedAtLatest,
    evidence: "Official Endorphina release describes Cascading Reels and an accumulated multiplier used during Free Games.",
  },
  "endorphina-fortune-chests-dice": {
    mechanics: ["Линии"],
    source: "https://endorphina.com/games/fortune-chests-dice/play",
    verifiedAt,
    evidence: "Official Game Details list 5 fixed lines on a 3x3 grid.",
  },
  "endorphina-gift-of-midas": {
    mechanics: ["Линии", "Расширяющиеся символы"],
    source: "https://endorphina.com/news/get-in-touch-with-endorphinas-gift-of-midas",
    verifiedAt: verifiedAtLatest,
    evidence: "Official Endorphina release confirms 10 fixed paylines and Free Games with an Expanding Symbols feature that expands symbols vertically or horizontally.",
  },
  "endorphina-groovin-tiger": {
    mechanics: ["Линии", "Респины", "Множители", "Каскады"],
    source: "https://endorphina.com/news/endorphinas-groovin-tiger-is-grrrrrr-oooovy-baby",
    verifiedAt: verifiedAtLatest,
    evidence: "Official Endorphina release confirms 10 fixed paylines, a Re-Spin feature with a multiplier increasing on each spin until a win, and a cascading reels feature.",
  },
  "endorphina-hell-hot-1000": {
    mechanics: ["Линии"],
    source: "https://endorphina.com/games/hell-hot-1000/play",
    verifiedAt,
    evidence: "Official Game Details list 100 fixed lines on a 5x4 grid.",
  },
  "endorphina-moofo": {
    mechanics: ["Линии"],
    source: "https://endorphina.com/games/moofo/play",
    verifiedAt,
    evidence: "Official Game Details list 30 fixed lines on a 5x3 grid.",
  },
  "endorphina-zalatar": {
    mechanics: ["Линии"],
    source: "https://endorphina.com/games/zalatar/play",
    verifiedAt,
    evidence: "Official Endorphina release describes a 5x3 slot with 25 fixed paylines.",
  },
};

export function getCatalogResearchEndorphina(slug: string) {
  return catalogResearchEndorphina[slug];
}
