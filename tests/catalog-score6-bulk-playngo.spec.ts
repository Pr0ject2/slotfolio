import { expect, test } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

const targets = [
  "playn-go-aztec-warrior-princess",
  "playn-go-bakers-treat",
  "playn-go-big-win-cat",
  "playn-go-black-mamba",
  "playn-go-blinged",
  "playn-go-bull-in-a-rodeo",
  "playn-go-captain-xenos-earth-adventure",
  "playn-go-cat-wilde-and-the-doom-of-dead",
  "playn-go-cops-n-robbers",
  "playn-go-crystal-hall",
  "playn-go-dr-toonz",
  "playn-go-easter-eggs",
  "playn-go-fire-joker-100",
  "playn-go-fire-joker-blitz",
  "playn-go-fortune-teller",
  "playn-go-free-reelin-joker",
  "playn-go-frozen-gems",
  "playn-go-fulong-88",
  "playn-go-gold-king",
  "playn-go-golden-ticket",
  "playn-go-grim-muerto",
  "playn-go-happy-halloween",
  "playn-go-house-of-doom",
  "playn-go-inferno-joker",
  "playn-go-lady-of-fortune",
  "playn-go-lady-of-fortune-destiny-spins",
  "playn-go-legacy-of-dynasties",
  "playn-go-legacy-of-gems-blitzways",
  "playn-go-leprechaun-goes-egypt",
  "playn-go-leprechaun-goes-wild",
  "playn-go-leprechauns-vault",
  "playn-go-mega-don",
  "playn-go-merlin-journey-of-flame",
  "playn-go-merlins-grimoire",
  "playn-go-moon-princess-christmas-kingdom",
  "playn-go-piggy-heist",
  "playn-go-mystery-joker",
  "playn-go-multifruit-81",
  "playn-go-phoenix-reborn",
  "playn-go-motley-crue",
  "playn-go-primal-rampage",
  "playn-go-photo-safari",
  "playn-go-kings-mask-eclipse-of-gods",
  "playn-go-golden-caravan",
  "playn-go-golden-legend",
  "playn-go-prissy-princess",
  "playn-go-puebla-parade",
  "playn-go-aztec-idols",
  "playn-go-buildin-even-more-bucks",
  "playn-go-pearls-of-india",
  "playn-go-demon",
  "playn-go-invading-vegas-revenge-on-mars",
  "playn-go-jolly-roger",
  "playn-go-rage-to-riches",
  "playn-go-infernal-trinity-go-guaranteed",
  "playn-go-playn-go-mole-digger",
  "playn-go-coils-of-cash",
  "playn-go-love-joker",
  "playn-go-gold-of-fortune-god",
] as const;

function score(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  const facts = [details?.field, details?.rtp, details?.maxWin, details?.volatility, details?.releaseDate];
  return facts.filter(Boolean).length + (type ? 1 : 0) + (research?.mechanics.length ?? 0);
}

test("bulk Play'n GO score-six enrichment promotes every targeted card", () => {
  const residual = targets.filter((slug) => score(slug) <= 6);
  expect(residual, `Targets still at score <= 6: ${residual.join(", ")}`).toEqual([]);
});
