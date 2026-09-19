import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-19";

const records: Record<string, CatalogResearch> = {
  "playn-go-cat-wilde-and-the-incan-quest": {
    mechanics: ["Линии", "Респины", "Walking Wilds", "Расширяющиеся символы", "Sticky Symbols", "Сбор символов", "Jackpots"],
    source: "https://www.playngo.com/games/cat-wilde-and-the-incan-quest",
    verifiedAt,
    evidence: "Official game page describes Falling Wild Re-Spins where Wilds move down the reels and can expand, a collector totem for Bonus symbols, sticky Bonus symbols in the Bonus Game and Minor/Major/Mega jackpots.",
  },
  "playn-go-gemix-100": {
    mechanics: ["Кластеры", "Множители", "Трансформация символов", "Wild Add", "Sticky Wilds"],
    source: "https://www.playngo.com/games/gemix-100",
    verifiedAt,
    evidence: "Official game page describes cluster wins, a Win Multiplier up to 100x, Crystal Charge effects that transform symbols, Miner Wild additions and Wizard-created Sticky Wilds.",
  },
  "playn-go-hugo-legacy": {
    mechanics: ["Кластеры", "Wild Add", "Трансформация символов", "Сбор символов", "Gamble"],
    source: "https://www.playngo.com/games/hugo-legacy",
    verifiedAt,
    evidence: "Official release describes cluster-style grid clearing, Charge features that add Wilds and transform or upgrade symbols, collection thresholds for Free Spin tiers and an in-feature Gamble choice.",
  },
  "playn-go-legacy-of-undead-dragon-abyssways": {
    mechanics: ["Способы", "Instant Prizes", "Респины", "Расширяющиеся барабаны", "Wild Add", "Sticky Wilds", "Прогрессивные множители"],
    source: "https://www.playngo.com/games/legacy-of-undead-dragon-abyssways",
    verifiedAt,
    evidence: "Official game page describes Haunted Gold Coin Instant Prizes, a full Dragon's Wrath respin, grid expansion from 6x4 to 6x6, added Fire Wilds and Sticky Fire Wilds whose win multipliers grow by +1 after every spin.",
  },
  "playn-go-nsync-pop": {
    mechanics: ["Расширяющиеся барабаны", "Mystery Symbols"],
    source: "https://www.playngo.com/games/%2Ansync-pop",
    verifiedAt,
    evidence: "Official game page describes the Free Spins objective of expanding the reels through Encore Spin and says every Pop symbol reveals a Mystery symbol.",
  },
  "playn-go-legacy-of-dynasties": {
    mechanics: ["Расширяющиеся символы", "Бонусное колесо", "Sticky Symbols"],
    source: "https://www.playngo.com/games/legacy-of-dynasties",
    verifiedAt,
    evidence: "Official game page describes Expanding Symbols, a spinning wheel that selects the Free Spins award and Nested Spins where the current Expanding Symbols are locked in for the nested feature.",
  },
  "playn-go-gates-of-troy": {
    mechanics: ["Сбор символов", "Wild Add", "Множители"],
    source: "https://www.playngo.com/games/gates-of-troy",
    verifiedAt,
    evidence: "Official release says Wilds landing in Free Spins leave frames and are all added back on the final Free Spin, while random x2 Multiplier Wilds can land in both base game and Free Spins.",
  },
  "playn-go-merlin-journey-of-flame": {
    mechanics: ["Расширяющиеся символы", "Расширяющиеся барабаны", "Gamble"],
    source: "https://www.playngo.com/games/merlin-journey-of-flame",
    verifiedAt,
    evidence: "Official release describes the Special Expanding Symbol, Free Spins adding a sixth reel and the Gamble Spell mini-game that can double a prize on a correct colour guess.",
  },
  "playn-go-merlin-realm-of-charm": {
    mechanics: ["Расширяющиеся символы", "Sticky Symbols", "Gamble", "Instant Prizes"],
    source: "https://www.playngo.com/games/merlin-realm-of-charm",
    verifiedAt,
    evidence: "Official release explicitly lists Sticky Expanding Symbols, a card-based Gamble Round and Free Spins with Instant Prizes.",
  },
  "playn-go-mystery-egg-surprise": {
    mechanics: ["Линии", "Множители", "Instant Prizes"],
    source: "https://www.playngo.com/games/mystery-egg-surprise",
    verifiedAt,
    evidence: "Official game page describes Mystery Egg Prize Multipliers up to 100x and three Mystery Eggs awarding an instant prize while retriggering Free Spins.",
  },
  "playn-go-moon-princess": {
    mechanics: ["Каскады", "Множители", "Трансформация символов", "Wild Add", "Удаление символов", "Респины"],
    source: "https://www.playngo.com/games/moon-princess",
    verifiedAt,
    evidence: "Official game page says winning symbols disappear and drop, the win multiplier rises on new drops, Love transforms symbols, Star adds Wilds, Storm removes symbols and a charged Princess Trinity meter triggers a re-spin.",
  },
  "playn-go-dio-killing-the-dragon": {
    mechanics: ["Сбор символов", "Sticky Wilds", "Wild Add", "Множители", "Трансформация символов", "Респины"],
    source: "https://www.playngo.com/games/dio-killing-the-dragon",
    verifiedAt,
    evidence: "Official game rules describe Sticky Wilds in Free Spins, features that add Wilds, Wild Multipliers, symbol upgrades and the Lock Up Wolves feature awarding re-spins, alongside orb collection progression.",
  },
};

export function getCatalogResearchPlayngoFillMechanics14(slug: string) {
  return records[slug];
}
