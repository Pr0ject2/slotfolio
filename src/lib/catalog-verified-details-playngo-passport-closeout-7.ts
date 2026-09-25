import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type PlayngoPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "volatility">
> & {
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  volatilitySource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-25";

const details: Record<string, PlayngoPassportCloseout> = {
  "playn-go-nsync-pop": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://clashofslots.com/slots/playn-go/nsync-pop/",
    maxWinSource: "https://clashofslots.com/slots/playn-go/nsync-pop/",
    volatilitySource: "https://clashofslots.com/slots/playn-go/nsync-pop/",
    verifiedAt,
  },
  "playn-go-3-blades-and-blessings": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "4 000x",
    volatility: "Средняя",
    rtpSource: "https://bonkku.com/demos/3-blades-blessings/",
    maxWinSource: "https://bonkku.com/demos/3-blades-blessings/",
    volatilitySource: "https://bonkku.com/demos/3-blades-blessings/",
    verifiedAt,
  },
  "playn-go-5x-magic": {
    field: "3×3 · 5 линий",
    rtp: "95,42%",
    maxWin: "26 250x",
    volatility: "Высокая",
    fieldSource: "https://www.gentingcasino.com/casino/slots/5x-magic/",
    rtpSource: "https://www.slotstemple.com/free-slots/5xmagic/",
    maxWinSource: "https://www.slotstemple.com/free-slots/5xmagic/",
    volatilitySource: "https://www.slotstemple.com/free-slots/5xmagic/",
    verifiedAt,
  },
  "playn-go-ace-of-spades": {
    rtp: "95,94%",
    volatility: "Средняя",
    rtpSource: "https://www.slotstemple.com/free-slots/ace-of-spades/",
    volatilitySource: "https://www.slotstemple.com/free-slots/ace-of-spades/",
    verifiedAt,
  },
  "playn-go-agent-destiny": {
    rtp: "96,26% / 94,26% / 91,25% / 87,25% / 84,25%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://www.bigwinboard.com/agent-destiny-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/agent-destiny-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/agent-destiny-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-agent-of-hearts": {
    field: "7-7-5-5-5-7-7 · Cluster Pays",
    rtp: "96,25% / 94,28% / 91,28% / 87,26% / 84,26%",
    maxWin: "5 262x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Agent-of-Hearts",
    rtpSource: "https://www.bigwinboard.com/agent-of-hearts-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/agent-of-hearts-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/agent-of-hearts-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-cats-and-cash": {
    field: "5×3 · 15 линий",
    rtp: "96,07% / 94,12%",
    maxWin: "5 000x",
    volatility: "Средняя",
    fieldSource: "https://slotcatalog.com/en/slots/Cats-and-Cash",
    rtpSource: "https://casino.toto.nl/casino/games/cats-and-cash",
    maxWinSource: "https://www.slotstemple.com/free-slots/cats-and-cash/",
    volatilitySource: "https://slotcatalog.com/en/slots/Cats-and-Cash",
    verifiedAt,
  },
  "playn-go-champions-of-mithrune": {
    field: "5×5 · 20 линий",
    rtp: "96,25% / 94,25% / 91,24% / 87,22% / 84,21%",
    maxWin: "7 500x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Champions-of-Mithrune",
    rtpSource: "https://uk.slotuk.org/free-slots/champions-of-mithrune/",
    maxWinSource: "https://uk.slotuk.org/free-slots/champions-of-mithrune/",
    volatilitySource: "https://uk.slotuk.org/free-slots/champions-of-mithrune/",
    verifiedAt,
  },
  "playn-go-charlie-chance": {
    rtp: "96,25% / 94,27% / 91,27% / 87,26% / 84,26%",
    maxWin: "20 000x",
    volatility: "Высокая",
    rtpSource: "https://www.bigwinboard.com/charlie-chance-xreelz-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/charlie-chance-xreelz-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/charlie-chance-xreelz-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-charlie-chance-and-the-curse-of-cleopatra": {
    rtp: "96,25% / 94,27% / 91,26% / 87,24% / 84,23%",
    maxWin: "5 500x",
    volatility: "Средняя",
    rtpSource: "https://allslotsites.com/slot-games/charlie-chance-and-the-curse-of-cleopatra/",
    maxWinSource: "https://www.bigwinboard.com/curse-cleopatra-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/curse-cleopatra-playn-go-slot-review/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout7(slug: string) {
  return details[slug];
}
