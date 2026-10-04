import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-spear-of-athena", "Goddess Respin"],
  ["hacksaw-gaming-spinman", "Booster Wheel"],
  ["hacksaw-gaming-steamrunners", "Gas Canister"],
  ["hacksaw-gaming-stormborn", "Thunder Respins"],
  ["hacksaw-gaming-strength-of-hercules", "RotoGrid"],
  ["hacksaw-gaming-sun-princess", "Sun Ray Frame"],
  ["hacksaw-gaming-superstar-sevens", "Cascade Counter"],
  ["hacksaw-gaming-supreme-zeus", "CoinWays"],
  ["hacksaw-gaming-tai-the-toad", "Prosperity Pot"],
  ["hacksaw-gaming-temple-of-torment", "Golden Scarab"],
] as const;

test("wave 25 Hacksaw cards render game-specific editorial copy and loaded official artwork", async ({ page }) => {
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
