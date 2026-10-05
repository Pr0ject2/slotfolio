import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-cat-wilde-and-the-lost-chapter", "Cat Wilde and the Lost Chapter"],
  ["playn-go-cat-wilde-and-the-pyramids-of-dead", "Cat Wilde and the Pyramids of Dead"],
  ["playn-go-cat-wilde-in-the-eclipse-of-the-sun-god", "Cat Wilde in the Eclipse of the Sun God"],
  ["playn-go-cats-and-cash", "Cats and Cash"],
  ["playn-go-chambers-of-ancients", "Chambers of Ancients"],
  ["playn-go-champions-of-mithrune", "Champions of Mithrune"],
  ["playn-go-charlie-chance", "Charlie Chance"],
  ["playn-go-charlie-chance-and-the-curse-of-cleopatra", "Charlie Chance and the Curse of Cleopatra"],
  ["playn-go-charlie-chance-in-hell-to-pay", "Charlie Chance in Hell to Pay"],
  ["playn-go-chinese-new-year", "Chinese New Year"],
] as const;

test("wave 34 artwork is loaded in the catalog list", async ({ page }) => {
  for (const [slug, name] of slots) {
    await page.goto(`/slots/?q=${encodeURIComponent(name)}`);
    const card = page.locator(`[data-slot="${slug}"]`);
    await expect(card).toBeVisible();
    const art = card.locator(".catalog-game-art .game-image");
    await expect(art).toBeVisible();
    await expect(art).toHaveAttribute("src", new RegExp(`/images/catalog/${slug}\\.webp$`));
    await expect(art).not.toHaveAttribute("src", /unavailable\.svg/);
    await art.scrollIntoViewIfNeeded();
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth), { timeout: 15_000 }).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight), { timeout: 15_000 }).toBeGreaterThan(0);
  }
});
