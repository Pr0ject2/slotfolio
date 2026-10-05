import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-big-win-777", "Chance Wheel"],
  ["playn-go-big-win-cat", "Wheel of Multipliers"],
  ["playn-go-big-win-cat-pawsperity", "Wheel of Pawsperity"],
  ["playn-go-black-mamba", "Concert"],
  ["playn-go-blazin-bullfrog", "BLAZIN’ RE-SPIN"],
  ["playn-go-blinged", "Win Spins"],
  ["playn-go-boat-bonanza", "Mega Catch"],
  ["playn-go-boat-bonanza-christmas", "Mega Catch Multiplier"],
  ["playn-go-boat-bonanza-colossal-catch", "Colossal Catch"],
  ["playn-go-boat-bonanza-croconile", "Sobek’s Rage"],
] as const;

test("wave 31 Play'n GO cards render verified game-specific copy and loaded artwork", async ({ page }) => {
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
