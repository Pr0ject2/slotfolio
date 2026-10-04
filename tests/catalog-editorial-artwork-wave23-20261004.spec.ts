import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-mighty-masks", "Multiplier Wheel"],
  ["hacksaw-gaming-munchy-milo", "Chain Reaction"],
  ["hacksaw-gaming-octo-attack", "Tenta-Grab"],
  ["hacksaw-gaming-orb-of-destiny", "Lady Fortune"],
  ["hacksaw-gaming-phoenix-duelreels", "Resurrection Spin"],
  ["hacksaw-gaming-pray-for-six", "Wailing Wheel"],
  ["hacksaw-gaming-pray-for-three", "Wheel of Sin"],
  ["hacksaw-gaming-rainbow-princess", "Magic Frame"],
  ["hacksaw-gaming-red-rascal", "Pendulum"],
  ["hacksaw-gaming-reign-of-rome", "LootBar"],
] as const;

test("wave 23 Hacksaw cards render game-specific editorial copy and loaded official artwork", async ({ page }) => {
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
