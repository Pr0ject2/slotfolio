import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-16";

const research: Record<string, CatalogResearch> = {
  "hacksaw-gaming-aiko-and-the-wind-spirit": {
    mechanics: ["Expanded Wild Spirits"],
    source: "https://www.hacksawgaming.com/games/aiko-and-the-wind-spirit",
    verifiedAt,
    evidence: "Official feature rules state that Spirit symbols become expanding Wilds when they form a win, with reel multipliers and Zephyr-triggered respins.",
  },
  "hacksaw-gaming-chaos-crew-3": {
    mechanics: ["EPIC DROP™"],
    source: "https://www.hacksawgaming.com/games/chaos-crew-3",
    verifiedAt,
    evidence: "Official feature rules state that spelling CHAOS across a row triggers EPIC DROP™, an award spin with a Reel Multiplier and transformed multiplier symbols.",
  },
  "hacksaw-gaming-circle-of-life": {
    mechanics: ["Tree of Life Respins"],
    source: "https://www.hacksawgaming.com/games/circle-of-life",
    verifiedAt,
    evidence: "Official Tree of Life rules explicitly state that a winning Tree triggers a respin and expands upward through continuing respin sequences.",
  },
  "hacksaw-gaming-dandy-diamonds": {
    mechanics: ["Dandy Respins"],
    source: "https://www.hacksawgaming.com/games/dandy-diamonds",
    verifiedAt,
    evidence: "Official Dandy Respins rules state that landed Diamonds trigger respins, stay sticky, and extend the sequence when new Diamonds land.",
  },
  "hacksaw-gaming-dorks-of-the-deep": {
    mechanics: ["Expanding Wild Reels"],
    source: "https://www.hacksawgaming.com/games/dorks-of-the-deep",
    verifiedAt,
    evidence: "Official feature rules state that Treasure Chests expand into full Wild Reels when the expansion creates or joins a win.",
  },
  "hacksaw-gaming-duel-at-dawn": {
    mechanics: ["DuelReels™"],
    source: "https://www.hacksawgaming.com/games/duel-at-dawn",
    verifiedAt,
    evidence: "Official DuelReels™ rules state that a VS symbol expands into a full wild DuelReel and starts a multiplier duel.",
  },
  "hacksaw-gaming-dynasty-of-death": {
    mechanics: ["DuelReels™"],
    source: "https://www.hacksawgaming.com/games/dynasty-of-death",
    verifiedAt,
    evidence: "Official DuelReels™ rules state that a VS symbol expands into a full Wild DuelReel and starts a duel whose multiplier applies to connected wins.",
  },
  "hacksaw-gaming-epic-bullets-and-bounty": {
    mechanics: ["DuelReels™"],
    source: "https://www.hacksawgaming.com/games/epic-bullets-and-bounty",
    verifiedAt,
    evidence: "Official rules describe Outlaw DuelReels™ and Bounty DuelReels™, both expanding VS symbols into full-reel wild duel features.",
  },
  "hacksaw-gaming-eternal-duel": {
    mechanics: ["DuelReels™"],
    source: "https://www.hacksawgaming.com/games/eternal-duel",
    verifiedAt,
    evidence: "Official DuelReels™ rules state that VS symbols expand across a reel and trigger a duel with a winning multiplier applied to the full DuelReel.",
  },
  "hacksaw-gaming-freds-food-truck": {
    mechanics: ["Global Multiplier"],
    source: "https://www.hacksawgaming.com/games/freds-food-truck",
    verifiedAt,
    evidence: "Official Global Multiplier rules state that Green Chili multipliers add to a global value applied to all wins in the current round.",
  },
  "hacksaw-gaming-hot-ross": {
    mechanics: ["Expanding Wild Reels"],
    source: "https://www.hacksawgaming.com/games/hot-ross",
    verifiedAt,
    evidence: "Official Ro$$ and Hot Ro$$ rules state that symbols expand over reel positions and can cover an entire reel as Wilds with multipliers.",
  },
  "hacksaw-gaming-jaws-of-justice": {
    mechanics: ["Laser Sharks"],
    source: "https://www.hacksawgaming.com/games/jaws-of-justice",
    verifiedAt,
    evidence: "Official Laser Sharks rules state that activated sharks fire lasers that transform paying symbols in their path into Wilds and interact with Force Fields.",
  },
  "hacksaw-gaming-phoenix-duelreels": {
    mechanics: ["DuelReels™"],
    source: "https://www.hacksawgaming.com/games/phoenix-duelreels",
    verifiedAt,
    evidence: "Official DuelReels™ rules state that VS symbols expand into full Wild DuelReels and trigger multiplier duels; losing Phoenixes can award Resurrection Spins.",
  },
  "hacksaw-gaming-sixsixsix": {
    mechanics: ["Wicked Wheels"],
    source: "https://www.hacksawgaming.com/games/sixsixsix",
    verifiedAt,
    evidence: "Official Wicked Wheels rules state that 6 symbols activate Blue or Red wheels awarding additive or multiplicative multipliers, max win, or feature triggers.",
  },
  "hacksaw-gaming-spinman": {
    mechanics: ["Justice Reels"],
    source: "https://www.hacksawgaming.com/games/spinman",
    verifiedAt,
    evidence: "Official Justice Reels rules state that Spinman expands into a Wild Justice Reel when it forms a win and activates the Booster Wheel.",
  },
  "hacksaw-gaming-the-count": {
    mechanics: ["Expanded Bloody Wilds"],
    source: "https://www.hacksawgaming.com/games/the-count",
    verifiedAt,
    evidence: "Official Expanded Bloody Wilds rules state that Blood symbols expand downward when the expansion forms a win and act as Wilds or reveal multipliers.",
  },
  "hacksaw-gaming-wings-of-horus": {
    mechanics: ["Orb Transformations"],
    source: "https://www.hacksawgaming.com/games/wings-of-horus",
    verifiedAt,
    evidence: "Official Orb of the Moon and Orb of the Sun rules state that the Orbs select symbol instances and replace them with higher-paying symbols or Wilds.",
  },
};

export function getCatalogResearchHacksawProviderWide(slug: string) {
  return research[slug];
}
