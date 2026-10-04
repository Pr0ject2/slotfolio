import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-danny-dollar", "Danny Dollar"],
  ["hacksaw-gaming-dark-spiral", "Dark Spiral"],
  ["hacksaw-gaming-dark-summoning", "Dark Summoning"],
  ["hacksaw-gaming-dawn-of-kings", "Dawn of Kings"],
  ["hacksaw-gaming-deal-with-death", "Deal With Death"],
  ["hacksaw-gaming-death-becomes-you", "Death Becomes You"],
  ["hacksaw-gaming-densho", "Densho"],
  ["hacksaw-gaming-divine-drop", "Divine Drop"],
  ["hacksaw-gaming-donny-and-danny", "Donny and Danny"],
  ["hacksaw-gaming-donny-dough", "Donny Dough"],
] as const;

test("wave 17 artwork is visible in the catalog list, not only on dossier pages", async ({ page }) => {
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
