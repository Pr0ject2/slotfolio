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
  "playn-go-cash-of-command": {
    field: "9×9 · Cluster Pays",
    rtp: "96,28% / 94,27% / 91,27% / 87,24% / 84,23%",
    maxWin: "5 336x",
    volatility: "Высокая",
    fieldSource: "https://uk.slotuk.org/free-slots/cash-of-command/",
    rtpSource: "https://uk.slotuk.org/free-slots/cash-of-command/",
    maxWinSource: "https://uk.slotuk.org/free-slots/cash-of-command/",
    volatilitySource: "https://uk.slotuk.org/free-slots/cash-of-command/",
    verifiedAt,
  },
  "playn-go-cash-pump": {
    rtp: "96,86% / 94,75% / 91,64% / 87,72% / 84,66%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://respinix.com/demo/cash-pump/",
    maxWinSource: "https://respinix.com/demo/cash-pump/",
    volatilitySource: "https://respinix.com/demo/cash-pump/",
    verifiedAt,
  },
  "playn-go-cash-vandal": {
    rtp: "96,47% / 94,42% / 91,41% / 87,43% / 84,41%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://gg.co.uk/online-casinos/slots/cash-vandal/",
    maxWinSource: "https://gg.co.uk/online-casinos/slots/cash-vandal/",
    volatilitySource: "https://gg.co.uk/online-casinos/slots/cash-vandal/",
    verifiedAt,
  },
  "playn-go-cash-a-cabana": {
    field: "5×3 · 20 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    fieldSource: "https://www.slotuk.org/free-slots/cash-a-cabana/",
    rtpSource: "https://www.slotuk.org/free-slots/cash-a-cabana/",
    maxWinSource: "https://www.slotuk.org/free-slots/cash-a-cabana/",
    volatilitySource: "https://www.slotuk.org/free-slots/cash-a-cabana/",
    verifiedAt,
  },
  "playn-go-cashin-joker": {
    rtp: "96,00% / 94,21% / 91,21% / 87,21% / 84,21%",
    maxWin: "10 888x",
    volatility: "Высокая",
    rtpSource: "https://www.slotuk.org/free-slots/cashin-joker/",
    maxWinSource: "https://www.slotuk.org/free-slots/cashin-joker/",
    volatilitySource: "https://www.slotuk.org/free-slots/cashin-joker/",
    verifiedAt,
  },
  "playn-go-cat-wilde-and-the-doom-of-dead": {
    rtp: "96,29%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://www.slotstemple.com/free-slots/cat-wilde-and-the-doom-of-dead/",
    maxWinSource: "https://www.slotstemple.com/free-slots/cat-wilde-and-the-doom-of-dead/",
    volatilitySource: "https://www.slotstemple.com/free-slots/cat-wilde-and-the-doom-of-dead/",
    verifiedAt,
  },
  "playn-go-cat-wilde-and-the-incan-quest": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://www.casinowizard.com/slots/cat-wilde-and-the-incan-quest/",
    maxWinSource: "https://www.casinowizard.com/slots/cat-wilde-and-the-incan-quest/",
    volatilitySource: "https://www.casinowizard.com/slots/cat-wilde-and-the-incan-quest/",
    verifiedAt,
  },
  "playn-go-cat-wilde-and-the-lost-chapter": {
    field: "5×3 · 10 линий",
    rtp: "96,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    fieldSource: "https://www.gmblrs.com/game-provider/play-n-go/cat-wilde-and-the-lost-chapter",
    rtpSource: "https://www.gmblrs.com/game-provider/play-n-go/cat-wilde-and-the-lost-chapter",
    maxWinSource: "https://www.gmblrs.com/game-provider/play-n-go/cat-wilde-and-the-lost-chapter",
    volatilitySource: "https://www.gmblrs.com/game-provider/play-n-go/cat-wilde-and-the-lost-chapter",
    verifiedAt,
  },
  "playn-go-cat-wilde-and-the-pyramids-of-dead": {
    field: "5×3 · 10 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Средняя",
    fieldSource: "https://www.aboutslots.com/casino-slots/cat-wilde-and-the-pyramids-of-dead",
    rtpSource: "https://fruityslots.com/slots/reviews/cat-wilde-and-the-pyramids-of-dead/",
    maxWinSource: "https://fruityslots.com/slots/reviews/cat-wilde-and-the-pyramids-of-dead/",
    volatilitySource: "https://fruityslots.com/slots/reviews/cat-wilde-and-the-pyramids-of-dead/",
    verifiedAt,
  },
  "playn-go-cat-wilde-in-the-eclipse-of-the-sun-god": {
    rtp: "96,22%",
    maxWin: "5 500x",
    volatility: "Средняя",
    rtpSource: "https://stake.com/casino/games/playngo-cat-wilde-in-the-eclipse-of-the-sun-god",
    maxWinSource: "https://stake.com/casino/games/playngo-cat-wilde-in-the-eclipse-of-the-sun-god",
    volatilitySource: "https://stake.com/casino/games/playngo-cat-wilde-in-the-eclipse-of-the-sun-god",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout6(slug: string) {
  return details[slug];
}
