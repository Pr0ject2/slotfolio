import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-20";

const records: Record<string, CatalogResearch> = {
  "hacksaw-gaming-army-of-ares": {
    mechanics: ["Free Spins", "Wilds"],
    source: "https://www.hacksawgaming.com/games/army-of-ares",
    verifiedAt,
    evidence: "Official page says Wrath scatters expand into Wild Wrath Reels that add random Wilds, while FEAR AND FLAME awards 10 free spins and guarantees a Wrath Reel on every free spin.",
  },
  "hacksaw-gaming-chaos-crew-3": {
    mechanics: ["Wilds", "Refilling Lives"],
    source: "https://www.hacksawgaming.com/games/chaos-crew-3",
    verifiedAt,
    evidence: "Official page identifies Cranky Cat as a Wild Multiplier and describes bonus games built around three refilling lives that reset when Crazy Multipliers or Glitch Dogs land.",
  },
  "hacksaw-gaming-deal-with-death": {
    mechanics: ["Poker Mode", "Free Spins"],
    source: "https://www.hacksawgaming.com/games/deal-with-death",
    verifiedAt,
    evidence: "Official page explicitly defines Poker Mode, where paying symbols transform into poker cards, and three bonus games that award 10 free spins with different Joker or paytable upgrades.",
  },
  "hacksaw-gaming-dynasty-of-death": {
    mechanics: ["Free Spins", "Wilds"],
    source: "https://www.hacksawgaming.com/games/dynasty-of-death",
    verifiedAt,
    evidence: "Official page says expanded DuelReels become Wild reels and the KING'S DEFENCE, QUEEN'S DOMINION and IMMORTAL MATE bonuses award free spins with upgraded DuelReel and Cash Prize behaviour.",
  },
  "hacksaw-gaming-epic-bullets-and-bounty": {
    mechanics: ["Free Spins", "Gamble", "Прогрессивные множители"],
    source: "https://www.hacksawgaming.com/games/epic-bullets-and-bounty",
    verifiedAt,
    evidence: "Official page gives Gamble choices for the first two bonus entries and describes 10 free spins with Progressive Bounty Hunter Multipliers in TRUE GRIT and the Epic bonus.",
  },
  "hacksaw-gaming-eternal-duel": {
    mechanics: ["Free Spins", "Wilds", "Прогрессивные множители"],
    source: "https://www.hacksawgaming.com/games/eternal-duel",
    verifiedAt,
    evidence: "Official page says FS DuelReels determine free-spin counts, HADES HAVOC uses progressive Reel Multipliers, and ZEUS FURY applies those multipliers to Wild symbols.",
  },
  "hacksaw-gaming-freds-food-truck": {
    mechanics: ["Free Spins", "Wilds"],
    source: "https://www.hacksawgaming.com/games/freds-food-truck",
    verifiedAt,
    evidence: "Official page says SMALL MENU and BIG MENU award 10 or 15 free spins, and the Wild substitutes for all paying symbols.",
  },
  "hacksaw-gaming-superstar-sevens": {
    mechanics: ["Free Spins"],
    source: "https://www.hacksawgaming.com/games/superstar-sevens",
    verifiedAt,
    evidence: "Official page describes three bonus games, each awarding 10 free spins with different Lightning and progressive Total Win Bar upgrades.",
  },
  "hacksaw-gaming-dorks-of-the-deep": {
    mechanics: ["Free Spins", "Wilds", "Sticky Wilds"],
    source: "https://www.hacksawgaming.com/games/dorks-of-the-deep",
    verifiedAt,
    evidence: "Official page says expanded Wild Reels substitute for all symbols, while DOWN UNDER and HIDDEN TREASURES award 10 free spins and keep expanded Wild Reels sticky during the bonuses.",
  },
  "hacksaw-gaming-strength-of-hercules": {
    mechanics: ["Wilds", "Free Spins"],
    source: "https://www.hacksawgaming.com/games/strength-of-hercules",
    verifiedAt,
    evidence: "Official page describes Connecting Wilds that fill positions between Wilds after grid rotations and a GODLY LABYRINTH bonus that awards 10 free spins.",
  },
  "hacksaw-gaming-duel-at-dawn": {
    mechanics: ["Wilds", "Free Spins"],
    source: "https://www.hacksawgaming.com/games/duel-at-dawn",
    verifiedAt,
    evidence: "Official page says DuelReels and Outlaw reels expand into full Wild reels, while unlocked DuelSpins award three additional free spins in the bonus feature.",
  },
  "hacksaw-gaming-frkn-bananas": {
    mechanics: ["Free Spins", "Sticky Wilds", "Wilds"],
    source: "https://www.hacksawgaming.com/games/frkn-bananas",
    verifiedAt,
    evidence: "Official page says BANANZA and BANANA BLITZ award 10 free spins, Spreading Bananas are Wild multipliers, and BANANA BLITZ keeps Sticky Banana symbols on the grid through the bonus.",
  },
  "hacksaw-gaming-octo-attack": {
    mechanics: ["Wilds", "Free Spins"],
    source: "https://www.hacksawgaming.com/games/octo-attack",
    verifiedAt,
    evidence: "Official page defines Wild and Wild Multiplier symbols and says EIGHTH ARM IS THE CHARM awards free spins from three or more FS scatters with retriggers inside the feature.",
  },
  "hacksaw-gaming-phoenix-duelreels": {
    mechanics: ["Wilds"],
    source: "https://www.hacksawgaming.com/games/phoenix-duelreels",
    verifiedAt,
    evidence: "Official page says winning VS symbols expand into full Wild DuelReels that substitute for every symbol in the paytable and carry reel multipliers.",
  },
  "hacksaw-gaming-hounds-of-hell": {
    mechanics: ["Free Spins"],
    source: "https://www.hacksawgaming.com/games/hounds-of-hell",
    verifiedAt,
    evidence: "Official page says WHO LET THE HOUNDS OUT awards 10 free spins and additional FS symbols can award extra free spins during the bonus.",
  },
};

export function getCatalogResearchHacksawScore5ProviderPass2(slug: string) {
  return records[slug];
}
