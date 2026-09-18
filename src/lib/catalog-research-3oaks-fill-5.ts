import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "3-oaks-gaming-sun-of-egypt": {
    mechanics: ["Линии", "Респины", "Блокировка символов"],
    source: "https://3oaks.com/game/sun_of_egypt",
    verifiedAt,
    evidence: "Official page states a 25-line layout and a Hold & Win round with three respins; triggering and newly landed symbols lock in place.",
  },
  "3-oaks-gaming-sun-of-egypt-2": {
    mechanics: ["Линии", "Респины", "Блокировка символов", "Mystery Symbols"],
    source: "https://3oaks.com/game/sun_of_egypt_2",
    verifiedAt,
    evidence: "Official page states a 25-line layout, three resetting respins with locked Bonus Symbols and a Mystery Symbol in the Hold & Win round.",
  },
  "3-oaks-gaming-sun-of-egypt-3": {
    mechanics: ["Линии", "Респины", "Блокировка символов", "Mystery Symbols"],
    source: "https://3oaks.com/game/sun_of_egypt_3",
    verifiedAt,
    evidence: "Official page states a 25-line slot and a Hold & Win feature where Bonus Symbols lock through a series of respins and Mystery Symbols can appear.",
  },
  "3-oaks-gaming-sunlight-princess": {
    mechanics: ["Линии", "Респины", "Блокировка символов", "Mystery Symbols", "Сбор символов"],
    source: "https://3oaks.com/game/sunlight_princess",
    verifiedAt,
    evidence: "Official page states a 30-line game, three respins with sticky Bonus Symbols, Mystery Symbols and a Sun Meter that collects Bonus Symbols.",
  },
  "3-oaks-gaming-super-hot-chilli": {
    mechanics: ["Линии", "Респины", "Блокировка символов", "Множители"],
    source: "https://3oaks.com/game/super_hot_chilli",
    verifiedAt,
    evidence: "Official page states a 25-line slot; Hold & Win begins with three respins, landed symbols lock in place and the booster row includes multipliers.",
  },
  "3-oaks-gaming-super-hot-teapots": {
    mechanics: ["Линии", "Множители", "Расширяющиеся барабаны"],
    source: "https://3oaks.com/game/super_hot_teapots",
    verifiedAt,
    evidence: "Official page states a 25-line game and explicitly describes MULTI multipliers plus EXTRA expanding the bonus grid by two rows.",
  },
  "3-oaks-gaming-super-hotfire-diamonds": {
    mechanics: ["Респины", "Блокировка символов", "Сбор символов", "Бонусное колесо"],
    source: "https://3oaks.com/game/super_hotfire_diamonds",
    verifiedAt,
    evidence: "Official page describes a streak-style respin Hold & Win with sticky Collect Symbols that gather Bonus values, preceded by a Super Wheel.",
  },
  "3-oaks-gaming-thunder-tiger": {
    mechanics: ["Линии", "Сбор символов", "Mystery Symbols", "Множители"],
    source: "https://3oaks.com/game/thunder_tiger",
    verifiedAt,
    evidence: "Official page describes a 10-payline Linear Bonus, Collect and Mystery symbols and multipliers that increase line payouts and jackpot-symbol values.",
  },
  "3-oaks-gaming-tiger-gems": {
    mechanics: ["Линии", "Респины", "Сбор символов", "Mystery Symbols"],
    source: "https://3oaks.com/game/tiger_gems",
    verifiedAt,
    evidence: "Official page states a 25-line slot; Hold & Win starts with three resetting respins, Boost collects visible Bonus values and Mystery Symbols transform from the Fortune Slide queue.",
  },
  "3-oaks-gaming-wolf-night": {
    mechanics: ["Линии", "Респины", "Блокировка символов", "Mystery Symbols", "Множители"],
    source: "https://3oaks.com/game/wolf_night",
    verifiedAt,
    evidence: "Official page states a 25-line slot with three resetting respins and sticky symbols, Mystery Symbols in Hold & Win and x2 Wild multipliers in Free Spins.",
  },
};

export function getCatalogResearch3OaksFill5(slug: string) {
  return records[slug];
}
