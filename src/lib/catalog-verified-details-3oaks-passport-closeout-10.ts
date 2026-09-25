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
  "3-oaks-gaming-dj-tiger-x1000": {
    rtp: "96,12%",
    maxWin: "20 000x",
    volatility: "Высокая",
    rtpSource: "https://www.ultimateslots.com/free-demo/dj-tiger-x1000/",
    maxWinSource: "https://www.ultimateslots.com/free-demo/dj-tiger-x1000/",
    volatilitySource: "https://www.ultimateslots.com/free-demo/dj-tiger-x1000/",
    verifiedAt,
  },
  "3-oaks-gaming-lady-fortune": {
    rtp: "95,60%",
    maxWin: "10 000x",
    volatility: "Средняя",
    rtpSource: "https://ladyfortunecasino.com/",
    maxWinSource: "https://ladyfortunecasino.com/",
    volatilitySource: "https://ladyfortunecasino.com/",
    verifiedAt,
  },
  "3-oaks-gaming-golden-teapot": {
    rtp: "95,62%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://goldenteapotslot.com/",
    maxWinSource: "https://goldenteapotslot.com/",
    volatilitySource: "https://goldenteapotslot.com/",
    verifiedAt,
  },
  "3-oaks-gaming-lucky-apple-x1000": {
    rtp: "96,06%",
    maxWin: "20 000x",
    volatility: "Высокая",
    rtpSource: "https://gamblenexus.com/slots/lucky-apple-x1000/",
    maxWinSource: "https://gamblenexus.com/slots/lucky-apple-x1000/",
    volatilitySource: "https://gamblenexus.com/slots/lucky-apple-x1000/",
    verifiedAt,
  },
  "3-oaks-gaming-wolf-night": {
    rtp: "95,69%",
    maxWin: "2 000x",
    volatility: "Средняя",
    rtpSource: "https://wolfnightcasino.com/",
    maxWinSource: "https://wolfnightcasino.com/",
    volatilitySource: "https://wolfnightcasino.com/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout10(slug: string) {
  return details[slug];
}
