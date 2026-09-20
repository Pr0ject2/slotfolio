import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-20";

const records: Record<string, CatalogResearch> = {
  "playn-go-agent-of-hearts": {
    mechanics: ["Random Wilds"],
    source: "https://www.playngo.com/games/agent-of-hearts",
    verifiedAt,
    evidence: "Official page says four to seven Random Heart Wilds can be added to the grid on non-winning spins.",
  },
  "playn-go-cash-a-cabana": {
    mechanics: ["Retriggers"],
    source: "https://www.playngo.com/games/cash-a-cabana",
    verifiedAt,
    evidence: "Official Cabana Show rules state the Free Spins feature can retrigger up to a total of 30 spins.",
  },
  "playn-go-count-jokula": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/count-jokula",
    verifiedAt,
    evidence: "Official page explicitly describes transformed Wilds helping create winning paylines.",
  },
  "playn-go-fat-frankies": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/fat-frankies",
    verifiedAt,
    evidence: "Official Five Star Free Spins feature awards spins and can add two extra spins when the Five Star symbol lands.",
  },
  "playn-go-game-of-gladiators-uprising": {
    mechanics: ["Guess the Victor"],
    source: "https://www.playngo.com/games/game-of-gladiators%3A-uprising",
    verifiedAt,
    evidence: "Official page names Guess the Victor as a separate feature where the player predicts the winning fighter for a prize multiplier.",
  },
  "playn-go-hammerfall": {
    mechanics: ["Mega Wild", "Удаление символов"],
    source: "https://www.playngo.com/games/hammerfall",
    verifiedAt,
    evidence: "Official Song and Destruction features add a Mega Wild and explicitly destroy/remove symbols from the grid.",
  },
  "playn-go-hooligan-hustle": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/hooligan-hustle",
    verifiedAt,
    evidence: "Official page explicitly names three Free Spin features: Lairy!, Riot!, and Anarchy!.",
  },
  "playn-go-manta-mayhem": {
    mechanics: ["Free Spins", "Sticky Wilds", "Random Wilds"],
    source: "https://www.playngo.com/games/manta-mayhem",
    verifiedAt,
    evidence: "Official Clam the Prize awards Free Spins and boosters that can include Sticky Wilds on reels 2-4 and two or three Random Wilds.",
  },
  "playn-go-midnight-gold": {
    mechanics: ["Instant Prizes", "Stacked Wilds", "Roaming Wilds", "Free Spins"],
    source: "https://www.playngo.com/games/midnight-gold",
    verifiedAt,
    evidence: "Official page describes Mystery Instant Wins plus Free Spins choices with Stacked Wilds or Roaming Wilds.",
  },
  "playn-go-gnawn-gold": {
    mechanics: ["Bonus Spins"],
    source: "https://www.playngo.com/games/gnaw'n-gold",
    verifiedAt,
    evidence: "Official page separately defines Beaver Spins and Mega Beaver Spins as persistent bonus-spin features.",
  },
  "playn-go-nugget-n-nonsense": {
    mechanics: ["Instant Prizes", "Bonus Spins", "Wilds"],
    source: "https://www.playngo.com/games/nugget-n%E2%80%99-nonsense",
    verifiedAt,
    evidence: "Official page explicitly describes Wilds, Instant Bonuses, Bonus Spins and Super Bonus Spins.",
  },
  "playn-go-legacy-of-inca": {
    mechanics: ["Retriggers"],
    source: "https://www.playngo.com/games/legacy-of-inca",
    verifiedAt,
    evidence: "Official Temple Spins can award additional Free Spins repeatedly, with no limit stated on how many times the feature can occur.",
  },
  "playn-go-invading-vegas": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/invading-vegas",
    verifiedAt,
    evidence: "Official release material says Flying Saucers unlock a Free Spins feature with the Lock On Re-Spin mechanic.",
  },
  "playn-go-mount-m": {
    mechanics: ["Free Spins", "Stacked Symbols"],
    source: "https://www.playngo.com/games/mount-m",
    verifiedAt,
    evidence: "Official page states three Scatters trigger Free Spins and describes huge stacked mammoth symbols on the reels.",
  },
  "playn-go-moon-princess-trinity": {
    mechanics: ["Random Wilds", "Удаление символов"],
    source: "https://www.playngo.com/games/moon-princess-trinity",
    verifiedAt,
    evidence: "Official Girl Power abilities add one or two Wilds to random grid positions and remove low-paying symbols before replacement.",
  },
  "playn-go-monkey-battle-for-the-scrolls": {
    mechanics: ["Stacked Wilds", "Split Symbols", "Free Spins", "Jackpots"],
    source: "https://www.playngo.com/games/monkey%3A-battle-for-the-scrolls",
    verifiedAt,
    evidence: "Official page describes stacked Wilds, symbol splitting, a Free Spins round and Minor/Major progressive Jackpots as separate features.",
  },
};

export function getCatalogResearchPlayngoScore6Wave(slug: string) {
  return records[slug];
}
