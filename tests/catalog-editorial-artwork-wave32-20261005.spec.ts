import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-boat-bonanza-down-under", "Surf’n Catch"],
  ["playn-go-book-of-dead-go-collect", "Treasure Vault"],
  ["playn-go-bubblin-riches", "Lock’n Gold"],
  ["playn-go-buildin-bucks", "Feature Wheel"],
  ["playn-go-buildin-even-more-bucks", "5×5"],
  ["playn-go-buildin-more-bucks", "Double Wheel"],
  ["playn-go-bull-in-a-china-shop", "Happy Bull"],
  ["playn-go-bull-in-a-rodeo", "Freedom Round"],
  ["playn-go-bullion-xpress", "M-Counter"],
  ["playn-go-candy-island-princess", "Candy Splash"],
] as const;

test("wave 32 Play'n GO cards render verified game-specific copy and loaded artwork", async ({ page }) => {
  for (const [slug, phrase] of slots) {
    await page.goto(`/slots/catalog/${slug}`);
    await expect(page.locator("#how-it-works h2")).toHaveText("Как устроена игра");
    await expect(page.locator("#functions h2")).toHaveText("Основные функции");
    await expect(page.locator("#editorial .eyebrow")).toHaveText("Взгляд редакции");
    await expect(page.locator("#how-it-works")).toContainText(phrase);
    const art = page.locator(".slot-figure .catalog-dossier-art");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
