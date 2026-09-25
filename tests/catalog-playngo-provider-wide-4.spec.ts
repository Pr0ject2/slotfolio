import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = {
  "playn-go-1001-mystery-genie-fortunes": {
    field: "5×3",
    fieldSource: "https://www.playngo.com/posts/super-summer-slots",
    releaseDate: "2025-04-10",
    gameType: "Video Slot",
  },
  "playn-go-13th-trial-hercules-abyssways": {
    field: "динамическая сетка Abyssways™ в Free Spins",
    fieldSource: "https://www.playngo.com/abyssways",
    releaseDate: "2025-08-14",
    gameType: "Video Slot",
  },
  "playn-go-3-blades-and-blessings": {
    field: "5×5 · 40 линий в Boost/Super/Mega Free Spins",
    fieldSource: "https://www.playngo.com/games/3-blades-%26-blessings",
    releaseDate: "2026-02-12",
    mechanics: ["Линии", "Сбор символов"],
    evidenceSource: "https://www.playngo.com/games/3-blades-%26-blessings",
    gameType: "Video Slot",
  },
  "playn-go-3-clown-monty": {
    field: "5×3",
    fieldSource: "https://www.playngo.com/post/play-n-go-put-on-a-show-with-new-title-three-clown-monty",
    maxWin: "20000x",
    maxWinSource: "https://www.playngo.com/post/play-n-go-put-on-a-show-with-new-title-three-clown-monty",
    releaseDate: "2021-05-13",
    gameType: "Video Slot",
  },
  "playn-go-ankh-of-anubis-awakening": {
    field: "5 барабанов",
    fieldSource: "https://www.playngo.com/post/ankh-of-anubis-awakening",
    releaseDate: "2024-08-22",
    gameType: "Video Slot",
  },
  "playn-go-book-of-dead-go-collect": {
    field: "5×3",
    fieldSource: "https://www.playngo.com/post/book-of-dead-go-collect",
    releaseDate: "2026-02-26",
    gameType: "Video Slot",
  },
  "playn-go-bubblin-riches": {
    field: "6×4",
    fieldSource: "https://www.playngo.com/post/bubblin-riches",
    releaseDate: "2025-10-16",
    gameType: "Video Slot",
  },
  "playn-go-buildin-bucks": {
    field: "5×3 · 243 способа",
    fieldSource: "https://www.playngo.com/post/buildin-bucks",
    releaseDate: "2024-09-12",
    mechanics: ["Способы"],
    evidenceSource: "https://www.playngo.com/post/buildin-bucks",
    gameType: "Video Slot",
  },
  "playn-go-buildin-even-more-bucks": {
    field: "5×5 в Free Spins",
    fieldSource: "https://www.playngo.com/games/buildin%27-even-more-bucks",
    releaseDate: "2026-06-11",
    gameType: "Video Slot",
  },
  "playn-go-buildin-more-bucks": {
    field: "5 барабанов · 243 способа",
    fieldSource: "https://www.playngo.com/posts/buildin-more-bucks",
    releaseDate: "2025-12-11",
    mechanics: ["Способы"],
    evidenceSource: "https://www.playngo.com/posts/buildin-more-bucks",
    gameType: "Video Slot",
  },
  "playn-go-cash-of-command": {
    releaseDate: "2022-07-21",
    mechanics: ["Кластеры", "Каскады", "Сбор символов"],
    evidenceSource: "https://www.playngo.com/post/cash-of-command",
    gameType: "Grid Slot",
  },
  "playn-go-crabbys-gold": {
    field: "6×4 · 4096 способов",
    fieldSource: "https://www.playngo.com/post/crabby-s-gold",
    maxWin: "11520x",
    maxWinSource: "https://www.playngo.com/post/crabby-s-gold",
    releaseDate: "2025-05-08",
    mechanics: ["Способы", "Сбор символов"],
    evidenceSource: "https://www.playngo.com/post/crabby-s-gold",
    gameType: "Video Slot",
  },
  "playn-go-crystal-hall": {
    field: "сетка +1 ряд в Free Spins",
    fieldSource: "https://www.playngo.com/post/crystal-hall",
    releaseDate: "2025-02-13",
    gameType: "Video Slot",
  },
  "playn-go-fangs-and-fire": {
    field: "5×3 → 5×7",
    fieldSource: "https://www.playngo.com/posts/fangs-and-fire",
    releaseDate: "2025-11-27",
    gameType: "Video Slot",
  },
  "playn-go-fire-joker-blitz": {
    field: "6 барабанов",
    fieldSource: "https://www.playngo.com/posts/fire-joker-blitz",
    releaseDate: "2025-08-28",
    mechanics: ["Сбор символов"],
    evidenceSource: "https://www.playngo.com/games/fire-joker-blitz",
    gameType: "Video Slot",
  },
  "playn-go-mystery-egg-surprise": {
    field: "3 барабана · 5 линий",
    fieldSource: "https://www.playngo.com/post/mystery-egg-surprise",
    releaseDate: "2025-03-20",
    mechanics: ["Линии"],
    evidenceSource: "https://www.playngo.com/post/mystery-egg-surprise",
    gameType: "Video Slot",
  },
} as const;

const targetSlugs = new Set(Object.keys(targets));

test("fourth provider-wide Play’n GO batch preserves its original official facts while allowing later enrichment", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(16);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const [slug, values] of Object.entries(targets)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const details = getVerifiedCatalogDetails(slug);
    expect(details, slug).toBeTruthy();
    expect(details?.source, `${slug} must preserve the official catalog game page as primary provenance`).toBe(seed!.source);
    expect(details?.releaseDate, slug).toBe(values.releaseDate);

    if ("field" in values) {
      expect(details?.field, slug).toContain(values.field);
      expect(details && "fieldSource" in details, `${slug} must retain separate official field provenance`).toBe(true);
      if (details && "fieldSource" in details) expect(details.fieldSource, slug).toMatch(/^https:\/\/www\.playngo\.com\//);
    }

    if ("maxWin" in values) {
      expect(details?.maxWin, slug).toContain(values.maxWin);
      expect(details && "maxWinSource" in details, `${slug} must retain separate official max-win provenance`).toBe(true);
      if (details && "maxWinSource" in details) expect(details.maxWinSource, slug).toMatch(/^https:\/\/www\.playngo\.com\//);
    }

    const research = getVerifiedCatalogResearch(slug);
    if ("mechanics" in values) {
      expect(research?.mechanics, slug).toEqual(expect.arrayContaining([...values.mechanics]));
      expect(research?.source, `${slug} research must preserve the official catalog game page`).toBe(seed!.source);
      expect(research?.evidence, slug).toBeTruthy();
    }

    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe(values.gameType);
  }
});
