import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = {
  "playn-go-banana-rock": { mechanics: ["Сбор символов"] },
  "playn-go-bullion-xpress": { mechanics: ["Сбор символов"] },
  "playn-go-doom-of-egypt": { mechanics: ["Линии"] },
  "playn-go-fates-fortune": { mechanics: ["Сбор символов"] },
  "playn-go-game-of-gladiators-uprising": {
    mechanics: ["Линии"],
    evidenceSource: "https://www.playngo.com/post/game-of-gladiators-uprising",
  },
  "playn-go-golden-legend": { mechanics: ["Линии"] },
  "playn-go-legion-gold": {
    mechanics: ["Сбор символов"],
    evidenceSource: "https://www.playngo.com/post/top-games-the-legion-gold-series",
  },
  "playn-go-legion-gold-and-the-throne-of-dead": { mechanics: ["Сбор символов"] },
  "playn-go-legion-gold-reckoning": { mechanics: ["Сбор символов"] },
  "playn-go-lord-merlin-and-the-lady-of-the-lake": {
    mechanics: ["Линии"],
    evidenceSource: "https://www.playngo.com/post/the-tales-of-merlin-slots-at-playngo",
  },
  "playn-go-love-joker": { mechanics: ["Сбор символов"] },
  "playn-go-mount-m": {
    mechanics: ["Сбор символов"],
    evidenceSource: "https://www.playngo.com/post/mount-m",
  },
  "playn-go-mystery-joker-6000": { mechanics: ["Линии"] },
  "playn-go-nugget-n-nonsense": { mechanics: ["Сбор символов"] },
  "playn-go-pearls-of-india": { mechanics: ["Сбор символов"] },
  "playn-go-prissy-princess": { mechanics: ["Каскады"] },
  "playn-go-rage-to-riches": { mechanics: ["Сбор символов"] },
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

test("sixth provider-wide Play’n GO batch enriches seventeen remaining score-2 cards", () => {
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

    const research = getVerifiedCatalogResearch(slug);
    expect(research, slug).toBeTruthy();
    expect(research?.source, `${slug} must preserve the official catalog game page as primary provenance`).toBe(seed!.source);
    expect(research?.mechanics, slug).toEqual(values.mechanics);
    expect(research?.evidence, slug).toBeTruthy();

    if ("evidenceSource" in values) {
      expect(research && "evidenceSource" in research, `${slug} must retain separate official mechanic provenance`).toBe(true);
      if (research && "evidenceSource" in research) expect(research.evidenceSource, slug).toBe(values.evidenceSource);
    } else {
      expect(research && "evidenceSource" in research, `${slug} must use its official game page as evidence`).toBe(false);
    }

    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
    expect(scoreFor(slug), `${slug} must move from score 2 to score 3 with one exact mechanic`).toBe(3);
  }

  const ranked = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));
  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(22);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(130);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(456);
  expect(ranked.filter((row) => row.score <= 1 && row.provider === "Hacksaw Gaming")).toHaveLength(17);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => targetSlugs.has(row.slug) && row.score === 2)).toBe(false);
});
