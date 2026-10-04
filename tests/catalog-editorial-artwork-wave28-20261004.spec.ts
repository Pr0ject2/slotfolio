import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-1001-mystery-genie-fortunes", "Magic Lamp"],
  ["playn-go-13th-trial-hercules-abyssways", "Abyssways"],
  ["playn-go-15-crystal-roses-a-tale-of-love", "Quest Map"],
  ["playn-go-24k-dragon", "Golden Dragon Head"],
  ["playn-go-3-blades-and-blessings", "Boost Free Spins"],
  ["playn-go-3-clown-monty", "Dealers Choice"],
  ["playn-go-3-clown-monty-ii", "Walking Wilds"],
  ["playn-go-5x-magic", "5x symbol"],
  ["playn-go-7-sins", "Sticky Expanded Sin"],
  ["playn-go-ace-of-spades", "Ace of Spades symbol"],
] as const;

test("wave 28 Play'n GO cards render verified game-specific copy and loaded artwork", async ({ page }) => {
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
