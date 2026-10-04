import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-agent-destiny", "Linked Reels"],
  ["playn-go-agent-of-hearts", "Queen’s Heart Free Spin"],
  ["playn-go-alice-cooper-and-the-tome-of-madness", "Hat of Madness"],
  ["playn-go-animal-madness", "Sunflower"],
  ["playn-go-ankh-of-anubis", "Ankh symbols"],
  ["playn-go-ankh-of-anubis-awakening", "Anubis Re-Spins"],
  ["playn-go-annihilator", "Fun Palace"],
  ["playn-go-athena-ascending", "Multiplier Wilds"],
  ["playn-go-aztec-idols", "Pick-the-Idols"],
  ["playn-go-aztec-warrior-princess", "jeweled Skull"],
] as const;

test("wave 29 Play'n GO cards render verified game-specific copy and loaded artwork", async ({ page }) => {
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
