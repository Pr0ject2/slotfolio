import { expect, test } from "@playwright/test";
const slots = [
  ["playn-go-puebla-parade", "Puebla Parade"],
  ["playn-go-queens-day-tilt", "Queen's Day Tilt"],
  ["playn-go-ras-reckoning", "Ra's Reckoning"],
  ["playn-go-rabbit-hole-riches", "Rabbit Hole Riches"],
  ["playn-go-rabbit-hole-riches-court-of-hearts", "Rabbit Hole Riches - Court of Hearts"],
  ["playn-go-rage-to-riches", "Rage to Riches"],
  ["playn-go-raging-rex", "Raging Rex"],
  ["playn-go-raging-rex-2", "Raging Rex 2"],
  ["push-gaming-10-cash-bisons", "10 Cash Bisons"],
  ["push-gaming-10-flaming-bisons", "10 Flaming Bisons"],
  ["push-gaming-10-pharaohs", "10 Pharaohs"],
  ["push-gaming-10-santas-reindeers", "10 Santa's Reindeers"],
  ["push-gaming-10-swords", "10 Swords"],
  ["push-gaming-3-liberty-eagles", "3 Liberty Eagles"],
  ["push-gaming-3-magic-pots", "3 Magic Pots"],
  ["push-gaming-bait-n-bank", "Bait 'n' Bank"],
  ["push-gaming-bamboo-ways", "Bamboo Ways"],
  ["push-gaming-big-bam-book", "Big Bam-book"],
  ["push-gaming-big-bamboo", "Big Bamboo"],
  ["push-gaming-big-bamboo-2", "Big Bamboo 2"],
] as const;

test("wave 50 all catalog list artwork is localized and loaded", async ({ page }) => {
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
