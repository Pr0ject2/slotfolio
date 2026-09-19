import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-19";

const records: Record<string, CatalogResearch> = {
  "playn-go-bull-in-a-china-shop": {
    mechanics: ["Линии", "Wild Add", "Stacked Wilds", "Множители"],
    source: "https://www.playngo.com/games/bull-in-a-china-shop",
    verifiedAt,
    evidence: "Official game page says the Happy Bull creates 2-6 Wilds, Proud Bull creates 1-5 Stacked Wilds and Angry Bull creates multiple Multiplier Wilds with x2-x10 values.",
  },
  "playn-go-candy-island-princess": {
    mechanics: ["Линии", "Расширяющиеся символы", "Instant Prizes", "Респины", "Множители"],
    source: "https://www.playngo.com/games/candy-island-princess",
    verifiedAt,
    evidence: "Official game page describes Candy Splash expanding Contestant symbols, Camera Scatters paying one of six Instant Wins, Lucky Re-Spin from two Ticket Scatters and an end-of-feature x2 multiplier choice.",
  },
  "playn-go-disco-diamonds": {
    mechanics: ["Способы", "Респины", "Трансформация символов", "Sticky Wilds", "Прогрессивные множители", "Бонусное колесо", "Instant Prizes"],
    source: "https://www.playngo.com/games/disco-diamonds",
    verifiedAt,
    evidence: "Official game page describes Disco Re-Spins, Wilds converting into Special Wilds that stay for the re-spin, a multiplier that increases by +1 on further re-spins and a Bonus Wheel awarding Instant Prizes or Free Spins.",
  },
  "playn-go-fox-mayhem": {
    mechanics: ["Линии", "Множители", "Hold N Spin", "Сбор символов", "Sticky Symbols"],
    source: "https://www.playngo.com/games/fox-mayhem",
    verifiedAt,
    evidence: "Official game page and release describe a random Free Spins multiplier and a lock-and-spin-style Prize Collection round where landed symbols stick, add their values to the pot and reset the lives counter.",
  },
  "playn-go-free-reelin-joker": {
    mechanics: ["Линии", "Множители", "Расширяющиеся барабаны"],
    source: "https://www.playngo.com/games/free-reelin%27-joker",
    verifiedAt,
    evidence: "Official game page says Golden Joker can double a line win and Free Reelin' Fun expands the initial three reels by up to three additional reels when each added reel improves the win.",
  },
  "playn-go-gerards-gambit": {
    mechanics: ["Линии", "Расширяющиеся барабаны", "Gamble", "Множители", "Респины", "Sticky Wilds"],
    source: "https://www.playngo.com/games/gerard%27s-gambit",
    verifiedAt,
    evidence: "Official game page describes a reel that expands through ten levels, three Gamble options with multipliers, re-spins triggered by Wilds and Wilds becoming sticky during both re-spins and Free Spins.",
  },
  "playn-go-house-of-doom-2-the-crypt": {
    mechanics: ["Линии", "Расширяющиеся символы", "Респины", "Множители", "Трансформация символов", "Sticky Wilds"],
    source: "https://www.playngo.com/games/house-of-doom-2%3A-the-crypt",
    verifiedAt,
    evidence: "Official game page describes Spirit Gate Wilds expanding to a full reel and triggering re-spins, Fire Mistress win multipliers, Metal Priestess symbol upgrades and expanded Wilds remaining during the re-spin.",
  },
  "playn-go-diamonds-of-the-realm": {
    mechanics: ["Множители", "Сбор символов", "Прогрессивные множители"],
    source: "https://www.playngo.com/games/diamonds-of-the-realm",
    verifiedAt,
    evidence: "Official game page says Free Spins start with an x2 Win Multiplier and collecting six, twelve and eighteen Diamond Scatters increases it to x5, x10 and x100 while also adding Free Spins.",
  },
  "playn-go-golden-ticket-2": {
    mechanics: ["Каскады", "Множители", "Wild Add", "Mega Symbols", "Instant Prizes"],
    source: "https://www.playngo.com/games/golden-ticket-2",
    verifiedAt,
    evidence: "Official game page describes x2/x3 Multiplier Wilds, a meter that randomly adds Wilds, 2x2 Wilds during Win Spins and an Instant Prize for clearing the entire grid.",
  },
  "playn-go-fire-toad": {
    mechanics: ["Способы", "Трансформация символов"],
    source: "https://www.playngo.com/games/fire-toad",
    verifiedAt,
    evidence: "Official game page says exactly two Scatters select a Toad and upgrade all smaller Toad symbols into the selected higher-paying symbol, with further upgrades during Free Spins retriggers.",
  },
  "playn-go-demon": {
    mechanics: ["Линии", "Трансформация символов", "Множители"],
    source: "https://www.playngo.com/games/demon",
    verifiedAt,
    evidence: "Official game page says the Wild Mask instantly transforms Dave Hill symbols into Wilds and Free Spins use random x2, x3, x5 or x8 win multipliers, with nested Free Spins retaining the active multiplier.",
  },
  "playn-go-divine-showdown": {
    mechanics: ["Линии", "Множители", "Wild Reels", "Трансформация символов"],
    source: "https://www.playngo.com/games/divine-showdown",
    verifiedAt,
    evidence: "Official game page describes a random Multiplier Reel awarding up to x10, Wukong adding Wild Reels and Anubis turning one or two symbol instances into Wilds.",
  },
};

export function getCatalogResearchPlayngoFillMechanics17(slug: string) {
  return records[slug];
}
