import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-le-sortudo", "Le Sortudo"],
  ["hacksaw-gaming-le-viking", "Le Viking"],
  ["hacksaw-gaming-le-zeus", "Le Zeus"],
  ["hacksaw-gaming-magic-piggy-og", "Magic Piggy OG"],
  ["hacksaw-gaming-marlin-masters", "Marlin Masters"],
  ["hacksaw-gaming-marlin-masters-atlantis", "Marlin Masters Atlantis"],
  ["hacksaw-gaming-marlin-masters-og", "Marlin Masters OG"],
  ["hacksaw-gaming-marlin-masters-the-big-haul", "Marlin Masters: The Big Haul"],
  ["hacksaw-gaming-mayan-stackways", "Mayan Stackways"],
  ["hacksaw-gaming-miami-mayhem", "Miami Mayhem"],
] as const;

test("wave 22 artwork is loaded in the catalog list", async ({ page }) => {
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
