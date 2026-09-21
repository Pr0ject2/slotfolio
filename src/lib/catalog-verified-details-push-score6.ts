import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type PushScore6Details = Pick<CatalogVerifiedDetails, "source" | "verifiedAt"> &
  Partial<Pick<CatalogVerifiedDetails, "field" | "releaseDate">> & {
    releaseDateSource?: string;
  };

const verifiedAt = "2026-09-20";

const details: Record<string, PushScore6Details> = {
  "push-gaming-10-cash-bisons": {
    releaseDate: "2025-08",
    releaseDateSource: "https://www.pushgaming.com/blog/q-head-studio-ihor-lozinskiy-speaks-demo-slot.html",
    source: "https://www.pushgaming.com/games/10-cash-bisons.html",
    verifiedAt,
  },
  "push-gaming-10-flaming-bisons": {
    releaseDate: "2024-12-11",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-ignites-reels-10-flaming-bisons.html",
    source: "https://www.pushgaming.com/games/10-flaming-bisons.html",
    verifiedAt,
  },
  "push-gaming-bison-battle": {
    field: "5 барабанов",
    source: "https://www.pushgaming.com/games/bison-battle.html",
    verifiedAt,
  },
  "push-gaming-blaze-of-ra": {
    releaseDate: "2018-05-22",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-light-sky-new-title-blaze-ra.html",
    source: "https://www.pushgaming.com/games/blaze-ra.html",
    verifiedAt,
  },
  "push-gaming-dinopolis": {
    releaseDate: "2021-04-22",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-dinopolis.html",
    source: "https://www.pushgaming.com/games/dinopolis.html",
    verifiedAt,
  },
  "push-gaming-fire-hopper": {
    releaseDate: "2021-12-07",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-sets-reels-ablaze-fire-hopper.html",
    source: "https://www.pushgaming.com/games/fire-hopper.html",
    verifiedAt,
  },
  "push-gaming-giga-jar": {
    releaseDate: "2023-03-28",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gamings-giga-jar-back-solo-slot-outing.html",
    source: "https://www.pushgaming.com/games/giga-jar.html",
    verifiedAt,
  },
  "push-gaming-jaguar-drop": {
    releaseDate: "2024-11-28",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-embarks-feature-frenzy-jaguar-drop.html",
    source: "https://www.pushgaming.com/games/jaguar-drop.html",
    verifiedAt,
  },
  "push-gaming-mystery-mission-to-the-moon": {
    releaseDate: "2022-11-09",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-blast-space-themed-sequel-mystery-mission-moon.html",
    source: "https://www.pushgaming.com/games/mystery-mission-moon.html",
    verifiedAt,
  },
  "push-gaming-mystery-of-the-nile": {
    releaseDate: "2025-01-08",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-reveals-egyptian-secrets-mystery-nile.html",
    source: "https://www.pushgaming.com/games/mystery-nile.html",
    verifiedAt,
  },
  "push-gaming-olympus-unleashed": {
    field: "5 рядов",
    source: "https://www.pushgaming.com/games/olympus-unleashed.html",
    verifiedAt,
  },
  "push-gaming-retro-sweets": {
    releaseDate: "2024-05-02",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-releases-sugary-sequel-retro-sweets.html",
    source: "https://www.pushgaming.com/games/retro-sweets.html",
    verifiedAt,
  },
  "push-gaming-the-grand-show": {
    field: "Бонус: 5×8",
    source: "https://www.pushgaming.com/games/grand-show.html",
    verifiedAt,
  },
  "push-gaming-triple-rampage": {
    releaseDate: "2025-08-20",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-unleashes-epic-three-pot-kaiju-action-triple-rampage.html",
    source: "https://www.pushgaming.com/games/triple-rampage.html",
    verifiedAt,
  },
  "push-gaming-wild-swarm": {
    releaseDate: "2018-06-19",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-set-create-further-buzz-wild-swarm-release.html",
    source: "https://www.pushgaming.com/games/wild-swarm.html",
    verifiedAt,
  },
  "push-gaming-wild-swarm-2": {
    releaseDate: "2024-02-29",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-creates-buzz-sequel-wild-swarm-2.html",
    source: "https://www.pushgaming.com/games/wild-swarm-2.html",
    verifiedAt,
  },
  "push-gaming-wild-swarm-3-chocolate-eggs": {
    releaseDate: "2026-03-11",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-brings-sting-spring-release-wild-swarm-3-chocolate-eggs.html",
    source: "https://www.pushgaming.com/games/wild-swarm-3-chocolate-eggs.html",
    verifiedAt,
  },
  "push-gaming-wild-swarm-triple-hive": {
    releaseDate: "2025-07-30",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-brings-buzz-back-wild-swarm-triple-hive.html",
    source: "https://www.pushgaming.com/games/wild-swarm-triple-hive.html",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPushScore6(slug: string) {
  return details[slug];
}
