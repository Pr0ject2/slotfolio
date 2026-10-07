import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-merlin-realm-of-charm", "Merlin Realm of Charm"],
  ["playn-go-merlin-journey-of-flame", "Merlin: Journey of Flame"],
  ["playn-go-merlins-grimoire", "Merlin's Grimoire"],
  ["playn-go-mermaids-diamond", "Mermaid's Diamond"],
  ["playn-go-merry-xmas", "Merry Xmas"],
  ["playn-go-midnight-gold", "Midnight Gold"],
  ["playn-go-miner-donkey-trouble", "Miner Donkey Trouble"],
  ["playn-go-mirror-joker", "Mirror Joker"],
  ["playn-go-mission-cash", "Mission Cash"],
  ["playn-go-monkey-battle-for-the-scrolls", "Monkey: Battle for the Scrolls"],
  ["playn-go-moon-princess", "Moon Princess"],
  ["playn-go-moon-princess-100", "Moon Princess 100"],
  ["playn-go-moon-princess-extreme", "Moon Princess Extreme"],
  ["playn-go-moon-princess-origins", "Moon Princess Origins"],
  ["playn-go-moon-princess-power-of-love", "Moon Princess Power of Love"],
  ["playn-go-moon-princess-stargazing", "Moon Princess Stargazing"],
  ["playn-go-moon-princess-trinity", "Moon Princess Trinity"],
  ["playn-go-moon-princess-christmas-kingdom", "Moon Princess: Christmas Kingdom"],
  ["playn-go-motley-crue", "Mötley Crüe"],
  ["playn-go-mount-m", "Mount M"]
] as const;

test("wave 47 artwork is loaded in the catalog list", async ({ page }) => {
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
