import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type PushCloseoutDetails = Partial<
  Pick<CatalogVerifiedDetails, "field" | "releaseDate" | "volatility">
> & {
  fieldSource?: string;
  releaseDateSource?: string;
  volatilitySource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-25";

const details: Record<string, PushCloseoutDetails> = {
  "push-gaming-10-santas-reindeers": {
    field: "5×3 · 60 линий",
    releaseDate: "2025-11-26",
    fieldSource: "https://www.aboutslots.com/casino-slots/10-santas-reindeers",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/10-santas-reindeers",
    verifiedAt,
  },
  "push-gaming-3-liberty-eagles": {
    releaseDate: "2026-08-25",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/3-liberty-eagles",
    verifiedAt,
  },
  "push-gaming-bamboo-ways": {
    field: "6×3–6 · 729–46 656 способов",
    fieldSource: "https://www.pushgaming.com/games/bamboo-ways.html",
    verifiedAt,
  },
  "push-gaming-big-bam-book": {
    field: "5×3 · 10 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/big-bam-book",
    verifiedAt,
  },
  "push-gaming-big-bamboo": {
    field: "5×6 · 50 линий",
    releaseDate: "2022-03-03",
    fieldSource: "https://www.aboutslots.com/casino-slots/big-bamboo",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/big-bamboo",
    verifiedAt,
  },
  "push-gaming-big-bamboo-2": {
    field: "5×6 · 50 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/big-bamboo-2",
    verifiedAt,
  },
  "push-gaming-big-bite-push-ways": {
    field: "6×4–8 · до 262 144 способов",
    fieldSource: "https://www.aboutslots.com/casino-slots/big-bite-push-ways",
    verifiedAt,
  },
  "push-gaming-diamond-supernova-100": {
    releaseDate: "2025-12-10",
    releaseDateSource: "https://slotcatalog.com/en/slots/diamond-supernova-100",
    verifiedAt,
  },
  "push-gaming-diamond-supernova-20": {
    releaseDate: "2025-12-10",
    releaseDateSource: "https://slotcatalog.com/en/slots/diamond-supernova-20",
    verifiedAt,
  },
  "push-gaming-diamond-supernova-40": {
    releaseDate: "2025-12-10",
    releaseDateSource: "https://www.askgamblers.com/casino-games/online-slots/reviews/diamond-supernova-40-push-gaming",
    verifiedAt,
  },
  "push-gaming-diamond-supernova-5": {
    releaseDate: "2025-12-10",
    releaseDateSource: "https://slotcatalog.com/en/slots/diamond-supernova-5",
    verifiedAt,
  },
  "push-gaming-dinopolis": {
    field: "5 барабанов · 3-4-4-4-3",
    fieldSource: "https://www.pushgaming.com/games/dinopolis.html",
    verifiedAt,
  },
  "push-gaming-dj-cat": {
    field: "4×1–5 · 5 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/dj-cat",
    verifiedAt,
  },
  "push-gaming-dragon-hopper": {
    field: "7×7 · кластеры",
    fieldSource: "https://www.aboutslots.com/casino-slots/dragon-hopper",
    verifiedAt,
  },
  "push-gaming-fang-city": {
    field: "6×5 · Scatter Pays",
    fieldSource: "https://www.aboutslots.com/casino-slots/fang-city",
    verifiedAt,
  },
  "push-gaming-fish-n-nudge": {
    field: "5×4 · 20 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/fish-n-nudge",
    verifiedAt,
  },
  "push-gaming-fish-n-nudge-big-catch": {
    field: "5×4 · 20 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/fish-n-nudge-big-catch",
    verifiedAt,
  },
  "push-gaming-happy-bamboo": {
    releaseDate: "2025-11-05",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/happy-bamboo",
    verifiedAt,
  },
  "push-gaming-henry-the-ape": {
    field: "6×4 · 4096 способов",
    fieldSource: "https://www.aboutslots.com/casino-slots/henry-the-ape",
    verifiedAt,
  },
  "push-gaming-iron-phoenix": {
    field: "5×3 · 20 линий",
    releaseDate: "2025-06-25",
    fieldSource: "https://www.aboutslots.com/casino-slots/iron-phoenix",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/iron-phoenix",
    verifiedAt,
  },
  "push-gaming-jaguar-drop": {
    field: "5×5 · кластеры",
    fieldSource: "https://www.aboutslots.com/casino-slots/jaguar-drop",
    verifiedAt,
  },
  "push-gaming-jiggys-pot-o-gold": {
    releaseDate: "2026-07-08",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/jiggys-pot-o-gold",
    verifiedAt,
  },
  "push-gaming-mad-blast": {
    field: "6×5 · Scatter Pays",
    fieldSource: "https://www.aboutslots.com/casino-slots/mad-blast",
    verifiedAt,
  },
  "push-gaming-masked-mayhem": {
    field: "5×5 · 50 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/masked-mayhem",
    verifiedAt,
  },
  "push-gaming-neon-cash-city": {
    releaseDate: "2026-08-19",
    releaseDateSource: "https://www.aboutslots.com/game-providers/push-gaming",
    verifiedAt,
  },
  "push-gaming-power-paws": {
    field: "7×7 · кластеры",
    releaseDate: "2025-07-23",
    fieldSource: "https://www.aboutslots.com/casino-slots/power-paws",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/power-paws",
    verifiedAt,
  },
  "push-gaming-razor-shark-jackpots": {
    field: "5×4 · 20 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/razor-shark-jackpots",
    verifiedAt,
  },
  "push-gaming-razor-ways": {
    releaseDate: "2024-08-07",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gamings-razor-ways-dives-deep-sharper-wins.html",
    verifiedAt,
  },
  "push-gaming-red-hot-multipliers": {
    field: "3×3 · 5 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/red-hot-multipliers",
    verifiedAt,
  },
  "push-gaming-regal-knights": {
    field: "5×6 · 50 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/regal-knights",
    verifiedAt,
  },
  "push-gaming-samurais-katana": {
    volatility: "Высокая",
    volatilitySource: "https://www.aboutslots.com/casino-slots/samurais-katana",
    verifiedAt,
  },
  "push-gaming-santa-hopper": {
    field: "7×7 · кластеры",
    releaseDate: "2025-11-19",
    fieldSource: "https://www.aboutslots.com/casino-slots/santa-hopper",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/santa-hopper",
    verifiedAt,
  },
  "push-gaming-santas-vault": {
    field: "3×3 · 5 линий",
    releaseDate: "2025-11-12",
    fieldSource: "https://www.aboutslots.com/casino-slots/santas-vault",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/santas-vault",
    verifiedAt,
  },
  "push-gaming-sea-of-spirits": {
    field: "6×4 · 4096 способов",
    releaseDate: "2025-11-19",
    fieldSource: "https://www.aboutslots.com/casino-slots/sea-of-spirits",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/sea-of-spirits",
    verifiedAt,
  },
  "push-gaming-tarot-treasures": {
    field: "6×4 · 4096–262 144 способов",
    fieldSource: "https://www.aboutslots.com/casino-slots/tarot-treasures",
    verifiedAt,
  },
  "push-gaming-the-great-banker": {
    field: "5×3 · 20 линий",
    releaseDate: "2026-01-28",
    fieldSource: "https://www.aboutslots.com/casino-slots/the-great-banker",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/the-great-banker",
    verifiedAt,
  },
  "push-gaming-tiki-tumble": {
    releaseDate: "2018-02-27",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-announce-exciting-new-launch.html",
    verifiedAt,
  },
  "push-gaming-tricky-treats": {
    field: "6×9 · кластеры",
    releaseDate: "2025-10-22",
    fieldSource: "https://www.aboutslots.com/casino-slots/tricky-treats",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/tricky-treats",
    verifiedAt,
  },
  "push-gaming-triple-rampage": {
    field: "6×4–6 · 4096–46 656 способов",
    fieldSource: "https://www.aboutslots.com/casino-slots/triple-rampage",
    verifiedAt,
  },
  "push-gaming-viva-lock-vegas": {
    field: "5×3 · 10 линий",
    releaseDate: "2026-07-22",
    fieldSource: "https://www.aboutslots.com/casino-slots/viva-lock-vegas",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/viva-lock-vegas",
    verifiedAt,
  },
  "push-gaming-wild-swarm-2": {
    field: "5×4 · 20 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/wild-swarm-2",
    verifiedAt,
  },
  "push-gaming-wild-swarm-3-chocolate-eggs": {
    field: "5×4 · 20 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/wild-swarm-3-chocolate-eggs",
    verifiedAt,
  },
  "push-gaming-wild-swarm-triple-hive": {
    field: "5×4 · 20 линий",
    fieldSource: "https://www.aboutslots.com/casino-slots/wild-swarm-triple-hive",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPushCloseout(slug: string) {
  return details[slug];
}
