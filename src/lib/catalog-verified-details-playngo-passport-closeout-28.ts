import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout29 } from "./catalog-verified-details-playngo-passport-closeout-29";

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
  "playn-go-pearls-of-india": {
    field: "5 барабанов · 20 линий",
    rtp: "96,87%",
    maxWin: "10 000x",
    volatility: "Средняя",
    fieldSource: "https://www.luckymobileslots.com/game-reviews/pearls-of-india/",
    rtpSource: "https://slotyeti.com/en/slots/pearls-of-india/",
    maxWinSource: "https://slotyeti.com/en/slots/pearls-of-india/",
    volatilitySource: "https://slotyeti.com/en/slots/pearls-of-india/",
    verifiedAt,
  },
  "playn-go-photo-safari": {
    rtp: "94,17%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://www.slotstemple.com/free-slots/photo-safari/",
    maxWinSource: "https://www.slotstemple.com/free-slots/photo-safari/",
    volatilitySource: "https://www.slotstemple.com/free-slots/photo-safari/",
    verifiedAt,
  },
  "playn-go-piggy-bank-farm": {
    rtp: "96,29%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://www.slotstemple.com/free-slots/piggy-bank-farm/",
    maxWinSource: "https://www.slotstemple.com/free-slots/piggy-bank-farm/",
    volatilitySource: "https://www.slotstemple.com/free-slots/piggy-bank-farm/",
    verifiedAt,
  },
  "playn-go-piggy-blitz": {
    field: "6×4 · 4 096 способов",
    rtp: "96,25%",
    maxWin: "5 000x",
    volatility: "Средняя",
    fieldSource: "https://slotcatalog.com/en/slots/Piggy-Blitz",
    rtpSource: "https://slotcatalog.com/en/slots/Piggy-Blitz",
    maxWinSource: "https://slotcatalog.com/en/slots/Piggy-Blitz",
    volatilitySource: "https://slotcatalog.com/en/slots/Piggy-Blitz",
    verifiedAt,
  },
  "playn-go-piggy-blitz-casino-gold": {
    field: "6×4 · 4 096 способов",
    rtp: "96,25%",
    maxWin: "8 000x",
    volatility: "Средняя",
    fieldSource: "https://www.aboutslots.com/casino-slots/piggy-blitz-casino-gold",
    rtpSource: "https://www.aboutslots.com/casino-slots/piggy-blitz-casino-gold",
    maxWinSource: "https://www.aboutslots.com/casino-slots/piggy-blitz-casino-gold",
    volatilitySource: "https://www.aboutslots.com/casino-slots/piggy-blitz-casino-gold",
    verifiedAt,
  },
  "playn-go-piggy-blitz-disco-gold": {
    field: "6×4 · 4 096 способов",
    rtp: "96,29%",
    maxWin: "6 000x",
    volatility: "Средняя",
    fieldSource: "https://www.aboutslots.com/casino-slots/piggy-blitz-disco-gold",
    rtpSource: "https://www.aboutslots.com/casino-slots/piggy-blitz-disco-gold",
    maxWinSource: "https://www.aboutslots.com/casino-slots/piggy-blitz-disco-gold",
    volatilitySource: "https://www.aboutslots.com/casino-slots/piggy-blitz-disco-gold",
    verifiedAt,
  },
  "playn-go-piggy-heist": {
    field: "6×4 · 4 096 способов",
    rtp: "96,25%",
    maxWin: "70 000x",
    volatility: "Средняя",
    fieldSource: "https://flush.com/lp/en/casino/games/piggy-heist/",
    rtpSource: "https://flush.com/lp/en/casino/games/piggy-heist/",
    maxWinSource: "https://flush.com/lp/en/casino/games/piggy-heist/",
    volatilitySource: "https://flush.com/lp/en/casino/games/piggy-heist/",
    verifiedAt,
  },
  "playn-go-pilgrim-of-dead": {
    field: "5×3 · 10 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    fieldSource: "https://www.bigwinboard.com/pilgrim-of-dead-playn-go-slot-review/",
    rtpSource: "https://www.bigwinboard.com/pilgrim-of-dead-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/pilgrim-of-dead-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/pilgrim-of-dead-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-piranha-pays": {
    field: "5×4 · 30 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "5 000x",
    volatility: "Очень высокая",
    fieldSource: "https://www.bigwinboard.com/piranha-pays-playn-go-slot-review/",
    rtpSource: "https://www.bigwinboard.com/piranha-pays-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/piranha-pays-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/piranha-pays-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-planet-fortune": {
    field: "5×4 · 40 линий",
    rtp: "96,50%",
    maxWin: "2 500x",
    volatility: "Высокая",
    fieldSource: "https://www.slotstemple.com/free-slots/planet-fortune/",
    rtpSource: "https://www.slotstemple.com/free-slots/planet-fortune/",
    maxWinSource: "https://www.slotstemple.com/free-slots/planet-fortune/",
    volatilitySource: "https://www.slotstemple.com/free-slots/planet-fortune/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout28(slug: string) {
  return details[slug] ?? getCatalogVerifiedDetailsPlayngoPassportCloseout29(slug);
}
