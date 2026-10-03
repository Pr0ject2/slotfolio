import { expect, test } from "@playwright/test";

const slots = [
  ["3-oaks-gaming-supreme-diamond-xxl", "Collect Symbols"],
  ["3-oaks-gaming-thunder-tiger", "Linear Bonus"],
  ["3-oaks-gaming-tiger-gems", "Fortune Slide"],
  ["3-oaks-gaming-tiger-jungle", "Sticky Wilds"],
  ["3-oaks-gaming-wolf-night", "Wild-множители"],
  ["bgaming-3-lucky-monkeys-hold-and-win", "Expand, Collect и Boost"],
  ["bgaming-alien-fruits-3", "Spin Modifiers"],
  ["bgaming-bonanza-billion-merge-uptm", "Merge Up™+"],
  ["bgaming-book-of-hidden-tombs", "Golden Expanding Symbol"],
  ["bgaming-cats-love-yummy", "Cats Jackpot"],
] as const;

test("wave 11 cards render game-specific editorial copy and official artwork", async ({ page }) => {
  for (const [slug, phrase] of slots) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#how-it-works")).toContainText(phrase);
    await expect(page.locator(".slot-figure .catalog-dossier-art")).toHaveAttribute("src", new RegExp(slug));
  }
});
