import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-16";

const research: Record<string, CatalogResearch> = {
  "hacksaw-gaming-cloud-princess": {
    mechanics: ["Каскады", "Multiplier Symbols"],
    source: "https://www.hacksawgaming.com/games/cloud-princess",
    verifiedAt,
    evidence: "Official rules describe cascades and separate Multiplier Symbols that activate after a winning spin, combine their values and grow on later cascades.",
  },
  "hacksaw-gaming-donny-and-danny": {
    mechanics: ["Линии", "Dollar-Reels"],
    source: "https://www.hacksawgaming.com/games/donny-and-danny",
    verifiedAt,
    evidence: "Official rules define LootLines as winning paylines and separately define Dollar-Reels, where Danny expands upward and reveals multiplier values on covered positions.",
  },
  "hacksaw-gaming-donut-division": {
    mechanics: ["Линии", "Gooey Guns and Gooey Wilds"],
    source: "https://www.hacksawgaming.com/games/donut-division",
    verifiedAt,
    evidence: "Official rules describe winning paylines and the separate Gooey Guns and Gooey Wilds mechanic, where Guns fire connected Wild multipliers across their row.",
  },
  "hacksaw-gaming-dorks-of-the-deep": {
    mechanics: ["Expanding Wild Reels", "Last Chance"],
    source: "https://www.hacksawgaming.com/games/dorks-of-the-deep",
    verifiedAt,
    evidence: "Official rules define Expanding Wild Reels and separately name the Last Chance feature, which awards respins while sticky Wild Reels still have lives remaining.",
  },
  "hacksaw-gaming-dragons-domain": {
    mechanics: ["Каскады", "Dragonfire"],
    source: "https://www.hacksawgaming.com/games/dragons-domain",
    verifiedAt,
    evidence: "Official rules describe cascading symbols and separately define Dragonfire, which removes paying symbols in a cross-pattern and interacts with Charred Land multipliers.",
  },
  "hacksaw-gaming-duel-at-dawn": {
    mechanics: ["DuelReels™", "The Outlaw Feature"],
    source: "https://www.hacksawgaming.com/games/duel-at-dawn",
    verifiedAt,
    evidence: "Official rules define DuelReels™ and separately define The Outlaw Feature, where an Outlaw expands into a full Wild reel and shoots additional Wild symbols onto the grid.",
  },
  "hacksaw-gaming-fire-my-laser": {
    mechanics: ["Каскады", "Bombs Away"],
    source: "https://www.hacksawgaming.com/games/fire-my-laser",
    verifiedAt,
    evidence: "Official rules state removed symbols trigger cascades and separately define Bombs Away, where Bombs and Lasers are the primary win mechanic and remove symbols in distinct patterns.",
  },
  "hacksaw-gaming-frkn-bananas": {
    mechanics: ["Линии", "Banana Spread"],
    source: "https://www.hacksawgaming.com/games/frkn-bananas",
    verifiedAt,
    evidence: "Official rules describe winning paylines and the separate Banana Spread mechanic, where Spreading Banana Wild multipliers expand left or upward when they create a win.",
  },
  "hacksaw-gaming-hounds-of-hell": {
    mechanics: ["Каскады", "Hellhounds"],
    source: "https://www.hacksawgaming.com/games/hounds-of-hell",
    verifiedAt,
    evidence: "Official rules retain the verified cascade behavior and separately define Hellhounds, which spread to the top of their reel and combine adding or multiplying cash-prize multipliers.",
  },
  "hacksaw-gaming-le-pharaoh": {
    mechanics: ["Сбор символов", "Sticky Re-drops"],
    source: "https://www.hacksawgaming.com/games/le-pharaoh",
    verifiedAt,
    evidence: "Official rules preserve the collection mechanic and separately define Sticky Re-drops, where winning symbols stick, create Golden Squares and award repeated re-drops while wins extend.",
  },
  "hacksaw-gaming-le-viking": {
    mechanics: ["Сбор символов", "Raid Spins"],
    source: "https://www.hacksawgaming.com/games/le-viking",
    verifiedAt,
    evidence: "Official rules preserve the collection mechanic and separately define Raid Spins, a three-refilling-lives re-spin mode where Coins, Diamonds and Clovers remain sticky.",
  },
  "hacksaw-gaming-marlin-masters": {
    mechanics: ["Сбор символов", "Marlin Progress Bar"],
    source: "https://www.hacksawgaming.com/games/marlin-masters",
    verifiedAt,
    evidence: "Official rules state Fishermen collect Marlin cash prizes and separately define the Marlin Progress Bar, which advances on Fisherman symbols and unlocks free-spin and multiplier upgrades.",
  },
  "hacksaw-gaming-octo-attack": {
    mechanics: ["Каскады", "Tenta-Grab"],
    source: "https://www.hacksawgaming.com/games/octo-attack",
    verifiedAt,
    evidence: "Official rules describe cascades after wins and separately define Tenta-Grab, where the Eye of Otto replaces Ink Stained positions with a grabbed symbol.",
  },
  "hacksaw-gaming-phoenix-duelreels": {
    mechanics: ["DuelReels™", "Resurrection Spins"],
    source: "https://www.hacksawgaming.com/games/phoenix-duelreels",
    verifiedAt,
    evidence: "Official rules define DuelReels™ and separately define Resurrection Spins, re-spins awarded when the Phoenix loses a duel with at least one guaranteed VS symbol.",
  },
  "hacksaw-gaming-reign-of-rome": {
    mechanics: ["Линии", "Tribute Symbols"],
    source: "https://www.hacksawgaming.com/games/reign-of-rome",
    verifiedAt,
    evidence: "Official rules define winning paylines and separately define Tribute Symbols, dynamic adding and multiplying values whose combined LootLine value determines the cash prize.",
  },
  "hacksaw-gaming-strength-of-hercules": {
    mechanics: ["Сбор символов", "RotoGrid™"],
    source: "https://www.hacksawgaming.com/games/strength-of-hercules",
    verifiedAt,
    evidence: "Official rules preserve the collection mechanic and separately define RotoGrid™, where each activation rotates the grid a quarter turn and processes newly created wins.",
  },
  "hacksaw-gaming-wings-of-horus": {
    mechanics: ["Orb Transformations", "Sacred Scripture"],
    source: "https://www.hacksawgaming.com/games/wings-of-horus",
    verifiedAt,
    evidence: "Official rules define the Orb symbol transformations and separately define Sacred Scripture, which awards 500x when low symbols spell HORUS horizontally.",
  },
  "hacksaw-gaming-bash-bros": {
    mechanics: ["Cash Stacks"],
    source: "https://www.hacksawgaming.com/games/bash-bros",
    verifiedAt,
    evidence: "Official Cash Stacks rules state that a landed Cash symbol expands upward into a Cash Stack and its revealed multipliers are added together.",
  },
  "hacksaw-gaming-booze-bash": {
    mechanics: ["Match-2-Win"],
    source: "https://www.hacksawgaming.com/games/booze-bash",
    verifiedAt,
    evidence: "Official Match-2-Win rules state that matching left and right symbol halves on connected reel pairs form winning Pairs.",
  },
  "hacksaw-gaming-tiger-legends": {
    mechanics: ["Expanding Legendary Frame Warriors"],
    source: "https://www.hacksawgaming.com/games/tiger-legends",
    verifiedAt,
    evidence: "Official rules state that a Legendary Frame on a high-paying Warrior can expand upward into an Expanding Legendary Frame Warrior when it is part of a win.",
  },
};

export function getCatalogResearchHacksawProviderTail(slug: string) {
  return research[slug];
}
