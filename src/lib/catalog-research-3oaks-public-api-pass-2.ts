import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-24";

function apiSource(path: string) {
  return `https://3oaks.com/api/v1/games/${path}`;
}

const records: Record<string, CatalogResearch> = {
  "3-oaks-gaming-coin-up-volcano": {
    source: apiSource("coinup_volcano"),
    evidenceSources: [apiSource("coinup_volcano")],
    mechanics: ["Hold & Win", "Mystery Symbols", "Jackpots", "Расширяющиеся барабаны", "Множители"],
    verifiedAt,
    evidence:
      "Official 3 Oaks API describes the Hold & Win bonus, Mystery and Mystery Jackpot symbols, fixed jackpots, a grid that expands from 4x3 to 4x6 and Multi Up modifiers. Existing Collect/respin facts are preserved by the additive merge.",
  },
  "3-oaks-gaming-book-of-sun-multichance": {
    source: apiSource("book_of_sun_multichance"),
    evidenceSources: [apiSource("book_of_sun_multichance")],
    mechanics: ["Wild"],
    verifiedAt,
    evidence:
      "Official 3 Oaks API explicitly identifies the Scatter as Wild. Existing line, Free Spins and Expanding Symbol evidence remains additive; retrigger behavior is not split into extra score-only mechanics.",
  },
};

export function getCatalogResearch3OaksPublicApiPass2(slug: string) {
  return records[slug];
}
