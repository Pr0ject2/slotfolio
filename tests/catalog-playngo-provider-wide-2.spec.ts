import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const detailTargets = {
  "playn-go-ice-joker": { field: "5×3 · 20 линий", releaseDate: "2020-12-03" },
  "playn-go-kings-mask": { maxWin: "10000x", releaseDate: "2022-05-26" },
  "playn-go-lady-of-fortune-destiny-spins": { field: "3 направления выплат", releaseDate: "2025-08-07" },
  "playn-go-merlin-journey-of-flame": { field: "6 барабанов в Free Spins", releaseDate: "2023-07-13" },
  "playn-go-moon-princess-100": { field: "5×5", releaseDate: "2022-04-07" },
  "playn-go-naughty-nicks-book": { field: "6 барабанов в Free Spins", releaseDate: "2022-12-08" },
} as const;

const researchTargets = {
  "playn-go-hope-unleashed-fortune-rises": { mechanics: ["Сбор символов"], releaseDate: "2026-03-24" },
  "playn-go-legacy-of-inca": { mechanics: ["Способы"], releaseDate: "2023-02-02" },
  "playn-go-manta-mayhem": { mechanics: ["Сбор символов"], releaseDate: "2026-05-14" },
  "playn-go-merlin-and-the-ice-queen-morgana": { mechanics: ["Линии"], releaseDate: "2021-11-25" },
  "playn-go-merry-xmas": { mechanics: ["Линии"], releaseDate: "2014-11-17" },
} as const;

const targetSlugs = new Set([...Object.keys(detailTargets), ...Object.keys(researchTargets)]);
const gridSlots = new Set(["playn-go-moon-princess-100"]);

test("second provider-wide Play’n GO batch preserves its eleven original official facts", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(11);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const slug of targetSlugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe(gridSlots.has(slug) ? "Grid Slot" : "Video Slot");
  }

  for (const [slug, values] of Object.entries(detailTargets)) {
    const seed = selected.get(slug)!;
    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, `${slug} must preserve the catalog seed as primary provenance`).toBe(seed.source);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    if ("field" in values) expect(details?.field, slug).toBe(values.field);
    if ("maxWin" in values) expect(details?.maxWin, slug).toBe(values.maxWin);
  }

  for (const [slug, values] of Object.entries(researchTargets)) {
    const seed = selected.get(slug)!;
    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, `${slug} must preserve the catalog seed as primary provenance`).toBe(seed.source);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);

    const research = getVerifiedCatalogResearch(slug);
    expect(research?.mechanics, slug).toEqual(expect.arrayContaining([...values.mechanics]));
    expect(research?.source, `${slug} research must preserve the catalog seed as primary provenance`).toBe(seed.source);
    expect(research?.evidence, slug).toBeTruthy();
  }
});
