import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-bakers-treat", "Flour Power"],
  ["playn-go-banana-rock", "Encore Spin"],
  ["playn-go-banana-rush", "Modifier Wheel"],
  ["playn-go-banquet-of-dead", "Special Expanding Symbol"],
  ["playn-go-bao-shi", "Lioras Blessings"],
  ["playn-go-barn-busters", "Barn Spins"],
  ["playn-go-baron-lord-of-saturday", "Wild Reel"],
  ["playn-go-battle-royal", "Long Live the King"],
  ["playn-go-beasts-of-fire", "12 348 ways"],
  ["playn-go-beasts-of-fire-maximum", "Maximum Burning Spins"],
] as const;

test("wave 30 Play'n GO cards render verified game-specific copy and loaded artwork", async ({ page }) => {
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
