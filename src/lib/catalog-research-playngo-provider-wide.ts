import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-14";

type SourcedCatalogResearch = CatalogResearch & {
  evidenceSource?: string;
};

const research: Record<string, SourcedCatalogResearch> = {
  "playn-go-3-blades-and-blessings": {
    mechanics: ["Линии", "Сбор символов"],
    source: "https://www.playngo.com/games/3-blades-%26-blessings",
    verifiedAt,
    evidence: "Official game page states that Boost/Super/Mega Free Spins use a 5x5 reel set with 40 paylines, and that Coin/Prize Coin symbols are collected during the feature.",
    evidenceSource: "https://www.playngo.com/games/3-blades-%26-blessings",
  },
  "playn-go-agent-destiny": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/agent-destiny",
    verifiedAt,
    evidence: "Official game page states that differently sized matching symbols form wins on the payline.",
    evidenceSource: "https://www.playngo.com/games/agent-destiny",
  },
  "playn-go-animal-madness": {
    mechanics: ["Кластеры", "Каскады"],
    source: "https://www.playngo.com/games/animal-madness",
    verifiedAt,
    evidence: "Official review states that wins form from matching clusters on the 5x5 grid and that winning symbols disappear before new symbols cascade from above.",
    evidenceSource: "https://www.playngo.com/post/review-animal-madness-play-n-go-grid-slot",
  },
  "playn-go-blinged": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/blinged",
    verifiedAt,
    evidence: "Official game page states that winning combinations are formed across the game's ten paylines.",
  },
  "playn-go-buildin-bucks": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/buildin'-bucks",
    verifiedAt,
    evidence: "Official release describes Buildin' Bucks as a 5x3 slot with 243 ways to win.",
    evidenceSource: "https://www.playngo.com/post/buildin-bucks",
  },
  "playn-go-buildin-more-bucks": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/buildin'-more-bucks",
    verifiedAt,
    evidence: "Official release describes Buildin' More Bucks as a 5-reel, 243-ways slot.",
    evidenceSource: "https://www.playngo.com/posts/buildin-more-bucks",
  },
  "playn-go-canine-carnage": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/canine-carnage",
    verifiedAt,
    evidence: "Official game page describes Cash Collection abilities and a Collector Symbol that awards and resets the Cash Pot.",
  },
  "playn-go-captain-glum-pirate-hunter": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/captain-glum%3A-pirate-hunter",
    verifiedAt,
    evidence: "Official game page and release describe Wilds completing paylines to create wins.",
    evidenceSource: "https://www.playngo.com/post/captain-glum-pirate-hunter",
  },
  "playn-go-cash-of-command": {
    mechanics: ["Кластеры", "Каскады", "Сбор символов"],
    source: "https://www.playngo.com/games/cash-of-command",
    verifiedAt,
    evidence: "Official release says commanders appear after symbols are collected through winning clusters and describes Cash of Command as a grid slot with cascading symbols.",
    evidenceSource: "https://www.playngo.com/post/cash-of-command",
  },
  "playn-go-cat-wilde-in-the-eclipse-of-the-sun-god": {
    mechanics: ["Линии", "Каскады"],
    source: "https://www.playngo.com/games/cat-wilde-in-the-eclipse-of-the-sun-god",
    verifiedAt,
    evidence: "Official Play'n GO editorial describes the game as a 5x3 cascading slot with twenty dynamic paylines where winning symbols are removed and replaced until no further wins form.",
    evidenceSource: "https://www.playngo.com/post/top-summer-sun-slots-2024",
  },
  "playn-go-champions-of-mithrune": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/champions-of-mithrune",
    verifiedAt,
    evidence: "Official release states that players collect three orbs to trigger the mini-game, then collect character tokens and potions to power up Free Spins.",
    evidenceSource: "https://www.playngo.com/posts/champions-of-mithrune",
  },
  "playn-go-crabbys-gold": {
    mechanics: ["Способы", "Сбор символов"],
    source: "https://www.playngo.com/games/crabby's-gold",
    verifiedAt,
    evidence: "Official release states that Crabby's Gold has 4,096 ways and a Coin Collect mechanic where landed multiplier coins can be collected.",
    evidenceSource: "https://www.playngo.com/post/crabby-s-gold",
  },
  "playn-go-cursed-moon-power-collection": {
    mechanics: ["Способы", "Сбор символов"],
    source: "https://www.playngo.com/games/cursed-moon-power-collection",
    verifiedAt,
    evidence: "Official release states that way wins form from adjacent matching symbols and that Coin symbols are collected by Slay Collector symbols.",
    evidenceSource: "https://www.playngo.com/posts/cursed-moon-power-collection",
  },
  "playn-go-dragon-maiden": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/dragon-maiden",
    verifiedAt,
    evidence: "Official game page states that Golden Free Spins use a maximised 5x6 reel with 7,776 payways.",
  },
  "playn-go-eye-of-atum": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/eye-of-atum",
    verifiedAt,
    evidence: "Official game page states that the five-by-three slot uses ten paylines.",
  },
  "playn-go-fire-joker-blitz": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/fire-joker-blitz",
    verifiedAt,
    evidence: "Official game page describes the Coin Collect feature: special multiplier coins land and are collected when paired with the collector symbol.",
    evidenceSource: "https://www.playngo.com/games/fire-joker-blitz",
  },
  "playn-go-gargantoonz": {
    mechanics: ["Кластеры", "Каскады"],
    source: "https://www.playngo.com/games/gargantoonz",
    verifiedAt,
    evidence: "Official release describes Gargantoonz as a 7x7 cascading grid slot where five or more matching symbols form clusters for wins.",
    evidenceSource: "https://www.playngo.com/posts/garagantoonz",
  },
  "playn-go-gerards-gambit": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/gerard's-gambit",
    verifiedAt,
    evidence: "Official release states that the game begins with one payline on a 3x1 reel and progresses to ten paylines on a 5x3 reel.",
    evidenceSource: "https://www.playngo.com/post/gerards-gambit",
  },
  "playn-go-gnawn-gold": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/gnaw'n-gold",
    verifiedAt,
    evidence: "Official game page describes a Persistent Trail that unlocks Collectors and advances whenever a Collector lands on the reels.",
  },
  "playn-go-hope-unleashed-fortune-rises": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/hope-unleashed-fortune-rises",
    verifiedAt,
    evidence: "Official game page states that Souls are collected on the reels and that collecting more Souls increases the chance of unlocking Pandora's Box.",
  },
  "playn-go-hugo-legacy": {
    mechanics: ["Кластеры"],
    source: "https://www.playngo.com/games/hugo-legacy",
    verifiedAt,
    evidence: "Official Play’n GO material describes removing winning clusters from the fixed 7x7 grid.",
    evidenceSource: "https://www.playngo.com/posts/hugo-legacy",
  },
  "playn-go-legacy-of-inca": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/legacy-of-inca",
    verifiedAt,
    evidence: "Official Play'n GO release states that added Wilds on the middle reels can create a multitude of payways.",
    evidenceSource: "https://www.playngo.com/post/legacy-of-inca",
  },
  "playn-go-legion-gold-victory": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/legion-gold-victory!",
    verifiedAt,
    evidence: "Official game page describes Gold Re-Spins where Coins are collected and Gold Bags collect Instant Prize Coin values.",
    evidenceSource: "https://www.playngo.com/post/legion-gold-victory",
  },
  "playn-go-manta-mayhem": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/manta-mayhem",
    verifiedAt,
    evidence: "Official game page describes Pearl symbols landing on the reels and being collected by the Manta Ray in the Pearl Collection feature.",
  },
  "playn-go-merlin-and-the-ice-queen-morgana": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/merlin-and-the-ice-queen-morgana",
    verifiedAt,
    evidence: "Official game page describes Expanding Symbols forming win lines and explicitly refers to paylines.",
  },
  "playn-go-merry-xmas": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/merry-xmas",
    verifiedAt,
    evidence: "Official Play'n GO review states that three or more adjacent symbols on any payline award wins.",
    evidenceSource: "https://www.playngo.com/post/merry-xmas-review",
  },
  "playn-go-monkey-battle-for-the-scrolls": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/monkey%3A-battle-for-the-scrolls",
    verifiedAt,
    evidence: "Official release states that collecting three or more Closed Scripture Scatter symbols triggers Free Spins.",
    evidenceSource: "https://www.playngo.com/posts/monkey-battle-for-the-scrolls",
  },
  "playn-go-mystery-egg-surprise": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/mystery-egg-surprise",
    verifiedAt,
    evidence: "Official release describes Mystery Egg Surprise as a 3-reel slot with 5 fixed paylines.",
    evidenceSource: "https://www.playngo.com/post/mystery-egg-surprise",
  },
  "playn-go-piggy-blitz": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/piggy-blitz",
    verifiedAt,
    evidence: "Official release states that Piggy Blitz has 4,096 payways.",
    evidenceSource: "https://www.playngo.com/post/piggy-blitz",
  },
};

export function getCatalogResearchPlayngoProviderWide(slug: string) {
  return research[slug];
}