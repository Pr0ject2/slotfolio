import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = {
  "playn-go-battle-royal": {
    field: "5 барабанов",
    fieldSource: "https://www.playngo.com/post/latest-play-n-go-slot-battle-royal-is-a-royal-affair",
    releaseDate: "2018-12-10",
    score: 3,
  },
  "playn-go-big-win-cat": {
    field: "3×3",
    fieldSource: "https://www.playngo.com/posts/big-win-cat-pawsperity",
    releaseDate: "2017-11-06",
    score: 3,
  },
  "playn-go-blinged": {
    field: "10 линий",
    releaseDate: "2020-08-06",
    mechanics: ["Линии"],
    score: 4,
  },
  "playn-go-canine-carnage": {
    releaseDate: "2022-11-03",
    mechanics: ["Сбор символов"],
    score: 3,
  },
  "playn-go-cat-wilde-and-the-pyramids-of-dead": {
    maxWin: "10000x",
    maxWinSource: "https://www.playngo.com/post/cat-wilde-pyramids-of-dead",
    releaseDate: "2022-06-23",
    score: 3,
  },
  "playn-go-cat-wilde-in-the-eclipse-of-the-sun-god": {
    field: "5×3 · 20 динамических линий",
    fieldSource: "https://www.playngo.com/post/top-summer-sun-slots-2024",
    releaseDate: "2021-02-04",
    mechanics: ["Линии", "Каскады"],
    evidenceSource: "https://www.playngo.com/post/top-summer-sun-slots-2024",
    score: 5,
  },
  "playn-go-champions-of-mithrune": {
    releaseDate: "2022-09-01",
    mechanics: ["Сбор символов"],
    evidenceSource: "https://www.playngo.com/posts/champions-of-mithrune",
    score: 3,
  },
  "playn-go-charlie-chance-in-hell-to-pay": {
    field: "3 барабана",
    fieldSource: "https://www.playngo.com/post/play-n-go-release-one-hell-of-a-game",
    releaseDate: "2020-05-21",
    score: 3,
  },
  "playn-go-cursed-moon-power-collection": {
    field: "5×4 · выплаты способами",
    fieldSource: "https://www.playngo.com/posts/cursed-moon-power-collection",
    releaseDate: "2026-08-20",
    mechanics: ["Способы", "Сбор символов"],
    evidenceSource: "https://www.playngo.com/posts/cursed-moon-power-collection",
    score: 5,
  },
  "playn-go-dawn-of-egypt": {
    field: "5 барабанов",
    fieldSource: "https://www.playngo.com/posts/play-n-go-continue-major-release-year-with-dawn-of-egypt",
    releaseDate: "2020-02-20",
    score: 3,
  },
  "playn-go-demon": {
    field: "5×3",
    fieldSource: "https://www.playngo.com/post/monsters-n-music-slots",
    releaseDate: "2019-09-26",
    score: 3,
  },
  "playn-go-dio-killing-the-dragon": {
    field: "5×3",
    fieldSource: "https://www.playngo.com/post/bloodthirsty-beasts-playngo-halloween-editorial",
    releaseDate: "2022-10-06",
    score: 3,
  },
  "playn-go-dragon-maiden": {
    field: "5×6 · 7776 способов в Golden Free Spin",
    releaseDate: "2018-11-14",
    mechanics: ["Способы"],
    score: 4,
  },
  "playn-go-eye-of-atum": {
    field: "5×3 · 10 линий",
    releaseDate: "2022-03-24",
    mechanics: ["Линии"],
    score: 4,
  },
  "playn-go-gnawn-gold": {
    releaseDate: "2026-06-25",
    mechanics: ["Сбор символов"],
    score: 3,
  },
  "playn-go-legion-gold-victory": {
    releaseDate: "2025-02-27",
    mechanics: ["Сбор символов"],
    evidenceSource: "https://www.playngo.com/post/legion-gold-victory",
    score: 3,
  },
  "playn-go-monkey-battle-for-the-scrolls": {
    releaseDate: "2023-10-26",
    mechanics: ["Сбор символов"],
    evidenceSource: "https://www.playngo.com/posts/monkey-battle-for-the-scrolls",
    score: 3,
  },
} as const;

const targetSlugs = new Set(Object.keys(targets));

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("fifth provider-wide Play’n GO batch enriches seventeen remaining weak cards", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(17);
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
    expect(details?.rtp, `${slug} must not invent RTP`).toBeUndefined();
    expect(details?.volatility, `${slug} must not invent volatility`).toBeUndefined();

    if ("field" in values) {
      expect(details?.field, slug).toBe(values.field);
      if ("fieldSource" in values) {
        expect(details && "fieldSource" in details, `${slug} must retain separate official field provenance`).toBe(true);
        if (details && "fieldSource" in details) expect(details.fieldSource, slug).toBe(values.fieldSource);
      } else {
        expect(details && "fieldSource" in details, `${slug} uses its primary game page for the field fact`).toBe(false);
      }
    } else {
      expect(details?.field, `${slug} must not invent a field layout`).toBeUndefined();
    }

    if ("maxWin" in values) {
      expect(details?.maxWin, slug).toBe(values.maxWin);
      expect(details && "maxWinSource" in details, `${slug} must retain separate official max-win provenance`).toBe(true);
      if (details && "maxWinSource" in details) expect(details.maxWinSource, slug).toBe(values.maxWinSource);
    } else {
      expect(details?.maxWin, `${slug} must not invent max win`).toBeUndefined();
    }

    const research = getVerifiedCatalogResearch(slug);
    if ("mechanics" in values) {
      expect(research?.mechanics, slug).toEqual(values.mechanics);
      expect(research?.source, `${slug} research must preserve the official catalog game page`).toBe(seed!.source);
      expect(research?.evidence, slug).toBeTruthy();
      if ("evidenceSource" in values) {
        expect(research && "evidenceSource" in research, `${slug} must retain separate mechanic provenance`).toBe(true);
        if (research && "evidenceSource" in research) expect(research.evidenceSource, slug).toBe(values.evidenceSource);
      } else {
        expect(research && "evidenceSource" in research, `${slug} uses its primary game page as mechanic evidence`).toBe(false);
      }
    } else {
      expect(research, `${slug} must not invent a taxonomy mechanic`).toBeUndefined();
    }

    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
    expect(scoreFor(slug), `${slug} should reach its exact evidence-backed score`).toBe(values.score);
  }

  const ranked = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));
  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(22);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(170);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(419);
  expect(ranked.filter((row) => row.score <= 1 && row.provider === "Hacksaw Gaming")).toHaveLength(17);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => targetSlugs.has(row.slug) && row.score === 2)).toBe(false);
});