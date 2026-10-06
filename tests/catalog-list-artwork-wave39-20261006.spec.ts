import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-eye-of-the-kraken", "Eye of the Kraken"],
  ["playn-go-fangs-and-fire", "Fangs & Fire"],
  ["playn-go-fat-frankies", "Fat Frankies"],
  ["playn-go-fate-of-dead-blitzways", "Fate of Dead Blitzways"],
  ["playn-go-fates-fortune", "Fate's Fortune"],
  ["playn-go-feline-fury", "Feline Fury"],
  ["playn-go-fire-joker-100", "Fire Joker 100"],
  ["playn-go-fire-joker-blitz", "Fire Joker Blitz"],
  ["playn-go-fire-joker-freeze", "Fire Joker Freeze"],
  ["playn-go-fire-toad", "Fire Toad"],
] as const;

test("wave 39 artwork is loaded in the catalog list", async ({ page }) => {
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
