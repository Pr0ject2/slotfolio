import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-chronos-joker", "Chronos Joker"],
  ["playn-go-city-of-sound", "City of Sound"],
  ["playn-go-clash-of-camelot", "Clash of Camelot"],
  ["playn-go-cloud-quest", "Cloud Quest"],
  ["playn-go-coils-of-cash", "Coils of Cash"],
  ["playn-go-colt-lightning", "Colt Lightning"],
  ["playn-go-colt-lightning-firestorm", "Colt Lightning Firestorm"],
  ["playn-go-colt-lightning-inferno", "Colt Lightning Inferno"],
  ["playn-go-contact", "Contact"],
  ["playn-go-cops-n-robbers", "Cops ’n’ Robbers"],
] as const;

test("wave 35 artwork is loaded in the catalog list", async ({ page }) => {
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
