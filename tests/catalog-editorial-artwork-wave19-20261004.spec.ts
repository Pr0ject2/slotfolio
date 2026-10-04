import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-evil-eyes", "Evil Spread"],
  ["hacksaw-gaming-eye-of-medusa", "Petrified"],
  ["hacksaw-gaming-eye-of-the-panda", "Panda Collector"],
  ["hacksaw-gaming-feel-the-beat", "Speaker Mechanic"],
  ["hacksaw-gaming-fighter-pit", "Wild Fist Reel"],
  ["hacksaw-gaming-fire-my-laser", "Bombs и Lasers"],
  ["hacksaw-gaming-fist-of-destruction", "Victory Points"],
  ["hacksaw-gaming-freds-food-truck", "Green Chilies"],
  ["hacksaw-gaming-frkn-bananas", "Spreading Banana"],
  ["hacksaw-gaming-get-the-cheese", "Jumping Wild Multipliers"],
] as const;

test("wave 19 Hacksaw cards render game-specific editorial copy and loaded official artwork", async ({ page }) => {
  for (const [slug, phrase] of slots) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#how-it-works")).toContainText(phrase);
    const art = page.locator(".slot-figure .catalog-dossier-art");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight)).toBeGreaterThan(0);
  }
});
