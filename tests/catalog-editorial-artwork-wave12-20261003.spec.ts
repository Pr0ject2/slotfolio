import { expect, test } from "@playwright/test";

const slots = [
  ["bgaming-chicken-fire", "Chicken Multipliers"],
  ["bgaming-divine-queen-power-of-sun", "Cell Multipliers"],
  ["bgaming-dusty-duel", "Wild or Dead Duel"],
  ["bgaming-fortune-trio-minions-of-fu", "Collect Coin"],
  ["bgaming-frenzy-clusters", "Rocket, Book и Sphere"],
  ["bgaming-fruit-million-respin", "Expanding Wild"],
  ["bgaming-johnny-vs-chicken", "Multiplier Duel"],
  ["bgaming-miss-cherry-wild-frames", "Wild Frames"],
  ["bgaming-money-maker", "Gamble Round"],
  ["bgaming-multi-rush", "Rush Symbols"],
] as const;

test("wave 12 BGaming cards render game-specific editorial copy and official artwork", async ({ page }) => {
  for (const [slug, phrase] of slots) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#how-it-works")).toContainText(phrase);
    await expect(page.locator(".slot-figure .catalog-dossier-art")).toHaveAttribute("src", new RegExp(slug));
  }
});
