import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-13";

const research: Record<string, CatalogResearch> = {
  "push-gaming-sea-of-spirits": {
    mechanics: ["Способы", "Сбор символов"],
    source: "https://www.pushgaming.com/games/sea-spirits.html",
    verifiedAt,
    evidence: "Official page labels the base-game payout section WIN WAYS and describes Collector Symbols among Coin Reveal outcomes.",
  },
  "push-gaming-shamrock-saints": {
    mechanics: ["Сбор символов"],
    source: "https://www.pushgaming.com/games/shamrock-saints.html",
    verifiedAt,
    evidence: "Official page states Tokens are collected into the Golden Pot until its five-level progression can trigger Shamrock Mode.",
  },
  "push-gaming-tarot-treasures": {
    mechanics: ["Способы", "Каскады"],
    source: "https://www.pushgaming.com/games/tarot-treasures.html",
    verifiedAt,
    evidence: "Official page says Hot Zones split symbols to increase ways to win and explicitly describes consecutive cascades in the Base Game Cascade Feature.",
  },
  "push-gaming-the-grand-show": {
    mechanics: ["Сбор символов"],
    source: "https://www.pushgaming.com/games/grand-show.html",
    verifiedAt,
    evidence: "Official page states the Collector Symbol collects Instant Prizes and Jackpot Symbols in the base game.",
  },
  "push-gaming-the-great-banker": {
    mechanics: ["Сбор символов"],
    source: "https://www.pushgaming.com/games/great-banker.html",
    verifiedAt,
    evidence: "Official page defines the Banker as a Collector symbol that collects Coin values and states Coin Symbols are collected into the Wheel.",
  },
  "push-gaming-tiki-tumble": {
    mechanics: ["Линии"],
    source: "https://www.pushgaming.com/games/tiki-tumble.html",
    verifiedAt,
    evidence: "Official page explicitly describes Tiki Tumble as a 5x4 slot with 20 paylines.",
  },
  "push-gaming-tricky-treats": {
    mechanics: ["Кластеры", "Сбор символов"],
    source: "https://www.pushgaming.com/games/tricky-treats.html",
    verifiedAt,
    evidence: "Official page requires clusters of five or more Instant Prize Symbols and says the Collector gathers symbols to create a cluster win.",
  },
};

export function getCatalogResearchPushFinal(slug: string) {
  return research[slug];
}
