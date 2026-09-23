import { expect, test } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getCatalogVerifiedDetailsPlayngoFill } from "../src/lib/catalog-verified-details-playngo-fill";

const cases = {
  "playn-go-octopus-treasure": {
    source: "https://www.playngo.com/games/octopus-treasure",
    maxWin: "5000x",
    maxWinSource: "https://www.playngo.com/games/octopus-treasure",
  },
  "playn-go-legion-gold-unleashed": {
    source: "https://www.playngo.com/games/legion-gold-unleashed",
    maxWin: "3000x",
    maxWinSource: "https://www.playngo.com/post/legion-gold-unleashed-online-slot-review",
  },
  "playn-go-rally-4-riches": {
    source: "https://www.playngo.com/games/rally-4-riches",
    field: "3 барабана",
    fieldSource: "https://www.playngo.com/games/rally-4-riches",
  },
} as const;

test("direct official Play'n GO evidence fills only the verified passport facts", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const [slug, expected] of Object.entries(cases)) {
    const seed = selected.get(slug);
    const overlay = getCatalogVerifiedDetailsPlayngoFill(slug);
    const merged = getVerifiedCatalogDetails(slug);

    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    expect(seed!.source, slug).toBe(expected.source);
    expect(overlay?.verifiedAt, slug).toBe("2026-09-23");
    expect(merged?.source, `${slug}: canonical source`).toBe(expected.source);

    if ("maxWin" in expected) {
      expect(overlay?.maxWin, `${slug}: overlay maxWin`).toBe(expected.maxWin);
      expect(overlay?.maxWinSource, `${slug}: overlay maxWin source`).toBe(expected.maxWinSource);
      expect(merged?.maxWin, `${slug}: merged maxWin`).toBe(expected.maxWin);
    }

    if ("field" in expected) {
      expect(overlay?.field, `${slug}: overlay field`).toBe(expected.field);
      expect(overlay?.fieldSource, `${slug}: overlay field source`).toBe(expected.fieldSource);
      expect(merged?.field, `${slug}: merged field`).toBe(expected.field);
    }
  }
});

test("new Play'n GO fill stays additive to older verified passport facts", () => {
  const octopus = getVerifiedCatalogDetails("playn-go-octopus-treasure");
  const legion = getVerifiedCatalogDetails("playn-go-legion-gold-unleashed");

  expect(octopus?.field).toBe("5×3 · 20 линий");
  expect(octopus?.releaseDate).toMatch(/^2020-09/);
  expect(legion?.field).toBe("5×3 · 25 линий");
  expect(legion?.releaseDate).toMatch(/^2025-06/);
});
