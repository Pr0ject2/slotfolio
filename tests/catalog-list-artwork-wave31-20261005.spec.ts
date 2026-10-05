import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-big-win-777", "Big Win 777"],
  ["playn-go-big-win-cat", "Big Win Cat"],
  ["playn-go-big-win-cat-pawsperity", "Big Win Cat Pawsperity"],
  ["playn-go-black-mamba", "Black Mamba"],
  ["playn-go-blazin-bullfrog", "Blazin' Bullfrog"],
  ["playn-go-blinged", "Blinged"],
  ["playn-go-boat-bonanza", "Boat Bonanza"],
  ["playn-go-boat-bonanza-christmas", "Boat Bonanza Christmas"],
  ["playn-go-boat-bonanza-colossal-catch", "Boat Bonanza Colossal Catch"],
  ["playn-go-boat-bonanza-croconile", "Boat Bonanza CrocoNile!"],
] as const;

test("wave 31 artwork is loaded in the catalog list", async ({ page }) => {
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
