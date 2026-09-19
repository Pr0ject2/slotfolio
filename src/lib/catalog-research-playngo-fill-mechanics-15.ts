import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-19";

const records: Record<string, CatalogResearch> = {
  "playn-go-fulong-88": {
    mechanics: ["Трансформация символов", "Instant Prizes", "Удаление символов"],
    source: "https://www.playngo.com/games/fulong-88",
    verifiedAt,
    evidence: "Official game page describes activating high-paying symbols to transform matching symbols into Golden versions, unlocking Instant Prizes, and Free Spins removing all low-paying symbols from the game.",
  },
  "playn-go-gold-of-fortune-god": {
    mechanics: ["Бонусное колесо", "Hold N Spin", "Множители"],
    source: "https://www.playngo.com/games/gold-of-fortune-god",
    verifiedAt,
    evidence: "Official game page describes the Dragon's Fortune Multiplier Wheel and the Kingdom's Treasure Hold & Spin feature with multiplier rewards up to x500 and a full-screen x5000 prize.",
  },
  "playn-go-playn-go-mole-digger": {
    mechanics: ["Сбор символов", "Респины", "Hold N Win"],
    source: "https://www.playngo.com/games/play%27n-go-mole-digger",
    verifiedAt,
    evidence: "Official game page describes Gem collection into BOOST, MYSTERY and COLLECT pots and a Hold'n Win feature starting with three re-spins where every new Gem resets the counter.",
  },
  "playn-go-fire-toad-2": {
    mechanics: ["Способы", "Трансформация символов"],
    source: "https://www.playngo.com/games/fire-toad-2",
    verifiedAt,
    evidence: "Official release describes 1,024 payways, evolved transformative features, shifting/splitting symbols and the Toad Upgrade feature powering up symbols mid-spin.",
  },
  "playn-go-luchamigos": {
    mechanics: ["Способы", "Stacked Wilds", "Mega Symbols", "Random Wilds"],
    source: "https://www.playngo.com/games/luchamigos",
    verifiedAt,
    evidence: "Official game page describes way wins and three Hot Amigo Wild powers: a stacked reel of Wilds, a 2x2 Mega Wild and four random Wilds across the reels.",
  },
  "playn-go-naughty-nicks-book": {
    mechanics: ["Сбор символов", "Расширяющиеся барабаны", "Расширяющиеся символы", "Gamble"],
    source: "https://www.playngo.com/games/naughty-nick%27s-book",
    verifiedAt,
    evidence: "Official game page describes collecting Book Scatters, a sixth reel opening for Free Spins, a randomly selected Expanding Symbol and a Gamble feature based on card colour or suit.",
  },
  "playn-go-eye-of-atum": {
    mechanics: ["Линии", "Расширяющиеся символы", "Множители", "Трансформация символов"],
    source: "https://www.playngo.com/games/eye-of-atum",
    verifiedAt,
    evidence: "Official game page describes Atum expanding to cover reels, Scatter multipliers up to 500x and progressive symbol upgrades during Free Spins.",
  },
  "playn-go-cash-a-cabana": {
    mechanics: ["Расширяющиеся символы", "Множители", "Прогрессивные множители"],
    source: "https://www.playngo.com/games/cash-a-cabana",
    verifiedAt,
    evidence: "Official game page describes Expanding Wilds with x2 multipliers and a Cabana Show progression where each Expanding Wild activates the next Win Multiplier up to x20.",
  },
  "playn-go-cat-wilde-and-the-pyramids-of-dead": {
    mechanics: ["Линии", "Расширяющиеся символы", "Pick-and-click", "Jackpots", "Instant Prizes"],
    source: "https://www.playngo.com/games/cat-wilde-and-the-pyramids-of-dead",
    verifiedAt,
    evidence: "Official game page confirms the Dead-series Expanding Symbol plus a Jackpot click-and-pick round with urns, fixed jackpot awards and Instant Prize Scatter values from 5x to 100x bet.",
  },
  "playn-go-immortails-of-egypt": {
    mechanics: ["Сбор символов", "Трансформация символов", "Расширяющиеся символы", "Расширяющиеся барабаны", "Множители"],
    source: "https://www.playngo.com/games/immortails-of-egypt",
    verifiedAt,
    evidence: "Official game page describes kitten progress meters, symbol transformations into Expanding Wilds, reels expanding from 5x3 to 5x4 during Free Spins and a Free Spins multiplier.",
  },
  "playn-go-legend-of-the-ice-dragon": {
    mechanics: ["Каскады", "Sticky Frames", "Множители", "Wild Add", "Удаление символов", "Трансформация символов"],
    source: "https://www.playngo.com/games/legend-of-the-ice-dragon",
    verifiedAt,
    evidence: "Official release says Wilds leave frames, landing a Wild in a frame increases its multiplier, collected Wilds return in the finale, and the game includes destroy, transform and add-Wild effects.",
  },
  "playn-go-puebla-parade": {
    mechanics: ["Линии", "Расширяющиеся барабаны", "Множители"],
    source: "https://www.playngo.com/games/puebla-parade",
    verifiedAt,
    evidence: "Official release describes Dancer Wilds merging to create a multiplier and reels expanding from 5x4 to 5x7.",
  },
  "playn-go-forge-of-fortunes": {
    mechanics: ["Респины", "Extra Life"],
    source: "https://www.playngo.com/games/forge-of-fortunes",
    verifiedAt,
    evidence: "Official game page describes Forging Re-Spins and a flashing-red-light modifier that acts as an extra life by restarting the Re-Spins.",
  },
  "playn-go-primal-rampage": {
    mechanics: ["Бонусное колесо", "Множители"],
    source: "https://www.playngo.com/games/primal-rampage",
    verifiedAt,
    evidence: "Official game page names the Primal Wheel and explicitly says Wild Multipliers add extra force to winning combinations.",
  },
};

export function getCatalogResearchPlayngoFillMechanics15(slug: string) {
  return records[slug];
}
