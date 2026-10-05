import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-dr-toonz", "Quantumeter"],
  ["playn-go-dragon-maiden", "Golden Free Spin"],
  ["playn-go-dragon-ship", "Pick-a-Prize"],
  ["playn-go-dragonfates-favor", "Walking Wild"],
  ["playn-go-easter-eggs", "Golden Egg"],
  ["playn-go-easter-eggspedition", "Cash Pot"],
  ["playn-go-enchanted-crystals", "Find the Crystal"],
  ["playn-go-enchanted-meadow", "Hide-and-Seek"],
  ["playn-go-energoonz", "BONUS column"],
  ["playn-go-eye-of-atum", "symbol upgrade"],
] as const;

test("wave 38 Play'n GO cards render verified game-specific copy and loaded artwork", async ({ page }) => {
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
