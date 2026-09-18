import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "playn-go-13th-trial-hercules-abyssways": {
    mechanics: ["Способы", "Расширяющиеся символы", "Persistent Wilds", "Abyssways™"],
    source: "https://www.playngo.com/games/13th-trial-hercules-abyssways",
    verifiedAt,
    evidence: "Official Abyssways and game pages describe the dynamic ways grid, Will of Zeus full-reel Expanding Wilds, persistent Wild states and the Abyssways Free Spins grid.",
  },
  "playn-go-ankh-of-anubis-awakening": {
    mechanics: ["Сбор символов", "Респины", "Sticky Wilds", "Расширяющиеся символы", "Stacked Wilds"],
    source: "https://www.playngo.com/games/ankh-of-anubis-awakening",
    verifiedAt,
    evidence: "Official game page describes collecting Ankh symbols, Anubis Re-Spins, held Wilds that expand vertically and ultimately transform into Stacked Wilds.",
  },
  "playn-go-banana-rush": {
    mechanics: ["Линии", "Сбор символов", "Бонусное колесо", "Hold & Win", "Респины", "Множители"],
    source: "https://www.playngo.com/games/banana-rush",
    verifiedAt,
    evidence: "Official game page describes the Modifier Wheel, Banana Basket collection, win multipliers and Gorilla Hold & Win re-spins that reset as more Bananas land.",
  },
  "playn-go-banquet-of-dead": {
    mechanics: ["Линии", "Расширяющиеся символы", "Удаление символов", "Gamble"],
    source: "https://www.playngo.com/games/banquet-of-dead",
    verifiedAt,
    evidence: "Official page describes Expanding Symbols, progressive removal of low-value symbols and the optional card Gamble round on its 10-payline layout.",
  },
  "playn-go-bao-shi": {
    mechanics: ["Множители", "Random Wilds", "Трансформация символов"],
    source: "https://www.playngo.com/games/bao-shi",
    verifiedAt,
    evidence: "Official page describes randomly triggered Coin Wilds with multipliers and symbols transforming/upgrading in both appearance and payout value.",
  },
  "playn-go-baron-lord-of-saturday": {
    mechanics: ["Сбор символов", "Random Wilds", "Wild Reels", "Множители"],
    source: "https://www.playngo.com/games/baron%3A-lord-of-saturday",
    verifiedAt,
    evidence: "Official page describes Random Wilds, fully Wild reels and Wild multipliers that progress through Free Spins stages up to x10.",
  },
  "playn-go-beasts-of-fire-maximum": {
    mechanics: ["Расширяющиеся барабаны", "Charging Fire Beasts"],
    source: "https://www.playngo.com/games/beasts-of-fire-maximum",
    verifiedAt,
    evidence: "Official page describes Scatter-driven expanding reels and Charging Fire Beasts adding extra Buffalo symbols to the reels.",
  },
  "playn-go-boat-bonanza-croconile": {
    mechanics: ["Линии", "Сбор символов", "Респины", "Lock’n Spin", "Множители", "Instant Prizes"],
    source: "https://www.playngo.com/games/boat-bonanza-croconile%21",
    verifiedAt,
    evidence: "Official page describes Catch collection, Croc'N re-spins, Sobek's Rage Lock'n Spin, x2-x10 multipliers and Instant Prize values.",
  },
  "playn-go-bubblin-riches": {
    mechanics: ["Сбор символов", "Lock’n Gold", "Sticky Wilds", "Множители"],
    source: "https://www.playngo.com/games/bubblin%27-riches",
    verifiedAt,
    evidence: "Official page describes Coin collection, Lock'n Gold with multiplier Coin Scatters and Reward Spins featuring Sticky Wilds.",
  },
  "playn-go-buildin-even-more-bucks": {
    mechanics: ["Бонусное колесо", "Расширяющиеся барабаны"],
    source: "https://www.playngo.com/games/buildin%27-even-more-bucks",
    verifiedAt,
    evidence: "Official page describes the PPS/Wheel system and Free Spins expanding the reel set to a 5x5 layout.",
  },
};

export function getCatalogResearchPlayngoFillMechanics9(slug: string) {
  return records[slug];
}
