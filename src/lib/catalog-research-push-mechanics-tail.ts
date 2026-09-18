import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

type Entry = {
  mechanics: CatalogResearch["mechanics"];
  evidence: string;
  source?: string;
};

const entries: Record<string, Entry> = {
  "10-cash-bisons": {
    mechanics: ["Сбор символов"],
    evidence: "Official page says the Collector Symbol collects visible Instant Prize and Jackpot Bison values; Scatter collections also fill the locked-row meter.",
  },
  "10-flaming-bisons": {
    mechanics: ["Линии", "Сбор символов"],
    evidence: "Official Push Gaming release describes a 5-reel, 20-payline base game; the game page says Totem Symbols are collected during Free Spins to unlock rows.",
  },
  "10-pharaohs": {
    mechanics: ["Сбор символов"],
    evidence: "Official page says Scarab Symbols are collected during Free Spins to unlock rows and award extra spins.",
  },
  "10-santas-reindeers": {
    mechanics: ["Scatter Pays", "Расширяющиеся барабаны", "Сбор символов"],
    evidence: "Official page explicitly describes classic scatter pays with expanding reels; Bell Symbols are collected into locked-row meters and unlock extra rows during Free Spins.",
  },
  "10-swords": {
    mechanics: ["Сбор символов"],
    evidence: "Official page says Sword Symbols contribute to the progressive meter and Shield Symbols contribute toward progressive low-symbol substitutions in the bonus game.",
  },
  "bait-n-bank": {
    mechanics: ["Сбор символов"],
    evidence: "Official page explicitly names the Collector mechanic: Chest Collectors collect Instant Prizes, and Coins are collected into the chest above the reels.",
  },
  "big-bam-book": {
    mechanics: ["Сбор символов"],
    evidence: "Official page says Scatter Symbols are collected into the multiplier meter during Free Spins.",
  },
  "big-bamboo": {
    mechanics: ["Mystery Symbols", "Респины", "Множители", "Сбор символов"],
    evidence: "Official page describes Mystery Stacks, a Golden Bamboo feature with one respin, Multiplier Symbols up to x10 and Collector Symbols.",
  },
  "big-bamboo-2": {
    mechanics: ["Сбор символов"],
    evidence: "Official page says Bonus and Extra Spin Symbols are collected toward the Low Symbol Meter, with four Bonus Symbols required to advance a level.",
  },
  "big-bite": {
    mechanics: ["Сбор символов"],
    evidence: "Official page says Orca Symbols collect Instant Prizes attached to Fish and Jackpot Symbols; landed Orcas also progress the multiplier meter.",
  },
  "cats-of-olympuss": {
    mechanics: ["Сбор символов"],
    source: "https://www.pushgaming.com/games/cats-olympuss.html",
    evidence: "Official page says collecting five special Coin Symbols during Free Spins opens the next reel array and retriggers the Card Pick Feature.",
  },
  "dinopolis": {
    mechanics: ["Множители", "Блокировка символов", "Сбор символов"],
    evidence: "Official page describes Wild Multipliers, Sticky Stack Wilds that remain for the Dino Bonus, and Dino Collector Coins that fill the progression meter.",
  },
  "dj-cat": {
    mechanics: ["Сбор символов"],
    evidence: "Official page says VIP Symbols contribute increments to each row's Multiplier Meter, including double increments from Double VIP Symbols.",
  },
  "dj-fox": {
    mechanics: ["Сбор символов"],
    evidence: "Official page says visible VIP Symbols are collected into the Multiplier Meter after a reel expands.",
  },
  "fang-city": {
    mechanics: ["Сбор символов"],
    evidence: "Official page says Multiplier Symbols are collected into a persistent Multiplier UI during Free Spins.",
  },
  "fish-n-nudge": {
    mechanics: ["Линии", "Сбор символов"],
    evidence: "Official Push Gaming material states matching combinations pay across 20 paylines; the game page identifies the Fisherman as a Collector Symbol that collects visible Instant Prizes.",
  },
  "fish-n-nudge-big-catch": {
    mechanics: ["Линии", "Сбор символов"],
    evidence: "Official page says matching symbols from the leftmost reel award line wins and identifies the Fisherman as a Collector Symbol that collects all visible Instant Prizes.",
  },
  "iron-phoenix": {
    mechanics: ["Способы"],
    evidence: "Official page says any three or more matching symbols win anywhere on adjacent reels starting from the leftmost reel, without fixed paylines.",
  },
  "masked-mayhem": {
    mechanics: ["Сбор символов", "Множители"],
    evidence: "Official page says the persistent Win Zone collects Instant Prize and Jackpot Symbols in Free Spins, while progression levels add x2, x3 and x5 multipliers.",
  },
  "mystery-mission-to-the-moon": {
    mechanics: ["Линии", "Mystery Symbols"],
    source: "https://www.pushgaming.com/games/mystery-mission-moon.html",
    evidence: "Official page describes Mystery Stacks that nudge to fill a reel and then reveal a random Instant Win Symbol; the verified field is a 20-line layout.",
  },
  "razor-shark-jackpots": {
    mechanics: ["Mystery Symbols", "Сбор символов"],
    evidence: "Official page describes Mystery and Golden Mystery Symbols plus jackpot token meters that accumulate tokens toward five jackpot prizes.",
  },
  "razor-ways": {
    mechanics: ["Способы", "Каскады", "Сбор символов", "Mystery Symbols", "Расширяющиеся барабаны", "Множители"],
    evidence: "Official page describes up to 46,656 ways, cascades that unlock rows, Mystery Symbols, expanding reels and Wild multipliers; its feature also includes Collector Symbols.",
  },
  "red-hot-multipliers": {
    mechanics: ["Множители"],
    evidence: "Official page explicitly describes Hot Multipliers of x2, x3, x5, x10 and x20 applied to random symbols.",
  },
  "santas-vault": {
    mechanics: ["Сбор символов", "Респины", "Блокировка символов", "Множители"],
    evidence: "Official page describes Collector Symbols, a three-spin bonus that resets when prizes land, a sticky Collector, and enhancer-reel Multiplier Symbols.",
  },
  "the-great-banker": {
    mechanics: ["Сбор символов", "Множители"],
    source: "https://www.pushgaming.com/games/great-banker.html",
    evidence: "Official page identifies the Banker as a Collector and describes regular and Great Multiplier Symbols applying x2, x3 or x4 multipliers.",
  },
  "tiki-tumble": {
    mechanics: ["Линии", "Респины", "Множители"],
    evidence: "Official page describes a 20-payline game with free respins from nudging Wilds and an increasing multiplier during the unlimited Free Games feature.",
  },
  "triple-rampage": {
    mechanics: ["Сбор символов", "Блокировка символов", "Расширяющиеся барабаны"],
    evidence: "Official page describes Collector Symbols, sticky Instant Prize/Jackpot Symbols, and Mega Reels Free Spins expanding the reels to six rows and 46,656 ways.",
  },
  "viva-lock-vegas": {
    mechanics: ["Сбор символов", "Респины", "Блокировка символов", "Множители"],
    evidence: "Official page describes Collectors, Hold & Win with three lives reset by new prizes, locked Instant Prizes and a Cash Boost multiplier meter.",
  },
  "wild-swarm-2": {
    mechanics: ["Сбор символов", "Блокировка символов", "Множители"],
    evidence: "Official page describes collected Bees, Sticky Wilds that persist for the feature, and reel multipliers applied to filled Sticky Wild reels.",
  },
  "wild-swarm-3-chocolate-eggs": {
    mechanics: ["Сбор символов", "Блокировка символов", "Множители"],
    evidence: "Official page describes collectible Bees, Sticky Wilds that remain for Free Spins, and additive reel multipliers in the Multiplier Egg feature.",
  },
  "wild-swarm-triple-hive": {
    mechanics: ["Сбор символов", "Блокировка символов", "Множители"],
    evidence: "Official page describes collectible Bees, persistent Sticky Wilds and additive reel multipliers in the Multiplier Hive feature.",
  },
};

const sourceByGame: Record<string, string> = {
  "mystery-mission-to-the-moon": "https://www.pushgaming.com/games/mystery-mission-moon.html",
  "the-great-banker": "https://www.pushgaming.com/games/great-banker.html",
};

const records = Object.fromEntries(
  Object.entries(entries).map(([game, entry]) => [
    `push-gaming-${game}`,
    {
      ...entry,
      source: entry.source ?? sourceByGame[game] ?? `https://www.pushgaming.com/games/${game}.html`,
      verifiedAt,
    } satisfies CatalogResearch,
  ]),
);

export function getCatalogResearchPushMechanicsTail(slug: string) {
  return records[slug];
}
