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
  "push-gaming-10-cash-bisons": {"field":"5 барабанов · Push-Up","rtp":"96,29%","volatility":"Низкая–средняя","source":"https://www.pushgaming.com/games/10-cash-bisons.html","verifiedAt":"2026-10-08"},
  "push-gaming-10-flaming-bisons": {"field":"5 барабанов · Push-Up","rtp":"96,26%","volatility":"Средняя","source":"https://www.pushgaming.com/games/10-flaming-bisons.html","verifiedAt":"2026-10-08"},
  "push-gaming-10-pharaohs": {"field":"5 барабанов · Push-Up","rtp":"96,26%","volatility":"Средняя","source":"https://www.pushgaming.com/games/10-pharaohs.html","verifiedAt":"2026-10-08"},
  "push-gaming-10-santas-reindeers": {"field":"5 барабанов · Push-Up","rtp":"96,26%","volatility":"Средняя","source":"https://www.pushgaming.com/games/10-santas-reindeers.html","verifiedAt":"2026-10-08"},
  "push-gaming-10-swords": {"field":"5 барабанов · Scatter Pays","rtp":"96,41%","volatility":"Низкая–средняя","source":"https://www.pushgaming.com/games/10-swords.html","verifiedAt":"2026-10-08"},
  "push-gaming-3-liberty-eagles": {"field":"6 барабанов · 4096 способов","rtp":"96,23% / 94,25%","volatility":"Низкая–средняя","source":"https://www.pushgaming.com/games/3-liberty-eagles.html","verifiedAt":"2026-10-08"},
  "push-gaming-3-magic-pots": {"field":"6 барабанов · до 46 656 способов","rtp":"96,23% / 94,25%","volatility":"Низкая–средняя","source":"https://www.pushgaming.com/games/3-magic-pots.html","verifiedAt":"2026-10-08"},
  "push-gaming-bait-n-bank": {"field":"3×3","rtp":"96,37% / 94,38%","volatility":"Низкая","source":"https://www.pushgaming.com/games/bait-n-bank.html","verifiedAt":"2026-10-08"},
  "push-gaming-bamboo-ways": {"field":"Поле с раскрывающимися рядами","rtp":"96,30% / 94,42%","volatility":"Высокая","source":"https://www.pushgaming.com/games/bamboo-ways.html","verifiedAt":"2026-10-08"},
  "push-gaming-big-bam-book": {"rtp":"96,31% / 94,42%","source":"https://www.pushgaming.com/games/big-bam-book.html","verifiedAt":"2026-10-08"},
  "push-gaming-big-bamboo": {"rtp":"96,13%","volatility":"Высокая","source":"https://www.pushgaming.com/games/big-bamboo.html","verifiedAt":"2026-10-08"},
  "push-gaming-big-bamboo-2": {"rtp":"96,36% / 94,47%","volatility":"Высокая","maxWin":"75000x","source":"https://www.pushgaming.com/games/big-bamboo-2.html","verifiedAt":"2026-10-08"},

};

export function getCatalogVerifiedDetailsPush(slug: string) {
  return details[slug];
}
