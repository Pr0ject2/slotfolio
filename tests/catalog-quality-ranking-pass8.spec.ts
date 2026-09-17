import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const mechanicTargets: Record<string, string> = {
  "hacksaw-gaming-army-of-ares": "Сбор символов",
  "hacksaw-gaming-le-pharaoh": "Сбор символов",
  "hacksaw-gaming-le-viking": "Сбор символов",
  "hacksaw-gaming-le-zeus": "Сбор символов",
  "hacksaw-gaming-marlin-masters": "Сбор символов",
  "hacksaw-gaming-octo-attack": "Каскады",
  "hacksaw-gaming-rise-of-fortuna": "Сбор символов",
  "hacksaw-gaming-spear-of-athena": "Сбор символов",
  "hacksaw-gaming-strength-of-hercules": "Сбор символов",
  "hacksaw-gaming-the-wildwood-curse": "Кластеры",
};

const fieldTargets: Record<string, string> = {
  "hacksaw-gaming-bash-bros": "6 барабанов",
  "hacksaw-gaming-booze-bash": "6 барабанов",
};

const targetSlugs = new Set([...Object.keys(mechanicTargets), ...Object.keys(fieldTargets)]);

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("quality pass 8 improves twelve thin Hacksaw runtime records from exact official evidence", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(12);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const slug of targetSlugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed?.provider, slug).toBe("Hacksaw Gaming");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Slots");
  }

  for (const [slug, mechanic] of Object.entries(mechanicTargets)) {
    const seed = selected.get(slug)!;
    const research = getVerifiedCatalogResearch(slug);
    expect(research, slug).toBeTruthy();
    expect(research?.source, slug).toBe(seed.source);
    expect(research?.mechanics, slug).toContain(mechanic);
  }

  for (const [slug, field] of Object.entries(fieldTargets)) {
    const seed = selected.get(slug)!;
    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, slug).toBe(seed.source);
    expect(details?.field, slug).toBe(field);
    expect(details?.rtp, slug).toBeUndefined();
    expect(details?.maxWin, slug).toBeUndefined();
    expect(details?.volatility, slug).toBeUndefined();
    expect(details?.releaseDate, slug).toBeUndefined();
  }

  for (const slug of targetSlugs) {
    expect(scoreFor(slug), `${slug} must leave the thin score<=1 bucket`).toBeGreaterThanOrEqual(2);
  }
});
