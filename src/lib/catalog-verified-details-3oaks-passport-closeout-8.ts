import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ThreeOaksPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "rtp" | "maxWin" | "volatility">
> & {
  rtpSource?: string;
  maxWinSource?: string;
  volatilitySource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-25";

const details: Record<string, ThreeOaksPassportCloseout> = {
  "3-oaks-gaming-sun-of-egypt": {
    rtp: "95%",
    maxWin: "1 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://sunofegyptwin.com/ru/",
    maxWinSource: "https://sunofegyptwin.com/ru/",
    volatilitySource: "https://sunofegyptwin.com/ru/",
    verifiedAt,
  },
  "3-oaks-gaming-sun-of-egypt-3": {
    rtp: "95,61%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://www.askgamblers.com/casino-games/online-slots/reviews/sun-of-egypt-3-3-oaks-gaming",
    maxWinSource: "https://www.askgamblers.com/casino-games/online-slots/reviews/sun-of-egypt-3-3-oaks-gaming",
    volatilitySource: "https://www.askgamblers.com/casino-games/online-slots/reviews/sun-of-egypt-3-3-oaks-gaming",
    verifiedAt,
  },
  "3-oaks-gaming-magic-apple-2": {
    rtp: "95,53%",
    maxWin: "5 133x",
    volatility: "Высокая",
    rtpSource: "https://clashofslots.com/slots/booongo/magic-apple-2/",
    maxWinSource: "https://clashofslots.com/slots/booongo/magic-apple-2/",
    volatilitySource: "https://clashofslots.com/slots/booongo/magic-apple-2/",
    verifiedAt,
  },
  "3-oaks-gaming-moon-sisters": {
    rtp: "95%",
    maxWin: "1 000x",
    volatility: "Средняя",
    rtpSource: "https://clashofslots.com/ru/slots/booongo/moon-sisters/",
    maxWinSource: "https://clashofslots.com/ru/slots/booongo/moon-sisters/",
    volatilitySource: "https://clashofslots.com/ru/slots/booongo/moon-sisters/",
    verifiedAt,
  },
  "3-oaks-gaming-sunlight-princess": {
    rtp: "95,52%",
    maxWin: "10 345x",
    volatility: "Высокая",
    rtpSource: "https://clashofslots.com/slots/booongo/sunlight-princess/",
    maxWinSource: "https://clashofslots.com/slots/booongo/sunlight-princess/",
    volatilitySource: "https://clashofslots.com/slots/booongo/sunlight-princess/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout8(slug: string) {
  return details[slug];
}
