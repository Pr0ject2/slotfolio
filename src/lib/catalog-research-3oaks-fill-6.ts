import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "3-oaks-gaming-rush-for-gold": {
    mechanics: ["Линии", "Сбор символов", "Расширяющиеся барабаны", "Множители"],
    source: "https://3oaks.com/game/rush_for_gold",
    verifiedAt,
    evidence: "Official page states a 20-line slot where the Miner Wild collects values, RISE expands the reels to 5x5 and MULTI applies x2/x3/x5 multipliers.",
  },
  "3-oaks-gaming-space-coins": {
    mechanics: ["Линии", "Респины", "Блокировка символов", "Сбор символов"],
    source: "https://3oaks.com/game/space_coins",
    verifiedAt,
    evidence: "Official page states a five-line game with a three-respin Hold & Win feature where Collect symbols remain sticky and gather visible Bonus values.",
  },
  "3-oaks-gaming-sun-of-egypt-4": {
    mechanics: ["Линии", "Респины", "Mystery Symbols", "Сбор символов", "Множители"],
    source: "https://3oaks.com/game/sun_of_egypt_4",
    verifiedAt,
    evidence: "Official page states 25 paylines, three resetting respins, Mystery Symbols, a Sun accumulation meter and Boost multipliers up to x5.",
  },
  "3-oaks-gaming-sun-of-egypt-5": {
    mechanics: ["Сбор символов", "Множители", "Расширяющиеся барабаны"],
    source: "https://3oaks.com/game/sun_of_egypt_5",
    verifiedAt,
    evidence: "Official page describes collection-driven Hold & Win progression, MULTI values up to x10 and Collect symbols that unlock as many as three extra rows.",
  },
  "3-oaks-gaming-super-sticky-piggy": {
    mechanics: ["Линии", "Множители", "Блокировка символов", "Сбор символов"],
    source: "https://3oaks.com/game/super_sticky_piggy",
    verifiedAt,
    evidence: "Official page states 20 lines, Piggy Wild multipliers, sticky Piggy Wilds during Free Spins and a progress meter filled by Scatter symbols.",
  },
  "3-oaks-gaming-supreme-diamond-xxl": {
    mechanics: ["Линии", "Сбор символов", "Блокировка символов", "Респины"],
    source: "https://3oaks.com/game/supreme_diamond_xxl",
    verifiedAt,
    evidence: "Official page states 15 lines and a Hold & Win respin feature in which Collect symbols remain locked and repeatedly collect visible Bonus values.",
  },
};

export function getCatalogResearch3OaksFill6(slug: string) {
  return records[slug];
}
