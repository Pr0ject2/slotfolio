// Wave 36 Play’n GO dossier regression coverage.
import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-count-jokula", "Re-Spins of Evil"],
  ["playn-go-coywolf-cash", "Wild Reel"],
  ["playn-go-crabbys-gold", "Rum Barrel Meter"],
  ["playn-go-crabbys-gold-ii", "Treasure Trail"],
  ["playn-go-crazy-cows", "High-Dive Bonus"],
  ["playn-go-crystal-hall", "Lightning Blaze"],
  ["playn-go-crystal-sun", "Expanding Wild Re-Spins"],
  ["playn-go-cursed-moon-power-collection", "Soul Fire Multiplier"],
  ["playn-go-dansband-pa-turne", "Progressive Free Spins"],
  ["playn-go-dawn-of-egypt", "Pyramid Spins"],
] as const;

test("wave 36 Play'n GO cards render verified game-specific copy and loaded artwork", async ({ page }) => {
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
