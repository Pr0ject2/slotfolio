import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-boat-bonanza-down-under", "Boat Bonanza Down Under"],
  ["playn-go-book-of-dead-go-collect", "Book of Dead GO Collect"],
  ["playn-go-bubblin-riches", "Bubblin' Riches"],
  ["playn-go-buildin-bucks", "Buildin' Bucks"],
  ["playn-go-buildin-even-more-bucks", "Buildin' Even More Bucks"],
  ["playn-go-buildin-more-bucks", "Buildin' More Bucks"],
  ["playn-go-bull-in-a-china-shop", "Bull in a China Shop"],
  ["playn-go-bull-in-a-rodeo", "Bull in a Rodeo"],
  ["playn-go-bullion-xpress", "Bullion Xpress"],
  ["playn-go-candy-island-princess", "Candy Island Princess"],
] as const;

test("wave 32 artwork is loaded in the catalog list", async ({ page }) => {
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
