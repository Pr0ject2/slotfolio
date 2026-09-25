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
  "3-oaks-gaming-3-lucky-sparks": {
    rtp: "95,56%",
    maxWin: "1 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://rtpspy.com/slots/3-lucky-sparks",
    maxWinSource: "https://rtpspy.com/slots/3-lucky-sparks",
    volatilitySource: "https://slotcatalog.com/en/slots/3-lucky-sparks",
    verifiedAt,
  },
  "3-oaks-gaming-3-super-coin-volcanoes": {
    rtp: "94–96% (зависит от версии)",
    maxWin: "2 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://coinsvolcano.com/en-ca/3-super-coin-volcanoes",
    maxWinSource: "https://coinsvolcano.com/en-ca/3-super-coin-volcanoes",
    volatilitySource: "https://coinsvolcano.com/en-ca/3-super-coin-volcanoes",
    verifiedAt,
  },
  "3-oaks-gaming-4-african-drums": {
    rtp: "95,69%",
    rtpSource: "https://satoshihero.com/game/3-oaks-4-african-drums",
    verifiedAt,
  },
  "3-oaks-gaming-4-clover-pots": {
    rtp: "95–96,34% (зависит от версии)",
    maxWin: "15 000x",
    volatility: "Высокая",
    rtpSource: "https://chips.gg/kr/play/3oaks-4-clover-pots",
    maxWinSource: "https://slotcatalog.com/en/slots/4-clover-pots",
    volatilitySource: "https://slotcatalog.com/en/slots/4-clover-pots",
    verifiedAt,
  },
  "3-oaks-gaming-3-hot-teapots": {
    rtp: "94,79–96,30% (зависит от версии)",
    maxWin: "1 000–2 198x (зависит от версии)",
    volatility: "Средняя–высокая",
    rtpSource: "https://next.io/win/us/real-prize-casino-adds-3-oaks-gaming-as-new-provider",
    maxWinSource: "https://next.io/win/us/real-prize-casino-adds-3-oaks-gaming-as-new-provider",
    volatilitySource: "https://next.io/win/us/real-prize-casino-adds-3-oaks-gaming-as-new-provider",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout2(slug: string) {
  return details[slug];
}
