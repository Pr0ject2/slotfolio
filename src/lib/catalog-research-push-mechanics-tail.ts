import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-17";

type Entry = {
  mechanics: CatalogResearch["mechanics"];
  evidence: string;
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
    mechanics: ["Сбор символов"],
    evidence: "Official page says Bell Symbols fill the locked-row meter and each row requires four Bell Symbol collections.",
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
    evidence: "Official page says collecting five special Coin Symbols during Free Spins opens the next reel array and retriggers the Card Pick Feature.",
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
};

const records = Object.fromEntries(
  Object.entries(entries).map(([game, entry]) => [
    `push-gaming-${game}`,
    {
      ...entry,
      source: `https://www.pushgaming.com/games/${game}.html`,
      verifiedAt,
    } satisfies CatalogResearch,
  ]),
);

export function getCatalogResearchPushMechanicsTail(slug: string) {
  return records[slug];
}
