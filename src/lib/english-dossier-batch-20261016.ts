/** Editor-reviewed English copy. Facts are inherited from the checked-in RU records. */
export const englishDossierBatch = {
  "sweet-bonanza": {
    introduction: "A colourful game with an unusually straightforward question at its centre: where do matching symbols appear? Sweet Bonanza pays for matching symbols anywhere on the grid rather than along fixed paylines.",
    rules: "Winning symbols disappear, allowing new ones to fall into the spaces they leave behind. That tumble can form another win in the same paid round, but it can also stop without another match.",
    feature: "Free spins introduce multiplier symbols. Their impact depends on the actual winning combinations and the rules of that bonus round; a multiplier on screen is not a promise of profit.",
    perspective: "The bright fruit-and-sweets theme can feel light-hearted, but the underlying volatility is high. Focus on the pay-anywhere rule and the function of multipliers rather than on the animation.",
  },
  "book-of-dead": {
    introduction: "Book of Dead uses a familiar five-reel grid and ten paylines, but its free-spins feature is what makes the rules distinctive.",
    rules: "Unlike games that pay anywhere on the screen, wins here follow the game's paylines. Read the paytable for the direction of wins, symbol values and the role of the book symbol.",
    feature: "During free spins, a selected symbol can expand across a whole reel. The feature changes how matching symbols are evaluated, making it important to understand the expanding-symbol rules rather than simply count symbols.",
    perspective: "The base game is relatively easy to follow. Most of the distinctive rule changes are concentrated in free spins, while the game's published volatility remains high.",
  },
  reactoonz: {
    introduction: "Reactoonz replaces traditional paylines with groups of touching symbols on a seven-by-seven grid. Its cascades and energy system give each round several moving parts.",
    rules: "Adjacent matching symbols can form clusters. Winning groups disappear and replacement symbols may create more groups, extending the sequence within a round.",
    feature: "Cluster wins contribute to a progress meter that activates game effects, including symbol transformations. Follow the meter and each effect's own conditions; they are not interchangeable with multipliers in line-based slots.",
    perspective: "Reactoonz takes longer to understand than a conventional payline game. The key is to separate cluster wins, cascading replacements and the progress meter rather than treat every animation as a fresh paid spin.",
  },
  "the-dog-house": {
    introduction: "The Dog House is built around a familiar five-by-three reel layout, with the free-spins round adding persistent wild symbols.",
    rules: "Regular spins use line-based combinations. The paytable is the place to check how wild symbols substitute for others and which winning lines count.",
    feature: "In the bonus round, wild symbols can remain fixed in place for the rest of the free spins. Their presence may change later combinations, but it does not guarantee a particular outcome.",
    perspective: "Sticky wilds make the bonus visually easy to follow: you can see where symbols have accumulated. That visibility should not be confused with certainty about the final payout.",
  },
  "big-bass-bonanza": {
    introduction: "Big Bass Bonanza combines line-based play with a fishing-themed collection feature in free spins. The fisherman symbol gives the bonus its distinctive structure.",
    rules: "The regular game uses a five-by-three grid. In the bonus round, cash-value symbols and the fisherman work together: the fisherman collects eligible displayed values according to the feature rules.",
    feature: "Further fisherman appearances can advance the bonus towards additional free spins and multiplier stages. Exactly when a collection counts matters more than the visual amount displayed before it is collected.",
    perspective: "This is a useful contrast to cascade-based games. Instead of watching symbols disappear and refill a grid, you follow which values are collected and how the free-spins feature progresses.",
  },
} as const;

export type EnglishDossierSlug = keyof typeof englishDossierBatch;
