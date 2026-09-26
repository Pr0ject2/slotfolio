import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout10 } from "./catalog-verified-details-playngo-passport-closeout-10";

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
  "playn-go-crystal-sun": {
    rtp: "96,60%",
    maxWin: "4 000x",
    volatility: "Средняя",
    rtpSource: "https://slotyeti.com/en/slots/crystal-sun/",
    maxWinSource: "https://slotyeti.com/en/slots/crystal-sun/",
    volatilitySource: "https://slotyeti.com/en/slots/crystal-sun/",
    verifiedAt,
  },
  "playn-go-dawn-of-egypt": {
    rtp: "96,23%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://www.slottomat.com/slot/dawn-of-egypt",
    maxWinSource: "https://www.slottomat.com/slot/dawn-of-egypt",
    volatilitySource: "https://www.slottomat.com/slot/dawn-of-egypt",
    verifiedAt,
  },
  "playn-go-diamond-vortex": {
    rtp: "96,20%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Diamond-Vortex",
    maxWinSource: "https://slotcatalog.com/en/slots/Diamond-Vortex",
    volatilitySource: "https://slotcatalog.com/en/slots/Diamond-Vortex",
    verifiedAt,
  },
  "playn-go-dio-killing-the-dragon": {
    rtp: "96,25% / 94,25% / 91,25% / 87,25% / 84,25%",
    maxWin: "15 000x",
    volatility: "Высокая",
    rtpSource: "https://uk.slotuk.org/free-slots/dio-killing-the-dragon/",
    maxWinSource: "https://uk.slotuk.org/free-slots/dio-killing-the-dragon/",
    volatilitySource: "https://uk.slotuk.org/free-slots/dio-killing-the-dragon/",
    verifiedAt,
  },
  "playn-go-disco-diamonds": {
    rtp: "96,29%",
    maxWin: "10 000x",
    volatility: "Средняя",
    rtpSource: "https://www.slottomat.com/slot/disco-diamonds",
    maxWinSource: "https://www.slottomat.com/slot/disco-diamonds",
    volatilitySource: "https://www.slottomat.com/slot/disco-diamonds",
    verifiedAt,
  },
  "playn-go-doom-of-egypt": {
    field: "5×3 · 10 линий",
    rtp: "96,21%",
    maxWin: "5 000x",
    volatility: "Высокая",
    fieldSource: "https://gg.co.uk/online-casinos/slots/doom-of-egypt/",
    rtpSource: "https://gg.co.uk/online-casinos/slots/doom-of-egypt/",
    maxWinSource: "https://gg.co.uk/online-casinos/slots/doom-of-egypt/",
    volatilitySource: "https://gg.co.uk/online-casinos/slots/doom-of-egypt/",
    verifiedAt,
  },
  "playn-go-dr-toonz": {
    rtp: "96,25%",
    maxWin: "22 000x",
    volatility: "Высокая",
    rtpSource: "https://slotsia.com/en/games/slots/dr-toonz",
    maxWinSource: "https://slotsia.com/en/games/slots/dr-toonz",
    volatilitySource: "https://slotsia.com/en/games/slots/dr-toonz",
    verifiedAt,
  },
  "playn-go-dragonfates-favor": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "30 000x",
    volatility: "Средняя",
    rtpSource: "https://slotuk.org/free-slots/dragonfates-favor/",
    maxWinSource: "https://slotuk.org/free-slots/dragonfates-favor/",
    volatilitySource: "https://slotuk.org/free-slots/dragonfates-favor/",
    verifiedAt,
  },
  "playn-go-eye-of-atum": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "2 000x",
    volatility: "Высокая",
    rtpSource: "https://www.casinowizard.com/slots/eye-of-atum/",
    maxWinSource: "https://www.casinowizard.com/slots/eye-of-atum/",
    volatilitySource: "https://www.casinowizard.com/slots/eye-of-atum/",
    verifiedAt,
  },
  "playn-go-fangs-and-fire": {
    rtp: "96,36%",
    maxWin: "60 000x",
    volatility: "Высокая",
    rtpSource: "https://www.bigwinboard.com/fangs-fire-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/fangs-fire-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/fangs-fire-playn-go-slot-review/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout9(slug: string) {
  return details[slug] ?? getCatalogVerifiedDetailsPlayngoPassportCloseout10(slug);
}
