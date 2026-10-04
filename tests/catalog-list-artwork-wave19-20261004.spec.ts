import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-evil-eyes", "Evil Eyes"],
  ["hacksaw-gaming-eye-of-medusa", "Eye of Medusa"],
  ["hacksaw-gaming-eye-of-the-panda", "Eye of the Panda"],
  ["hacksaw-gaming-feel-the-beat", "Feel the Beat"],
  ["hacksaw-gaming-fighter-pit", "Fighter Pit"],
  ["hacksaw-gaming-fire-my-laser", "Fire my Laser"],
  ["hacksaw-gaming-fist-of-destruction", "Fist of Destruction"],
  ["hacksaw-gaming-freds-food-truck", "Freds Food Truck"],
  ["hacksaw-gaming-frkn-bananas", "FRKN Bananas"],
  ["hacksaw-gaming-get-the-cheese", "Get the CHEESE"],
] as const;

test("wave 19 artwork is loaded in the catalog list", async ({ page }) => {
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
