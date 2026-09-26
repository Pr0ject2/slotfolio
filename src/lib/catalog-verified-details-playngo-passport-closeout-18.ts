import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout19 } from "./catalog-verified-details-playngo-passport-closeout-19";

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
  "playn-go-hugos-adventure": {
    rtp: "94,56%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Hugos-Adventure",
    maxWinSource: "https://slotcatalog.com/en/slots/Hugos-Adventure",
    volatilitySource: "https://slotcatalog.com/en/slots/Hugos-Adventure",
    verifiedAt,
  },
  "playn-go-ice-joker": {
    rtp: "96,23%",
    maxWin: "3 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Ice-Joker",
    maxWinSource: "https://slotcatalog.com/en/slots/Ice-Joker",
    volatilitySource: "https://slotcatalog.com/en/slots/Ice-Joker",
    verifiedAt,
  },
  "playn-go-idol-of-fortune": {
    field: "5×3 · 243 способа",
    rtp: "94,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Idol-of-Fortune",
    rtpSource: "https://slotcatalog.com/en/slots/Idol-of-Fortune",
    maxWinSource: "https://slotcatalog.com/en/slots/Idol-of-Fortune",
    volatilitySource: "https://slotcatalog.com/en/slots/Idol-of-Fortune",
    verifiedAt,
  },
  "playn-go-immortails-of-egypt": {
    rtp: "94,20%",
    maxWin: "10 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Immortails-of-Egypt",
    maxWinSource: "https://slotcatalog.com/en/slots/Immortails-of-Egypt",
    volatilitySource: "https://slotcatalog.com/en/slots/Immortails-of-Egypt",
    verifiedAt,
  },
  "playn-go-imperial-opera": {
    rtp: "94,50%",
    maxWin: "2 500x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Imperial-Opera",
    maxWinSource: "https://slotcatalog.com/en/slots/Imperial-Opera",
    volatilitySource: "https://slotcatalog.com/en/slots/Imperial-Opera",
    verifiedAt,
  },
  "playn-go-infernal-trinity-go-guaranteed": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "6 000x",
    volatility: "Высокая",
    rtpSource: "https://prespins.com/slots/infernal-trinity-go-guaranteed",
    maxWinSource: "https://prespins.com/slots/infernal-trinity-go-guaranteed",
    volatilitySource: "https://prespins.com/slots/infernal-trinity-go-guaranteed",
    verifiedAt,
  },
  "playn-go-inferno-joker": {
    rtp: "94,34%",
    maxWin: "2 500x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Inferno-Joker",
    maxWinSource: "https://slotcatalog.com/en/slots/Inferno-Joker",
    volatilitySource: "https://slotcatalog.com/en/slots/Inferno-Joker",
    verifiedAt,
  },
  "playn-go-inferno-star": {
    rtp: "94,34%",
    maxWin: "2 500x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Inferno-Star",
    maxWinSource: "https://slotcatalog.com/en/slots/Inferno-Star",
    volatilitySource: "https://slotcatalog.com/en/slots/Inferno-Star",
    verifiedAt,
  },
  "playn-go-invading-vegas-revenge-on-mars": {
    rtp: "96,20%",
    maxWin: "2 500x",
    volatility: "Средняя",
    rtpSource: "https://slotyeti.com/en/slots/invading-vegas-revenge-on-mars/",
    maxWinSource: "https://slotyeti.com/en/slots/invading-vegas-revenge-on-mars/",
    volatilitySource: "https://slotyeti.com/en/slots/invading-vegas-revenge-on-mars/",
    verifiedAt,
  },
  "playn-go-invading-vegas-las-christmas": {
    rtp: "96,20%",
    maxWin: "2 500x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Invading-Vegas-Las-Christmas",
    maxWinSource: "https://slotcatalog.com/en/slots/Invading-Vegas-Las-Christmas",
    volatilitySource: "https://slotcatalog.com/en/slots/Invading-Vegas-Las-Christmas",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout18(slug: string) {
  return details[slug] ?? getCatalogVerifiedDetailsPlayngoPassportCloseout19(slug);
}
