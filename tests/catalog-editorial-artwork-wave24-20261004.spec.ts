import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-rise-of-fortuna", "Fortuna Wheel"],
  ["hacksaw-gaming-rise-of-ymir", "Megamultiplier"],
  ["hacksaw-gaming-ronin-stackways", "Revealing Stackways"],
  ["hacksaw-gaming-rusty-and-curly", "Wild Posters"],
  ["hacksaw-gaming-sand-and-ashes", "Sandstorm"],
  ["hacksaw-gaming-shaolin-master", "Chi Orbs"],
  ["hacksaw-gaming-sixsixsix", "Wicked Wheel"],
  ["hacksaw-gaming-slayers-inc", "Slicer"],
  ["hacksaw-gaming-smoking-dragon", "Row Cascade"],
  ["hacksaw-gaming-snow-slingers", "Snow-volver"],
] as const;

test("wave 24 Hacksaw cards render game-specific editorial copy and loaded official artwork", async ({ page }) => {
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
