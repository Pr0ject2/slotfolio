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
  "3-oaks-gaming-black-wolf": {
    rtp: "95,65%",
    maxWin: "1 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/uk/slots/Black-Wolf",
    maxWinSource: "https://slotcatalog.com/uk/slots/Black-Wolf",
    volatilitySource: "https://slotcatalog.com/uk/slots/Black-Wolf",
    verifiedAt,
  },
  "3-oaks-gaming-magic-apple": {
    rtp: "95,78%",
    maxWin: "2 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Magic-Apple-Hold-and-Win",
    maxWinSource: "https://slotcatalog.com/en/slots/Magic-Apple-Hold-and-Win",
    volatilitySource: "https://slotcatalog.com/en/slots/Magic-Apple-Hold-and-Win",
    verifiedAt,
  },
  "3-oaks-gaming-book-of-sun-multichance": {
    rtp: "95,4%",
    maxWin: "6 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Book-of-Sun-Multi-Chance",
    maxWinSource: "https://slotcatalog.com/en/slots/Book-of-Sun-Multi-Chance",
    volatilitySource: "https://slotcatalog.com/en/slots/Book-of-Sun-Multi-Chance",
    verifiedAt,
  },
  "3-oaks-gaming-gold-nuggets": {
    rtp: "95,63%",
    maxWin: "1 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Gold-Nuggets-3-Oaks",
    maxWinSource: "https://slotcatalog.com/en/slots/Gold-Nuggets-3-Oaks",
    volatilitySource: "https://slotcatalog.com/en/slots/Gold-Nuggets-3-Oaks",
    verifiedAt,
  },
  "3-oaks-gaming-777-gems-respin": {
    rtp: "95,70%",
    maxWin: "750x",
    volatility: "Средняя",
    rtpSource: "https://spinhunter.co.uk/3-oaks-gaming-slots/",
    maxWinSource: "https://spinhunter.co.uk/3-oaks-gaming-slots/",
    volatilitySource: "https://spinhunter.co.uk/3-oaks-gaming-slots/",
    verifiedAt,
  },
  "3-oaks-gaming-fortune-globe": {
    rtp: "94,73%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://fortuneglobecasino.com/",
    maxWinSource: "https://fortuneglobecasino.com/",
    volatilitySource: "https://fortuneglobecasino.com/",
    verifiedAt,
  },
  "3-oaks-gaming-gold-express": {
    rtp: "95,64%",
    maxWin: "2 000x",
    volatility: "Средняя",
    rtpSource: "https://casinoreview.click/game/gold-express/",
    maxWinSource: "https://casinoreview.click/game/gold-express/",
    volatilitySource: "https://casinoreview.click/game/gold-express/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout6(slug: string) {
  return details[slug];
}
