import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-count-jokula", "Count Jokula"],
  ["playn-go-coywolf-cash", "Coywolf Cash"],
  ["playn-go-crabbys-gold", "Crabby's Gold"],
  ["playn-go-crabbys-gold-ii", "Crabby's Gold II"],
  ["playn-go-crazy-cows", "Crazy Cows"],
  ["playn-go-crystal-hall", "Crystal Hall"],
  ["playn-go-crystal-sun", "Crystal Sun"],
  ["playn-go-cursed-moon-power-collection", "Cursed Moon Power Collection"],
  ["playn-go-dansband-pa-turne", "Dansband på Turné"],
  ["playn-go-dawn-of-egypt", "Dawn of Egypt"],
] as const;

test("wave 36 artwork is loaded in the catalog list", async ({ page }) => {
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
