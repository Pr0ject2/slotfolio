import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsEndorphinaScore4Fill } from "./catalog-verified-details-endorphina-score4-fill";

const verifiedAt = "2026-09-11";
const verifiedAtFinal = "2026-09-13";

const details: Record<string, CatalogVerifiedDetails> = {
  "endorphina-3-golden-chests": {
    field: "4×3 · 12 ячеек",
    rtp: "96,04%",
    maxWin: "1 400x",
    volatility: "Высокая",
    source: "https://endorphina.com/games/3-golden-chests/play",
    verifiedAt: verifiedAtFinal,
  },
  "endorphina-burning-coins-100": {
    field: "5×4 · 100 фиксированных линий",
    rtp: "96,05%",
    volatility: "Высокая",
    source: "https://endorphina.com/games/burning-coins-100/play",
    verifiedAt,
  },
  "endorphina-burning-coins-20-dice": {
    field: "5×3 · 20 линий",
    rtp: "96,01%",
    volatility: "Средняя",
    source: "https://endorphina.com/games/burning-coins-20-dice/play",
    verifiedAt,
  },
  "endorphina-chance-machine-90s": {
    field: "3×3 · 5 фиксированных линий",
    rtp: "96,06%",
    volatility: "Средняя–высокая",
    source: "https://endorphina.com/games/chance-machine-90s/play",
    verifiedAt,
  },
  "endorphina-druids-fortune": {
    field: "5×3 · 20 фиксированных линий",
    rtp: "96,06%",
    volatility: "Высокая",
    source: "https://endorphina.com/games/druids-fortune/play",
    verifiedAt,
  },
  "endorphina-fortune-bankers": {
    field: "5×4 · Cascade",
    rtp: "96,00%",
    volatility: "Высокая",
    source: "https://endorphina.com/games/fortune-bankers/play",
    verifiedAt,
  },
  "endorphina-fortune-chests-dice": {
    field: "3×3 · 5 фиксированных линий",
    rtp: "96,08%",
    volatility: "Высокая",
    source: "https://endorphina.com/games/fortune-chests-dice/play",
    verifiedAt,
  },
  "endorphina-gift-of-midas": {
    field: "5×3 · 10 фиксированных линий",
    rtp: "96,06%",
    volatility: "Высокая",
    source: "https://endorphina.com/games/gift-of-midas/play",
    verifiedAt,
  },
  "endorphina-groovin-tiger": {
    field: "5×3 · 10 фиксированных линий",
    rtp: "96,05%",
    volatility: "Высокая",
    source: "https://endorphina.com/games/groovin-tiger/play",
    verifiedAt,
  },
  "endorphina-hell-hot-1000": {
    field: "5×4 · 100 фиксированных линий",
    rtp: "96,02%",
    volatility: "Средняя",
    source: "https://endorphina.com/games/hell-hot-1000/play",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsEndorphina(slug: string) {
  const base = details[slug];
  const overlay = getCatalogVerifiedDetailsEndorphinaScore4Fill(slug);
  if (!overlay) return base;
  if (!base) return undefined;
  return { ...base, ...overlay };
}
