import { test, expect } from "@playwright/test";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";
import { getVerifiedCatalogResearch } from "../src/lib/catalog-research-lookup";

function scoreFor(slug: string) {
  const details = getVerifiedCatalogDetails(slug);
  const type = getVerifiedCatalogGameType(slug);
  const research = getVerifiedCatalogResearch(slug);
  return (details ? [details.field, details.rtp, details.maxWin, details.volatility, details.releaseDate].filter(Boolean).length : 0)
    + (type ? 1 : 0)
    + (research?.mechanics.length ?? 0);
}

const enriched = [
  "playn-go-boat-bonanza-christmas",
  "playn-go-boat-bonanza-colossal-catch",
  "playn-go-boat-bonanza-down-under",
  "playn-go-bull-in-a-rodeo",
  "playn-go-chambers-of-ancients",
  "playn-go-colt-lightning-firestorm",
  "playn-go-colt-lightning-inferno",
  "playn-go-dragonfates-favor",
  "playn-go-easter-eggspedition",
  "playn-go-hot-dog-heist",
  "playn-go-ice-joker",
  "playn-go-invading-vegas-las-christmas",
  "playn-go-kings-mask-eclipse-of-gods",
  "playn-go-kingdom-below",
  "playn-go-lady-of-fortune-remastered",
  "playn-go-legion-gold-and-the-sphinx-of-dead",
  "playn-go-legion-gold-unleashed",
  "playn-go-lion-saga-odyssey",
  "playn-go-mafia-gold",
  "playn-go-matsuri",
  "playn-go-mega-don-feeding-frenzy",
  "playn-go-mirror-joker",
  "playn-go-moon-princess-100",
  "playn-go-mystery-genie-fortunes-of-the-lamp",
  "playn-go-piggy-blitz-casino-gold",
  "playn-go-raging-rex-2",
  "playn-go-raging-rex-3",
  "playn-go-playn-go-wrappin-gold",
  "playn-go-24k-dragon",
  "playn-go-3-clown-monty-ii",
  "playn-go-ankh-of-anubis",
  "playn-go-bakers-treat",
  "playn-go-beasts-of-fire",
  "playn-go-big-win-cat",
  "playn-go-blazin-bullfrog",
  "playn-go-buildin-bucks",
  "playn-go-contact",
  "playn-go-honey-rush-100",
  "playn-go-15-crystal-roses-a-tale-of-love",
  "playn-go-ace-of-spades",
  "playn-go-aztec-warrior-princess",
  "playn-go-battle-royal",
  "playn-go-big-win-777",
  "playn-go-cash-pump",
  "playn-go-cash-vandal",
  "playn-go-cat-wilde-and-the-doom-of-dead",
  "playn-go-charlie-chance",
  "playn-go-charlie-chance-in-hell-to-pay",
  "playn-go-chinese-new-year",
];

test("Play’n GO 2026-09-19 provider waves keep every enriched card beyond score four", () => {
  for (const slug of enriched) {
    expect(scoreFor(slug), slug).toBeGreaterThanOrEqual(5);
  }
});

test("Play’n GO 2026-09-19 provider waves retain representative official mechanics", () => {
  const contact = getVerifiedCatalogResearch("playn-go-contact")?.mechanics ?? [];
  expect(contact).toEqual(expect.arrayContaining(["Кластеры", "Множители", "Удаление символов", "Трансформация символов"]));

  const cashVandal = getVerifiedCatalogResearch("playn-go-cash-vandal")?.mechanics ?? [];
  expect(cashVandal).toEqual(expect.arrayContaining(["Респины", "Wild Reels", "Mega Symbols", "Mystery Symbols", "Stacked Wilds"]));

  const coltInferno = getVerifiedCatalogResearch("playn-go-colt-lightning-inferno")?.mechanics ?? [];
  expect(coltInferno).toEqual(expect.arrayContaining(["Sticky Frames", "Расширяющиеся барабаны", "Hold N Load", "Респины", "Множители"]));

  const bigWin777 = getVerifiedCatalogResearch("playn-go-big-win-777")?.mechanics ?? [];
  expect(bigWin777).toEqual(expect.arrayContaining(["Бонусное колесо", "Instant Prizes", "Sticky Wilds", "Gamble"]));

  const charlie = getVerifiedCatalogResearch("playn-go-charlie-chance")?.mechanics ?? [];
  expect(charlie).toEqual(expect.arrayContaining(["Множители", "Респины", "Sticky Wilds", "Moving Wilds"]));
});
