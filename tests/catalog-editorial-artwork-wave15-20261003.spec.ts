import { expect, test } from "@playwright/test";

const slots = [
  ["endorphina-moofo", "Milk ’Em, Moo Hold и MooFo UFO"],
  ["endorphina-zalatar", "Mystery Pick ’Em"],
  ["hacksaw-gaming-2-wild-2-die", "Revolvers"],
  ["hacksaw-gaming-3-cursed-chests-hold-and-win", "Cursed Coins Hold & Win"],
  ["hacksaw-gaming-aiko-and-the-wind-spirit", "Zephyr Crest"],
  ["hacksaw-gaming-arizona-james-and-the-lost-relics", "Pistol Cylinder"],
  ["hacksaw-gaming-army-of-ares", "Wrath Reel"],
  ["hacksaw-gaming-bash-bros", "Cash Stack"],
  ["hacksaw-gaming-beam-boys", "Wild Laser Cat"],
  ["hacksaw-gaming-beast-below", "Oxygen Charges"],
] as const;

test("wave 15 cards render game-specific editorial copy and official artwork", async ({ page }) => {
  for (const [slug, phrase] of slots) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#how-it-works")).toContainText(phrase);
    await expect(page.locator(".slot-figure .catalog-dossier-art")).toHaveAttribute("src", new RegExp(slug));
  }
});
