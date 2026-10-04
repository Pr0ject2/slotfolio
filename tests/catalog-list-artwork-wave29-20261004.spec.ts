import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-agent-destiny", "Agent Destiny"],
  ["playn-go-agent-of-hearts", "Agent of Hearts"],
  ["playn-go-alice-cooper-and-the-tome-of-madness", "Alice Cooper and the Tome of Madness"],
  ["playn-go-animal-madness", "Animal Madness"],
  ["playn-go-ankh-of-anubis", "Ankh of Anubis"],
  ["playn-go-ankh-of-anubis-awakening", "Ankh of Anubis Awakening"],
  ["playn-go-annihilator", "Annihilator"],
  ["playn-go-athena-ascending", "Athena Ascending"],
  ["playn-go-aztec-idols", "Aztec Idols"],
  ["playn-go-aztec-warrior-princess", "Aztec Warrior Princess"],
] as const;

test("wave 29 artwork is loaded in the catalog list", async ({ page }) => {
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
