import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-the-count", "The Count"],
  ["hacksaw-gaming-the-luxe", "The Luxe"],
  ["hacksaw-gaming-the-wildwood-curse", "The Wildwood Curse"],
  ["hacksaw-gaming-tiger-legends", "Tiger Legends"],
  ["hacksaw-gaming-toshi-ways-club", "Toshi Ways Club"],
  ["hacksaw-gaming-twisted-lab", "Twisted Lab"],
  ["hacksaw-gaming-ultimate-slot-of-america", "Ultimate Slot of America"],
  ["hacksaw-gaming-vending-machine", "Vending Machine"],
  ["hacksaw-gaming-wings-of-horus", "Wings of Horus"],
  ["hacksaw-gaming-wishbringer", "Wishbringer"],
] as const;

test("wave 26 artwork is loaded in the catalog list", async ({ page }) => {
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
