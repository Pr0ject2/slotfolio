import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-13";

const details: Record<string, CatalogVerifiedDetails> = {
  "playn-go-chambers-of-ancients": { field: "5×3 · 10 линий", releaseDate: "2024-03-14", source: "https://www.playngo.com/games/chambers-of-ancients", verifiedAt },
  "playn-go-champions-of-mithrune": { releaseDate: "2022-09-01", source: "https://www.playngo.com/games/champions-of-mithrune", verifiedAt },
  "playn-go-charlie-chance": { field: "5 барабанов · 243 способа", releaseDate: "2021-06-10", source: "https://www.playngo.com/games/charlie-chance", verifiedAt },
  "playn-go-charlie-chance-and-the-curse-of-cleopatra": { field: "6×6", releaseDate: "2021-09-30", source: "https://www.playngo.com/games/charlie-chance-and-the-curse-of-cleopatra", verifiedAt },
  "playn-go-charlie-chance-in-hell-to-pay": { releaseDate: "2020-05-21", source: "https://www.playngo.com/games/charlie-chance-in-hell-to-pay", verifiedAt },
  "playn-go-clash-of-camelot": { field: "5 барабанов", releaseDate: "2022-11-24", source: "https://www.playngo.com/games/clash-of-camelot", verifiedAt },
  "playn-go-coin-club": { source: "https://www.playngo.com/games/coin-club", verifiedAt },
  "playn-go-colt-lightning": { releaseDate: "2023-02-16", source: "https://www.playngo.com/games/colt-lightning", verifiedAt },
  "playn-go-colt-lightning-firestorm": { field: "1024 способа", releaseDate: "2024-05-23", source: "https://www.playngo.com/games/colt-lightning-firestorm", verifiedAt },
  "playn-go-crazy-cows": { releaseDate: "2014-11-05", source: "https://www.playngo.com/games/crazy-cows", verifiedAt },
  "playn-go-cursed-moon-power-collection": { releaseDate: "2026-08-20", source: "https://www.playngo.com/games/cursed-moon-power-collection", verifiedAt },
  "playn-go-dansband-pa-turne": { field: "5×3", releaseDate: "2024-07-09", source: "https://www.playngo.com/games/dansband-p%C3%A5-turn%C3%A9", verifiedAt },
  "playn-go-derby-wheel": { releaseDate: "2022-06-09", source: "https://www.playngo.com/games/derby-wheel", verifiedAt },
  "playn-go-diamonds-of-the-realm": { releaseDate: "2021-08-12", source: "https://www.playngo.com/games/diamonds-of-the-realm", verifiedAt },
  "playn-go-grim-muerto": { releaseDate: "2016-07-11", source: "https://www.playngo.com/games/grim-muerto", verifiedAt },
  "playn-go-legion-gold-victory": { releaseDate: "2025-02-27", source: "https://www.playngo.com/games/legion-gold-victory!", verifiedAt },
  "playn-go-leprechaun-goes-egypt": { field: "до 20 линий", releaseDate: "2013-03-25", source: "https://www.playngo.com/games/leprechaun-goes-egypt", verifiedAt },
  "playn-go-leprechaun-goes-wild": { field: "20 линий", releaseDate: "2020-02-13", source: "https://www.playngo.com/games/leprechaun-goes-wild", verifiedAt },
  "playn-go-leprechauns-diamond-dig": { releaseDate: "2025-08-26", source: "https://www.playngo.com/games/leprechaun's-diamond-dig", verifiedAt },
  "playn-go-leprechauns-vault": { field: "5×3", releaseDate: "2022-08-04", source: "https://www.playngo.com/games/leprechaun's-vault", verifiedAt },
  "playn-go-lion-saga-odyssey": { field: "5×3 · 10 линий", releaseDate: "2024-12-05", source: "https://www.playngo.com/games/lion-saga-odyssey", verifiedAt },
  "playn-go-loot-and-labyrinths": { releaseDate: "2025-04-03", source: "https://www.playngo.com/games/loot-%26-labyrinths", verifiedAt },
  "playn-go-lord-merlin-and-the-lady-of-the-lake": { releaseDate: "2021-01-28", source: "https://www.playngo.com/games/lord-merlin-and-the-lady-of-the-lake", verifiedAt },
  "playn-go-lordi-reel-monsters": { field: "7×7", releaseDate: "2022-04-28", source: "https://www.playngo.com/games/lordi-reel-monsters", verifiedAt },
  "playn-go-love-is-in-the-fair": { field: "5×3", releaseDate: "2024-02-01", source: "https://www.playngo.com/games/love-is-in-the-fair", verifiedAt },
  "playn-go-love-joker": { releaseDate: "2022-01-20", source: "https://www.playngo.com/games/love-joker", verifiedAt },
  "playn-go-luchamigos": { field: "5×4 · способы", releaseDate: "2023-05-11", source: "https://www.playngo.com/games/luchamigos", verifiedAt },
  "playn-go-mystery-joker-6000": { releaseDate: "2017-12-20", source: "https://www.playngo.com/games/mystery-joker-6000", verifiedAt },
  "playn-go-nugget-n-nonsense": { releaseDate: "2026-04-16", source: "https://www.playngo.com/games/nugget-n%E2%80%99-nonsense", verifiedAt },
  "playn-go-ras-reckoning": { field: "6×5", releaseDate: "2025-12-04", source: "https://www.playngo.com/games/ra's-reckoning", verifiedAt },
  "playn-go-raging-rex-3": { field: "6×4 · 4096 способов", releaseDate: "2023-10-12", source: "https://www.playngo.com/games/raging-rex-3", verifiedAt },
};

export function getCatalogVerifiedDetailsPlayngoGapFinal(slug: string) {
  return details[slug];
}
