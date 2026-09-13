import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-13";

const videoSlotSources: Record<string, string> = {
  "playn-go-nsync-pop": "https://www.playngo.com/games/*nsync-pop",
  "playn-go-1001-mystery-genie-fortunes": "https://www.playngo.com/games/1001-mystery-genie-fortunes",
  "playn-go-13th-trial-hercules-abyssways": "https://www.playngo.com/games/13th-trial-hercules-abyssways",
  "playn-go-15-crystal-roses-a-tale-of-love": "https://www.playngo.com/games/15-crystal-roses%3A-a-tale-of-love",
  "playn-go-24k-dragon": "https://www.playngo.com/games/24k-dragon",
  "playn-go-3-blades-and-blessings": "https://www.playngo.com/games/3-blades-%26-blessings",
  "playn-go-3-clown-monty": "https://www.playngo.com/games/3-clown-monty",
  "playn-go-3-clown-monty-ii": "https://www.playngo.com/games/3-clown-monty-ii",
  "playn-go-ace-of-spades": "https://www.playngo.com/games/ace-of-spades",
  "playn-go-annihilator": "https://www.playngo.com/games/annihilator",
  "playn-go-big-win-cat": "https://www.playngo.com/games/big-win-cat",
  "playn-go-big-win-cat-pawsperity": "https://www.playngo.com/games/big-win-cat-pawsperity",
  "playn-go-blazin-bullfrog": "https://www.playngo.com/games/blazin'-bullfrog",
  "playn-go-blinged": "https://www.playngo.com/games/blinged",
  "playn-go-boat-bonanza-christmas": "https://www.playngo.com/games/boat-bonanza-christmas",
  "playn-go-boat-bonanza-colossal-catch": "https://www.playngo.com/games/boat-bonanza-colossal-catch",
  "playn-go-boat-bonanza-down-under": "https://www.playngo.com/games/boat-bonanza-down-under",
  "playn-go-book-of-dead-go-collect": "https://www.playngo.com/games/book-of-dead-go-collect",
  "playn-go-bubblin-riches": "https://www.playngo.com/games/bubblin'-riches",
  "playn-go-buildin-bucks": "https://www.playngo.com/games/buildin'-bucks",
  "playn-go-buildin-even-more-bucks": "https://www.playngo.com/games/buildin'-even-more-bucks",
  "playn-go-buildin-more-bucks": "https://www.playngo.com/games/buildin'-more-bucks",
  "playn-go-bull-in-a-rodeo": "https://www.playngo.com/games/bull-in-a-rodeo",
  "playn-go-bullion-xpress": "https://www.playngo.com/games/bullion-xpress",
  "playn-go-candy-island-princess": "https://www.playngo.com/games/candy-island-princess",
  "playn-go-canine-carnage": "https://www.playngo.com/games/canine-carnage",
  "playn-go-captain-glum-pirate-hunter": "https://www.playngo.com/games/captain-glum%3A-pirate-hunter",
  "playn-go-captain-xenos-earth-adventure": "https://www.playngo.com/games/captain-xeno's-earth-adventure",
  "playn-go-cash-pump": "https://www.playngo.com/games/cash-pump",
  "playn-go-cash-vandal": "https://www.playngo.com/games/cash-vandal",
  "playn-go-cash-a-cabana": "https://www.playngo.com/games/cash-a-cabana",
  "playn-go-cashin-joker": "https://www.playngo.com/games/cashin'-joker",
  "playn-go-cat-wilde-and-the-doom-of-dead": "https://www.playngo.com/games/cat-wilde-and-the-doom-of-dead",
  "playn-go-cat-wilde-and-the-incan-quest": "https://www.playngo.com/games/cat-wilde-and-the-incan-quest",
  "playn-go-cat-wilde-and-the-lost-chapter": "https://www.playngo.com/games/cat-wilde-and-the-lost-chapter",
  "playn-go-cat-wilde-and-the-pyramids-of-dead": "https://www.playngo.com/games/cat-wilde-and-the-pyramids-of-dead",
  "playn-go-cat-wilde-in-the-eclipse-of-the-sun-god": "https://www.playngo.com/games/cat-wilde-in-the-eclipse-of-the-sun-god",
};

const gameTypes: Record<string, CatalogVerifiedGameType> = Object.fromEntries(
  Object.entries(videoSlotSources).map(([slug, source]) => [slug, { gameType: "Video Slot", source, verifiedAt }]),
);

gameTypes["playn-go-animal-madness"] = {
  gameType: "Grid Slot",
  source: "https://www.playngo.com/games/animal-madness",
  verifiedAt,
};

gameTypes["playn-go-cash-of-command"] = {
  gameType: "Grid Slot",
  source: "https://www.playngo.com/games/cash-of-command",
  verifiedAt,
};

export function getVerifiedCatalogGameTypePlayngoGapWave1(slug: string) {
  return gameTypes[slug];
}
