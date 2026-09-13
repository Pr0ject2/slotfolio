import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-13";

const details: Record<string, CatalogVerifiedDetails> = {
  "push-gaming-3-liberty-eagles": { field: "6 барабанов · 4096 способов", source: "https://www.pushgaming.com/games/3-liberty-eagles.html", verifiedAt },
  "push-gaming-blaze-of-ra": { field: "5×4 · 40 линий", source: "https://www.pushgaming.com/games/blaze-ra.html", verifiedAt },
  "push-gaming-boss-bear": { source: "https://www.pushgaming.com/games/boss-bear.html", verifiedAt },
  "push-gaming-diamond-supernova-100": { field: "100 линий", source: "https://www.pushgaming.com/games/diamond-supernova-100.html", verifiedAt },
  "push-gaming-diamond-supernova-20": { field: "20 линий", source: "https://www.pushgaming.com/games/diamond-supernova-20.html", verifiedAt },
  "push-gaming-diamond-supernova-40": { field: "40 линий", source: "https://www.pushgaming.com/games/diamond-supernova-40.html", verifiedAt },
  "push-gaming-diamond-supernova-5": { field: "5 линий", source: "https://www.pushgaming.com/games/diamond-supernova-5.html", verifiedAt },
  "push-gaming-diamonds-4-the-win": { field: "3 барабана · 5 линий", source: "https://www.pushgaming.com/games/diamonds-4-win.html", verifiedAt },
  "push-gaming-dino-p-d": { source: "https://www.pushgaming.com/games/dino-pd.html", verifiedAt },
  "push-gaming-dinopolis": { source: "https://www.pushgaming.com/games/dinopolis.html", verifiedAt },
  "push-gaming-fat-banker": { source: "https://www.pushgaming.com/games/fat-banker.html", verifiedAt },
  "push-gaming-fire-pig-push-ways": { source: "https://www.pushgaming.com/games/fire-pig-push-ways.html", verifiedAt },
  "push-gaming-generous-jack": { source: "https://www.pushgaming.com/games/generous-jack.html", verifiedAt },
  "push-gaming-goat-getter": { source: "https://www.pushgaming.com/games/goat-getter.html", verifiedAt },
  "push-gaming-happy-bamboo": { source: "https://www.pushgaming.com/games/happy-bamboo.html", verifiedAt },
  "push-gaming-hearts-highway": { source: "https://www.pushgaming.com/games/hearts-highway.html", verifiedAt },
  "push-gaming-henry-the-ape": { source: "https://www.pushgaming.com/games/henry-ape.html", verifiedAt },
  "push-gaming-iron-phoenix": { source: "https://www.pushgaming.com/games/iron-phoenix.html", verifiedAt },
  "push-gaming-jaguar-drop": { source: "https://www.pushgaming.com/games/jaguar-drop.html", verifiedAt },
  "push-gaming-jiggys-pot-o-gold": { field: "3×3 · 5 линий", source: "https://www.pushgaming.com/games/jiggys-pot-o-gold.html", verifiedAt },
  "push-gaming-joker-troupe": { field: "4×3 · 10 линий", source: "https://www.pushgaming.com/games/joker-troupe.html", verifiedAt },
  "push-gaming-mad-blast": { source: "https://www.pushgaming.com/games/mad-blast.html", verifiedAt },
  "push-gaming-mad-cars": { source: "https://www.pushgaming.com/games/mad-cars.html", verifiedAt },
  "push-gaming-masked-mayhem": { source: "https://www.pushgaming.com/games/masked-mayhem.html", verifiedAt },
  "push-gaming-mystery-mission-to-the-moon": { source: "https://www.pushgaming.com/games/mystery-mission-moon.html", verifiedAt },
  "push-gaming-mystery-of-the-nile": { field: "10 линий", source: "https://www.pushgaming.com/games/mystery-nile.html", verifiedAt },
  "push-gaming-neon-cash-city": { field: "8×8", source: "https://www.pushgaming.com/games/neon-cash-city.html", verifiedAt },
  "push-gaming-olympus-unleashed": { source: "https://www.pushgaming.com/games/olympus-unleashed.html", verifiedAt },
  "push-gaming-power-paws": { source: "https://www.pushgaming.com/games/power-paws.html", verifiedAt },
  "push-gaming-power-vault": { source: "https://www.pushgaming.com/games/power-vault.html", verifiedAt },
  "push-gaming-rat-king": { source: "https://www.pushgaming.com/games/rat-king.html", verifiedAt },
  "push-gaming-razor-shark-jackpots": { source: "https://www.pushgaming.com/games/razor-shark-jackpots.html", verifiedAt },
  "push-gaming-razor-ways": { field: "до 46 656 способов", source: "https://www.pushgaming.com/games/razor-ways.html", verifiedAt },
  "push-gaming-red-hot-multipliers": { source: "https://www.pushgaming.com/games/red-hot-multipliers.html", verifiedAt },
  "push-gaming-regal-knights": { source: "https://www.pushgaming.com/games/regal-knights.html", verifiedAt },
  "push-gaming-retro-sweets": { field: "6×9", source: "https://www.pushgaming.com/games/retro-sweets.html", verifiedAt },
  "push-gaming-retro-tapes": { field: "6×9", source: "https://www.pushgaming.com/games/retro-tapes.html", verifiedAt },
  "push-gaming-retroverse": { field: "6×9", source: "https://www.pushgaming.com/games/retroverse.html", verifiedAt },
  "push-gaming-samurais-katana": { field: "5×4 · 20 линий", source: "https://www.pushgaming.com/games/samurais-katana.html", verifiedAt },
  "push-gaming-santa-hopper": { source: "https://www.pushgaming.com/games/santa-hopper.html", verifiedAt },
};

export function getCatalogVerifiedDetailsPushWave1(slug: string) {
  return details[slug];
}
