import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-fu-er-dai", "FU ER DAI"],
  ["playn-go-fulong-88", "Fulong 88"],
  ["playn-go-game-of-gladiators", "Game of Gladiators"],
  ["playn-go-game-of-gladiators-uprising", "Game of Gladiators: Uprising"],
  ["playn-go-gargantoonz", "Gargantoonz"],
  ["playn-go-gates-of-troy", "Gates of Troy"],
  ["playn-go-gemix", "Gemix"],
  ["playn-go-gemix-100", "Gemix 100"],
  ["playn-go-gemix-2", "Gemix 2"],
  ["playn-go-gerards-gambit", "Gerard's Gambit"],
] as const;

test("wave 41 artwork is loaded in the catalog list", async ({ page }) => {
  for (const [slug, name] of slots) {
    await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    const art = card.locator(".catalog-game-art .game-image");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
