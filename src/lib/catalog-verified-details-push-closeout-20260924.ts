import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type PushCloseoutDetails = Partial<
  Pick<CatalogVerifiedDetails, "field" | "releaseDate" | "volatility">
> & {
  verifiedAt: string;
  fieldSource?: string;
  releaseDateSource?: string;
  volatilitySource?: string;
};

const verifiedAt = "2026-09-24";
const slotCatalog = (slug: string) => `https://slotcatalog.com/en/slots/${slug}`;

const details: Record<string, PushCloseoutDetails> = {
  "push-gaming-10-santas-reindeers": {
    field: "5×3 · до 60 линий при расширении",
    releaseDate: "2025-11-26",
    fieldSource: "https://www.askgamblers.com/casino-games/online-slots/reviews/10-santa-s-reindeers-push-gaming",
    releaseDateSource: "https://www.askgamblers.com/casino-games/online-slots/reviews/10-santa-s-reindeers-push-gaming",
    verifiedAt,
  },
  "push-gaming-3-liberty-eagles": {
    releaseDate: "2026-07-29",
    releaseDateSource: slotCatalog("3-liberty-eagles"),
    verifiedAt,
  },
  "push-gaming-bamboo-ways": {
    field: "6×3 → 6×6 · до 46 656 способов",
    fieldSource: slotCatalog("bamboo-ways"),
    verifiedAt,
  },
  "push-gaming-big-bam-book": {
    field: "5×3 · 10 линий",
    fieldSource: slotCatalog("big-bam-book"),
    verifiedAt,
  },
  "push-gaming-big-bamboo": {
    field: "5×6 · 50 линий",
    releaseDate: "2022-02-18",
    fieldSource: slotCatalog("Big-Bamboo"),
    releaseDateSource: slotCatalog("Big-Bamboo"),
    verifiedAt,
  },
  "push-gaming-big-bamboo-2": {
    field: "5×6 · 50 линий",
    fieldSource: slotCatalog("big-bamboo-2"),
    verifiedAt,
  },
  "push-gaming-big-bite-push-ways": {
    field: "6×4 · до 262 144 способов",
    fieldSource: "https://www.pushgaming.com/blog/q-game-producer-jack-marshall-speaks-chipmonkz-slots.html",
    verifiedAt,
  },
  "push-gaming-diamond-supernova-100": {
    releaseDate: "2025-12-10",
    releaseDateSource: slotCatalog("diamond-supernova-100"),
    verifiedAt,
  },
  "push-gaming-diamond-supernova-20": {
    releaseDate: "2025-12-10",
    releaseDateSource: slotCatalog("diamond-supernova-20"),
    verifiedAt,
  },
  "push-gaming-diamond-supernova-40": {
    releaseDate: "2025-12-10",
    releaseDateSource: slotCatalog("diamond-supernova-40"),
    verifiedAt,
  },
  "push-gaming-diamond-supernova-5": {
    releaseDate: "2025-12-10",
    releaseDateSource: slotCatalog("diamond-supernova-5"),
    verifiedAt,
  },
  "push-gaming-dinopolis": {
    field: "5 барабанов · 3-4-4-4-3",
    fieldSource: "https://www.pushgaming.com/games/dinopolis.html",
    verifiedAt,
  },
  "push-gaming-dj-cat": {
    field: "5 барабанов · динамическая высота · Pay Anywhere",
    fieldSource: slotCatalog("dj-cat"),
    verifiedAt,
  },
  "push-gaming-dragon-hopper": {
    field: "7×7 · Cluster Pays",
    fieldSource: slotCatalog("dragon-hopper"),
    verifiedAt,
  },
  "push-gaming-fang-city": {
    field: "6×5 · Pay Anywhere",
    fieldSource: slotCatalog("fang-city"),
    verifiedAt,
  },
  "push-gaming-fish-n-nudge": {
    field: "5×4 · 20 линий",
    fieldSource: slotCatalog("Fish-n-Nudge"),
    verifiedAt,
  },
  "push-gaming-fish-n-nudge-big-catch": {
    field: "5×4 · 20 линий",
    fieldSource: slotCatalog("fish-n-nudge-big-catch"),
    verifiedAt,
  },
  "push-gaming-happy-bamboo": {
    releaseDate: "2025-10-18",
    releaseDateSource: slotCatalog("happy-bamboo"),
    verifiedAt,
  },
  "push-gaming-henry-the-ape": {
    field: "6×4 · 4096 способов",
    fieldSource: slotCatalog("henry-the-ape"),
    verifiedAt,
  },
  "push-gaming-iron-phoenix": {
    field: "5×3 · 20 линий",
    releaseDate: "2025-06-25",
    fieldSource: slotCatalog("iron-phoenix"),
    releaseDateSource: slotCatalog("iron-phoenix"),
    verifiedAt,
  },
  "push-gaming-jaguar-drop": {
    field: "5×5 · Pay Anywhere",
    fieldSource: slotCatalog("jaguar-drop"),
    verifiedAt,
  },
  "push-gaming-jiggys-pot-o-gold": {
    releaseDate: "2026-07-08",
    releaseDateSource: "https://gamblerid.com/games/jiggys-pot-o-gold",
    verifiedAt,
  },
  "push-gaming-mad-blast": {
    field: "6×5 · Pay Anywhere",
    fieldSource: slotCatalog("mad-blast"),
    verifiedAt,
  },
  "push-gaming-masked-mayhem": {
    field: "5×5 · 50 линий",
    fieldSource: slotCatalog("masked-mayhem"),
    verifiedAt,
  },
  "push-gaming-neon-cash-city": {
    releaseDate: "2026-08-19",
    releaseDateSource: slotCatalog("neon-cash-city"),
    verifiedAt,
  },
  "push-gaming-power-paws": {
    field: "7×7 · Cluster Pays",
    releaseDate: "2025-07-23",
    fieldSource: slotCatalog("power-paws"),
    releaseDateSource: slotCatalog("power-paws"),
    verifiedAt,
  },
  "push-gaming-razor-shark-jackpots": {
    field: "5×4 · 20 линий",
    fieldSource: slotCatalog("razor-shark-jackpots"),
    verifiedAt,
  },
  "push-gaming-razor-ways": {
    releaseDate: "2024-08-07",
    releaseDateSource: slotCatalog("razor-ways"),
    verifiedAt,
  },
  "push-gaming-red-hot-multipliers": {
    field: "3×3 · 5 линий",
    fieldSource: slotCatalog("red-hot-multipliers"),
    verifiedAt,
  },
  "push-gaming-regal-knights": {
    field: "5×6 · 50 линий",
    fieldSource: slotCatalog("regal-knights"),
    verifiedAt,
  },
  "push-gaming-samurais-katana": {
    volatility: "Высокая",
    volatilitySource: slotCatalog("Samurai-s-Katana"),
    verifiedAt,
  },
  "push-gaming-santa-hopper": {
    field: "7×7 · Cluster Pays",
    releaseDate: "2025-11-19",
    fieldSource: slotCatalog("santa-hopper"),
    releaseDateSource: slotCatalog("santa-hopper"),
    verifiedAt,
  },
  "push-gaming-santas-vault": {
    field: "3×3 · 5 линий",
    releaseDate: "2025-11-12",
    fieldSource: "https://www.askgamblers.com/casino-games/online-slots/reviews/santa-s-vault-push-gaming",
    releaseDateSource: "https://www.askgamblers.com/casino-games/online-slots/reviews/santa-s-vault-push-gaming",
    verifiedAt,
  },
  "push-gaming-sea-of-spirits": {
    field: "6×4 · 4096 способов",
    releaseDate: "2025-11-19",
    fieldSource: slotCatalog("sea-of-spirits"),
    releaseDateSource: slotCatalog("sea-of-spirits"),
    verifiedAt,
  },
  "push-gaming-tarot-treasures": {
    field: "6×4 · Push Ways",
    fieldSource: slotCatalog("tarot-treasures"),
    verifiedAt,
  },
  "push-gaming-the-great-banker": {
    field: "5×3 · 20 линий",
    releaseDate: "2026-01-28",
    fieldSource: slotCatalog("the-great-banker"),
    releaseDateSource: slotCatalog("the-great-banker"),
    verifiedAt,
  },
  "push-gaming-tiki-tumble": {
    releaseDate: "2018-02-27",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-announce-exciting-new-launch.html",
    verifiedAt,
  },
  "push-gaming-tricky-treats": {
    field: "6×9 · Cluster Pays",
    releaseDate: "2025-10-22",
    fieldSource: slotCatalog("tricky-treats"),
    releaseDateSource: slotCatalog("tricky-treats"),
    verifiedAt,
  },
  "push-gaming-triple-rampage": {
    field: "6×4 · 4096 способов",
    fieldSource: slotCatalog("triple-rampage"),
    verifiedAt,
  },
  "push-gaming-viva-lock-vegas": {
    field: "5×3 · 10 линий",
    releaseDate: "2026-07-22",
    fieldSource: slotCatalog("viva-lock-vegas"),
    releaseDateSource: slotCatalog("viva-lock-vegas"),
    verifiedAt,
  },
  "push-gaming-wild-swarm-2": {
    field: "5×4 · 20 линий",
    fieldSource: slotCatalog("Wild-Swarm-2"),
    verifiedAt,
  },
  "push-gaming-wild-swarm-3-chocolate-eggs": {
    field: "5×4 · 20 линий",
    fieldSource: slotCatalog("wild-swarm-3-chocolate-eggs"),
    verifiedAt,
  },
  "push-gaming-wild-swarm-triple-hive": {
    field: "5×4 · 20 линий",
    fieldSource: slotCatalog("wild-swarm-triple-hive"),
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPushCloseout20260924(slug: string) {
  return details[slug];
}
