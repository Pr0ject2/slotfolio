import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-fire-toad-2", "Fire Toad 2"],
  ["playn-go-firefly-frenzy", "Firefly Frenzy"],
  ["playn-go-forge-of-fortunes", "Forge of Fortunes"],
  ["playn-go-forge-of-gems", "Forge of Gems"],
  ["playn-go-fortune-teller", "Fortune Teller"],
  ["playn-go-fortunes-of-ali-baba", "Fortunes of Ali Baba"],
  ["playn-go-fox-mayhem", "Fox Mayhem"],
  ["playn-go-free-reelin-joker", "Free Reelin' Joker"],
  ["playn-go-free-reelin-joker-1000", "Free Reelin' Joker 1000"],
  ["playn-go-frozen-gems", "Frozen Gems"],
] as const;

test("wave 40 artwork is loaded in the catalog list", async ({ page }) => {
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
