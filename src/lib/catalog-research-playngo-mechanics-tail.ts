import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-17";

type Entry = {
  mechanics: CatalogResearch["mechanics"];
  source: string;
  evidence: string;
};

const entries: Record<string, Entry> = {
  "playn-go-3-clown-monty": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/3-clown-monty",
    evidence: "Official page explicitly describes wins with Multiplier Wilds on a winning payline.",
  },
  "playn-go-15-crystal-roses-a-tale-of-love": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/15-crystal-roses%3A-a-tale-of-love",
    evidence: "Official page says the Quest Map tracks Crystal Roses collected to enter and progress through the feature.",
  },
  "playn-go-ankh-of-anubis-awakening": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/ankh-of-anubis-awakening",
    evidence: "Official page says five Ankh symbols are collected during Free Spins to award Anubis Wilds.",
  },
  "playn-go-baron-lord-of-saturday": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/baron%3A-lord-of-saturday",
    evidence: "Official page says Scatters are collected during Free Spins to progress through multiplier stages.",
  },
  "playn-go-big-win-cat-pawsperity": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/big-win-cat-pawsperity",
    evidence: "Official page explicitly labels Coin Collection and says every Coin is added to the pile above the reels.",
  },
  "playn-go-boat-bonanza-christmas": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/boat-bonanza-christmas",
    evidence: "Official page says fishing boats scoop up Instant Win fish and the Mega Catch gathers all Catch Symbols on the reels.",
  },
  "playn-go-boat-bonanza-colossal-catch": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/boat-bonanza-colossal-catch",
    evidence: "Official page says fishing boats collect Instant Win fish and Colossal Catch sweeps up all Catch Symbols on the reels.",
  },
  "playn-go-boat-bonanza-down-under": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/boat-bonanza-down-under",
    evidence: "Official page labels Instant Prize Collection and describes the fisherman catching Instant Prize fish across the reels.",
  },
  "playn-go-book-of-dead-go-collect": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/book-of-dead-go-collect",
    evidence: "Official page labels GO Collect and says each collected Gold Stater fills the GO Collect meter toward the Treasure Vault.",
  },
  "playn-go-bubblin-riches": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/bubblin%27-riches",
    evidence: "Official page labels Greedy Goldfish Collection and says the Goldfish collects Coin Scatters above the reels.",
  },
  "playn-go-cashin-joker": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/post/cashin-joker",
    evidence: "Official release explicitly describes Cashin’ Joker as using a single-payline structure.",
  },
  "playn-go-cat-wilde-and-the-doom-of-dead": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/cat-wilde-and-the-doom-of-dead",
    evidence: "Official game page explicitly says Expanding Wilds can complete multiple paylines.",
  },
  "playn-go-cat-wilde-and-the-pyramids-of-dead": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/post/top-five-terrifying-tombs-editorial",
    evidence: "Official Play’n GO editorial states Cat Wilde and the Pyramids of Dead uses a 5x3 layout with 10 paylines.",
  },
  "playn-go-clash-of-camelot": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/post/clash-of-camelot",
    evidence: "Official release says players collect Arthur and Mordred Wilds leading up to the Clash of Camelot feature.",
  },
  "playn-go-dio-killing-the-dragon": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/dio-killing-the-dragon",
    evidence: "Official page says magical orbs are collected to transform Wilds into Multiplier Wilds.",
  },
  "playn-go-easter-eggspedition": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/post/easter-eggspedition-game-review",
    evidence: "Official review says the Bonus Feature is triggered by collecting three Easter Egg Baskets.",
  },
  "playn-go-free-reelin-joker": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/post/another-joker-joins-the-pack-in-playn-go-s-latest-game",
    evidence: "Official release explicitly says players start with three reels and one payline.",
  },
  "playn-go-immortails-of-egypt": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/post/immortails-of-egypt",
    evidence: "Official release says progress meters show whether enough symbols have been collected to open the treasure chest.",
  },
  "playn-go-kingdom-below": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/kingdom-below",
    evidence: "Official page says the Beast collects Grab Symbols and Slide n Grab collects them across reels for multiplied rewards.",
  },
  "playn-go-lady-of-fortune-destiny-spins": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/lady-of-fortune-destiny-spins",
    evidence: "Official page explicitly labels Pays 3 Ways: left-to-right, right-to-left and through the middle.",
  },
  "playn-go-legacy-of-undead-dragon-abyssways": {
    mechanics: ["Способы"],
    source: "https://www.playngo.com/games/legacy-of-undead-dragon-abyssways",
    evidence: "Official page explicitly labels the Abyssways mechanic and describes changing reel heights that create new paths for connecting wins.",
  },
  "playn-go-legion-gold-and-the-sphinx-of-dead": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/legion-gold-and-the-sphinx-of-dead",
    evidence: "Official page says six Gold Coins trigger Gold Re-Spins and the Gold Bag collects all visible coin values.",
  },
  "playn-go-loot-and-labyrinths": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/loot-%26-labyrinths",
    evidence: "Official page says Attack Icons are collected during Free Spins to climb the multiplier ladder.",
  },
  "playn-go-love-is-in-the-fair": {
    mechanics: ["Линии", "Сбор символов"],
    source: "https://www.playngo.com/post/love-is-in-the-fair-slot-review",
    evidence: "Official review explicitly references winning paylines and says Romantic Photo Scatters are collected to increase the Free Spins Wild multiplier.",
  },
  "playn-go-mafia-gold": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/mafia-gold",
    evidence: "Official page says bullets and prize values are collected from the Feature Reel, while framed Mafia Boss symbols collect safe values.",
  },
  "playn-go-naughty-nicks-book": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/post/how-to-play-naughty-nicks-book",
    evidence: "Official guide says three Naughty or Nice Book Scatter symbols are collected to trigger Free Spins and additional sets retrigger the feature.",
  },
  "playn-go-pandastic-adventure": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/post/pandastic-adventure",
    evidence: "Official release says Wilds are collected during Free Spins and eight Wilds activate the Hold and Spin feature.",
  },
  "playn-go-piggy-blitz-disco-gold": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/piggy-blitz-disco-gold",
    evidence: "Official page says Piggy Bank symbols collect Cash Coins and their instant-prize values.",
  },
  "playn-go-piggy-heist": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/post/piggy-heist",
    evidence: "Official release says players collect coins into the Safe Box, whose buildup triggers the Hold’n Spin feature.",
  },
  "playn-go-playn-go-buffalo-of-wealth": {
    mechanics: ["Линии", "Сбор символов"],
    source: "https://www.playngo.com/post/play-n-go-buffalo-of-wealth-review-how-to-play",
    evidence: "Official review explicitly refers to line wins and says additional Scatters are collected to unlock extra reel rows.",
  },
  "playn-go-prosperity-palace": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/prosperity-palace",
    evidence: "Official page explicitly states symbol matches pay along the game's ten lines.",
  },
  "playn-go-puebla-parade": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/post/puebla-parade-gets-the-party-started",
    evidence: "Official release explicitly describes expanding reels/paylines from 5x4 to 5x7 during the feature.",
  },
  "playn-go-queens-day-tilt": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/queen%27s-day-tilt",
    evidence: "Official page says the 3x3 grid pays matching symbols in horizontal or vertical lines.",
  },
  "playn-go-rally-4-riches": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/rally-4-riches",
    evidence: "Official page says Win Spins guarantee at least one winning line per spin.",
  },
};

const records: Record<string, CatalogResearch> = Object.fromEntries(
  Object.entries(entries).map(([slug, entry]) => [slug, { ...entry, verifiedAt }]),
);

export function getCatalogResearchPlayngoMechanicsTail(slug: string) {
  return records[slug];
}
