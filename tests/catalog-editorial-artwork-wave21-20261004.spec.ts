import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-le-bunny", "Jackpot Eggs"],
  ["hacksaw-gaming-le-cowboy", "Revolver Cylinder"],
  ["hacksaw-gaming-le-digger", "Golden Reveal"],
  ["hacksaw-gaming-le-fisherman", "Epic Rainbow"],
  ["hacksaw-gaming-le-football-fan", "Global Buckets"],
  ["hacksaw-gaming-le-hooligan", "Highlighted Wins"],
  ["hacksaw-gaming-le-king", "Jackpot Markers"],
  ["hacksaw-gaming-le-pharaoh", "Sticky Re-drops"],
  ["hacksaw-gaming-le-prechaun", "Position Multiplier"],
  ["hacksaw-gaming-le-santa", "Santa Sacks"],
] as const;

test("wave 21 Hacksaw cards render game-specific editorial copy and loaded official artwork", async ({ page }) => {
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
