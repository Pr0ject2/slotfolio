import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const gameTypeSources = {
  "push-gaming-10-flaming-bisons": "https://www.pushgaming.com/blog/push-gaming-x-machine-slot-online-10-flaming-bisons-q.html",
  "push-gaming-10-swords": "https://www.pushgaming.com/blog/push-gaming-wields-instant-cash-prizes-10-swords.html",
  "push-gaming-boss-bear": "https://www.pushgaming.com/blog/q-game-producer-craig-turner-speaks-online-slot.html",
  "push-gaming-candy-blast": "https://www.pushgaming.com/blog/push-gaming-multiplies-sweetness-candy-blast.html",
  "push-gaming-cats-of-olympuss": "https://www.pushgaming.com/blog/push-gaming-unleashes-divine-felines-cats-olympuss.html",
  "push-gaming-deadly-5": "https://www.pushgaming.com/blog/push-gaming-heads-old-west-deadly-5.html",
  "push-gaming-dj-fox": "https://www.pushgaming.com/blog/q-game-producer-craig-turner-speaks-online-slot.html",
  "push-gaming-fire-hopper": "https://www.pushgaming.com/blog/push-gaming-sets-reels-ablaze-fire-hopper.html",
  "push-gaming-generous-jack": "https://www.pushgaming.com/blog/push-gaming-introduces-another-highly-engaging-mechanic-generous-jack.html",
  "push-gaming-giga-jar": "https://www.pushgaming.com/blog/push-gamings-giga-jar-back-solo-slot-outing.html",
  "push-gaming-goat-getter": "https://www.pushgaming.com/blog/push-gaming-scales-slot-summit-quest-elusive-mountain-goats-its-latest-pay-anywhere-title-goat-getter.html",
  "push-gaming-hearts-highway": "https://www.pushgaming.com/blog/push-gaming-reimagines-classic-slot-machines-hearts-highway.html",
  "push-gaming-mad-cars": "https://www.pushgaming.com/blog/q-game-producer-ihor-lozinskiy-speaks-fruity-slots.html",
  "push-gaming-mystery-mission-to-the-moon": "https://www.pushgaming.com/blog/push-gaming-blast-space-themed-sequel-mystery-mission-moon.html",
  "push-gaming-power-vault": "https://www.pushgaming.com/blog/push-gaming-cracks-code-power-vault.html",
  "push-gaming-rat-king": "https://www.pushgaming.com/blog/push-gaming-blends-retro-themes-innovative-gameplay-rat-king.html",
  "push-gaming-retro-sweets": "https://www.pushgaming.com/blog/push-gaming-releases-sugary-sequel-retro-sweets.html",
  "push-gaming-shamrock-saints": "https://www.pushgaming.com/blog/push-gaming-explores-rarely-seen-side-leprechauns-shamrock-saints.html",
  "push-gaming-wild-swarm": "https://www.pushgaming.com/blog/push-gaming-set-create-further-buzz-wild-swarm-release.html",
  "push-gaming-wild-swarm-2": "https://www.pushgaming.com/blog/push-gaming-creates-buzz-sequel-wild-swarm-2.html",
  "push-gaming-wild-swarm-3-chocolate-eggs": "https://www.pushgaming.com/blog/push-gaming-brings-sting-spring-release-wild-swarm-3-chocolate-eggs.html",
  "push-gaming-wild-swarm-triple-hive": "https://www.pushgaming.com/blog/q-head-studio-ihor-lozinskiy-speaks-askgamblers.html",
} as const;

const releaseDates = {
  "push-gaming-10-flaming-bisons": ["2024-12-11", "https://www.pushgaming.com/blog/push-gaming-ignites-reels-10-flaming-bisons.html"],
  "push-gaming-dinopolis": ["2021-04-22", "https://www.pushgaming.com/blog/push-gaming-dinopolis.html"],
  "push-gaming-fire-hopper": ["2021-12-07", "https://www.pushgaming.com/blog/push-gaming-sets-reels-ablaze-fire-hopper.html"],
  "push-gaming-giga-jar": ["2023-03-28", "https://www.pushgaming.com/blog/push-gamings-giga-jar-back-solo-slot-outing.html"],
  "push-gaming-jaguar-drop": ["2024-11-28", "https://www.pushgaming.com/blog/push-gaming-embarks-feature-frenzy-jaguar-drop.html"],
  "push-gaming-mystery-mission-to-the-moon": ["2022-11-09", "https://www.pushgaming.com/blog/push-gaming-blast-space-themed-sequel-mystery-mission-moon.html"],
  "push-gaming-mystery-of-the-nile": ["2025-01-08", "https://www.pushgaming.com/blog/push-gaming-reveals-egyptian-secrets-mystery-nile.html"],
  "push-gaming-retro-sweets": ["2024-05-02", "https://www.pushgaming.com/blog/push-gaming-releases-sugary-sequel-retro-sweets.html"],
  "push-gaming-triple-rampage": ["2025-08-20", "https://www.pushgaming.com/blog/push-gaming-unleashes-epic-three-pot-kaiju-action-triple-rampage.html"],
  "push-gaming-wild-swarm": ["2018-06-19", "https://www.pushgaming.com/blog/push-gaming-set-create-further-buzz-wild-swarm-release.html"],
  "push-gaming-wild-swarm-2": ["2024-02-29", "https://www.pushgaming.com/blog/push-gaming-creates-buzz-sequel-wild-swarm-2.html"],
  "push-gaming-wild-swarm-3-chocolate-eggs": ["2026-03-11", "https://www.pushgaming.com/blog/push-gaming-brings-sting-spring-release-wild-swarm-3-chocolate-eggs.html"],
  "push-gaming-wild-swarm-triple-hive": ["2025-07-30", "https://www.pushgaming.com/blog/push-gaming-brings-buzz-back-wild-swarm-triple-hive.html"],
} as const;

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return [details?.field, details?.rtp, details?.maxWin, details?.volatility, details?.releaseDate].filter(Boolean).length
    + (type ? 1 : 0)
    + (research?.mechanics.length ?? 0);
}

test("Push score-six provider pass preserves official provenance and raises targeted cards", () => {
  const seeds = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const [slug, source] of Object.entries(gameTypeSources)) {
    const seed = seeds.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Push Gaming");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);
    expect(getVerifiedCatalogGameType(slug), slug).toEqual({ gameType: "Slots", source, verifiedAt: "2026-09-20" });
    expect(scoreFor(slug), `${slug} must move above score six`).toBeGreaterThanOrEqual(7);
  }

  for (const [slug, [releaseDate, releaseDateSource]] of Object.entries(releaseDates)) {
    const seed = seeds.get(slug);
    expect(seed, slug).toBeTruthy();
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(seed!.source);
    expect(details?.releaseDate, slug).toBe(releaseDate);
    expect(details?.releaseDateSource, slug).toBe(releaseDateSource);
    expect(["2026-09-20", "2026-09-24", "2026-09-25"], slug).toContain(details?.verifiedAt);
    expect(scoreFor(slug), `${slug} must move above score six`).toBeGreaterThanOrEqual(7);
  }
});
