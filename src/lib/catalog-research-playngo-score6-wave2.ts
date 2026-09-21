import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-22";

const records: Record<string, CatalogResearch> = {
  "playn-go-animal-madness": {
    mechanics: ["Удаление символов"],
    source: "https://www.playngo.com/games/animal-madness",
    verifiedAt,
    evidence: "Official Play’n GO page describes the Rabbit Destruction feature randomly removing a row, a column, or low-paying symbols from the grid on non-winning spins.",
  },
  "playn-go-boat-bonanza": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/boat-bonanza",
    verifiedAt,
    evidence: "Official Play’n GO page states that landing three Scatters triggers Free Spins, during which Collector Boats can collect Instant Prizes and trigger Mega Catch.",
  },
  "playn-go-crabbys-gold": {
    mechanics: ["Hold & Win"],
    source: "https://www.playngo.com/games/crabby's-gold",
    verifiedAt,
    evidence: "Official Play’n GO review describes the Hold’n Spin feature where Coins stick and the spin counter resets as new Coins land.",
    evidenceSource: "https://www.playngo.com/post/crabby-s-gold",
  },
  "playn-go-forge-of-fortunes": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/forge-of-fortunes",
    verifiedAt,
    evidence: "Official Play’n GO release describes the 3x1 game objective as landing three pieces of gold in a line to trigger Forging Re-Spins.",
    evidenceSource: "https://www.playngo.com/post/forge-of-fortunes",
  },
};

export function getCatalogResearchPlayngoScore6Wave2(slug: string) {
  return records[slug];
}
