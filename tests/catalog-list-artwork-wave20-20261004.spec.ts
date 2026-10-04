import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-great-game-rockies", "Great Game Rockies"],
  ["hacksaw-gaming-grug-make-fire", "Grug Make Fire"],
  ["hacksaw-gaming-hot-ross", "Hot Ross"],
  ["hacksaw-gaming-hounds-of-hell", "Hounds of Hell"],
  ["hacksaw-gaming-immortal-desire", "Immortal Desire"],
  ["hacksaw-gaming-invictus", "Invictus"],
  ["hacksaw-gaming-jaws-of-justice", "Jaws of Justice"],
  ["hacksaw-gaming-jelly-slice", "Jelly Slice"],
  ["hacksaw-gaming-keepem", "Keep'em"],
  ["hacksaw-gaming-klowns", "Klowns"],
] as const;

test("wave 20 artwork is loaded in the catalog list", async ({ page }) => {
  for (const [slug, name] of slots) {
    await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    const art = card.locator(".catalog-game-art .game-image");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight)).toBeGreaterThan(0);
  }
});
