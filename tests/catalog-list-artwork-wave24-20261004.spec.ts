import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-rise-of-fortuna", "Rise of Fortuna"],
  ["hacksaw-gaming-rise-of-ymir", "Rise of Ymir"],
  ["hacksaw-gaming-ronin-stackways", "Ronin Stackways"],
  ["hacksaw-gaming-rusty-and-curly", "Rusty & Curly"],
  ["hacksaw-gaming-sand-and-ashes", "Sand and Ashes"],
  ["hacksaw-gaming-shaolin-master", "Shaolin Master"],
  ["hacksaw-gaming-sixsixsix", "SixSixSix"],
  ["hacksaw-gaming-slayers-inc", "Slayers Inc"],
  ["hacksaw-gaming-smoking-dragon", "Smoking Dragon"],
  ["hacksaw-gaming-snow-slingers", "Snow Slingers"],
] as const;

test("wave 24 artwork is loaded in the catalog list", async ({ page }) => {
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
