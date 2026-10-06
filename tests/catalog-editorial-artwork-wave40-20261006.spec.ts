import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-fire-toad-2", "Golden Lilypad"],
  ["playn-go-firefly-frenzy", "Frenzy Spins"],
  ["playn-go-forge-of-fortunes", "Forging Re-Spins"],
  ["playn-go-forge-of-gems", "Forge Reel"],
  ["playn-go-fortune-teller", "Black Cat"],
  ["playn-go-fortunes-of-ali-baba", "Den of Thieves"],
  ["playn-go-fox-mayhem", "Prize Collection"],
  ["playn-go-free-reelin-joker", "Free Reelin’ Fun"],
  ["playn-go-free-reelin-joker-1000", "Expanding Reels"],
  ["playn-go-frozen-gems", "Splitting Scatter"],
] as const;

test("wave 40 Play'n GO cards render verified game-specific copy and loaded artwork", async ({ page }) => {
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
