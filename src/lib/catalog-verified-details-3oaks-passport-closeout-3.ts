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
  "3-oaks-gaming-more-magic-apple": {
    rtp: "95,57%",
    maxWin: "7 420x",
    volatility: "Средняя–высокая",
    rtpSource: "https://slotcatalog.com/en/slots/More-Magic-Apple",
    maxWinSource: "https://slotcatalog.com/en/slots/More-Magic-Apple",
    volatilitySource: "https://slotcatalog.com/en/slots/More-Magic-Apple",
    verifiedAt,
  },
  "3-oaks-gaming-sun-of-egypt-4": {
    rtp: "95,47%",
    maxWin: "10 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://www.askgamblers.com/casino-games/online-slots/reviews/sun-of-egypt-4-3-oaks-gaming",
    maxWinSource: "https://www.askgamblers.com/casino-games/online-slots/reviews/sun-of-egypt-4-3-oaks-gaming",
    volatilitySource: "https://www.askgamblers.com/casino-games/online-slots/reviews/sun-of-egypt-4-3-oaks-gaming",
    verifiedAt,
  },
  "3-oaks-gaming-little-farm": {
    rtp: "95,69%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://littlefarmcasino.com/",
    maxWinSource: "https://littlefarmcasino.com/",
    volatilitySource: "https://littlefarmcasino.com/",
    verifiedAt,
  },
  "3-oaks-gaming-rio-gems": {
    rtp: "95,69%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/soft/3-Oaks?cISO=NO",
    maxWinSource: "https://slotcatalog.com/en/soft/3-Oaks/9",
    volatilitySource: "https://slotcatalog.com/en/soft/3-Oaks/9",
    verifiedAt,
  },
  "3-oaks-gaming-hit-more-gold": {
    rtp: "96,65%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/soft/3-Oaks?cISO=GB",
    maxWinSource: "https://slotcatalog.com/en/soft/3-Oaks?cISO=GB",
    volatilitySource: "https://slotcatalog.com/en/soft/3-Oaks?cISO=GB",
    verifiedAt,
  },
  "3-oaks-gaming-777-coins": {
    rtp: "95,75%",
    maxWin: "6 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/soft/3-Oaks?cISO=NL",
    maxWinSource: "https://slotcatalog.com/en/soft/3-Oaks?cISO=NL",
    volatilitySource: "https://slotcatalog.com/en/soft/3-Oaks?cISO=NL",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout3(slug: string) {
  return details[slug];
}
