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
  "3-oaks-gaming-4-fairy-flowers": {
    rtp: "95,71%",
    maxWin: "10 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://chips.gg/pt/catalog/3oaks-4-fairy-flowers",
    maxWinSource: "https://3oaks.com/game/4_fairy_flowers",
    volatilitySource: "https://chips.gg/pt/catalog/3oaks-4-fairy-flowers",
    verifiedAt,
  },
  "3-oaks-gaming-aztec-sun": {
    rtp: "95,33%",
    maxWin: "1 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Aztec-Sun-Hold-and-Win",
    maxWinSource: "https://slotcatalog.com/en/slots/Aztec-Sun-Hold-and-Win",
    volatilitySource: "https://slotcatalog.com/en/slots/Aztec-Sun-Hold-and-Win",
    verifiedAt,
  },
  "3-oaks-gaming-hit-the-gold": {
    rtp: "95,66%",
    maxWin: "2 000x",
    volatility: "Средняя",
    rtpSource: "https://legalbet.by/igry-online-casino/hit-the-gold/",
    maxWinSource: "https://legalbet.by/igry-online-casino/hit-the-gold/",
    volatilitySource: "https://legalbet.by/igry-online-casino/hit-the-gold/",
    verifiedAt,
  },
  "3-oaks-gaming-green-chilli-2": {
    rtp: "95,6%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Green-Chilli-2",
    maxWinSource: "https://slotcatalog.com/en/slots/Green-Chilli-2",
    volatilitySource: "https://slotcatalog.com/en/slots/Green-Chilli-2",
    verifiedAt,
  },
  "3-oaks-gaming-china-festival": {
    rtp: "95,7%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://slotranker.com/light-wonder/dancing-drums",
    maxWinSource: "https://slotranker.com/light-wonder/dancing-drums",
    volatilitySource: "https://betting.bet/casino/studios/3-oaks-gaming",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout7(slug: string) {
  return details[slug];
}
