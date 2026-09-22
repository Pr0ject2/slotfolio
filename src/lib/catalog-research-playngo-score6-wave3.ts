import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-22";

type SourcedCatalogResearch = CatalogResearch & {
  evidenceSource?: string;
};

const records: Record<string, SourcedCatalogResearch> = {
  "playn-go-beasts-of-fire-maximum": {
    mechanics: ["Maximum Burning Spins"],
    source: "https://www.playngo.com/games/beasts-of-fire-maximum",
    evidenceSource: "https://www.playngo.com/posts/beasts-of-fire-maximum",
    verifiedAt,
    evidence: "Official Play’n GO release names Maximum Burning Spins as a distinct feature activated by three Scatters, expanding the reels to their maximum height.",
  },
  "playn-go-boat-bonanza-colossal-catch": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/boat-bonanza-colossal-catch",
    evidenceSource: "https://www.playngo.com/post/boat-bonanza-colossal-catch",
    verifiedAt,
    evidence: "Official Play’n GO release states that three or more Scatters unlock the progressive Free Spins round.",
  },
  "playn-go-boat-bonanza-down-under": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/boat-bonanza-down-under",
    evidenceSource: "https://www.playngo.com/post/boat-bonanza-down-under-slot-review",
    verifiedAt,
    evidence: "Official Play’n GO review describes the Free Spins round, triggered by three or more Scatter symbols and enhanced by selectable modifiers.",
  },
  "playn-go-fangs-and-fire": {
    mechanics: ["Serpent & Prowler Bonus"],
    source: "https://www.playngo.com/games/fangs-%26-fire",
    evidenceSource: "https://www.playngo.com/posts/fangs-and-fire",
    verifiedAt,
    evidence: "Official Play’n GO release explicitly names the Serpent & Prowler Bonus as one of the game's distinct bonus rounds.",
  },
  "playn-go-fate-of-dead-blitzways": {
    mechanics: ["Sticky Wilds"],
    source: "https://www.playngo.com/games/fate-of-dead-blitzways",
    verifiedAt,
    evidence: "Official Play’n GO game page states that Free Spins add a Wild that remains locked throughout the round.",
  },
  "playn-go-gates-of-troy": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/gates-of-troy",
    verifiedAt,
    evidence: "Official Play’n GO game page states that landing three Scatters triggers the Free Spins round.",
  },
  "playn-go-gigantoonz": {
    mechanics: ["Dynamic Cluster Payways"],
    source: "https://www.playngo.com/games/gigantoonz",
    evidenceSource: "https://www.playngo.com/posts/gigantoonz",
    verifiedAt,
    evidence: "Official Play’n GO release identifies Dynamic Cluster Payways as a distinct Gigantoonz mechanic combining cluster wins with cascading play.",
  },
  "playn-go-kingdom-below": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/kingdom-below",
    verifiedAt,
    evidence: "Official Play’n GO game page states that three or more Scatters ignite ten Free Spins with modifier multipliers.",
  },
  "playn-go-loot-and-labyrinths": {
    mechanics: ["Dungeon Free Spins"],
    source: "https://www.playngo.com/games/loot-%26-labyrinths",
    evidenceSource: "https://www.playngo.com/posts/loot-and-labyrinths",
    verifiedAt,
    evidence: "Official Play’n GO release describes Dungeon Free Spins with buffs, extra spins and progressively higher multipliers.",
  },
  "playn-go-mega-don-feeding-frenzy": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/mega-don%3A-feeding-frenzy",
    verifiedAt,
    evidence: "Official Play’n GO game page describes Shark Feast as a Free Spins feature with selectable sharks and retriggers.",
  },
  "playn-go-mega-don-triple-threat": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/mega-don-triple-threat",
    verifiedAt,
    evidence: "Official Play’n GO game page states that the Shark Feast features award Free Spins, including retriggerable Mega Don Feast spins.",
  },
  "playn-go-mystery-egg-surprise": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/mystery-egg-surprise",
    verifiedAt,
    evidence: "Official Play’n GO game page states that three Egg Basket Scatters grant ten Free Spins and the round can retrigger.",
  },
};

export function getCatalogResearchPlayngoScore6Wave3(slug: string) {
  return records[slug];
}
