import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout30 } from "./catalog-verified-details-playngo-passport-closeout-30";

type PlayngoPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "volatility">
> & {
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  volatilitySource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-26";

const details: Record<string, PlayngoPassportCloseout> = {
  "playn-go-playn-go-mole-digger": {
    field: "5×4 · 25 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Средняя–высокая",
    fieldSource: "https://bonkku.com/demos/mole-digger/",
    rtpSource: "https://bonkku.com/demos/mole-digger/",
    maxWinSource: "https://bonkku.com/demos/mole-digger/",
    volatilitySource: "https://bonkku.com/demos/mole-digger/",
    verifiedAt,
  },
  "playn-go-playn-go-wrappin-gold": {
    field: "5×3 · 20 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "1 525x",
    volatility: "Средняя",
    fieldSource: "https://bookofslots.com/free-slots/wrappin-gold",
    rtpSource: "https://bookofslots.com/free-slots/wrappin-gold",
    maxWinSource: "https://bookofslots.com/free-slots/wrappin-gold",
    volatilitySource: "https://bookofslots.com/free-slots/wrappin-gold",
    verifiedAt,
  },
  "playn-go-potion-of-madness": {
    field: "5×3 · 10 линий",
    rtp: "96,20%",
    maxWin: "6 000x",
    volatility: "Средняя",
    fieldSource: "https://www.froytakia777.gr/slots/potion-of-madness/",
    rtpSource: "https://www.froytakia777.gr/slots/potion-of-madness/",
    maxWinSource: "https://www.froytakia777.gr/slots/potion-of-madness/",
    volatilitySource: "https://www.froytakia777.gr/slots/potion-of-madness/",
    verifiedAt,
  },
  "playn-go-primal-rampage": {
    field: "3 барабана · 27–512 способов · до 8 рядов",
    rtp: "96,20%",
    maxWin: "2 500x",
    volatility: "Средняя",
    fieldSource: "https://www.parisgamblers.com/slots/primal-rampage",
    rtpSource: "https://www.parisgamblers.com/slots/primal-rampage",
    maxWinSource: "https://www.parisgamblers.com/slots/primal-rampage",
    volatilitySource: "https://www.parisgamblers.com/slots/primal-rampage",
    verifiedAt,
  },
  "playn-go-prism-of-gems": {
    rtp: "96,24% / 94,25% / 91,24% / 87,25% / 84,25%",
    maxWin: "30 000x",
    volatility: "Высокая",
    rtpSource: "https://allslotsites.com/slot-games/prism-of-gems/",
    maxWinSource: "https://allslotsites.com/slot-games/prism-of-gems/",
    volatilitySource: "https://allslotsites.com/slot-games/prism-of-gems/",
    verifiedAt,
  },
  "playn-go-queens-day-tilt": {
    field: "3×3 · 1 линия",
    rtp: "96,36%",
    maxWin: "5 000x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Queens-Day-Tilt",
    rtpSource: "https://slotcatalog.com/en/slots/Queens-Day-Tilt",
    maxWinSource: "https://slotcatalog.com/en/slots/Queens-Day-Tilt",
    volatilitySource: "https://slotcatalog.com/en/slots/Queens-Day-Tilt",
    verifiedAt,
  },
  "playn-go-rabbit-hole-riches": {
    field: "3×3 · 5 линий",
    rtp: "96,23% / 94,70% / 91,49% / 87,57% / 84,34%",
    maxWin: "5 000x",
    volatility: "Средняя",
    fieldSource: "https://slotuk.org/free-slots/rabbit-hole-riches/",
    rtpSource: "https://slotuk.org/free-slots/rabbit-hole-riches/",
    maxWinSource: "https://slotuk.org/free-slots/rabbit-hole-riches/",
    volatilitySource: "https://slotuk.org/free-slots/rabbit-hole-riches/",
    verifiedAt,
  },
  "playn-go-rabbit-hole-riches-court-of-hearts": {
    field: "5×3 · 10 линий",
    rtp: "96,27%",
    maxWin: "8 500x",
    volatility: "Высокая",
    fieldSource: "https://casinventory-site-production.up.railway.app/games/court-of-hearts",
    rtpSource: "https://casinventory-site-production.up.railway.app/games/court-of-hearts",
    maxWinSource: "https://casinventory-site-production.up.railway.app/games/court-of-hearts",
    volatilitySource: "https://casinventory-site-production.up.railway.app/games/court-of-hearts",
    verifiedAt,
  },
  "playn-go-raging-rex": {
    rtp: "96,34%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://www.luckymobileslots.com/game-reviews/raging-rex/",
    maxWinSource: "https://www.luckymobileslots.com/game-reviews/raging-rex/",
    volatilitySource: "https://www.luckymobileslots.com/game-reviews/raging-rex/",
    verifiedAt,
  },
  "playn-go-raging-rex-2": {
    field: "6×4 · 4 096 способов",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    volatility: "Средняя",
    fieldSource: "https://allslotsites.com/slot-games/raging-rex-2/",
    rtpSource: "https://allslotsites.com/slot-games/raging-rex-2/",
    volatilitySource: "https://allslotsites.com/slot-games/raging-rex-2/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout29(slug: string) {
  return details[slug] ?? getCatalogVerifiedDetailsPlayngoPassportCloseout30(slug);
}
