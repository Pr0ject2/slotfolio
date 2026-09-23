import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-23";

const records: Record<string, CatalogResearch> = {
  "3-oaks-gaming-3-super-hot-teapots": {
    mechanics: ["Hold & Win", "Множители", "Бонусное колесо", "Jackpots"],
    source: "https://3oaks.com/api/v1/games/3_super_hot_teapots",
    verifiedAt,
    evidence: "Official 3 Oaks public game API describes the 5x3, 25-line game with a Hold & Win Bonus Game, MULTI multipliers, fixed MINI/MINOR/MAJOR/GRAND jackpots, and a Super Wheel before every Bonus Game.",
  },
  "3-oaks-gaming-4-fortune-clovers": {
    mechanics: ["Hold & Win", "Сбор символов", "Множители", "Расширяющиеся барабаны", "Mystery Symbols", "Jackpots"],
    source: "https://3oaks.com/api/v1/games/4_fortune_clovers",
    verifiedAt,
    evidence: "Official 3 Oaks public game API describes Hold & Win with EXPAND, MULTI, BOOST and COLLECT bonus features, a Mystery Symbol, fixed jackpots and an EXPAND feature that can grow the 5x3 grid to 5x6.",
  },
  "3-oaks-gaming-lucky-penny-3-pots-super-wheel": {
    mechanics: ["Hold & Win", "Респины", "Множители", "Бонусное колесо", "Jackpots"],
    source: "https://3oaks.com/api/v1/games/lucky_penny_3_pots_super_wheel",
    verifiedAt,
    evidence: "Official 3 Oaks public game API describes the 5x3, 25-line Hold & Win game with MULTI multipliers, EXTRA increasing respins to four, fixed jackpots including GRAND x1000, and a Super Wheel before the Bonus Game.",
  },
};

export function getCatalogResearch3OaksPublicApiPass(slug: string) {
  return records[slug];
}
