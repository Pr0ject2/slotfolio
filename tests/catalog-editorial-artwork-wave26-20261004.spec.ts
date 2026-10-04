import { expect, test } from "@playwright/test";

const slots = [
  ["hacksaw-gaming-the-count", "Wild Bat"],
  ["hacksaw-gaming-the-luxe", "Golden Frames"],
  ["hacksaw-gaming-the-wildwood-curse", "Cursed Cluster"],
  ["hacksaw-gaming-tiger-legends", "Legendary Frame Warrior"],
  ["hacksaw-gaming-toshi-ways-club", "Flash Frames"],
  ["hacksaw-gaming-twisted-lab", "Oozing Beakers"],
  ["hacksaw-gaming-ultimate-slot-of-america", "Gem Cluster"],
  ["hacksaw-gaming-vending-machine", "Multiplier Light"],
  ["hacksaw-gaming-wings-of-horus", "Orb of the Moon"],
  ["hacksaw-gaming-wishbringer", "Wild Clouds"],
] as const;

test("wave 26 Hacksaw cards render game-specific editorial copy and loaded official artwork", async ({ page }) => {
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
