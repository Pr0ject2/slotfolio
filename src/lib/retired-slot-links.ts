export const retiredSlotLinks = {
  "gates-of-1win": {
    name: "Gates of 1win",
    series: "Gates of Olympus",
    games: ["gates-of-olympus", "gates-of-olympus-1000", "gates-of-olympus-2500", "gates-of-olympus-super-scatter"],
  },
  "1win-bonanza": {
    name: "1win Bonanza",
    series: "Sweet Bonanza",
    games: ["sweet-bonanza", "sweet-bonanza-1000", "sweet-bonanza-super-scatter"],
  },
} as const;

export type RetiredSlotSlug = keyof typeof retiredSlotLinks;
