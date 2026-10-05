import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-canine-carnage", "Canine Carnage"],
  ["playn-go-captain-glum-pirate-hunter", "Captain Glum: Pirate Hunter"],
  ["playn-go-captain-xenos-earth-adventure", "Captain Xeno's Earth Adventure"],
  ["playn-go-cash-of-command", "Cash of Command"],
  ["playn-go-cash-pump", "Cash Pump"],
  ["playn-go-cash-vandal", "Cash Vandal"],
  ["playn-go-cash-a-cabana", "Cash-a-Cabana"],
  ["playn-go-cashin-joker", "Cashin' Joker"],
  ["playn-go-cat-wilde-and-the-doom-of-dead", "Cat Wilde and the Doom of Dead"],
  ["playn-go-cat-wilde-and-the-incan-quest", "Cat Wilde and the Incan Quest"],
] as const;

test("wave 33 artwork is loaded in the catalog list", async ({ page }) => {
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
