import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ThreeOaksPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "volatility">
> & {
  fieldSource?: string;
  rtpSource?: string;
  rtpSourceAlt?: string;
  maxWinSource?: string;
  volatilitySource?: string;
  volatilitySourceAlt?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-25";

const details: Record<string, ThreeOaksPassportCloseout> = {
  "3-oaks-gaming-coin-up-volcano": {
    rtp: "95,66%",
    maxWin: "1 500x",
    volatility: "Средняя",
    rtpSource: "https://nextslots.co.uk/slots/coin-up-volcano/",
    maxWinSource: "https://nextslots.co.uk/slots/coin-up-volcano/",
    volatilitySource: "https://nextslots.co.uk/slots/coin-up-volcano/",
    verifiedAt,
  },
  "3-oaks-gaming-lucky-penny-3-pots-super-wheel": {
    rtp: "95,77%",
    maxWin: "1 420x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/lucky-penny-3-pots-super-wheel",
    maxWinSource: "https://slotcatalog.com/en/slots/lucky-penny-3-pots-super-wheel",
    volatilitySource: "https://slotcatalog.com/en/slots/lucky-penny-3-pots-super-wheel",
    verifiedAt,
  },
  "3-oaks-gaming-lucky-penny-power-scatter": {
    rtp: "95,59–96,03% (зависит от версии)",
    maxWin: "50 000x",
    volatility: "Высокая",
    rtpSource: "https://gamblenexus.com/slots/lucky-penny-power-scatter/",
    rtpSourceAlt: "https://www.livebet.com/casino/slots/3-oaks-gaming/lucky-penny-power-scatter",
    maxWinSource: "https://3oaks.com/game/lucky_penny_powerscatter",
    volatilitySource: "https://gamblenexus.com/slots/lucky-penny-power-scatter/",
    verifiedAt,
  },
  "3-oaks-gaming-lucky-penny-2": {
    rtp: "95,66–96,05% (зависит от версии)",
    maxWin: "20 000x",
    volatility: "Высокая–очень высокая",
    rtpSource: "https://www.ultimateslots.com/free-demo/lucky-penny-2/",
    rtpSourceAlt: "https://wits.gg/games/3-oaks-gaming-lucky-penny-2-38244",
    maxWinSource: "https://www.ultimateslots.com/free-demo/lucky-penny-2/",
    volatilitySource: "https://www.ultimateslots.com/free-demo/lucky-penny-2/",
    volatilitySourceAlt: "https://wits.gg/games/3-oaks-gaming-lucky-penny-2-38244",
    verifiedAt,
  },
  "3-oaks-gaming-sun-of-egypt-5": {
    field: "5×3 · 20 линий",
    rtp: "95–95,68% (зависит от версии)",
    maxWin: "5 000x",
    volatility: "Высокая",
    fieldSource: "https://www.livebet.com/casino/slots/3-oaks-gaming/sun-of-egypt-5",
    rtpSource: "https://spincompass.com/en-uk/slots/sun-of-egypt-5/",
    rtpSourceAlt: "https://chips.gg/ru/play/3oaks-sun-of-egypt-5",
    maxWinSource: "https://spincompass.com/en-uk/slots/sun-of-egypt-5/",
    volatilitySource: "https://chips.gg/ru/play/3oaks-sun-of-egypt-5",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout11(slug: string) {
  return details[slug];
}
