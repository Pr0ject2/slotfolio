import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-great-game-rockies", "Hunting Season"],
  ["hacksaw-gaming-grug-make-fire", "Burning Wild"],
  ["hacksaw-gaming-hot-ross", "Hot Ro$$"],
  ["hacksaw-gaming-hounds-of-hell", "Roaring Pack"],
  ["hacksaw-gaming-immortal-desire", "Blood Reel"],
  ["hacksaw-gaming-invictus", "Pantheon Multipliers"],
  ["hacksaw-gaming-jaws-of-justice", "Force Fields"],
  ["hacksaw-gaming-jelly-slice", "Slicer"],
  ["hacksaw-gaming-keepem", "KEEP’EM reels"],
  ["hacksaw-gaming-klowns", "Needle Box"],
] as const;

test("wave 20 Hacksaw cards render game-specific editorial copy and loaded official artwork", async ({ page }) => {
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
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect.poll(async () => art.evaluate((node) => (node as HTMLImageElement).naturalHeight)).toBeGreaterThan(0);
  }
});
