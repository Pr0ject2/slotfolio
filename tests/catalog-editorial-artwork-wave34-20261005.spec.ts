import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-cat-wilde-and-the-lost-chapter", "Pyramid Spins"],
  ["playn-go-cat-wilde-and-the-pyramids-of-dead", "Jackpot Click and Pick"],
  ["playn-go-cat-wilde-in-the-eclipse-of-the-sun-god", "Increasing Multiplier"],
  ["playn-go-cats-and-cash", "Wheel of Fortune"],
  ["playn-go-chambers-of-ancients", "Hold and Spin Bonus Game"],
  ["playn-go-champions-of-mithrune", "Mini-Game"],
  ["playn-go-charlie-chance", "Second Chance Re-Spins"],
  ["playn-go-charlie-chance-and-the-curse-of-cleopatra", "Synchronised reels"],
  ["playn-go-charlie-chance-in-hell-to-pay", "Feature Board"],
  ["playn-go-chinese-new-year", "Dragon fireworks bonus game"],
] as const;

test("wave 34 Play'n GO cards render verified game-specific copy and loaded artwork", async ({ page }) => {
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
