import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-def-leppard-hysteria", "Def Leppard: Hysteria"],
  ["playn-go-demon", "Demon"],
  ["playn-go-derby-wheel", "Derby Wheel"],
  ["playn-go-diamond-vortex", "Diamond Vortex"],
  ["playn-go-diamonds-of-the-realm", "Diamonds of the Realm"],
  ["playn-go-dio-killing-the-dragon", "Dio Killing the Dragon"],
  ["playn-go-disco-diamonds", "Disco Diamonds"],
  ["playn-go-divina-commedia-i-nove-cerchi", "Divina Commedia I Nove Cerchi"],
  ["playn-go-divine-showdown", "Divine Showdown"],
  ["playn-go-doom-of-egypt", "Doom of Egypt"],
] as const;

test("wave 37 artwork is loaded in the catalog list", async ({ page }) => {
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
