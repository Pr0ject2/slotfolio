import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-19";

const records: Record<string, CatalogResearch> = {
  "push-gaming-bamboo-ways": {
    mechanics: ["Каскады", "Расширяющиеся барабаны", "Expanding Wilds", "Трансформация символов", "Mystery Symbols", "Instant Prizes"],
    source: "https://www.pushgaming.com/games/bamboo-ways.html",
    verifiedAt,
    evidence: "Official page describes cascades, expanding rows, Expanding Wilds with multipliers, Converter symbols that turn symbols into Wilds, Mystery Symbols and Golden Bamboo instant-prize symbols.",
  },
  "push-gaming-big-bam-book": {
    mechanics: ["Сбор символов", "Mystery Symbols", "Instant Prizes", "Прогрессивные множители"],
    source: "https://www.pushgaming.com/games/big-bam-book.html",
    verifiedAt,
    evidence: "Official page describes collected Scatter symbols, Mystery Reveal, Instant Prize wins and a Free Spins multiplier meter that progresses as Scatter symbols are collected.",
  },
  "push-gaming-diamond-supernova-100": {
    mechanics: ["Линии", "Scatter Prizes"],
    source: "https://www.pushgaming.com/games/diamond-supernova-100.html",
    verifiedAt,
    evidence: "Official page preserves the 100-line layout and says Scatter symbols on reels 1, 3 and 5 award matching Scatter prizes of 25x, 100x or 1000x, with a mixed Scatter prize of 5x.",
  },
  "push-gaming-diamond-supernova-20": {
    mechanics: ["Линии", "Scatter Prizes"],
    source: "https://www.pushgaming.com/games/diamond-supernova-20.html",
    verifiedAt,
    evidence: "Official page preserves the 20-line layout and says Scatter symbols on reels 1, 3 and 5 award matching Scatter prizes of 25x, 100x or 1000x, with a mixed Scatter prize of 5x.",
  },
  "push-gaming-diamond-supernova-40": {
    mechanics: ["Линии", "Scatter Prizes"],
    source: "https://www.pushgaming.com/games/diamond-supernova-40.html",
    verifiedAt,
    evidence: "Official page preserves the 40-line layout and says Scatter symbols on reels 1, 3 and 5 award matching Scatter prizes of 25x, 100x or 1000x, with a mixed Scatter prize of 5x.",
  },
  "push-gaming-diamond-supernova-5": {
    mechanics: ["Линии", "Scatter Prizes"],
    source: "https://www.pushgaming.com/games/diamond-supernova-5.html",
    verifiedAt,
    evidence: "Official page preserves the 5-line layout and says Scatter symbols on reels 1, 3 and 5 award matching Scatter prizes of 25x, 100x or 1000x, with a mixed Scatter prize of 5x.",
  },
  "push-gaming-dj-cat": {
    mechanics: ["Сбор символов", "Множители", "Расширяющиеся барабаны"],
    source: "https://www.pushgaming.com/games/dj-cat.html",
    verifiedAt,
    evidence: "Official page describes collected VIP symbols, CD bet multipliers, a Multiplier Meter and Arrow symbols that increase reel height through the Push Up feature.",
  },
  "push-gaming-power-paws": {
    mechanics: ["Кластеры", "Сбор символов", "Mystery Symbols", "Респины", "Instant Prizes", "Множители"],
    source: "https://www.pushgaming.com/games/power-paws.html",
    verifiedAt,
    evidence: "Official page describes cluster wins, progression collection, Power Mysteries, Power Nudge respins with an increasing multiplier, Instant Prizes and multiplier-increasing symbols.",
  },
  "push-gaming-sea-of-spirits": {
    mechanics: ["Способы", "Сбор символов", "Sticky Frames", "Трансформация символов", "Instant Prizes", "Множители"],
    source: "https://www.pushgaming.com/games/sea-spirits.html",
    verifiedAt,
    evidence: "Official page preserves ways and collection play, and describes persistent frames that become sticky in Free Spins, Activator transformations and Coin Reveals containing Instant Prize, Multiplier and Collector symbols.",
  },
  "push-gaming-tricky-treats": {
    mechanics: ["Кластеры", "Сбор символов", "Sticky Symbols", "Множители", "Instant Prizes", "Cluster Link"],
    source: "https://www.pushgaming.com/games/tricky-treats.html",
    verifiedAt,
    evidence: "Official page preserves cluster and collector play and describes sticky Wilds and Instant Prizes carried into Free Spins, Wild multipliers and the Cluster Link feature.",
  },
};

export function getCatalogResearchPushScore5_20260919(slug: string) {
  return records[slug];
}
