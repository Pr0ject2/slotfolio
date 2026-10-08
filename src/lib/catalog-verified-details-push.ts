import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-11";

const details: Record<string, CatalogVerifiedDetails> = {
  "push-gaming-fat-drac": {
    field: "5×5 · 40 линий",
    rtp: "96,57% / 94,05%",
    maxWin: "50000x",
    volatility: "Высокая",
    source: "https://www.pushgaming.com/games/fat-drac.html",
    verifiedAt,
  },
  "push-gaming-giga-jar": {
    field: "Кластеры · каскады",
    rtp: "96,48% / 94,45%",
    maxWin: "10000x",
    volatility: "Средняя",
    source: "https://www.pushgaming.com/games/giga-jar.html",
    verifiedAt,
  },
  "push-gaming-razor-returns": {
    field: "Winlines",
    rtp: "96,55% / 94,49%",
    maxWin: "100000x",
    volatility: "Высокая",
    source: "https://www.pushgaming.com/games/razor-returns.html",
    verifiedAt,
  },
  "push-gaming-fire-hopper": {
    field: "Кластеры · каскады",
    rtp: "96,30% / 94,50%",
    maxWin: "50000x",
    volatility: "Высокая",
    source: "https://www.pushgaming.com/games/fire-hopper.html",
    verifiedAt,
  },
  "push-gaming-jammin-jars-2": {
    field: "8×8 · кластеры",
    rtp: "96,40% / 94,40%",
    maxWin: "50000x",
    volatility: "Высокая",
    source: "https://www.pushgaming.com/games/jammin-jars-2.html",
    verifiedAt,
  },
  "push-gaming-mystery-museum": {
    field: "5×3 · 10 линий",
    rtp: "96,58% / 94,01%",
    maxWin: "17500x",
    volatility: "Высокая",
    source: "https://www.pushgaming.com/games/mystery-museum.html",
    verifiedAt,
  },

  "push-gaming-masked-mayhem": { rtp: "96,29% / 94,31%", volatility: "Средне-высокая", source: "https://www.pushgaming.com/games/masked-mayhem.html", verifiedAt },
  "push-gaming-mystery-mission-to-the-moon": { rtp: "96,25% / 94,25%", volatility: "Высокая", source: "https://www.pushgaming.com/games/mystery-mission-moon.html", verifiedAt },
  "push-gaming-mystery-of-the-nile": { field: "10 линий", rtp: "96,35% / 94,36%", volatility: "Высокая", source: "https://www.pushgaming.com/games/mystery-nile.html", verifiedAt },
  "push-gaming-neon-cash-city": { field: "8×8 · кластеры от 5 символов", rtp: "96,35% / 94,37%", volatility: "Средне-высокая", source: "https://www.pushgaming.com/games/neon-cash-city.html", verifiedAt },
  "push-gaming-olympus-unleashed": { rtp: "96,32% / 94,36%", volatility: "Низкая", source: "https://www.pushgaming.com/games/olympus-unleashed.html", verifiedAt },
  "push-gaming-power-paws": { rtp: "96,25% / 94,32%", volatility: "Средне-высокая", source: "https://www.pushgaming.com/games/power-paws.html", verifiedAt },
  "push-gaming-power-vault": { field: "3 барабана", rtp: "96,41% / 94,38%", volatility: "Очень низкая", source: "https://www.pushgaming.com/games/power-vault.html", verifiedAt },
  "push-gaming-rat-king": { rtp: "96,30% / 94,32%", volatility: "Средняя", source: "https://www.pushgaming.com/games/rat-king.html", verifiedAt },
  "push-gaming-razor-shark-jackpots": { rtp: "96,38% / 94,30%", volatility: "Средняя", source: "https://www.pushgaming.com/games/razor-shark-jackpots.html", verifiedAt },
  "push-gaming-razor-ways": { field: "до 46 656 способов", rtp: "96,36% / 94,32%", volatility: "Средне-высокая", source: "https://www.pushgaming.com/games/razor-ways.html", verifiedAt },
  "push-gaming-red-hot-multipliers": { rtp: "96,22% / 94,23%", volatility: "Низкая", source: "https://www.pushgaming.com/games/red-hot-multipliers.html", verifiedAt },
  "push-gaming-regal-knights": { rtp: "96,22% / 94,25%", volatility: "Низкая", source: "https://www.pushgaming.com/games/regal-knights.html", verifiedAt },
  "push-gaming-retro-sweets": { field: "6×9 · Cluster Links", rtp: "96,49% / 94,42%", volatility: "Высокая", source: "https://www.pushgaming.com/games/retro-sweets.html", verifiedAt },
  "push-gaming-retroverse": { rtp: "96,24% / 94,37%", volatility: "Высокая", source: "https://www.pushgaming.com/games/retroverse.html", verifiedAt },
  "push-gaming-samurais-katana": { rtp: "96,40% / 94,31%", volatility: "Высокая", source: "https://www.pushgaming.com/games/samurais-katana.html", verifiedAt },
  "push-gaming-santas-vault": { field: "3 барабана", rtp: "96,37% / 94,38%", volatility: "Низкая", source: "https://www.pushgaming.com/games/santas-vault.html", verifiedAt },
  "push-gaming-sea-of-spirits": { rtp: "96,36% / 94,28%", volatility: "Высокая", source: "https://www.pushgaming.com/games/sea-spirits.html", verifiedAt },

};

export function getCatalogVerifiedDetailsPush(slug: string) {
  return details[slug];
}
