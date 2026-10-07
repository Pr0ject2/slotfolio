import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-imperial-opera", "Imperial Opera"],
  ["playn-go-infernal-trinity-go-guaranteed", "Infernal Trinity GO Guaranteed"],
  ["playn-go-inferno-joker", "Inferno Joker"],
  ["playn-go-inferno-star", "Inferno Star"],
  ["playn-go-invading-vegas", "Invading Vegas"],
  ["playn-go-invading-vegas-revenge-on-mars", "Invading Vegas Revenge on Mars"],
  ["playn-go-invading-vegas-las-christmas", "Invading Vegas: Las Christmas"],
  ["playn-go-irish-gold", "Irish Gold"],
  ["playn-go-iron-girl", "Iron Girl"],
  ["playn-go-jade-magician", "Jade Magician"],
  ["playn-go-jewel-box", "Jewel Box"],
  ["playn-go-joker-flip", "Joker Flip"],
  ["playn-go-jolly-roger", "Jolly Roger"],
  ["playn-go-jolly-roger-2", "Jolly Roger 2"],
  ["playn-go-jolly-roger-wild-kraken", "Jolly Roger Wild Kraken"],
  ["playn-go-journey-to-paris", "Journey to Paris"],
  ["playn-go-king-of-sweets", "King of Sweets"],
  ["playn-go-kings-mask", "King's Mask"],
  ["playn-go-kings-mask-eclipse-of-gods", "King's Mask Eclipse of Gods"],
  ["playn-go-kingdom-below", "Kingdom Below"]
] as const;

test("wave 44 artwork is loaded in the catalog list", async ({ page }) => {
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
