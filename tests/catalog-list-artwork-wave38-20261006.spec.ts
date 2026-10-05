import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-dr-toonz", "Dr. Toonz"],
  ["playn-go-dragon-maiden", "Dragon Maiden"],
  ["playn-go-dragon-ship", "Dragon Ship"],
  ["playn-go-dragonfates-favor", "Dragonfate's Favor"],
  ["playn-go-easter-eggs", "Easter Eggs"],
  ["playn-go-easter-eggspedition", "Easter Eggspedition"],
  ["playn-go-enchanted-crystals", "Enchanted Crystals"],
  ["playn-go-enchanted-meadow", "Enchanted Meadow"],
  ["playn-go-energoonz", "Energoonz"],
  ["playn-go-eye-of-atum", "Eye of Atum"],
] as const;

test("wave 38 artwork is loaded in the catalog list", async ({ page }) => {
  for (const [slug, name] of slots) {
    await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    const art = card.locator(".catalog-game-art .game-image");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
