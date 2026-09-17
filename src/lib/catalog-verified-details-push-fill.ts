import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type PushFillOverlay = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "volatility" | "releaseDate">
> & { verifiedAt: string };

const verifiedAt = "2026-09-17";

const details: Record<string, PushFillOverlay> = {
  "push-gaming-3-liberty-eagles": {
    field: "4096 способов",
    rtp: "96,23% / 94,25%",
    maxWin: "5992.10x",
    volatility: "Низкая–средняя",
    verifiedAt,
  },
  "push-gaming-blaze-of-ra": {
    maxWin: "2049x",
    verifiedAt,
  },
  "push-gaming-boss-bear": {
    field: "5×6 · 50 линий",
    rtp: "96,47% / 94,35%",
    maxWin: "25 000x",
    volatility: "Высокая",
    verifiedAt,
  },
  "push-gaming-diamond-supernova-100": {
    maxWin: "1006.3x",
    volatility: "Низкая",
    verifiedAt,
  },
  "push-gaming-diamond-supernova-20": {
    maxWin: "1016.2x",
    volatility: "Низкая",
    verifiedAt,
  },
  "push-gaming-diamond-supernova-40": {
    maxWin: "1014.2x",
    volatility: "Низкая",
    verifiedAt,
  },
  "push-gaming-diamond-supernova-5": {
    maxWin: "1040x",
    volatility: "Низкая",
    verifiedAt,
  },
  "push-gaming-diamonds-4-the-win": {
    field: "3 барабана · 5 линий",
    rtp: "96,38% / 94,39%",
    maxWin: "823x",
    volatility: "Низкая",
    verifiedAt,
  },
  "push-gaming-dino-p-d": {
    field: "5×4 · 20 линий",
    rtp: "96,38% / 94,43%",
    maxWin: "10 000x",
    volatility: "Средняя–высокая",
    verifiedAt,
  },
  "push-gaming-dinopolis": {
    maxWin: "50 000x",
    volatility: "Высокая",
    verifiedAt,
  },
  "push-gaming-fat-banker": {
    rtp: "96,43% / 94,45%",
    maxWin: "25 000x",
    volatility: "Высокая",
    verifiedAt,
  },
  "push-gaming-generous-jack": {
    rtp: "96,23% / 94,36%",
    maxWin: "10 000x",
    volatility: "Высокая",
    verifiedAt,
  },
  "push-gaming-goat-getter": {
    rtp: "96,40% / 94,39%",
    maxWin: "10 000x",
    volatility: "Средняя–высокая",
    verifiedAt,
  },
  "push-gaming-happy-bamboo": {
    rtp: "96,31%",
    maxWin: "6060x",
    volatility: "Средняя",
    verifiedAt,
  },
  "push-gaming-hearts-highway": {
    rtp: "96,44%",
    maxWin: "10 000x",
    volatility: "Средняя–высокая",
    verifiedAt,
  },
  "push-gaming-henry-the-ape": {
    rtp: "96,44%",
    maxWin: "61499.9x",
    volatility: "Высокая",
    verifiedAt,
  },
  "push-gaming-jaguar-drop": {
    rtp: "96,31% / 94,39%",
    maxWin: "10 000x",
    volatility: "Средняя",
    verifiedAt,
  },
  "push-gaming-jiggys-pot-o-gold": {
    field: "3×3 · 5 линий",
    rtp: "96,28% / 94,26%",
    maxWin: "13380x",
    volatility: "Низкая",
    verifiedAt,
  },
  "push-gaming-joker-troupe": {
    field: "4×3 · 10 линий",
    rtp: "96,68% / 94,40%",
    maxWin: "25 367x",
    verifiedAt,
  },
  "push-gaming-mad-blast": {
    rtp: "96,34% / 94,30%",
    maxWin: "10 000x",
    volatility: "Высокая",
    verifiedAt,
  },
  "push-gaming-mad-cars": {
    rtp: "96,39% / 94,44%",
    maxWin: "25 000x",
    volatility: "Высокая",
    verifiedAt,
  },
  "push-gaming-masked-mayhem": {
    rtp: "96,29% / 94,31%",
    maxWin: "10 231x",
    volatility: "Средняя–высокая",
    verifiedAt,
  },
  "push-gaming-mystery-of-the-nile": {
    rtp: "96,35% / 94,36%",
    maxWin: "10 000x",
    volatility: "Высокая",
    verifiedAt,
  },
  "push-gaming-olympus-unleashed": {
    rtp: "96,32%",
    maxWin: "2340x",
    volatility: "Низкая",
    verifiedAt,
  },
  "push-gaming-power-vault": {
    rtp: "96,41% / 94,38%",
    maxWin: "4112x",
    volatility: "Очень низкая",
    verifiedAt,
  },
  "push-gaming-rat-king": {
    rtp: "96,30% / 94,32%",
    maxWin: "10 000x",
    volatility: "Средняя",
    verifiedAt,
  },
  "push-gaming-regal-knights": {
    rtp: "96,22% / 94,25%",
    maxWin: "4897.8x",
    volatility: "Низкая",
    verifiedAt,
  },
  "push-gaming-retro-sweets": {
    rtp: "96,49% / 94,42%",
    maxWin: "10 000x",
    volatility: "Высокая",
    verifiedAt,
  },
  "push-gaming-retroverse": {
    rtp: "96,24%",
    maxWin: "10 000x",
    volatility: "Высокая",
    verifiedAt,
  },
  "push-gaming-samurais-katana": {
    rtp: "96,40% / 94,31%",
    maxWin: "10 000x",
    verifiedAt,
  },
  "push-gaming-santa-hopper": {
    rtp: "96,35% / 94,35%",
    maxWin: "10 000x",
    volatility: "Средняя–высокая",
    verifiedAt,
  },
  "push-gaming-santas-vault": {
    rtp: "96,37% / 94,38%",
    maxWin: "8118x",
    volatility: "Низкая",
    verifiedAt,
  },
  "push-gaming-shamrock-saints": {
    rtp: "96,30% / 94,46%",
    maxWin: "10 000x",
    volatility: "Средняя–высокая",
    verifiedAt,
  },
  "push-gaming-the-grand-show": {
    rtp: "96,28% / 94,35%",
    maxWin: "10 000x",
    volatility: "Средняя",
    verifiedAt,
  },
  "push-gaming-the-great-banker": {
    rtp: "96,31% / 94,21%",
    maxWin: "10317.6x",
    volatility: "Средняя",
    verifiedAt,
  },
  "push-gaming-tiki-tumble": {
    field: "5×4 · 20 линий",
    rtp: "96,49% / 94,36%",
    volatility: "Высокая",
    verifiedAt,
  },
  "push-gaming-triple-rampage": {
    rtp: "96,23% / 94,25%",
    maxWin: "5400x",
    volatility: "Низкая–средняя",
    verifiedAt,
  },
  "push-gaming-viva-lock-vegas": {
    rtp: "96,35% / 94,32%",
    maxWin: "13154x",
    volatility: "Низкая–средняя",
    verifiedAt,
  },
  "push-gaming-wild-swarm": {
    field: "5×4 · 20 линий",
    rtp: "97,03% / 94,67%",
    maxWin: "3069x",
    volatility: "Средняя–высокая",
    verifiedAt,
  },
  "push-gaming-wild-swarm-2": {
    rtp: "96,67% / 94,67%",
    maxWin: "10 000x",
    volatility: "Высокая",
    verifiedAt,
  },
  "push-gaming-wild-swarm-3-chocolate-eggs": {
    rtp: "96,48% / 94,33%",
    maxWin: "23902.8x",
    volatility: "Низкая–средняя",
    verifiedAt,
  },
  "push-gaming-wild-swarm-triple-hive": {
    rtp: "96,48% / 94,33%",
    maxWin: "23902.8x",
    volatility: "Средняя",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPushFill(slug: string) {
  return details[slug];
}
