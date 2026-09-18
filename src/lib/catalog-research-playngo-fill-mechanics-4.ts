import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "playn-go-athena-ascending": {
    mechanics: ["Множители", "Блокировка символов"],
    source: "https://www.playngo.com/games/athena-ascending",
    verifiedAt,
    evidence: "Official game page and release describe Multiplier Wilds that stick to the reels during Free Spins and increase in strength as the feature continues.",
  },
  "playn-go-boat-bonanza": {
    mechanics: ["Сбор символов", "Множители"],
    source: "https://www.playngo.com/games/boat-bonanza",
    verifiedAt,
    evidence: "Official game page describes Collector Boats and Mega Catch collecting Instant Prizes from the grid, plus the Golden Lobster multiplying the total bet by x1000.",
  },
  "playn-go-jolly-roger-wild-kraken": {
    mechanics: ["Каскады", "Сбор символов", "Множители"],
    source: "https://www.playngo.com/games/jolly-roger-wild-kraken",
    verifiedAt,
    evidence: "Official Play’n GO game/release material describes cascading reels, collected cannonballs used against the Kraken, and cannonball multipliers reaching up to x100 in Super Cannon Free Spins.",
  },
};

export function getCatalogResearchPlayngoFillMechanics4(slug: string) {
  return records[slug];
}
