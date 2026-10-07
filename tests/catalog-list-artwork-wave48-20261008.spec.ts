import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-muerto-en-mictlan", "Muerto en Mictlán"],
  ["playn-go-multifruit-81", "Multifruit 81"],
  ["playn-go-mystery-egg-surprise", "Mystery Egg Surprise"],
  ["playn-go-mystery-genie-fortunes-of-the-lamp", "Mystery Genie Fortunes of the Lamp"],
  ["playn-go-mystery-joker", "Mystery Joker"],
  ["playn-go-mystery-joker-6000", "Mystery Joker 6000"],
  ["playn-go-myth", "Myth"],
  ["playn-go-myth-of-dead", "Myth of Dead"],
  ["playn-go-naughty-nicks-book", "Naughty Nick's Book"],
  ["playn-go-new-year-riches", "New Year Riches"],
  ["playn-go-ninja-fruits", "Ninja Fruits"],
  ["playn-go-nugget-n-nonsense", "Nugget n’ Nonsense"],
  ["playn-go-oasis-of-dead", "Oasis of Dead"],
  ["playn-go-octopus-treasure", "Octopus Treasure"],
  ["playn-go-odin-protector-of-realms", "Odin Protector of Realms"],
  ["playn-go-pack-and-cash", "Pack & Cash"],
  ["playn-go-pandastic-adventure", "Pandastic Adventure"],
  ["playn-go-pandoras-box-of-evil", "Pandora's Box of Evil"],
  ["playn-go-pearl-lagoon", "Pearl Lagoon"],
  ["playn-go-pearls-of-india", "Pearls of India"]
] as const;

test("wave 48 artwork is loaded in the catalog list", async ({ page }) => {
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
