import { expect, test } from "@playwright/test";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";
import { getCatalogResearchPlayngoFillMechanics22 } from "../src/lib/catalog-research-playngo-fill-mechanics-22";
import { getCatalogResearchPlayngoFillMechanics23 } from "../src/lib/catalog-research-playngo-fill-mechanics-23";
import { getCatalogResearchPlayngoFillMechanics24 } from "../src/lib/catalog-research-playngo-fill-mechanics-24";
import { getCatalogResearchPlayngoFillMechanics25 } from "../src/lib/catalog-research-playngo-fill-mechanics-25";
import { getCatalogResearchPlayngoFillMechanics26 } from "../src/lib/catalog-research-playngo-fill-mechanics-26";

const waves = [
  {
    get: getCatalogResearchPlayngoFillMechanics22,
    slugs: [
      "playn-go-aztec-warrior-princess", "playn-go-bakers-treat", "playn-go-big-win-cat",
      "playn-go-black-mamba", "playn-go-blinged", "playn-go-bull-in-a-rodeo",
      "playn-go-captain-xenos-earth-adventure", "playn-go-cat-wilde-and-the-doom-of-dead",
      "playn-go-cops-n-robbers", "playn-go-crystal-hall", "playn-go-dr-toonz", "playn-go-easter-eggs",
      "playn-go-fire-joker-100", "playn-go-fire-joker-blitz", "playn-go-fortune-teller",
      "playn-go-free-reelin-joker", "playn-go-frozen-gems", "playn-go-fulong-88", "playn-go-gold-king",
      "playn-go-golden-ticket", "playn-go-grim-muerto", "playn-go-happy-halloween",
    ],
  },
  {
    get: getCatalogResearchPlayngoFillMechanics23,
    slugs: [
      "playn-go-house-of-doom", "playn-go-inferno-joker", "playn-go-lady-of-fortune",
      "playn-go-lady-of-fortune-destiny-spins", "playn-go-legacy-of-dynasties",
      "playn-go-legacy-of-gems-blitzways", "playn-go-leprechaun-goes-egypt",
      "playn-go-leprechaun-goes-wild", "playn-go-leprechauns-vault", "playn-go-mega-don",
      "playn-go-merlin-journey-of-flame", "playn-go-merlins-grimoire",
      "playn-go-moon-princess-christmas-kingdom", "playn-go-fulong-88",
    ],
  },
  {
    get: getCatalogResearchPlayngoFillMechanics24,
    slugs: [
      "playn-go-piggy-heist", "playn-go-mystery-joker", "playn-go-multifruit-81",
      "playn-go-phoenix-reborn", "playn-go-motley-crue", "playn-go-primal-rampage", "playn-go-photo-safari",
    ],
  },
  {
    get: getCatalogResearchPlayngoFillMechanics25,
    slugs: [
      "playn-go-kings-mask-eclipse-of-gods", "playn-go-golden-caravan", "playn-go-golden-legend",
      "playn-go-prissy-princess", "playn-go-puebla-parade", "playn-go-aztec-idols",
      "playn-go-buildin-even-more-bucks", "playn-go-pearls-of-india",
    ],
  },
  {
    get: getCatalogResearchPlayngoFillMechanics26,
    slugs: [
      "playn-go-demon", "playn-go-invading-vegas-revenge-on-mars", "playn-go-jolly-roger",
      "playn-go-rage-to-riches", "playn-go-infernal-trinity-go-guaranteed",
      "playn-go-playn-go-mole-digger", "playn-go-coils-of-cash", "playn-go-love-joker",
      "playn-go-gold-of-fortune-god",
    ],
  },
] as const;

test("bulk Play'n GO mechanics evidence is integrated into verified research", () => {
  for (const wave of waves) {
    for (const slug of wave.slugs) {
      const added = wave.get(slug);
      const merged = getVerifiedCatalogResearch(slug);

      expect(added, `${slug}: wave record missing`).toBeTruthy();
      expect(added!.source, `${slug}: source must be official Play'n GO`).toContain("playngo.com/");
      expect(added!.verifiedAt, `${slug}: verification date missing`).toBeTruthy();
      expect(added!.mechanics.length, `${slug}: mechanic missing`).toBeGreaterThan(0);
      expect(merged, `${slug}: merged research missing`).toBeTruthy();
      expect(merged!.mechanics, `${slug}: added mechanic was not integrated`).toEqual(
        expect.arrayContaining(added!.mechanics),
      );
    }
  }
});
