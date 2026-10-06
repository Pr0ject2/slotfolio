import { expect, test } from "@playwright/test";

const slots = [
  ["playn-go-fu-er-dai", "Wild Dragon Girl"],
  ["playn-go-fulong-88", "Fulong’s Fortune"],
  ["playn-go-game-of-gladiators", "Primus Attack"],
  ["playn-go-game-of-gladiators-uprising", "Gladiators Oath"],
  ["playn-go-gargantoonz", "Experiment Charger"],
  ["playn-go-gates-of-troy", "Trojan Horse"],
  ["playn-go-gemix", "Crystal Charge Meter"],
  ["playn-go-gemix-100", "Win Multiplier"],
  ["playn-go-gemix-2", "Super Charge"],
  ["playn-go-gerards-gambit", "3×1 reel"],
] as const;

test("wave 41 Play'n GO cards render verified game-specific copy and loaded artwork", async ({ page }) => {
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
