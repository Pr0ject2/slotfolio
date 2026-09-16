import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const researchTargets = {
  "playn-go-diamonds-of-the-realm": {
    evidenceSource: "https://www.playngo.com/posts/playngo-impress-with-their-latest-quest-to-camelot",
  },
  "playn-go-divina-commedia-i-nove-cerchi": {},
  "playn-go-leprechauns-diamond-dig": {},
  "playn-go-midnight-gold": {},
  "playn-go-playn-go-mole-digger": {},
  "playn-go-playn-go-wrappin-gold": {},
} as const;

const coltSlug = "playn-go-colt-lightning";
const targetSlugs = new Set([...Object.keys(researchTargets), coltSlug]);

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const detailFacts = details
    ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length
    : 0;
  return detailFacts + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("seventh provider-wide Play’n GO batch enriches seven remaining score-2 cards", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  expect(targetSlugs.size).toBe(7);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);
  expect(catalogSeeds.length + slots.length).toBe(1000);

  for (const [slug, values] of Object.entries(researchTargets)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);

    const research = getVerifiedCatalogResearch(slug);
    expect(research, slug).toBeTruthy();
    expect(research?.source, `${slug} must preserve the official catalog game page as primary provenance`).toBe(seed!.source);
    expect(research?.mechanics, slug).toEqual(["Сбор символов"]);
    expect(research?.evidence, slug).toBeTruthy();
    expect(research?.verifiedAt, slug).toBe("2026-09-15");

    if ("evidenceSource" in values) {
      expect(research && "evidenceSource" in research, `${slug} must retain separate official mechanic provenance`).toBe(true);
      if (research && "evidenceSource" in research) expect(research.evidenceSource, slug).toBe(values.evidenceSource);
    } else {
      expect(research && "evidenceSource" in research, `${slug} must use its official game page as evidence`).toBe(false);
    }

    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
    expect(scoreFor(slug), `${slug} must move from score 2 to score 3`).toBe(3);
  }

  const coltSeed = selected.get(coltSlug);
  expect(coltSeed, coltSlug).toBeTruthy();
  expect(coltSeed!.provider, coltSlug).toBe("Play’n GO");
  expect(coltSeed!.source, coltSlug).toBe("https://www.playngo.com/games/colt-lightning");
  expect(slots.some((slot) => slot.provider === coltSeed!.provider && slot.name === coltSeed!.name), coltSlug).toBe(false);

  const colt = getVerifiedCatalogDetails(coltSlug);
  expect(colt, coltSlug).toBeTruthy();
  expect(colt?.source, coltSlug).toBe(coltSeed!.source);
  expect(colt?.releaseDate, coltSlug).toBe("2023-02-16");
  expect(colt?.field, coltSlug).toBe("5 барабанов · ряды 3-4-4-4-3");
  expect(colt?.maxWin, coltSlug).toBe("25000x");
  expect(colt?.rtp, `${coltSlug} must not invent RTP`).toBeUndefined();
  expect(colt?.volatility, `${coltSlug} must not invent volatility`).toBeUndefined();
  expect(colt?.verifiedAt, coltSlug).toBe("2026-09-15");
  expect(colt && "fieldSource" in colt, `${coltSlug} must retain separate official field provenance`).toBe(true);
  expect(colt && "maxWinSource" in colt, `${coltSlug} must retain separate official max-win provenance`).toBe(true);
  if (colt && "fieldSource" in colt) expect(colt.fieldSource, coltSlug).toBe("https://www.playngo.com/post/popular-slot-games-2023");
  if (colt && "maxWinSource" in colt) expect(colt.maxWinSource, coltSlug).toBe("https://www.playngo.com/post/popular-slot-games-2023");
  expect(getVerifiedCatalogResearch(coltSlug), `${coltSlug} must not invent a taxonomy mechanic`).toBeUndefined();
  expect(getVerifiedCatalogGameType(coltSlug)?.gameType, coltSlug).toBe("Video Slot");
  expect(scoreFor(coltSlug), `${coltSlug} must move from score 2 to score 4 with two exact official facts`).toBe(4);

  const ranked = catalogSeeds.map((seed) => ({ slug: seed.slug, provider: seed.provider, score: scoreFor(seed.slug) }));
  expect(ranked.filter((row) => row.score <= 1)).toHaveLength(22);
  expect(ranked.filter((row) => row.score === 2)).toHaveLength(130);
  expect(ranked.filter((row) => row.score === 3)).toHaveLength(456);
  expect(ranked.filter((row) => row.score <= 1 && row.provider === "Hacksaw Gaming")).toHaveLength(17);
  expect(ranked.some((row) => row.slug === "playn-go-coin-club" && row.score === 0)).toBe(true);
  expect(ranked.filter((row) => row.provider === "Nolimit City" && row.score <= 1)).toHaveLength(4);
  expect(ranked.some((row) => targetSlugs.has(row.slug) && row.score === 2)).toBe(false);
});
