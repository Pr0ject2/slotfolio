import { expect, test } from "@playwright/test";

const slots = [
  ["endorphina-3-golden-chests", "Boost, Mystery и Collect chests"],
  ["endorphina-burning-coins-100", "Hot Hold Boost"],
  ["endorphina-burning-coins-20-dice", "Fiery Fortune Bonus Game"],
  ["endorphina-chance-machine-90s", "Bonus Symbols"],
  ["endorphina-druids-fortune", "Heart of Harmony Bonus Game"],
  ["endorphina-fortune-bankers", "Cascading Reels"],
  ["endorphina-fortune-chests-dice", "Pick Me, Hold & Win и Jackpot Collecting"],
  ["endorphina-gift-of-midas", "три варианта Free Games"],
  ["endorphina-groovin-tiger", "Tiger Wild"],
  ["endorphina-hell-hot-1000", "Pick ’Em Game"],
] as const;

test("wave 14 Endorphina cards render game-specific editorial copy and official artwork", async ({ page }) => {
  for (const [slug, phrase] of slots) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#how-it-works")).toContainText(phrase);
    await expect(page.locator(".slot-figure .catalog-dossier-art")).toHaveAttribute("src", new RegExp(slug));
  }
});
