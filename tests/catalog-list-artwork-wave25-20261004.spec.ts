import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-spear-of-athena", "Spear of Athena"],
  ["hacksaw-gaming-spinman", "Spinman"],
  ["hacksaw-gaming-steamrunners", "Steamrunners"],
  ["hacksaw-gaming-stormborn", "Stormborn"],
  ["hacksaw-gaming-strength-of-hercules", "Strength of Hercules"],
  ["hacksaw-gaming-sun-princess", "Sun Princess"],
  ["hacksaw-gaming-superstar-sevens", "Superstar Sevens"],
  ["hacksaw-gaming-supreme-zeus", "Supreme Zeus"],
  ["hacksaw-gaming-tai-the-toad", "Tai the Toad"],
  ["hacksaw-gaming-temple-of-torment", "Temple of Torment"],
] as const;

test("wave 25 artwork is loaded in the catalog list", async ({ page }) => {
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
