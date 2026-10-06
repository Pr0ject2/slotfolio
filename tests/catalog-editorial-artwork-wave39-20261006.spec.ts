import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-eye-of-the-kraken", "Dive Mode"],
  ["playn-go-fangs-and-fire", "Golden Gongs"],
  ["playn-go-fat-frankies", "Burger Bonanza"],
  ["playn-go-fate-of-dead-blitzways", "16 807"],
  ["playn-go-fates-fortune", "Barrage Bonus"],
  ["playn-go-feline-fury", "Feline Wilds"],
  ["playn-go-fire-joker-100", "Re-Spin of Fire"],
  ["playn-go-fire-joker-blitz", "Coin Scatters"],
  ["playn-go-fire-joker-freeze", "Re-Spins of Ice"],
  ["playn-go-fire-toad", "Firefly Scatter"],
] as const;

test("wave 39 Play'n GO cards render verified game-specific copy and loaded artwork", async ({ page }) => {
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
