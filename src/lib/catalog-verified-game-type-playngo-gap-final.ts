import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-13";

const videoSlotSources: Record<string, string> = {
  "playn-go-chambers-of-ancients": "https://www.playngo.com/games/chambers-of-ancients",
  "playn-go-champions-of-mithrune": "https://www.playngo.com/games/champions-of-mithrune",
  "playn-go-charlie-chance": "https://www.playngo.com/games/charlie-chance",
  "playn-go-charlie-chance-in-hell-to-pay": "https://www.playngo.com/games/charlie-chance-in-hell-to-pay",
  "playn-go-clash-of-camelot": "https://www.playngo.com/games/clash-of-camelot",
  "playn-go-colt-lightning": "https://www.playngo.com/games/colt-lightning",
  "playn-go-colt-lightning-firestorm": "https://www.playngo.com/games/colt-lightning-firestorm",
  "playn-go-crazy-cows": "https://www.playngo.com/games/crazy-cows",
  "playn-go-cursed-moon-power-collection": "https://www.playngo.com/games/cursed-moon-power-collection",
  "playn-go-dansband-pa-turne": "https://www.playngo.com/games/dansband-p%C3%A5-turn%C3%A9",
  "playn-go-derby-wheel": "https://www.playngo.com/games/derby-wheel",
  "playn-go-diamonds-of-the-realm": "https://www.playngo.com/games/diamonds-of-the-realm",
  "playn-go-grim-muerto": "https://www.playngo.com/games/grim-muerto",
  "playn-go-legion-gold-victory": "https://www.playngo.com/games/legion-gold-victory!",
  "playn-go-leprechaun-goes-egypt": "https://www.playngo.com/games/leprechaun-goes-egypt",
  "playn-go-leprechaun-goes-wild": "https://www.playngo.com/games/leprechaun-goes-wild",
  "playn-go-leprechauns-diamond-dig": "https://www.playngo.com/games/leprechaun's-diamond-dig",
  "playn-go-leprechauns-vault": "https://www.playngo.com/games/leprechaun's-vault",
  "playn-go-lion-saga-odyssey": "https://www.playngo.com/games/lion-saga-odyssey",
  "playn-go-loot-and-labyrinths": "https://www.playngo.com/games/loot-%26-labyrinths",
  "playn-go-lord-merlin-and-the-lady-of-the-lake": "https://www.playngo.com/games/lord-merlin-and-the-lady-of-the-lake",
  "playn-go-love-is-in-the-fair": "https://www.playngo.com/games/love-is-in-the-fair",
  "playn-go-love-joker": "https://www.playngo.com/games/love-joker",
  "playn-go-luchamigos": "https://www.playngo.com/games/luchamigos",
  "playn-go-mystery-joker-6000": "https://www.playngo.com/games/mystery-joker-6000",
  "playn-go-nugget-n-nonsense": "https://www.playngo.com/games/nugget-n%E2%80%99-nonsense",
  "playn-go-raging-rex-3": "https://www.playngo.com/games/raging-rex-3",
};

const gameTypes: Record<string, CatalogVerifiedGameType> = Object.fromEntries(
  Object.entries(videoSlotSources).map(([slug, source]) => [slug, { gameType: "Video Slot", source, verifiedAt }]),
);

gameTypes["playn-go-charlie-chance-and-the-curse-of-cleopatra"] = {
  gameType: "Grid Slot",
  source: "https://www.playngo.com/games/charlie-chance-and-the-curse-of-cleopatra",
  verifiedAt,
};

gameTypes["playn-go-lordi-reel-monsters"] = {
  gameType: "Grid Slot",
  source: "https://www.playngo.com/games/lordi-reel-monsters",
  verifiedAt,
};

export function getVerifiedCatalogGameTypePlayngoGapFinal(slug: string) {
  return gameTypes[slug];
}
