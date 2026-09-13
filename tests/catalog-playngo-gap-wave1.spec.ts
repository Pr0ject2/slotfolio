import { test, expect } from "@playwright/test";
import { catalogSeeds } from "../src/lib/catalog-seeds";
import { slots } from "../src/lib/data";
import { getVerifiedCatalogDetails } from "../src/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "../src/lib/catalog-verified-game-type";

const wave1Slugs = [
  "playn-go-nsync-pop",
  "playn-go-1001-mystery-genie-fortunes",
  "playn-go-13th-trial-hercules-abyssways",
  "playn-go-15-crystal-roses-a-tale-of-love",
  "playn-go-24k-dragon",
  "playn-go-3-blades-and-blessings",
  "playn-go-3-clown-monty",
  "playn-go-3-clown-monty-ii",
  "playn-go-ace-of-spades",
  "playn-go-animal-madness",
  "playn-go-annihilator",
  "playn-go-big-win-cat",
  "playn-go-big-win-cat-pawsperity",
  "playn-go-blazin-bullfrog",
  "playn-go-blinged",
  "playn-go-boat-bonanza-christmas",
  "playn-go-boat-bonanza-colossal-catch",
  "playn-go-boat-bonanza-down-under",
  "playn-go-book-of-dead-go-collect",
  "playn-go-bubblin-riches",
  "playn-go-buildin-bucks",
  "playn-go-buildin-even-more-bucks",
  "playn-go-buildin-more-bucks",
  "playn-go-bull-in-a-rodeo",
  "playn-go-bullion-xpress",
  "playn-go-candy-island-princess",
  "playn-go-canine-carnage",
  "playn-go-captain-glum-pirate-hunter",
  "playn-go-captain-xenos-earth-adventure",
  "playn-go-cash-of-command",
  "playn-go-cash-pump",
  "playn-go-cash-vandal",
  "playn-go-cash-a-cabana",
  "playn-go-cashin-joker",
  "playn-go-cat-wilde-and-the-doom-of-dead",
  "playn-go-cat-wilde-and-the-incan-quest",
  "playn-go-cat-wilde-and-the-lost-chapter",
  "playn-go-cat-wilde-and-the-pyramids-of-dead",
  "playn-go-cat-wilde-in-the-eclipse-of-the-sun-god",
  "playn-go-rainforest-magic",
];

const gridSlots = new Set(["playn-go-animal-madness", "playn-go-cash-of-command"]);

test("Play’n GO gap wave 1 stays selected and preserves exact official sources", () => {
  const selected = new Map(catalogSeeds.map((seed) => [seed.slug, seed]));

  for (const slug of wave1Slugs) {
    const seed = selected.get(slug);
    expect(seed, slug).toBeTruthy();
    expect(slots.some((slot) => slot.provider === seed!.provider && slot.name === seed!.name), slug).toBe(false);
    expect(getVerifiedCatalogDetails(slug)?.source, slug).toBe(seed!.source);
    const type = getVerifiedCatalogGameType(slug);
    expect(type?.source, slug).toBe(seed!.source);
    expect(type?.gameType, slug).toBe(gridSlots.has(slug) ? "Grid Slot" : "Video Slot");
  }

  expect(catalogSeeds.some((seed) => seed.slug === "playn-go-bugs-party"), "Bugs Party is official Video Bingo, not a slot").toBe(false);
});
