import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout20 } from "./catalog-verified-details-playngo-passport-closeout-20";

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
  "playn-go-iron-girl": {
    rtp: "94,68%",
    maxWin: "1 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Iron-Girl",
    maxWinSource: "https://slotcatalog.com/en/slots/Iron-Girl",
    volatilitySource: "https://slotcatalog.com/en/slots/Iron-Girl",
    verifiedAt,
  },
  "playn-go-jade-magician": {
    rtp: "94,55%",
    maxWin: "2 500x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Jade-Magician",
    maxWinSource: "https://slotcatalog.com/en/slots/Jade-Magician",
    volatilitySource: "https://slotcatalog.com/en/slots/Jade-Magician",
    verifiedAt,
  },
  "playn-go-joker-flip": {
    rtp: "96,20%",
    maxWin: "2 500x",
    volatility: "Средняя",
    rtpSource: "https://www.online-slot.co.uk/online-slots/reviews/joker-flip/",
    maxWinSource: "https://www.online-slot.co.uk/online-slots/reviews/joker-flip/",
    volatilitySource: "https://www.online-slot.co.uk/online-slots/reviews/joker-flip/",
    verifiedAt,
  },
  "playn-go-jolly-roger-2": {
    rtp: "94,20%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Jolly-Roger-2",
    maxWinSource: "https://slotcatalog.com/en/slots/Jolly-Roger-2",
    volatilitySource: "https://slotcatalog.com/en/slots/Jolly-Roger-2",
    verifiedAt,
  },
  "playn-go-jolly-roger-wild-kraken": {
    field: "5×3 · 20 линий",
    rtp: "94,26%",
    maxWin: "20 000x",
    volatility: "Средняя",
    fieldSource: "https://slotcatalog.com/en/slots/jolly-roger-wild-kraken",
    rtpSource: "https://slotcatalog.com/en/slots/jolly-roger-wild-kraken",
    maxWinSource: "https://slotcatalog.com/en/slots/jolly-roger-wild-kraken",
    volatilitySource: "https://slotcatalog.com/en/slots/jolly-roger-wild-kraken",
    verifiedAt,
  },
  "playn-go-king-of-sweets": {
    rtp: "94,20%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/king-of-sweets",
    maxWinSource: "https://slotcatalog.com/en/slots/king-of-sweets",
    volatilitySource: "https://slotcatalog.com/en/slots/king-of-sweets",
    verifiedAt,
  },
  "playn-go-kings-mask": {
    field: "5×3 · 20 линий",
    rtp: "94,29%",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/King-s-Mask",
    rtpSource: "https://slotcatalog.com/en/slots/King-s-Mask",
    volatilitySource: "https://slotcatalog.com/en/slots/King-s-Mask",
    verifiedAt,
  },
  "playn-go-kings-mask-eclipse-of-gods": {
    rtp: "94,28%",
    maxWin: "20 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/king-s-mask-eclipse-of-gods",
    maxWinSource: "https://slotcatalog.com/en/slots/king-s-mask-eclipse-of-gods",
    volatilitySource: "https://slotcatalog.com/en/slots/king-s-mask-eclipse-of-gods",
    verifiedAt,
  },
  "playn-go-kingdom-below": {
    rtp: "94,25%",
    maxWin: "6 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/kingdom-below",
    maxWinSource: "https://slotcatalog.com/en/slots/kingdom-below",
    volatilitySource: "https://slotcatalog.com/en/slots/kingdom-below",
    verifiedAt,
  },
  "playn-go-kiss-reels-of-rock": {
    rtp: "94,20%",
    maxWin: "50 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/KISS-Reels-of-Rock",
    maxWinSource: "https://slotcatalog.com/en/slots/KISS-Reels-of-Rock",
    volatilitySource: "https://slotcatalog.com/en/slots/KISS-Reels-of-Rock",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout19(slug: string) {
  return details[slug] ?? getCatalogVerifiedDetailsPlayngoPassportCloseout20(slug);
}
