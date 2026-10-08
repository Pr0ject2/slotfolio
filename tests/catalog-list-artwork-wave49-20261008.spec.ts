import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-perfect-gems", "Perfect Gems"],
  ["playn-go-phoenix-reborn", "Phoenix Reborn"],
  ["playn-go-photo-safari", "Photo Safari"],
  ["playn-go-piggy-bank-farm", "Piggy Bank Farm"],
  ["playn-go-piggy-blitz", "Piggy Blitz"],
  ["playn-go-piggy-blitz-casino-gold", "Piggy Blitz Casino Gold"],
  ["playn-go-piggy-blitz-disco-gold", "Piggy Blitz Disco Gold"],
  ["playn-go-piggy-heist", "Piggy Heist"],
  ["playn-go-pilgrim-of-dead", "Pilgrim of Dead"],
  ["playn-go-pimped", "Pimped"],
  ["playn-go-piranha-pays", "Piranha Pays"],
  ["playn-go-planet-fortune", "Planet Fortune"],
  ["playn-go-playn-go-buffalo-of-wealth", "Play'n GO Buffalo of Wealth"],
  ["playn-go-playn-go-mole-digger", "Play'n GO Mole Digger"],
  ["playn-go-playn-go-wrappin-gold", "Play'n go Wrappin' gold"],
  ["playn-go-potion-of-madness", "Potion of Madness"],
  ["playn-go-primal-rampage", "Primal Rampage"],
  ["playn-go-prism-of-gems", "Prism of Gems"],
  ["playn-go-prissy-princess", "Prissy Princess"],
  ["playn-go-prosperity-palace", "Prosperity Palace"]
] as const;

test("wave 49 artwork is loaded in the catalog list", async ({ page }) => {
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
