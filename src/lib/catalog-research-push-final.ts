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
  "push-gaming-triple-rampage": {
    mechanics: ["Сбор символов"],
    source: "https://www.pushgaming.com/games/triple-rampage.html",
    verifiedAt,
    evidence: "Official page says matching Token Symbols charge the three Kaiju and Collector Symbols collect visible Instant Prizes and jackpot symbols.",
  },
  "push-gaming-vegas-vault": {
    mechanics: ["Линии", "Сбор символов"],
    source: "https://www.pushgaming.com/games/vegas-vault.html",
    verifiedAt,
    evidence: "Official page explicitly refers to the base Win line and says the Vault collects all locked Instant Prize and Jackpot values at the end of the bonus.",
  },
  "push-gaming-viva-lock-vegas": {
    mechanics: ["Сбор символов"],
    source: "https://www.pushgaming.com/games/viva-lock-vegas.html",
    verifiedAt,
    evidence: "Official page says Instant Prizes are collected into the Mega Money Pot and Collector Symbols collect visible Instant Prizes in Free Spins.",
  },
  "push-gaming-wild-swarm": {
    mechanics: ["Линии", "Сбор символов"],
    source: "https://www.pushgaming.com/games/wild-swarm.html",
    verifiedAt,
    evidence: "Official page describes a 5x4 slot with 20 winlines and a bee collection progression that boosts the hive toward Swarm Mode.",
  },
  "push-gaming-wild-swarm-2": {
    mechanics: ["Сбор символов"],
    source: "https://www.pushgaming.com/games/wild-swarm-2.html",
    verifiedAt,
    evidence: "Official page says Worker and Queen Bee Symbols fill a five-level Hive meter until Swarm Mode can trigger.",
  },
  "push-gaming-wild-swarm-3-chocolate-eggs": {
    mechanics: ["Сбор символов"],
    source: "https://www.pushgaming.com/games/wild-swarm-3-chocolate-eggs.html",
    verifiedAt,
    evidence: "Official page describes Collectible Bees being collected by the three Eggs and jackpot tokens filling their respective meters.",
  },
  "push-gaming-wild-swarm-triple-hive": {
    mechanics: ["Сбор символов"],
    source: "https://www.pushgaming.com/games/wild-swarm-triple-hive.html",
    verifiedAt,
    evidence: "Official page describes Collectible Bees being collected by the Jackpot, Multiplier and Sticky Hives to progress toward their features.",
  },
};

export function getCatalogResearchPushFinal(slug: string) {
  return research[slug];
}
