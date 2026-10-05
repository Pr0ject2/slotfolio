import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-canine-carnage", "Splitter Wilds"],
  ["playn-go-captain-glum-pirate-hunter", "Captain’s Due"],
  ["playn-go-captain-xenos-earth-adventure", "Dynamic Payways"],
  ["playn-go-cash-of-command", "Baron Fusco"],
  ["playn-go-cash-pump", "STACKED WILDS"],
  ["playn-go-cash-vandal", "City Feature"],
  ["playn-go-cash-a-cabana", "Cabana Show"],
  ["playn-go-cashin-joker", "X-Tra Cashin' Reel"],
  ["playn-go-cat-wilde-and-the-doom-of-dead", "Special Expanding Symbol"],
  ["playn-go-cat-wilde-and-the-incan-quest", "Falling Wild Re-Spins"],
] as const;

test("wave 33 Play'n GO cards render verified game-specific copy and loaded artwork", async ({ page }) => {
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
