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

const verifiedAt = "2026-09-26";

const details: Record<string, PlayngoPassportCloseout> = {
  "playn-go-easter-eggs": {
    rtp: "96,75%",
    maxWin: "500x",
    volatility: "Средняя",
    rtpSource: "https://www.casinoslotsguru.com/play-slot/easter-eggs/1020/",
    maxWinSource: "https://www.casinoslotsguru.com/play-slot/easter-eggs/1020/",
    volatilitySource: "https://www.stakers.com/en/casino/easter_eggs/",
    verifiedAt,
  },
  "playn-go-fat-frankies": {
    field: "5×3 · 243 способа",
    rtp: "96,20%",
    maxWin: "6 000x",
    volatility: "Средняя",
    fieldSource: "https://slotcatalog.com/en/slots/Fat-Frankies",
    rtpSource: "https://www.online-slot.co.uk/online-slots/reviews/fat-frankies/",
    maxWinSource: "https://www.online-slot.co.uk/online-slots/reviews/fat-frankies/",
    volatilitySource: "https://www.online-slot.co.uk/online-slots/reviews/fat-frankies/",
    verifiedAt,
  },
  "playn-go-fate-of-dead-blitzways": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "20 000x",
    volatility: "Высокая",
    rtpSource: "https://www.casinowizard.com/slots/fate-of-dead-blitzways/",
    maxWinSource: "https://www.casinowizard.com/slots/fate-of-dead-blitzways/",
    volatilitySource: "https://www.casinowizard.com/slots/fate-of-dead-blitzways/",
    verifiedAt,
  },
  "playn-go-fates-fortune": {
    field: "5×3 · 10 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "5 000x",
    volatility: "Средняя",
    fieldSource: "https://www.aboutslots.com/casino-slots/fates-fortune",
    rtpSource: "https://www.aboutslots.com/casino-slots/fates-fortune",
    maxWinSource: "https://www.aboutslots.com/casino-slots/fates-fortune",
    volatilitySource: "https://www.aboutslots.com/casino-slots/fates-fortune",
    verifiedAt,
  },
  "playn-go-feline-fury": {
    rtp: "96,20%",
    maxWin: "5 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Feline-Fury",
    maxWinSource: "https://slotcatalog.com/en/slots/Feline-Fury",
    volatilitySource: "https://slotcatalog.com/en/slots/Feline-Fury",
    verifiedAt,
  },
  "playn-go-fire-joker-freeze": {
    rtp: "96,18%",
    maxWin: "1 000x",
    volatility: "Средняя",
    rtpSource: "https://time2play.com/casinos/games/slots/fire-joker-freeze/",
    maxWinSource: "https://time2play.com/casinos/games/slots/fire-joker-freeze/",
    volatilitySource: "https://time2play.com/casinos/games/slots/fire-joker-freeze/",
    verifiedAt,
  },
  "playn-go-fire-toad": {
    rtp: "96,20%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Fire-Toad",
    maxWinSource: "https://slotcatalog.com/en/slots/Fire-Toad",
    volatilitySource: "https://slotcatalog.com/en/slots/Fire-Toad",
    verifiedAt,
  },
  "playn-go-fire-toad-2": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "5 300x",
    volatility: "Высокая",
    rtpSource: "https://www.slotuk.org/free-slots/fire-toad-2/",
    maxWinSource: "https://www.slotuk.org/free-slots/fire-toad-2/",
    volatilitySource: "https://www.slotuk.org/free-slots/fire-toad-2/",
    verifiedAt,
  },
  "playn-go-firefly-frenzy": {
    rtp: "96,59%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://uk.slotuk.org/free-slots/firefly-frenzy/",
    maxWinSource: "https://uk.slotuk.org/free-slots/firefly-frenzy/",
    volatilitySource: "https://uk.slotuk.org/free-slots/firefly-frenzy/",
    verifiedAt,
  },
  "playn-go-forge-of-gems": {
    rtp: "96,20%",
    maxWin: "20 000x",
    volatility: "Высокая",
    rtpSource: "https://uk.slotuk.org/free-slots/forge-of-gems/",
    maxWinSource: "https://uk.slotuk.org/free-slots/forge-of-gems/",
    volatilitySource: "https://uk.slotuk.org/free-slots/forge-of-gems/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout11(slug: string) {
  return details[slug];
}
