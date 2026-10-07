import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-kiss-reels-of-rock", "Kiss Reels of Rock"],
  ["playn-go-lab-of-madness-its-a-wild", "Lab of Madness It's A-Wild!"],
  ["playn-go-lady-of-fortune", "Lady of Fortune"],
  ["playn-go-lady-of-fortune-destiny-spins", "Lady of Fortune Destiny Spins"],
  ["playn-go-lady-of-fortune-remastered", "Lady of Fortune Remastered"],
  ["playn-go-lawn-n-disorder", "Lawn n' Disorder"],
  ["playn-go-legacy-of-dynasties", "Legacy of Dynasties"],
  ["playn-go-legacy-of-egypt", "Legacy of Egypt"],
  ["playn-go-legacy-of-gems-blitzways", "Legacy of Gems Blitzways"],
  ["playn-go-legacy-of-inca", "Legacy of Inca"],
  ["playn-go-legacy-of-undead-dragon-abyssways", "Legacy of Undead Dragon ABYSSWAYS"],
  ["playn-go-legend-of-the-ice-dragon", "Legend of the Ice Dragon"],
  ["playn-go-legion-gold", "Legion Gold"],
  ["playn-go-legion-gold-and-the-sphinx-of-dead", "Legion Gold and the Sphinx of Dead"],
  ["playn-go-legion-gold-and-the-throne-of-dead", "Legion Gold and the Throne of Dead"],
  ["playn-go-legion-gold-reckoning", "Legion Gold Reckoning"],
  ["playn-go-legion-gold-unleashed", "Legion Gold Unleashed"],
  ["playn-go-legion-gold-victory", "Legion Gold Victory!"],
  ["playn-go-leprechaun-goes-egypt", "Leprechaun goes Egypt"],
  ["playn-go-leprechaun-goes-wild", "Leprechaun Goes Wild"]
] as const;

test("wave 45 artwork is loaded in the catalog list", async ({ page }) => {
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
