import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout24 } from "./catalog-verified-details-playngo-passport-closeout-24";

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
  "playn-go-legion-gold-unleashed": {
    rtp: "96,25%",
    volatility: "Средняя",
    rtpSource: "https://www.slotstemple.com/free-slots/legion-gold-unleashed/",
    volatilitySource: "https://www.slotstemple.com/free-slots/legion-gold-unleashed/",
    verifiedAt,
  },
  "playn-go-legion-gold-victory": {
    field: "5×3",
    rtp: "96,30%",
    volatility: "Высокая",
    fieldSource: "https://slotdatahub.com/slots/legion-gold-victory/",
    rtpSource: "https://slotdatahub.com/slots/legion-gold-victory/",
    volatilitySource: "https://slotdatahub.com/slots/legion-gold-victory/",
    verifiedAt,
  },
  "playn-go-leprechaun-goes-egypt": {
    rtp: "96,75%",
    maxWin: "500x",
    volatility: "Средняя",
    rtpSource: "https://slotdatahub.com/slots/leprechaun-goes-egypt/",
    maxWinSource: "https://slotdatahub.com/slots/leprechaun-goes-egypt/",
    volatilitySource: "https://slotdatahub.com/slots/leprechaun-goes-egypt/",
    verifiedAt,
  },
  "playn-go-leprechaun-goes-wild": {
    rtp: "96,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://uk.slotuk.org/free-slots/leprechaun-goes-wild/",
    maxWinSource: "https://uk.slotuk.org/free-slots/leprechaun-goes-wild/",
    volatilitySource: "https://uk.slotuk.org/free-slots/leprechaun-goes-wild/",
    verifiedAt,
  },
  "playn-go-leprechauns-diamond-dig": {
    rtp: "96,20%",
    maxWin: "3 000x",
    volatility: "Средняя",
    rtpSource: "https://bonkku.com/demos/leprechauns-diamond-dig/",
    maxWinSource: "https://bonkku.com/demos/leprechauns-diamond-dig/",
    volatilitySource: "https://bonkku.com/demos/leprechauns-diamond-dig/",
    verifiedAt,
  },
  "playn-go-leprechauns-vault": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    volatility: "Высокая",
    rtpSource: "https://www.casinowizard.com/slots/leprechauns-vault/",
    volatilitySource: "https://www.casinowizard.com/slots/leprechauns-vault/",
    verifiedAt,
  },
  "playn-go-lion-saga-odyssey": {
    rtp: "96,58%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://casinogamesonnet.com/?game=lion-saga-odyssey&id=7196",
    maxWinSource: "https://casinogamesonnet.com/?game=lion-saga-odyssey&id=7196",
    volatilitySource: "https://casinogamesonnet.com/?game=lion-saga-odyssey&id=7196",
    verifiedAt,
  },
  "playn-go-loot-and-labyrinths": {
    rtp: "96,39%",
    maxWin: "20 000x",
    volatility: "Высокая",
    rtpSource: "https://slotyeti.com/en/slots/loot-labyrinths/",
    maxWinSource: "https://slotyeti.com/en/slots/loot-labyrinths/",
    volatilitySource: "https://slotyeti.com/en/slots/loot-labyrinths/",
    verifiedAt,
  },
  "playn-go-lord-merlin-and-the-lady-of-the-lake": {
    rtp: "96,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Lord-Merlin-and-the-Lady-of-the-Lake",
    maxWinSource: "https://slotcatalog.com/en/slots/Lord-Merlin-and-the-Lady-of-the-Lake",
    volatilitySource: "https://slotcatalog.com/en/slots/Lord-Merlin-and-the-Lady-of-the-Lake",
    verifiedAt,
  },
  "playn-go-lordi-reel-monsters": {
    rtp: "96,20%",
    volatility: "Средняя",
    rtpSource: "https://www.gmblrs.com/game-provider/play-n-go/lordi-reel-monsters",
    volatilitySource: "https://www.gmblrs.com/game-provider/play-n-go/lordi-reel-monsters",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout23(slug: string) {
  return details[slug] ?? getCatalogVerifiedDetailsPlayngoPassportCloseout24(slug);
}
