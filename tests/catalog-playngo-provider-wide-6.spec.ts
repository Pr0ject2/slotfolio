import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = {
  "playn-go-banana-rock": { mechanics: ["Сбор символов"] },
  "playn-go-bullion-xpress": { mechanics: ["Сбор символов"] },
  "playn-go-doom-of-egypt": { mechanics: ["Линии"] },
  "playn-go-fates-fortune": { mechanics: ["Сбор символов"] },
  "playn-go-game-of-gladiators-uprising": { mechanics: ["Линии"] },
  "playn-go-golden-legend": { mechanics: ["Линии"] },
  "playn-go-legion-gold": { mechanics: ["Сбор символов"] },
  "playn-go-legion-gold-and-the-throne-of-dead": { mechanics: ["Сбор символов"] },
  "playn-go-legion-gold-reckoning": { mechanics: ["Сбор символов"] },
  "playn-go-lord-merlin-and-the-lady-of-the-lake": { mechanics: ["Линии"] },
  "playn-go-love-joker": { mechanics: ["Сбор символов"] },
  "playn-go-mount-m": { mechanics: ["Сбор символов"] },
  "playn-go-mystery-joker-6000": { mechanics: ["Линии"] },
  "playn-go-nugget-n-nonsense": { mechanics: ["Сбор символов"] },
  "playn-go-pearls-of-india": { mechanics: ["Сбор символов"] },
  "playn-go-prissy-princess": { mechanics: ["Каскады"] },
  "playn-go-rage-to-riches": { mechanics: ["Сбор символов"] },
} as const;

test("sixth provider-wide Play’n GO batch preserves its seventeen official mechanics", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));
  expect(Object.keys(targets)).toHaveLength(17);
  expect(catalogSeeds).toHaveLength(900);
  expect(slots).toHaveLength(100);

  for (const [slug, values] of Object.entries(targets)) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(seed!.provider, slug).toBe("Play’n GO");
    const research = getVerifiedCatalogResearch(slug);
    expect(research?.source, slug).toBe(seed!.source);
    expect(research?.mechanics, slug).toEqual(expect.arrayContaining([...values.mechanics]));
    expect(research?.evidence, slug).toBeTruthy();
    expect(getVerifiedCatalogGameType(slug)?.gameType, slug).toBe("Video Slot");
  }
});
