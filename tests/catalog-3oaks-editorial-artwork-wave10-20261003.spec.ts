import { expect, test } from "@playwright/test";

const slots = [
  ["3-oaks-gaming-sun-of-egypt-2", "Mystery Symbol"],
  ["3-oaks-gaming-sun-of-egypt-3", "Super Bonus"],
  ["3-oaks-gaming-sun-of-egypt-4", "Sun Meter"],
  ["3-oaks-gaming-sun-of-egypt-5", "Power Symbol"],
  ["3-oaks-gaming-sunlight-princess", "Sun Meter"],
  ["3-oaks-gaming-super-china-pots", "White Pot"],
  ["3-oaks-gaming-super-hot-chilli", "Multiplier, Upgrade и Boost"],
  ["3-oaks-gaming-super-hot-teapots", "Master Teapot"],
  ["3-oaks-gaming-super-hotfire-diamonds", "Super Wheel"],
  ["3-oaks-gaming-super-sticky-piggy", "Jumping Piggy Wild"],
] as const;

test("next ten 3 Oaks cards render game-specific editorial copy and artwork", async ({ page }) => {
  for (const [slug, phrase] of slots) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#how-it-works")).toContainText(phrase);
    await expect(page.locator(".slot-figure .catalog-dossier-art")).toHaveAttribute("src", new RegExp(slug));
  }
});
