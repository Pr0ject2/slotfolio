import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-leprechauns-diamond-dig", "Leprechaun's Diamond Dig"],
  ["playn-go-leprechauns-vault", "Leprechaun's Vault"],
  ["playn-go-lion-saga-odyssey", "Lion Saga Odyssey"],
  ["playn-go-loot-and-labyrinths", "Loot & Labyrinths"],
  ["playn-go-lord-merlin-and-the-lady-of-the-lake", "Lord Merlin and The Lady of The Lake"],
  ["playn-go-lordi-reel-monsters", "Lordi Reel Monsters"],
  ["playn-go-love-is-in-the-fair", "Love is in the Fair"],
  ["playn-go-love-joker", "Love Joker"],
  ["playn-go-luchamigos", "Luchamigos"],
  ["playn-go-lucky-diamonds", "Lucky Diamonds"],
  ["playn-go-madame-ink", "Madame Ink"],
  ["playn-go-mafia-gold", "Mafia Gold"],
  ["playn-go-mahjong-88", "Mahjong 88"],
  ["playn-go-manta-mayhem", "Manta Mayhem"],
  ["playn-go-matsuri", "Matsuri"],
  ["playn-go-medusas-madness", "Medusa's Madness"],
  ["playn-go-mega-don", "Mega Don"],
  ["playn-go-mega-don-triple-threat", "Mega Don Triple Threat"],
  ["playn-go-mega-don-feeding-frenzy", "Mega Don: Feeding Frenzy"],
  ["playn-go-merlin-and-the-ice-queen-morgana", "Merlin and the Ice Queen Morgana"]
] as const;

test("wave 46 artwork is loaded in the catalog list", async ({ page }) => {
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
