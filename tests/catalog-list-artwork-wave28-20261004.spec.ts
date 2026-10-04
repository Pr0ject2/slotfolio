import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-1001-mystery-genie-fortunes", "1001 Mystery Genie Fortunes"],
  ["playn-go-13th-trial-hercules-abyssways", "13th Trial Hercules Abyssways"],
  ["playn-go-15-crystal-roses-a-tale-of-love", "15 Crystal Roses: A Tale of Love"],
  ["playn-go-24k-dragon", "24k Dragon"],
  ["playn-go-3-blades-and-blessings", "3 Blades & Blessings"],
  ["playn-go-3-clown-monty", "3 Clown Monty"],
  ["playn-go-3-clown-monty-ii", "3 Clown Monty II"],
  ["playn-go-5x-magic", "5x Magic"],
  ["playn-go-7-sins", "7 Sins"],
  ["playn-go-ace-of-spades", "Ace of Spades"],
] as const;

test("wave 28 artwork is loaded in the catalog list", async ({ page }) => {
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
