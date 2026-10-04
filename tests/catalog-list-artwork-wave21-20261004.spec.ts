import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-le-bunny", "Le Bunny"],
  ["hacksaw-gaming-le-cowboy", "Le Cowboy"],
  ["hacksaw-gaming-le-digger", "Le Digger"],
  ["hacksaw-gaming-le-fisherman", "Le Fisherman"],
  ["hacksaw-gaming-le-football-fan", "Le Football Fan"],
  ["hacksaw-gaming-le-hooligan", "Le Hooligan"],
  ["hacksaw-gaming-le-king", "Le King"],
  ["hacksaw-gaming-le-pharaoh", "Le Pharaoh"],
  ["hacksaw-gaming-le-prechaun", "Le Prechaun"],
  ["hacksaw-gaming-le-santa", "Le Santa"],
] as const;

test("wave 21 artwork is loaded in the catalog list", async ({ page }) => {
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
