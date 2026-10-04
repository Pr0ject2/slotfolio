import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-donut-division", "Donut Division"],
  ["hacksaw-gaming-dorks-of-the-deep", "Dorks of the Deep"],
  ["hacksaw-gaming-dragons-domain", "Dragon's Domain"],
  ["hacksaw-gaming-dropem", "Drop'em"],
  ["hacksaw-gaming-duel-at-dawn", "Duel at Dawn"],
  ["hacksaw-gaming-dusk-princess", "Dusk Princess"],
  ["hacksaw-gaming-dynasty-of-death", "Dynasty of Death"],
  ["hacksaw-gaming-epic-bullets-and-bounty", "Epic Bullets and Bounty"],
  ["hacksaw-gaming-epic-ze-zeus", "Epic Ze Zeus"],
  ["hacksaw-gaming-eternal-duel", "Eternal Duel"],
] as const;

test("wave 18 artwork is visible in the catalog list as a local image", async ({ page }) => {
  for (const [slug, name] of slots) {
    await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    const art = card.locator(".catalog-game-art .game-image");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
  }
});
