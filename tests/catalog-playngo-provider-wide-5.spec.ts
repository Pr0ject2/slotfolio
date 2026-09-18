import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = {
  "playn-go-battle-royal": { field: "5 барабанов", releaseDate: "2018-12-10" },
  "playn-go-big-win-cat": { field: "3×3", releaseDate: "2017-11-06" },
  "playn-go-blinged": { field: "10 линий", releaseDate: "2020-08-06", mechanics: ["Линии"] },
  "playn-go-canine-carnage": { releaseDate: "2022-11-03", mechanics: ["Сбор символов"] },
  "playn-go-cat-wilde-and-the-pyramids-of-dead": { maxWin: "10000x", releaseDate: "2022-06-23" },
  "playn-go-cat-wilde-in-the-eclipse-of-the-sun-god": { field: "5×3 · 20 динамических линий", releaseDate: "2021-02-04", mechanics: ["Линии", "Каскады"] },
  "playn-go-champions-of-mithrune": { releaseDate: "2022-09-01", mechanics: ["Сбор символов"] },
  "playn-go-charlie-chance-in-hell-to-pay": { field: "3 барабана", releaseDate: "2020-05-21" },
  "playn-go-cursed-moon-power-collection": { field: "5×4 · выплаты способами", releaseDate: "2026-08-20", mechanics: ["Способы", "Сбор символов"] },
  "playn-go-dawn-of-egypt": { field: "5 барабанов", releaseDate: "2020-02-20" },
  "playn-go-demon": { field: "5×3", releaseDate: "2019-09-26" },
  "playn-go-dio-killing-the-dragon": { field: "5×3", releaseDate: "2022-10-06" },
  "playn-go-dragon-maiden": { field: "5×6 · 7776 способов в Golden Free Spin", releaseDate: "2018-11-14", mechanics: ["Способы"] },
  "playn-go-eye-of-atum": { field: "5×3 · 10 линий", releaseDate: "2022-03-24", mechanics: ["Линии"] },
  "playn-go-gnawn-gold": { releaseDate: "2026-06-25", mechanics: ["Сбор символов"] },
  "playn-go-legion-gold-victory": { releaseDate: "2025-02-27", mechanics: ["Сбор символов"] },
  "playn-go-monkey-battle-for-the-scrolls": { releaseDate: "2023-10-26", mechanics: ["Сбор символов"] },
} as const;

test("fifth provider-wide Play’n GO batch preserves its seventeen original official facts", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  expect(Object.keys(targets)).toHaveLength(17);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const [slug, values] of Object.entries(targets)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    const details = getVerifiedCatalogDetails(slug);
    expect(details?.source, slug).toBe(seed!.source);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);
    if ("field" in values) expect(details?.field, slug).toBe(values.field);
    if ("maxWin" in values) expect(details?.maxWin, slug).toBe(values.maxWin);
    if ("mechanics" in values) {
      const research = getVerifiedCatalogResearch(slug);
      expect(research?.mechanics, slug).toEqual(expect.arrayContaining([...values.mechanics]));
      expect(research?.source, slug).toBe(seed!.source);
      expect(research?.evidence, slug).toBeTruthy();
    }
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
  }
});
