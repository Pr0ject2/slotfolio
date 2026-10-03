import { expect, test } from "@playwright/test";

const slots = [
  ["bgaming-mystic-reels", "Cascade+"],
  ["bgaming-red-hot-chilli-chickens", "Colossal Free Spins"],
  ["bgaming-reel-of-ra", "Multiplier Reel"],
  ["bgaming-st-patricks-pots-hold-and-win", "Feature Pots"],
  ["bgaming-stars-and-stripes-hold-and-win", "Dynamite"],
  ["bgaming-sweet-samurai", "3×4×3×4×3"],
  ["bgaming-the-godfather-3-pillars-of-power", "Honor Hold & Win Spins"],
  ["bgaming-train-heist-johnny-cash", "highlighted cells"],
  ["bgaming-wincent-wolf", "Wheel of Fortune"],
  ["bgaming-yokai", "Moon Multiplier"],
] as const;

test("wave 13 BGaming cards render game-specific editorial copy and official artwork", async ({ page }) => {
  for (const [slug, phrase] of slots) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#how-it-works")).toContainText(phrase);
    await expect(page.locator(".slot-figure .catalog-dossier-art")).toHaveAttribute("src", new RegExp(slug));
  }
});
