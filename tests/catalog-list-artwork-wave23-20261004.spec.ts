import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-mighty-masks", "Mighty Masks"],
  ["hacksaw-gaming-munchy-milo", "Munchy Milo"],
  ["hacksaw-gaming-octo-attack", "Octo Attack"],
  ["hacksaw-gaming-orb-of-destiny", "Orb of Destiny"],
  ["hacksaw-gaming-phoenix-duelreels", "Phoenix DuelReels"],
  ["hacksaw-gaming-pray-for-six", "Pray for Six"],
  ["hacksaw-gaming-pray-for-three", "Pray for Three"],
  ["hacksaw-gaming-rainbow-princess", "Rainbow Princess"],
  ["hacksaw-gaming-red-rascal", "Red Rascal"],
  ["hacksaw-gaming-reign-of-rome", "Reign of Rome"],
] as const;

test("wave 23 artwork is loaded in the catalog list", async ({ page }) => {
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
