import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-holiday-spirits", "Holiday Spirits"],
  ["playn-go-holy-moo-extreme-power", "Holy Moo! Extreme Power"],
  ["playn-go-honey-rush", "Honey Rush"],
  ["playn-go-honey-rush-100", "Honey Rush 100"],
  ["playn-go-honey-rush-black-and-yellow", "Honey Rush Black and Yellow"],
  ["playn-go-hooligan-hustle", "Hooligan Hustle"],
  ["playn-go-hope-unleashed-fortune-rises", "Hope Unleashed Fortune Rises"],
  ["playn-go-hot-dog-heist", "Hot Dog Heist"],
  ["playn-go-hotel-yeti-way", "Hotel Yeti-Way"],
  ["playn-go-house-of-doom", "House of Doom"],
  ["playn-go-house-of-doom-2-the-crypt", "House of Doom 2: The Crypt"],
  ["playn-go-hugo", "Hugo"],
  ["playn-go-hugo-2", "Hugo 2"],
  ["playn-go-hugo-carts", "Hugo Carts"],
  ["playn-go-hugo-goal", "Hugo Goal"],
  ["playn-go-hugo-legacy", "Hugo Legacy"],
  ["playn-go-hugos-adventure", "Hugo's Adventure"],
  ["playn-go-ice-joker", "Ice Joker"],
  ["playn-go-idol-of-fortune", "Idol of Fortune"],
  ["playn-go-immortails-of-egypt", "ImmorTails of Egypt"]
] as const;

test("wave 43 artwork is loaded in the catalog list", async ({ page }) => {
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
