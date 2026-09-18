import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "3-oaks-gaming-magic-apple": {
    mechanics: ["Линии", "Респины", "Множители"],
    source: "https://3oaks.com/game/magic_apple",
    verifiedAt,
    evidence: "Official Hold & Win starts with three resetting respins, while Mirror Wilds double wins during Free Spins.",
  },
  "3-oaks-gaming-magic-apple-2": {
    mechanics: ["Линии", "Респины", "Mystery Symbols", "Блокировка символов"],
    source: "https://3oaks.com/game/magic_apple_2",
    verifiedAt,
    evidence: "Official Hold & Win starts with three resetting respins and includes Golden Apple Mystery Symbols; Mirror Wilds remain sticky throughout Free Spins.",
  },
  "3-oaks-gaming-magic-clovers": {
    mechanics: ["Линии", "Сбор символов", "Mystery Symbols", "Множители"],
    source: "https://3oaks.com/game/magic_clovers",
    verifiedAt,
    evidence: "Official Pot features include Collect and Multi, while Mystery Symbols reveal Pot features or jackpot prizes.",
  },
  "3-oaks-gaming-moon-sisters": {
    mechanics: ["Линии", "Респины", "Блокировка символов"],
    source: "https://3oaks.com/game/moon_sisters",
    verifiedAt,
    evidence: "Official Hold & Win locks triggering Moon symbols and starts with three respins; every new Moon locks and resets the respin count.",
  },
  "3-oaks-gaming-more-magic-apple": {
    mechanics: ["Линии", "Респины", "Сбор символов", "Множители"],
    source: "https://3oaks.com/game/more_magic_apple",
    verifiedAt,
    evidence: "Official Hold & Win gives three respins, Collect gathers Apple values, and the extra booster row plus Free Spins use multipliers.",
  },
  "3-oaks-gaming-power-sun": {
    mechanics: ["Линии", "Сбор символов", "Респины"],
    source: "https://3oaks.com/game/power_sun",
    verifiedAt,
    evidence: "Official Burning Sun Collect Symbol gathers Coin values and the Hold & Win Bonus is explicitly described as a streak respin adventure.",
  },
  "3-oaks-gaming-power-sun-xxl": {
    mechanics: ["Линии", "Сбор символов", "Блокировка символов"],
    source: "https://3oaks.com/game/power_sun_xxl",
    verifiedAt,
    evidence: "Official Hold & Win locks up to five Collect Symbols on reel two and those symbols repeatedly absorb visible Bonus values.",
  },
  "3-oaks-gaming-purple-diamond": {
    mechanics: ["Линии", "Сбор символов", "Расширяющиеся барабаны"],
    source: "https://3oaks.com/game/purple_diamond",
    verifiedAt,
    evidence: "Official Collect Symbols unlock three additional rows one by one and absorb Bonus values; the page explicitly names Expanding Reels.",
  },
  "3-oaks-gaming-rio-gems": {
    mechanics: ["Линии", "Респины", "Mystery Symbols"],
    source: "https://3oaks.com/game/rio_gems",
    verifiedAt,
    evidence: "Official Hold & Win grants three respins and includes Mystery Symbols that reveal jackpots or a Super Bonus Symbol.",
  },
};

export function getCatalogResearch3OaksFill4(slug: string) {
  return records[slug];
}
