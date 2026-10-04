import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-xmas-drop", "Xmas Drop"],
  ["hacksaw-gaming-ze-zeus", "Ze Zeus"],
  ["hacksaw-gaming-zeus-ze-zecond", "Zeus Ze Zecond"],
  ["nolimit-city-bowel-of-beelzebub", "Bowel Of Beelzebub"],
  ["nolimit-city-ding-dong-death", "Ding Dong Death"],
  ["nolimit-city-duck-hunters-2", "Duck Hunters 2"],
  ["nolimit-city-fire-in-the-hole-4", "Fire In The Hole 4"],
  ["nolimit-city-gator-hunters-2", "Gator Hunters 2"],
  ["nolimit-city-six-feet-under", "Six Feet Under"],
  ["playn-go-nsync-pop", "NSYNC Pop"],
] as const;

test("wave 27 artwork is loaded in the catalog list", async ({ page }) => {
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
