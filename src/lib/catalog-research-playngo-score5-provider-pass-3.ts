import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-20";

const records: Record<string, CatalogResearch> = {
  "playn-go-count-jokula": {
    mechanics: ["Wilds"],
    source: "https://www.playngo.com/games/count-jokula",
    verifiedAt,
    evidence: "Official Play’n GO page says the Shapeshifter feature turns symbols into a bat-themed Wild, alongside the existing re-spin and multiplier features.",
  },
  "playn-go-derby-wheel": {
    mechanics: ["Horse Racing Bonus"],
    source: "https://www.playngo.com/games/derby-wheel",
    verifiedAt,
    evidence: "Official Play’n GO page says three Wheel symbols trigger the Bonus Wheel, which can award entry to a separate Horse Racing Bonus with race-bet selections.",
  },
  "playn-go-grannys-wild": {
    mechanics: ["Hold & Win", "Pick-and-click", "Wilds"],
    source: "https://www.playngo.com/games/granny's-wild",
    verifiedAt,
    evidence: "Official Play’n GO page describes a HOLD’N WIN round with locking Coins and resetting respins, a Scratch’n Win mini-game, and Granny’s Wild transforming Coins into Wilds.",
  },
  "playn-go-jewel-box": {
    mechanics: ["Wilds", "Scatter Trigger"],
    source: "https://www.playngo.com/games/jewel-box",
    verifiedAt,
    evidence: "Official Play’n GO page says three Jewel Box Scatters open the pick feature and describes a random Multiplier Wild worth x2 to x5.",
  },
  "playn-go-jolly-roger-wild-kraken": {
    mechanics: ["Free Spins", "Wilds", "Instant Prizes"],
    source: "https://www.playngo.com/games/jolly-roger-wild-kraken",
    verifiedAt,
    evidence: "Official Play’n GO material describes Cannon Free Spins, the shifting Kraken Wild, and Instant Treasure rewards unlocked by landing the chest and key symbols.",
  },
  "playn-go-legacy-of-inca": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/legacy-of-inca",
    verifiedAt,
    evidence: "Official Play’n GO material says the Wheel of the Gods awards between one and twenty Free Spins, with Temple Spins able to award additional spins.",
  },
  "playn-go-legion-gold": {
    mechanics: ["Free Spins", "Wilds", "Mega Symbols"],
    source: "https://www.playngo.com/games/legion-gold",
    verifiedAt,
    evidence: "Official Play’n GO page describes a standard Wild, Multiplying Wild Gold Coins, Mega symbols and Mega Free Spins triggered by Lion Scatters.",
  },
  "playn-go-legion-gold-reckoning": {
    mechanics: ["Instant Prizes", "Mega Spins", "Wilds"],
    source: "https://www.playngo.com/games/legion-gold-reckoning",
    verifiedAt,
    evidence: "Official Play’n GO page describes match-three Instant Prize tiers in the Coin Picker, re-triggerable Mega Spins with a Mega Symbol every spin, and a Wild substituting for normal symbols.",
  },
  "playn-go-myth": {
    mechanics: ["Wilds", "Scatter Pays"],
    source: "https://www.playngo.com/games/myth",
    verifiedAt,
    evidence: "Official Play’n GO page says the Wild substitutes for ordinary symbols and pays double, while two or more Scatters anywhere on the reels constitute a win.",
  },
  "playn-go-new-year-riches": {
    mechanics: ["Free Spins", "Wilds", "Scatter Trigger"],
    source: "https://www.playngo.com/games/new-year-riches",
    verifiedAt,
    evidence: "Official Play’n GO page identifies Champagne as the Wild and the Midnight Clock as the Scatter; three Scatters trigger ten New Year Free Spins with an escalating win multiplier.",
  },
};

export function getCatalogResearchPlayngoScore5ProviderPass3(slug: string) {
  return records[slug];
}
