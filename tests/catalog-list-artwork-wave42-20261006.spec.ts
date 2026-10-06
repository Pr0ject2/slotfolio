import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-ghost-of-dead", "Ghost of Dead"],
  ["playn-go-gigantoonz", "Gigantoonz"],
  ["playn-go-gnawn-gold", "Gnaw'n Gold"],
  ["playn-go-gold-king", "Gold King"],
  ["playn-go-gold-of-fortune-god", "Gold of Fortune God"],
  ["playn-go-gold-trophy-2", "Gold Trophy 2"],
  ["playn-go-gold-volcano", "Gold Volcano"],
  ["playn-go-golden-caravan", "Golden Caravan"],
  ["playn-go-golden-colts", "Golden Colts"],
  ["playn-go-golden-legend", "Golden Legend"],
  ["playn-go-golden-osiris", "Golden Osiris"],
  ["playn-go-golden-ticket", "Golden Ticket"],
  ["playn-go-golden-ticket-2", "Golden Ticket 2"],
  ["playn-go-grannys-wild", "Granny's Wild"],
  ["playn-go-grim-muerto", "Grim Muerto"],
  ["playn-go-hammerfall", "HammerFall"],
  ["playn-go-happy-halloween", "Happy Halloween"],
  ["playn-go-helloween", "Helloween"],
  ["playn-go-highway-legends", "Highway Legends"],
  ["playn-go-holiday-season", "Holiday Season"],
] as const;

test("wave 42 artwork is loaded in the catalog list", async ({ page }) => {
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
