import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "playn-go-pilgrim-of-dead": {
    mechanics: ["Расширяющиеся символы", "Блокировка символов", "Трансформация символов"],
    source: "https://www.playngo.com/games/pilgrim-of-dead",
    verifiedAt,
    evidence: "Official game page/release describes a Special Expanding symbol, the chosen symbol transforming into a golden sticky symbol, and sticky symbols remaining in place during Free Spins.",
  },
  "playn-go-jewel-box": {
    mechanics: ["Pick-and-click", "Множители"],
    source: "https://www.playngo.com/games/jewel-box",
    verifiedAt,
    evidence: "Official game page describes a pick-and-click Jewel Box bonus and random x2-x5 Multiplier Wilds.",
  },
  "playn-go-moon-princess-trinity": {
    mechanics: ["Каскады", "Кластеры", "Множители", "Трансформация символов"],
    source: "https://www.playngo.com/games/moon-princess-trinity",
    verifiedAt,
    evidence: "Official game page describes matching clusters on a 5x5 grid, winning symbols vanishing for subsequent drops, an increasing win multiplier, and Princess powers that transform/replace symbols.",
  },
  "playn-go-playn-go-mole-digger": {
    mechanics: ["Сбор символов", "Респины"],
    source: "https://www.playngo.com/games/play%27n-go-mole-digger",
    verifiedAt,
    evidence: "Official game page describes Gems filling feature pots, Mine Carts/Collect gathering cash values, and Hold'n Win beginning with three re-spins that reset whenever a new Gem lands.",
  },
  "playn-go-fire-joker-freeze": {
    mechanics: ["Респины", "Блокировка символов", "Бонусное колесо", "Множители"],
    source: "https://www.playngo.com/games/fire-joker-freeze",
    verifiedAt,
    evidence: "Official game page describes Ice/Fire re-spins with sticky symbols, plus the Wheel of Fire and Ice with multiplier levels up to x20.",
  },
  "playn-go-fortune-teller": {
    mechanics: ["Pick-and-click"],
    source: "https://www.playngo.com/games/fortune-teller",
    verifiedAt,
    evidence: "Official game page explicitly describes a pick-and-click bonus where the player turns over hidden cards and matches them for the bonus result.",
  },
};

export function getCatalogResearchPlayngoFillMechanics6(slug: string) {
  return records[slug];
}
