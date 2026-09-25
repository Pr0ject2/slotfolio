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
  "3-oaks-gaming-power-sun": {
    rtp: "96,01%",
    maxWin: "3 000x",
    volatility: "Средняя",
    rtpSource: "https://xcitingslots.com/slots/power-sun/",
    maxWinSource: "https://xcitingslots.com/slots/power-sun/",
    volatilitySource: "https://xcitingslots.com/slots/power-sun/",
    verifiedAt,
  },
  "3-oaks-gaming-power-sun-xxl": {
    rtp: "95%",
    maxWin: "4 288x",
    volatility: "Высокая",
    rtpSource: "https://powersunxxlslot.nl/",
    maxWinSource: "https://powersunxxlslot.nl/",
    volatilitySource: "https://powersunxxlslot.nl/",
    verifiedAt,
  },
  "3-oaks-gaming-purple-diamond": {
    rtp: "96,12%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://gamblenexus.com/slots/purple-diamond/",
    maxWinSource: "https://gamblenexus.com/slots/purple-diamond/",
    volatilitySource: "https://gamblenexus.com/slots/purple-diamond/",
    verifiedAt,
  },
  "3-oaks-gaming-space-coins": {
    rtp: "96,01%",
    maxWin: "3 000x",
    volatility: "Высокая",
    rtpSource: "https://gamblenexus.com/slots/space-coins/",
    maxWinSource: "https://gamblenexus.com/slots/space-coins/",
    volatilitySource: "https://gamblenexus.com/slots/space-coins/",
    verifiedAt,
  },
  "3-oaks-gaming-supreme-diamond-xxl": {
    rtp: "96,34%",
    maxWin: "1 000x",
    volatility: "Высокая",
    rtpSource: "https://rtpspy.com/slots/supreme-diamond-xxl",
    maxWinSource: "https://rtpspy.com/slots/supreme-diamond-xxl",
    volatilitySource: "https://rtpspy.com/slots/supreme-diamond-xxl",
    verifiedAt,
  },
  "3-oaks-gaming-rush-for-gold": {
    rtp: "95,90%",
    maxWin: "8 518x",
    volatility: "Высокая",
    rtpSource: "https://gamblenexus.com/slots/rush-for-gold/",
    maxWinSource: "https://3oaks.com/news/new-release-rush-for-gold",
    volatilitySource: "https://gamblenexus.com/slots/rush-for-gold/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout9(slug: string) {
  return details[slug];
}
