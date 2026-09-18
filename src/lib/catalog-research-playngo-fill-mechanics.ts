import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "playn-go-cash-a-cabana": {
    mechanics: ["Расширяющиеся символы", "Множители"],
    source: "https://www.playngo.com/games/cash-a-cabana",
    verifiedAt,
    evidence: "Official game page explicitly describes Expanding Wilds and progressive Win Multipliers up to x20.",
  },
  "playn-go-count-jokula": {
    mechanics: ["Респины", "Множители"],
    source: "https://www.playngo.com/post/count-jokula",
    verifiedAt,
    evidence: "Official release says the Re-Spin mechanic awards up to seven re-spins and increases the multiplier with every re-spin.",
  },
  "playn-go-fat-frankies": {
    mechanics: ["Респины", "Множители"],
    source: "https://www.playngo.com/games/fat-frankies",
    verifiedAt,
    evidence: "Official game page says sticky Burgers reward re-spins and both Flip the Tip and Five Star Free Spins increase multipliers.",
  },
  "playn-go-game-of-gladiators-uprising": {
    mechanics: ["Респины", "Множители"],
    source: "https://www.playngo.com/games/game-of-gladiators%3A-uprising",
    verifiedAt,
    evidence: "Official game page says Gladiators Oath can cause re-spins and Guess the Victor can multiply net prizes fivefold.",
  },
  "playn-go-gigantoonz": {
    mechanics: ["Каскады", "Кластеры"],
    source: "https://www.playngo.com/posts/gigantoonz",
    verifiedAt,
    evidence: "Official release describes Dynamic Cluster Payways, cluster matching and symbols landing after cascades.",
  },
  "playn-go-lady-of-fortune": {
    mechanics: ["Множители", "Pick-and-click"],
    source: "https://www.playngo.com/games/lady-of-fortune",
    verifiedAt,
    evidence: "Official game page lists x2–x5 Wild multipliers and a Pick-a-Prize bonus triggered by three bonus symbols.",
  },
  "playn-go-grannys-wild": {
    mechanics: ["Сбор символов", "Респины", "Трансформация символов"],
    source: "https://www.playngo.com/games/granny%27s-wild",
    verifiedAt,
    evidence: "Official game page describes Coin Collection, respins with locked Coins, and Granny transforming Coin symbols into Wilds.",
  },
  "playn-go-frozen-gems": {
    mechanics: ["Способы", "Каскады", "Множители"],
    source: "https://www.playngo.com/post/play-n-go-unearth-their-latest-gem-with-new-release",
    verifiedAt,
    evidence: "Official release describes Dynamic Payways up to 8,748 payways together with an unlimited cascade multiplier.",
  },
  "playn-go-new-year-riches": {
    mechanics: ["Множители", "Респины"],
    source: "https://www.playngo.com/games/new-year-riches",
    verifiedAt,
    evidence: "Official game page describes the Free Spins Win Multiplier growing from x2 to x20 and explicitly references re-spins.",
  },
  "playn-go-canine-carnage": {
    mechanics: ["Сбор символов", "Множители"],
    source: "https://www.playngo.com/games/canine-carnage",
    verifiedAt,
    evidence: "Official game page describes Cash Collection abilities and x3 multipliers that build throughout Free Spins.",
  },
  "playn-go-diamonds-of-the-realm": {
    mechanics: ["Множители", "Сбор символов"],
    source: "https://www.playngo.com/games/diamonds-of-the-realm",
    verifiedAt,
    evidence: "Official game page lists x2/x5/x10/x100 Win Multipliers and requires collecting Diamonds to raise the multiplier during Free Spins.",
  },
};

export function getCatalogResearchPlayngoFillMechanics(slug: string) {
  return records[slug];
}
