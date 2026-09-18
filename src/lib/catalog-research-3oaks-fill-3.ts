import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "3-oaks-gaming-3-coin-volcanoes": {
    mechanics: ["Линии", "Респины", "Mystery Symbols", "Сбор символов", "Множители", "Расширяющиеся барабаны"],
    source: "https://3oaks.com/game/3_coin_volcanoes",
    verifiedAt,
    evidence: "Official page describes bonus respins, Mystery symbols, a Collect symbol, MULTI multipliers and GROW adding two extra rows.",
  },
  "3-oaks-gaming-3-hot-teapots": {
    mechanics: ["Линии", "Респины", "Множители"],
    source: "https://3oaks.com/game/3_hot_teapots",
    verifiedAt,
    evidence: "Official Hold & Win bonus runs as respins, while the MULTI feature applies multipliers to random cells.",
  },
  "3-oaks-gaming-3-jewel-crowns": {
    mechanics: ["Сбор символов", "Множители"],
    source: "https://3oaks.com/game/3_jewel_crowns",
    verifiedAt,
    evidence: "Official page says Wild symbols may carry x2 or x5 multipliers while Crown symbols fill the three feature metres.",
  },
  "3-oaks-gaming-3-lucky-sparks": {
    mechanics: ["Линии", "Сбор символов", "Расширяющиеся барабаны"],
    source: "https://3oaks.com/game/3_lucky_sparks",
    verifiedAt,
    evidence: "Official COLLECT feature gathers visible Coin values and the RISE feature expands the grid with two extra rows during Free Spins.",
  },
  "3-oaks-gaming-3-olymp-fortunes": {
    mechanics: ["Линии", "Респины", "Множители", "Бонусное колесо"],
    source: "https://3oaks.com/game/3_olymp_fortunes",
    verifiedAt,
    evidence: "Official page says EXTRA increases the respin count, MULTI applies multipliers, and a Super Wheel spins before every bonus round.",
  },
  "3-oaks-gaming-3-super-coin-volcanoes": {
    mechanics: ["Линии", "Респины", "Mystery Symbols", "Сбор символов", "Множители", "Расширяющиеся барабаны", "Бонусное колесо"],
    source: "https://3oaks.com/game/3_super_coin_volcanoes",
    verifiedAt,
    evidence: "Official page describes respins, Mystery and Collect symbols, MULTI/GOLD VOLCANO multipliers, GROW extra rows and the Super Wheel.",
  },
  "3-oaks-gaming-3-super-hot-chillies": {
    mechanics: ["Линии", "Респины", "Множители", "Бонусное колесо"],
    source: "https://3oaks.com/game/3_super_hot_chillies",
    verifiedAt,
    evidence: "Official page says EXTRA increases respins, MULTI adds multipliers to random symbols and the Super Wheel awards bonus enhancements.",
  },
  "3-oaks-gaming-4-clover-pots": {
    mechanics: ["Линии", "Множители", "Сбор символов", "Mystery Symbols", "Расширяющиеся барабаны"],
    source: "https://3oaks.com/game/4_clover_pots",
    verifiedAt,
    evidence: "Official bonus features include MULTI multipliers, COLLECT, MYSTERY and a Super Bonus that expands the grid by two rows.",
  },
  "3-oaks-gaming-4-fairy-flowers": {
    mechanics: ["Линии", "Сбор символов", "Множители", "Mystery Symbols", "Респины", "Расширяющиеся барабаны"],
    source: "https://3oaks.com/game/4_fairy_flowers",
    verifiedAt,
    evidence: "Official features include COLLECT, MULTI multipliers, MYSTERY, respin refills and a Magic Bonus with two extra grid rows.",
  },
};

export function getCatalogResearch3OaksFill3(slug: string) {
  return records[slug];
}
