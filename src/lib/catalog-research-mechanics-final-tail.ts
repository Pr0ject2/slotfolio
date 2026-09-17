import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-17";

const records: Record<string, CatalogResearch> = {
  "3-oaks-gaming-coin-up-volcano": {
    mechanics: ["Сбор символов"],
    source: "https://3oaks.com/game/coin_volcano",
    verifiedAt,
    evidence: "Official 3 Oaks page says Bonus Symbols are collected during respins and the Collect Symbol gathers all current coin values.",
  },
  "bgaming-cats-love-yummy": {
    mechanics: ["Сбор символов"],
    source: "https://bgaming.com/games/cats-love-yummy",
    verifiedAt,
    evidence: "Official BGaming page says collecting two or more Bonus symbols during Free Spins awards five additional Free Spins.",
  },
  "wazdan-fishermans-luck": {
    mechanics: ["Сбор символов"],
    source: "https://wazdan.com/games/fishermans-luck",
    verifiedAt,
    evidence: "Official Wazdan page identifies Collector gameplay where Gainer symbols gather Cash and Jackpot values.",
  },
  "wazdan-football-mania-deluxe": {
    mechanics: ["Сбор символов"],
    source: "https://wazdan.com/games/football-mania-deluxe",
    verifiedAt,
    evidence: "Official Wazdan page describes the Football Bonus as collecting match balls.",
  },
  "wazdan-fruit-mania": {
    mechanics: ["Сбор символов"],
    source: "https://wazdan.com/games/fruit-mania",
    verifiedAt,
    evidence: "Official Wazdan page says the Diamond Bonus starts after filling the entire matrix with diamond icons and keeps landed diamonds locked during Bonus Spins.",
  },
  "wazdan-fruit-mania-deluxe": {
    mechanics: ["Сбор символов"],
    source: "https://wazdan.com/games/fruit-mania-deluxe",
    verifiedAt,
    evidence: "Official Wazdan page says the Diamond Bonus matrix fills with red precious stones and awards extra spins when the matrix is full.",
  },
  "wazdan-magic-stars-9": {
    mechanics: ["Сбор символов"],
    source: "https://wazdan.com/games/magic-stars-9",
    verifiedAt,
    evidence: "Official Wazdan page says Star Bonus Symbols stay locked during the feature and the collected amount determines the cash prize.",
  },
  "wazdan-ox-coin": {
    mechanics: ["Сбор символов"],
    source: "https://wazdan.com/ox-coin",
    verifiedAt,
    evidence: "Official Wazdan page explicitly lists Collector Multiplier and sticky bonus-symbol respins as core mechanics.",
  },
  "push-gaming-big-bamboo": {
    mechanics: ["Сбор символов"],
    source: "https://www.pushgaming.com/games/big-bamboo.html",
    verifiedAt,
    evidence: "Official Push Gaming page lists Collector Symbols in Golden Bamboo and describes symbol collection in the Free Spins feature.",
  },
  "push-gaming-iron-phoenix": {
    mechanics: ["Способы"],
    source: "https://www.pushgaming.com/games/iron-phoenix.html",
    verifiedAt,
    evidence: "Official Push Gaming page says three or more matching symbols win anywhere on adjacent reels starting from the leftmost reel, without fixed paylines.",
  },
  "nolimit-city-ding-dong-death": {
    mechanics: ["Каскады"],
    source: "https://nolimitcity.com/games/ding-dong-death",
    verifiedAt,
    evidence: "Official Nolimit City page explicitly describes avalanches as the progression event for the Death Meter.",
  },
  "playn-go-bakers-treat": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/baker%27s-treat",
    verifiedAt,
    evidence: "Official Play’n GO page says a special treat token is collected for each qualifying dessert stack and token trios trigger Flour Power features.",
  },
  "playn-go-cash-vandal": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/cash-vandal",
    verifiedAt,
    evidence: "Official Play’n GO page describes matching symbols to create winning paylines.",
  },
  "playn-go-dawn-of-egypt": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/dawn-of-egypt",
    verifiedAt,
    evidence: "Official Play’n GO page says the Scarab Wild substitutes to help create more winning lines.",
  },
  "playn-go-hugo-goal": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/posts/play-n-go-has-its-eye-on-the-ball-with-hugo-goal",
    verifiedAt,
    evidence: "Official Play’n GO release says wins are made by matching three symbols on any payline.",
  },
  "playn-go-jolly-roger-2": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/jolly-roger-2",
    verifiedAt,
    evidence: "Official Play’n GO page says players collect four pieces of the treasure map during Treasure Map Hunt.",
  },
  "playn-go-mystery-joker": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/mystery-joker",
    verifiedAt,
    evidence: "Official Play’n GO page says collecting three Scatter symbols unlocks Free Spins.",
  },
  "playn-go-fangs-and-fire": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/fangs-%26-fire",
    verifiedAt,
    evidence: "Official Play’n GO page describes Gong accumulation during respins, progressive row unlocking, and a full 34-Gong grid awarding the Mythical Prize.",
  },
};

export function getCatalogResearchMechanicsFinalTail(slug: string) {
  return records[slug];
}
