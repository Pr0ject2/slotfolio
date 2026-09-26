import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout28 } from "./catalog-verified-details-playngo-passport-closeout-28";

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
  "playn-go-multifruit-81": {
    field: "4×3 · 81 линия",
    rtp: "96,55%",
    maxWin: "500x",
    volatility: "Высокая",
    fieldSource: "https://www.slotstemple.com/free-slots/multifruit-81/",
    rtpSource: "https://www.slotstemple.com/free-slots/multifruit-81/",
    maxWinSource: "https://www.slotstemple.com/free-slots/multifruit-81/",
    volatilitySource: "https://www.slotstemple.com/free-slots/multifruit-81/",
    verifiedAt,
  },
  "playn-go-new-year-riches": {
    field: "5×3 · 20 линий",
    rtp: "96,25%",
    maxWin: "5 000x",
    volatility: "Средняя",
    fieldSource: "https://slotcatalog.com/en/slots/New-Year-Riches",
    rtpSource: "https://slotcatalog.com/en/slots/New-Year-Riches",
    maxWinSource: "https://slotcatalog.com/en/slots/New-Year-Riches",
    volatilitySource: "https://slotcatalog.com/en/slots/New-Year-Riches",
    verifiedAt,
  },
  "playn-go-oasis-of-dead": {
    field: "5×3 · 10 линий",
    rtp: "96,58% / 94,51% / 91,51% / 87,56% / 84,55%",
    maxWin: "5 000x",
    volatility: "Высокая",
    fieldSource: "https://slotuk.org/free-slots/oasis-of-dead/",
    rtpSource: "https://slotuk.org/free-slots/oasis-of-dead/",
    maxWinSource: "https://slotuk.org/free-slots/oasis-of-dead/",
    volatilitySource: "https://slotuk.org/free-slots/oasis-of-dead/",
    verifiedAt,
  },
  "playn-go-octopus-treasure": {
    field: "5×3 · 20 линий",
    rtp: "94,25%",
    maxWin: "5 000x",
    volatility: "Средняя",
    fieldSource: "https://slotcatalog.com/en/slots/Octopus-Treasure",
    rtpSource: "https://slotcatalog.com/en/slots/Octopus-Treasure",
    maxWinSource: "https://slotcatalog.com/en/slots/Octopus-Treasure",
    volatilitySource: "https://slotcatalog.com/en/slots/Octopus-Treasure",
    verifiedAt,
  },
  "playn-go-odin-protector-of-realms": {
    field: "37 позиций · кластеры (4-5-6-7-6-5-4)",
    rtp: "96,20%",
    maxWin: "5 000x",
    volatility: "Средняя",
    fieldSource: "https://www.wildz.com/en/play/odin-protector-of-realms/",
    rtpSource: "https://slotcatalog.com/en/slots/Odin-Protector-of-Realms",
    maxWinSource: "https://slotcatalog.com/en/slots/Odin-Protector-of-Realms",
    volatilitySource: "https://slotcatalog.com/en/slots/Odin-Protector-of-Realms",
    verifiedAt,
  },
  "playn-go-pack-and-cash": {
    field: "5×4 · 1 024 способа",
    rtp: "96,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Pack-and-Cash",
    rtpSource: "https://slotcatalog.com/en/slots/Pack-and-Cash",
    maxWinSource: "https://slotcatalog.com/en/slots/Pack-and-Cash",
    volatilitySource: "https://slotcatalog.com/en/slots/Pack-and-Cash",
    verifiedAt,
  },
  "playn-go-pandastic-adventure": {
    field: "5×3 · 20 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "6 500x",
    volatility: "Средняя–высокая",
    fieldSource: "https://gg.co.uk/online-casinos/slots/pandastic-adventure/",
    rtpSource: "https://www.casinowizard.com/slots/pandastic-adventure/",
    maxWinSource: "https://www.casinowizard.com/slots/pandastic-adventure/",
    volatilitySource: "https://www.casinowizard.com/slots/pandastic-adventure/",
    verifiedAt,
  },
  "playn-go-pandoras-box-of-evil": {
    field: "5×3 · 20 линий",
    rtp: "96,15%",
    maxWin: "10 000x",
    volatility: "Средняя",
    fieldSource: "https://www.casino777.nl/en/p/playngo/game/pandoras-box-of-evil",
    rtpSource: "https://www.casino777.nl/en/p/playngo/game/pandoras-box-of-evil",
    maxWinSource: "https://www.casino777.nl/en/p/playngo/game/pandoras-box-of-evil",
    volatilitySource: "https://www.casino777.nl/en/p/playngo/game/pandoras-box-of-evil",
    verifiedAt,
  },
  "playn-go-perfect-gems": {
    field: "6 барабанов · 2 304–21 609 способов",
    rtp: "96,50% / 94,50% / 91,50% / 87,50% / 84,50%",
    maxWin: "5 000x",
    volatility: "Высокая",
    fieldSource: "https://www.aboutslots.com/casino-slots/perfect-gems",
    rtpSource: "https://www.aboutslots.com/casino-slots/perfect-gems",
    maxWinSource: "https://www.aboutslots.com/casino-slots/perfect-gems",
    volatilitySource: "https://www.aboutslots.com/casino-slots/perfect-gems",
    verifiedAt,
  },
  "playn-go-phoenix-reborn": {
    field: "5×6 · 40 линий",
    rtp: "96,50%",
    maxWin: "5 000x",
    volatility: "Очень высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Phoenix-Reborn",
    rtpSource: "https://slotcatalog.com/en/slots/Phoenix-Reborn",
    maxWinSource: "https://slotcatalog.com/en/slots/Phoenix-Reborn",
    volatilitySource: "https://slotcatalog.com/en/slots/Phoenix-Reborn",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout27(slug: string) {
  return details[slug] ?? getCatalogVerifiedDetailsPlayngoPassportCloseout28(slug);
}
