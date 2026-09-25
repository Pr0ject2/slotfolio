import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type PlayngoPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "rtp" | "maxWin" | "volatility">
> & {
  rtpSource?: string;
  maxWinSource?: string;
  volatilitySource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-25";

const details: Record<string, PlayngoPassportCloseout> = {
  "playn-go-big-win-cat": {
    rtp: "96,15%",
    maxWin: "800x",
    volatility: "Средняя",
    rtpSource: "https://www.gamblingzone.com/uk/slots/big-win-cat/",
    maxWinSource: "https://www.gamblingzone.com/uk/slots/big-win-cat/",
    volatilitySource: "https://www.gamblingzone.com/uk/slots/big-win-cat/",
    verifiedAt,
  },
  "playn-go-big-win-cat-pawsperity": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://www.bigwinboard.com/big-win-cat-pawsperity-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/big-win-cat-pawsperity-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/big-win-cat-pawsperity-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-black-mamba": {
    rtp: "96,50% / 94,50% / 91,50% / 87,50% / 84,50%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://www.bigwinboard.com/black-mamba-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/black-mamba-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/black-mamba-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-blazin-bullfrog": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "1 215x",
    volatility: "Средняя",
    rtpSource: "https://www.bigwinboard.com/blazin-bullfrog-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/blazin-bullfrog-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/blazin-bullfrog-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-blinged": {
    rtp: "96,25% / 94,27% / 91,25% / 87,26% / 84,27%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://www.bigwinboard.com/blinged-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/blinged-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/blinged-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-boat-bonanza": {
    rtp: "96,21% / 94,25% / 91,25% / 87,24% / 84,22%",
    volatility: "Высокая",
    rtpSource: "https://clientzone.betconstruct.com/media/download/y7j699/Boat%20Bonanza%20Rules%20and%20Settings.pdf",
    volatilitySource: "https://clientzone.betconstruct.com/media/download/y7j699/Boat%20Bonanza%20Rules%20and%20Settings.pdf",
    verifiedAt,
  },
  "playn-go-boat-bonanza-christmas": {
    rtp: "96,22% / 94,25% / 91,25% / 87,24% / 84,22%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://www.bigwinboard.com/boat-bonanza-christmas-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/boat-bonanza-christmas-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/boat-bonanza-christmas-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-boat-bonanza-colossal-catch": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "3 000x",
    volatility: "Средняя",
    rtpSource: "https://www.bigwinboard.com/boat-bonanza-colossal-catch-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/boat-bonanza-colossal-catch-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/boat-bonanza-colossal-catch-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-boat-bonanza-croconile": {
    rtp: "96,25% / 94,25% / 91,25% / 87,25% / 84,25%",
    maxWin: "6 000x",
    volatility: "Средняя",
    rtpSource: "https://www.bigwinboard.com/boat-bonanza-croconile-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/boat-bonanza-croconile-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/boat-bonanza-croconile-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-boat-bonanza-down-under": {
    rtp: "96,25% / 94,25% / 91,25% / 87,25% / 84,25%",
    maxWin: "6 000x",
    volatility: "Высокая",
    rtpSource: "https://www.bigwinboard.com/boat-bonanza-down-under-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/boat-bonanza-down-under-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/boat-bonanza-down-under-playn-go-slot-review/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout4(slug: string) {
  return details[slug];
}
