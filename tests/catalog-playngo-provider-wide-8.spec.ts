import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const detailTargets = {
  "playn-go-highway-legends": {
    field: "5 барабанов",
    fieldSource: "https://www.playngo.com/post/playngo-plot-a-prize-hunting-heis-in-highway-legends",
  },
  "playn-go-enchanted-meadow": {
    field: "5 барабанов",
    fieldSource: "https://www.playngo.com/posts/top-summer-themed-slots-to-play-in-2023",
  },
} as const;

const researchTargets = {
  "playn-go-highway-legends": { mechanics: ["Сбор символов"] },
  "playn-go-def-leppard-hysteria": { mechanics: ["Кластеры", "Каскады"] },
  "playn-go-cash-a-cabana": { mechanics: ["Сбор символов"] },
  "playn-go-fat-frankies": { mechanics: ["Сбор символов"] },
  "playn-go-lab-of-madness-its-a-wild": { mechanics: ["Сбор символов"] },
} as const;

const targetSlugs = new Set([...Object.keys(detailTargets), ...Object.keys(researchTargets)]);

test("eighth provider-wide Play’n GO batch preserves six official evidence records", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(6);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const [slug, values] of Object.entries(detailTargets)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, `${slug} must preserve the official catalog game page as primary provenance`).toBe(seed!.source);
    expect(details?.field, slug).toBe(values.field);
    expect(details?.releaseDate, `${slug} must preserve its existing verified release date`).toBeTruthy();
    expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
    expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
    expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();
    expect(details?.verifiedAt, slug).toBe("2026-09-15");
    expect(details && "fieldSource" in details, `${slug} must retain separate official field provenance`).toBe(true);
    if (details && "fieldSource" in details) expect(details.fieldSource, slug).toBe(values.fieldSource);
  }

  for (const [slug, values] of Object.entries(researchTargets)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const research = getVerifiedCatalogResearch(slug);
    expect(research, slug).toBeTruthy();
    expect(research?.source, `${slug} must preserve the official catalog game page as primary provenance`).toBe(seed!.source);
    expect(research?.mechanics, slug).toEqual(values.mechanics);
    expect(research?.evidence, slug).toBeTruthy();
    expect(research?.verifiedAt, slug).toBe("2026-09-15");
  }

  const defLeppard = getVerifiedCatalogResearch("playn-go-def-leppard-hysteria");
  expect(defLeppard && "evidenceSource" in defLeppard).toBe(true);
  if (defLeppard && "evidenceSource" in defLeppard) {
    expect(defLeppard.evidenceSource).toBe("https://www.playngo.com/series/grid-slots");
  }

  const fatFrankies = getVerifiedCatalogResearch("playn-go-fat-frankies");
  expect(fatFrankies && "evidenceSource" in fatFrankies).toBe(true);
  if (fatFrankies && "evidenceSource" in fatFrankies) {
    expect(fatFrankies.evidenceSource).toBe("https://www.playngo.com/post/fat-frankies");
  }
});
