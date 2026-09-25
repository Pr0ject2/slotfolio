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
const slotsDataSource = "https://slotsdata.co/providers/playngo/";

const details: Record<string, PlayngoPassportCloseout> = {
  "playn-go-1001-mystery-genie-fortunes": {
    rtp: "96,2%",
    volatility: "Средняя",
    rtpSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-ankh-of-anubis-awakening": {
    rtp: "96,2% / 94,2% / 91,2% / 87,2% / 84,2%",
    maxWin: "15 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/ankh-of-anubis-awakening",
    maxWinSource: "https://slotcatalog.com/en/slots/ankh-of-anubis-awakening",
    volatilitySource: "https://slotcatalog.com/en/slots/ankh-of-anubis-awakening",
    verifiedAt,
  },
  "playn-go-banquet-of-dead": {
    rtp: "96,21%",
    maxWin: "35 000x",
    volatility: "Высокая",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-baron-lord-of-saturday": {
    rtp: "96,2%",
    maxWin: "3 500x",
    volatility: "Высокая",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-beasts-of-fire-maximum": {
    rtp: "96,25%",
    maxWin: "50 000x",
    volatility: "Высокая",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-buildin-bucks": {
    rtp: "96,2%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-buildin-even-more-bucks": {
    rtp: "96,2%",
    maxWin: "7 500x",
    volatility: "Высокая",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-chambers-of-ancients": {
    rtp: "96,31%",
    maxWin: "20 000x",
    volatility: "Высокая",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-colt-lightning-firestorm": {
    rtp: "96,2%",
    maxWin: "50 000x",
    volatility: "Высокая",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-colt-lightning-inferno": {
    rtp: "96,2%",
    maxWin: "50 000x",
    volatility: "Высокая",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-crabbys-gold-ii": {
    rtp: "96,25%",
    maxWin: "70 000x",
    volatility: "Средняя–высокая",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-crystal-hall": {
    rtp: "96,2%",
    maxWin: "50 000x",
    volatility: "Высокая",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-cursed-moon-power-collection": {
    rtp: "96,2%",
    maxWin: "15 000x",
    volatility: "Высокая",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-dansband-pa-turne": {
    rtp: "96,24%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-easter-eggspedition": {
    rtp: "96,29%",
    maxWin: "10 000x",
    volatility: "Средняя",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
  "playn-go-fulong-88": {
    rtp: "96,2%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: slotsDataSource,
    maxWinSource: slotsDataSource,
    volatilitySource: slotsDataSource,
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout1(slug: string) {
  return details[slug];
}
